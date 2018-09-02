(() => {
  const app = Application.currentApplication()
  app.includeStandardAdditions = true

  app.displayNotification('Hello.', {
    withTitle: 'Hello World',
    subtitle: 'This is a Hello World notification.',
    soundName: 'default',
  })

  const { buttonReturned } = app.displayDialog('Do you want to see a Growl notification?', {
    buttons: ['Quit', 'No, thanks', 'Yes, please'],
    defaultButton: 3,
    cancelButton: 1,
    withTitle: 'A Dialog',
    withIcon: 'note',
  })

  if (buttonReturned === 'Yes, please') {
    const growl = Application('Growl')
    growl.register({
      asApplication: 'Hello World',
      allNotifications: ['Hello World'],
      defaultNotifications: ['Hello World'],
    })
    growl.notify({
      withName: 'Hello World',
      title: 'Growl notification',
      description: 'Click on this notification to go to https://google.com.',
      applicationName: 'Hello World',
      callbackURL: 'https://google.com',
    })
    app.displayDialog('Here it comes!', { buttons: ['Ok'] })
  } else {
    app.displayDialog('Ok, bye!', { buttons: ['Ok'] })
  }
})()
