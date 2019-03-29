(() => {
  const systemEvents = Application('System Events')

  // Get app, quit and activate it
  const sublimeText = Application('Sublime Text')
  sublimeText.quit()
  delay(0.5)
  sublimeText.activate()
  delay(0.5)

  // Get app process
  const sublimeTextProcess = systemEvents.applicationProcesses.byName('Sublime Text')

  // Ensure that there's a window
  while (sublimeTextProcess.windows().length < 1) {
    sublimeText.activate()
    delay(0.1)
  }

  // Ensure that all the windows has been closed
  while (sublimeTextProcess.windows().length > 0) {
    sublimeText.activate()
    systemEvents.keystroke('w', { using: ['option down', 'command down'] })
    sublimeText.activate()
    systemEvents.keystroke('w', { using: ['shift down', 'command down'] })
    delay(0.1)
  }

  // Quit the app
  sublimeText.quit()
})()
