document.addEventListener('DOMContentLoaded', function (event) {
  // Call the feather icon replacer after page load
  feather.replace()
  
  // Initialise Highlight.js
  hljs.initHighlightingOnLoad()
  
  // Also, we need to transform article's images into figures
  // so that they look rather nice (if older browser don't support that,
  // I don't care. It doesn't reduce the accessibility of the site.)
  img2figure('article img')
  
  // Now determine the mode based on the local storage with a fallback to
  // system.
  let mode = 'system'
  if (typeof(Storage) !== "undefined") {
      let store = localStorage.getItem('ui-mode', mode)
      if (store !== null) {
          mode = store // Actually retrieve the value
      }
  }
  
  // Listen to changes to the mode toggle
  const lightToggle = document.getElementById('ui-mode-left')
  const systemToggle = document.getElementById('ui-mode-center')
  const darkToggle = document.getElementById('ui-mode-right')
  
  // Pre-set the three-way and the body with the corresponding mode
  switch (mode) {
      case 'light':
          document.body.classList.add('light')
          lightToggle.setAttribute('checked', 'checked')
          break
      case 'system':
          systemToggle.setAttribute('checked', 'checked')
          break
      case 'dark':
          document.body.classList.add('dark')
          darkToggle.setAttribute('checked', 'checked')
          break
  }
  
  lightToggle.addEventListener('change', (event) => {
      switchMode('light')
  })
  
  systemToggle.addEventListener('change', (event) => {
      switchMode('system')
  })
  
  darkToggle.addEventListener('change', (event) => {
      switchMode('dark')
  })
})
