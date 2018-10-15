// This content comes from mac/JXA/post-omnifocus-selected-tasks-as-highlights-to-rescuetime.js

(() => {
  const app = Application.currentApplication()
  app.includeStandardAdditions = true

  let apiKey

  try {
    apiKey = app.doShellScript("security find-generic-password -s 'RescueTime API Key' -w")
  } catch (e) {}

  if (!apiKey) {
    app.displayDialog('Cannot get "RescueTime API Key" from your Login Keychain.\n\nPlease add a generic password with its service named "RescueTime API Key" and the API key as password in your login keychain.\n\nOr make sure the command "security find-generic-password -s \'RescueTime API Key\' -w" works.', {
      withTitle: 'Cannot get RescueTime API Key',
      buttons: ['Ok'],
    })
    return
  }

  Progress.totalUnitCount = 2
  Progress.description = 'Preparing...'
  Progress.additionalDescription = 'Loading historical highlights...'
  delay(3)
  const r = app.doShellScript(`curl https://www.rescuetime.com/anapi/highlights_feed?key=${apiKey}`)
  const json = JSON.parse(r)
  const highlightsOfDates = json.reduce((obj, v) => {
    if (!obj[v.date]) obj[v.date] = []
    obj[v.date].push(v.description)
    return obj
  }, {})

  function toISODate(date) { return date.toISOString().substring(0, 10) }

  function getFullTaskName(task) {
    const parentTask = task.parentTask()
    if (parentTask) {
      return `${getFullTaskName(parentTask)} ‹ ${task.name()}`
    }

    return task.name()
  }

  const omniFocus = Application('OmniFocus')
  omniFocus.includeStandardAdditions = true

  const selectedItems = omniFocus.windows[0].content.selectedTrees.value()

  const completedTasks = selectedItems.filter((item) => {
    try {
      return !!item.completionDate()
    } catch (e) {
      return false
    }
  })

  Progress.totalUnitCount = 2 + completedTasks.length
  Progress.completedUnitCount = 2
  Progress.additionalDescription = ''

  const erroredTaskDisplayNames = []

  for (const task of completedTasks) {
    let taskDisplayName = task.name()
    Progress.description = `Processing "${taskDisplayName}"...`
    Progress.additionalDescription = 'Preparing...'
    try {
      taskDisplayName = getFullTaskName(task)
      Progress.description = `Processing "${taskDisplayName}"...`
      const completionDate = task.completionDate()
      const isoCompletionDate = toISODate(completionDate)

      if (highlightsOfDates[isoCompletionDate] && highlightsOfDates[isoCompletionDate].includes(taskDisplayName)) {
        console.log(`Skipping ${taskDisplayName}`)
        continue
      }

      const source = 'OmniFocus'
      const postURL = `https://www.rescuetime.com/anapi/highlights_post?key=${apiKey}&highlight_date=${completionDate.toISOString()}&description=${encodeURIComponent(taskDisplayName)}&source=${source}`
      console.log(`Uploading ${taskDisplayName} with URL ${postURL}`)
      Progress.additionalDescription = 'Uploading...'
      const res = app.doShellScript(`curl -X POST "${postURL.replace(/"/g, '\\"')}"`)
      console.log(`Upload response: ${res}`)

    } catch (e) {
      console.log('Error', e)
      erroredTaskDisplayNames.push(taskDisplayName)
    }

    Progress.completedUnitCount += 1
  }

  if (erroredTaskDisplayNames.length > 0) {
    const { buttonReturned } = omniFocus.displayAlert(`Error occured while uploading the following tasks: ${erroredTaskDisplayNames.map(t => `"${t}"`).join(', ')}.`, {
      as: 'warning',
      buttons: ['Close', 'Copy Errored Items'],
      defaultButton: 2,
    })

    if (buttonReturned === 'Copy Errored Items') {
      omniFocus.setTheClipboardTo(erroredTaskDisplayNames.join("\n") + "\n")
    }
  }

  app.openLocation('https://www.rescuetime.com/browse/highlights/for/the/last14days/of/today')
})()
