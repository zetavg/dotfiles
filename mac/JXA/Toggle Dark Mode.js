function enableLightMode() {
  Application('System Events').appearancePreferences.darkMode = false
}

function enableDarkMode() {
  Application('System Events').appearancePreferences.darkMode = true
}

(() => {
  if (Application('System Events').appearancePreferences.darkMode()) {
    enableLightMode()
  } else {
    enableDarkMode()
  }
})()
