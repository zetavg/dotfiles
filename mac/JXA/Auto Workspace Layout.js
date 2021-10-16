(() => {
  delay(0.5)

  const systemEvents = Application('System Events')

  const frontmostProcess = systemEvents.processes.whose({ frontmost: true })[0]
  const frontmostWindow = frontmostProcess.windows()[0]
  const frontmostWindowTitle = frontmostWindow.title()

  const activeProjectRegexp = (() => {
    switch (frontmostProcess.name()) {
      case 'Tower':
        return /^[a-zA-Z0-9 \-_.]+/
      default:
        return /[a-zA-Z0-9 \-_.]+$/
    }
  })()

  const [activeProject] = frontmostWindowTitle.match(activeProjectRegexp) || []
  if (!activeProject) return frontmostWindowTitle
  const windowMatch = new RegExp(activeProject.trim());

  let cachedMaxWindowSize;
  // attempt to get the max possible size of the window
  function getMaxWindowSize(samplerWindow, d = 0.02) {
    if (cachedMaxWindowSize) return cachedMaxWindowSize

    delay(d)
    samplerWindow.position = [0, 0]
    samplerWindow.size = [9999, 9999]
    cachedMaxWindowSize = samplerWindow.properties().size // e.g.: [1920, 997]
    return;
  }

  [
    'Sublime Text',
    'Tower',
    'iTerm2',
  ].forEach(appName => {
    try {
      const process = systemEvents.applicationProcesses.byName(appName)
      if (!process) return

      const matchedWindow = process.windows().find(w => w.title().match(windowMatch))
      if (!matchedWindow) return

      let d = 0.1
      while (true) {
        try {
          delay(d / 3)
          switch (appName) {
            case 'Sublime Text': {
              const maxSize = getMaxWindowSize(matchedWindow, d)
              const mh = maxSize[0] < 1800 ? 160 : 200
              matchedWindow.position = [mh, 24 /* top menu bar */ + 8]
              matchedWindow.size = [maxSize[0] - (mh * 2), maxSize[1] - (12)]
              return
            }
            case 'iTerm2': {
              const maxSize = getMaxWindowSize(matchedWindow, d)
              matchedWindow.position = [maxSize[0] - 840 - 8, maxSize[1] - 650 - 12]
              matchedWindow.size = [840, 650]
              return
            }
            case 'Tower': {
              const maxSize = getMaxWindowSize(matchedWindow, d)
              matchedWindow.position = [8, 24 /* top menu bar */ + 52]
              matchedWindow.size = [1180, maxSize[1] - (52 + 120)]
              return
            }
            default:
              return
          }
        } catch (e) {
          d += 0.2
      if (d > 5) throw `max retries achieved (current delay: ${d})`
        }
      }
    } catch (e) {}
  })
})()
