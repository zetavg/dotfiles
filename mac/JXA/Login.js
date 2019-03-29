(() => {
  const systemEvents = Application('System Events')
  const loginApp = Application.currentApplication()
  loginApp.includeStandardAdditions = true
  const user = loginApp.doShellScript('whoami')

  // List of login items
  let loginItems = [
    // {
    //   name: 'Speech Synthesis Server', // Launched by login items
    //   path: '/System/Library/Frameworks/ApplicationServices.framework/Versions/A/Frameworks/SpeechSynthesis.framework/Versions/A/SpeechSynthesisServer.app',
    // },
    {
      name: 'Adobe Resource Synchronizer',
      path: '/Applications/Adobe Acrobat DC/Adobe Acrobat.app/Contents/Helpers/AdobeResourceSynchronizer.app',
    },
    {
      name: 'Hazel Helper',
      path: `/Users/${user}/Library/PreferencePanes/Hazel.prefPane/Contents/MacOS/HazelHelper.app`,
    },
    // {
    //   name: 'fuspredownloader', // Launched by login items
    //   path: `/Users/${user}/Library/Application Support/.FUS/fuspredownloader.app`,
    // },

    /* Menu Bar Apps */

    {
      name: 'CleanMyDrive 2',
      path: '/Applications/CleanMyDrive 2.app',
    },
    // {
    //   name: '1Password', // Launched by the system
    // },
    // {
    //   name: 'Evernote Helper', // Launched by the system
    // },
    // {
    //   name: 'Fantastical 2', // Launched by the system
    // },
    // {
    //   name: 'Translate Tab', // Launched by the system
    // },
    {
      name: 'WD Security Helper',
      path: '/Applications/WD Security.app/Contents/WDSecurityHelper.app',
    },
    {
      name: 'Secure Pipes',
      path: '/Applications/Secure Pipes.app',
    },
    {
      name: 'FruitJuice',
      path: '/Applications/FruitJuice.app',
    },
    {
      name: 'Droplr',
      path: '/Applications/Droplr.app',
    },
    {
      name: 'Dropbox',
      path: '/Applications/Dropbox.app',
    },
    {
      name: 'Google Backup and Sync',
      path: '/Applications/Backup and Sync.app',
    },
    // {
    //   name: 'Adobe Cloud', // Launched by the system
    // },
    {
      name: 'Alfred',
      path: '/Applications/Alfred 3.app',
    },
    // {
    //   name: 'Dash', // Disabled
    // },
    {
      name: 'ColorSnapper2',
      path: '/Applications/ColorSnapper2.app',
    },
    {
      name: 'Clean Agent',
      path: '/Applications/Clean.app/Contents/Resources/CleanAgent.app',
    },
    {
      name: 'Flycut',
      path: '/Applications/Flycut.app',
    },
    {
      name: 'Paste',
      path: '/Applications/Paste.app',
    },
    // {
    //   name: 'Karabiner-Elements', // Launched by the system
    //   path: '/Applications/Karabiner-Elements.app',
    // },
    {
      name: 'BetterTouchTool',
      path: '/Applications/BetterTouchTool.app',
    },
    {
      name: 'Slate',
      path: '/Applications/Slate.app',
    },
    {
      name: 'Hammerspoon',
      path: '/Applications/Hammerspoon.app',
    },
    {
      name: 'RescueTime',
      path: '/Applications/RescueTime.app',
    },
    {
      name: 'Growl',
      path: '/Applications/Growl.app',
    },
    {
      name: 'Bartender',
      path: '/Applications/Bartender 3.app',
    },

    /* Prepare Apps */

    {
      name: 'Prepare Sublime Text',
      // path: `/Users/${user}/Library/JXA/Close All Windows and Quit Sublime Text.app`,
      func: () => {
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
      },
    },
    {
      name: 'Prepare Tower',
      // path: `/Users/${user}/Library/JXA/Close All Windows and Quit Tower.app`,
      func: () => {
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
      },
    },

    /* Apps That Might Take Some Time To Launch */

    {
      name: 'Last.fm',
      path: '/Applications/Last.fm.app',
    },

    /* Pre-launch Apps */

    {
      name: 'Vivaldi',
      path: '/Applications/Vivaldi.app',
    },
    {
      name: 'Franz',
      path: '/Applications/Franz.app',
    },
    {
      name: 'OmniFocus',
      path: '/Applications/OmniFocus.localized/OmniFocus.app',
    },
    {
      name: 'iTerm',
      path: '/Applications/iTerm.app',
    },
  ]

  function findApp(path) {
    try {
      return Application(path)
    } catch (e) {
      return null
    }
  }

  Progress.description = 'Preparing Login Items'

  // Get the app for each loginItem
  loginItems = loginItems.map(({ path, ...etc }) => ({ ...etc, path, app: findApp(path) }))
  // Collect loginItems that dosen't got a app or func
  const missingAppNames = loginItems
    .filter(({ app, func }) => (!app && !func))
    .map(({ name }) => (name))
  // Filter out loginItems that dosen't got a app or func
  loginItems = loginItems.filter(({ app, func }) => (app || func))

  // Show message about those loginItems that dosen't got a name or func
  if (missingAppNames.length > 0) {
    const message = `Ignoring the following items: ${missingAppNames.map(n => `"${n}"`).join(', ')}`
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
        loginItem.func()
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
