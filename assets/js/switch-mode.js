function switchMode (mode = 'system') {
  if (![ 'light', 'dark', 'system'].includes(mode)) {
      return console.error('Cannot switch mode to ' + mode)
  }

  // This function switches between light, dark, and system modes
  document.body.classList.remove('dark', 'light')
  if (mode !== 'system') {
      document.body.classList.add(mode)
  }
  
  // Additionally, save the corresponding mode in the web storage for
  // persistency, if the browser supports that.
  if (typeof(Storage) !== "undefined") {
      localStorage.setItem('ui-mode', mode)
  }
}
