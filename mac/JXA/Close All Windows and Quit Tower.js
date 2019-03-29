(() => {
  const systemEvents = Application('System Events')

  // Get app, quit and activate it
  const tower = Application('Tower')
  tower.quit()
  delay(0.5)
  tower.activate()
  delay(0.5)

  // Get app process
  const towerProcess = systemEvents.applicationProcesses.byName('Tower')

  // Ensure that there's a window
  while (towerProcess.windows().length < 1) {
    tower.activate()
    delay(0.1)
  }

  // Ensure that all the windows has been closed
  while (towerProcess.windows().length > 0) {
    tower.activate()
    systemEvents.keystroke('w', { using: ['option down', 'command down'] })
    delay(0.1)
  }

  // Quit the app
  tower.quit()
})()
