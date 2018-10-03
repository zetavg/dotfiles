function enableLightMode() {
  Application('System Events').appearancePreferences.darkMode = false

  try {
    Application('Alfred 3').setTheme('System Light')
  } catch (e) {}

  try {
    Application('OmniFocus').preferences.byId('OFIColorPaletteIdentifier').value = 'default'
  } catch (e) {}
}

function enableDarkMode() {
  Application('System Events').appearancePreferences.darkMode = true

  try {
    Application('Alfred 3').setTheme('System Dark')
  } catch (e) {}

  try {
    Application('OmniFocus').preferences.byId('OFIColorPaletteIdentifier').value = 'builtin:20-Dark'
  } catch (e) {}
}

(() => {
  if (Application('System Events').appearancePreferences.darkMode()) {
    enableLightMode()
  } else {
    enableDarkMode()
  }
})()
