(() => {
  const systemEvents = Application('System Events')
  const loginApp = Application.currentApplication()
  loginApp.includeStandardAdditions = true
  const user = loginApp.doShellScript('whoami')

  // Load the list of login items
  const loginItemsFilePath = Path(`/Users/${user}/.config/mac/login-items.js`)
  const loginItemsStr = loginApp.read(loginItemsFilePath)
  let loginItems = eval(loginItemsStr)

  Progress.description = 'Preparing Login Items'

  function findApp(path) {
    try {
      return Application(path)
    } catch (e) {
      return null
    }
  }

  // Get the app for each loginItem
  loginItems = loginItems
    .map(({ path, ...etc }) => ({ ...etc, path: path && path.replace(/^~\//, `/Users/${user}/`) }))
    .map(({ path, ...etc }) => ({ ...etc, path, app: findApp(path) }))
  // Collect loginItems that dosen't got a app or func
  const ignoredItemNames = loginItems
    .filter(({ app, func }) => (!app && !func))
    .map(({ name }) => (name))
  // Filter out loginItems that dosen't got a app or func
  loginItems = loginItems.filter(({ app, func }) => (app || func))

  // Show message about those loginItems that dosen't got a name or func
  if (ignoredItemNames.length > 0) {
    const message = `Ignoring the following items: ${ignoredItemNames.map(n => `"${n}"`).join(', ')}`
    Progress.additionalDescription = `${message}.`
    delay(1)
    Progress.additionalDescription = `${message}..`
    delay(1)
    Progress.additionalDescription = `${message}...`
    delay(1)
    Progress.additionalDescription = `${message}....`
    delay(1)
    Progress.additionalDescription = `${message}.....`
    delay(1)
  }

  // Start processing login items
  Progress.description = 'Processing Login Items'
  Progress.totalUnitCount = loginItems.length + 1
  Progress.completedUnitCount = 1

  // Init error collector
  const errors = []

  // For each loginItem
  for (const loginItem of loginItems) {
    try {
      // If have app, launch it
      if (loginItem.app) {
        Progress.additionalDescription = `Launching ${loginItem.name}...`
        loginItem.app.launch()
      }

      // If have func, execute it
      if (loginItem.func) {
        Progress.additionalDescription = `Running "${loginItem.name}"...`
        loginItem.func({
          Application,
          Path,
          systemEvents,
          delay,
          user,
        })
      }
    } catch (e) {
      // If error occur, collect it
      errors.push({ for: loginItem.name, ...e, message: e.message })
    } finally {
      // Return focus to the process window
      loginApp.activate()
      delay(1)
      Progress.completedUnitCount += 1
    }
  }

  delay(1)

  // Done
  loginApp.activate()
  Progress.description = 'Done'
  Progress.additionalDescription = 'Your system is ready.'

  // If there're any errors, alert them
  if (errors.length > 0) {
    Progress.description = 'Done With Errors'
    Progress.additionalDescription = 'Your system is ready while some errors occured.'
    loginApp.displayDialog(`Done with errors: ${JSON.stringify(errors, null, 2)}`, {
      withTitle: 'Login',
      withIcon: 'caution',
      buttons: ['Ok'],
    })
  }

  // Show the window for a period of time
  loginApp.activate()
  delay(24)
})()
