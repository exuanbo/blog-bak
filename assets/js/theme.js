// Find if user has set a preference and react to changes
function initializeTheme () {
  syncBetweenTabs()
  listenToOSChanges()
  enableTheme(
    returnThemeBasedOnLocalStorage() ||
      returnThemeBasedOnOS() ||
      returnThemeBasedOnTime(),
    false)
}

// Listen to preference changes. The event only fires in inactive tabs, so theme changes aren't applied twice.
function syncBetweenTabs () {
  window.addEventListener('storage', (e) => {
    if (e.key === 'preference-theme') {
      if (e.newValue === 'light') enableTheme('light', true, false)
      else if (e.newValue === 'dark') enableTheme('dark', true, false) // The third argument makes sure the state isn't saved again.
    }
  })
}

// Add a listener in case OS-level preference changes.
function listenToOSChanges () {
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQueryList.addListener((m) => {
    const root = document.documentElement
    if (m.matches !== true) {
      if (!root.classList.contains('theme-light')) {
        enableTheme('light', true)
      }
    } else {
      if (!root.classList.contains('theme-dark')) enableTheme('dark', true)
    }
  })
}

// If no preference was set, check what the OS pref is.
function returnThemeBasedOnOS () {
  let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  if (mediaQueryList.matches) return 'dark'
  else {
    mediaQueryList = window.matchMedia('(prefers-color-scheme: light)')
    if (mediaQueryList.matches) return 'light'
    else return undefined
  }
}

// For subsequent page loads
function returnThemeBasedOnLocalStorage () {
  const pref = localStorage.getItem('preference-theme')
  const lastChanged = localStorage.getItem('preference-theme-last-change')
  let now = new Date()
  now = now.getTime()
  const minutesPassed = (now - lastChanged) / (1000 * 60)

  if (
    minutesPassed < 120 &&
      pref === 'light'
  ) return 'light'
  else if (
    minutesPassed < 120 &&
      pref === 'dark'
  ) return 'dark'
  else return undefined
}

// Fallback for when OS preference isn't available
function returnThemeBasedOnTime () {
  const date = new Date()
  const hour = date.getHours()
  if (hour > 20 || hour < 5) return 'dark'
  else return 'light'
}

// Switch to another theme
function enableTheme (newTheme = 'dark', withTransition = false, save = true) {
  const root = document.documentElement
  let otherTheme
  newTheme === 'dark' ? otherTheme = 'light' : otherTheme = 'dark'
  let currentTheme
  root.classList.contains('theme-light') ? currentTheme = 'light' : currentTheme = 'dark'

  if (withTransition === true && newTheme !== currentTheme) animateThemeTransition()

  root.classList.add('theme-' + newTheme)
  root.classList.remove('theme-' + otherTheme)

  if (save) saveToLocalStorage('preference-theme', newTheme)
}

// Save the state for subsequent page loads
function saveToLocalStorage (key, value) {
  let now = new Date()
  now = now.getTime()
  localStorage.setItem(key, value)
  localStorage.setItem(key + '-last-change', now)
}

// Add class to smoothly transition between themes
function animateThemeTransition () {
  const root = document.documentElement
  root.classList.remove('theme-change-active')
  root.offsetWidth = undefined // Trigger reflow to cancel the animation
  root.classList.add('theme-change-active')
}
(function removeAnimationClass () {
  const root = document.documentElement
  root.addEventListener(supportedAnimationEvent(), () => root.classList.remove('theme-change-active'), false)
}())

function supportedAnimationEvent () {
  const el = document.createElement('f')
  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd'
  }

  for (const t in animations) {
    if (el.style[t] !== undefined) return animations[t] // Return the name of the event fired by the browser to indicate a CSS animation has ended
  }
}

(function switchTheme () {
  const btn = document.getElementById('btnTheme')
  btn.onclick = () => {
    let newTheme
    if (localStorage.getItem('preference-theme') === 'dark') {
      newTheme = 'light'
    } else {
      newTheme = 'dark'
    }
    enableTheme(newTheme)
  }
})()
