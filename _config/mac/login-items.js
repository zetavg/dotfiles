/* eslint-disable no-unused-expressions, max-len */

[
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
    path: '~/Library/PreferencePanes/Hazel.prefPane/Contents/MacOS/HazelHelper.app',
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
  {
    name: 'Dash',
    path: '/Applications/Dash.app',
  },
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
    func: ({ Application, systemEvents, delay }) => {
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
        delay(1)
      }

      // Quit the app
      sublimeText.quit()
    },
  },
  {
    name: 'Prepare Tower',
    // path: `/Users/${user}/Library/JXA/Close All Windows and Quit Tower.app`,
    func: ({ Application, systemEvents, delay }) => {
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
        delay(1)
      }

      // Quit the app
      tower.quit()
    },
  },
  {
    name: 'Bear',
    path: '/Applications/Bear.app',
    func: ({ Application, systemEvents, delay }) => {
      // Close all windows
      const bear = Application('Bear')
      const bearProcess = systemEvents.applicationProcesses.byName('Bear')
      delay(0.2)
      while (bearProcess.windows().length > 0) {
        bear.activate()
        systemEvents.keystroke('w', { using: ['option down', 'command down'] })
        delay(1)
      }
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
