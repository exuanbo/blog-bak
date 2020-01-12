document.body.addEventListener('touchstart', () => {})

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback()
        timeoutHandler = null
      }, limit)
    }
  }
}

// addEventListener helper
//
const listen = (ele, e, callback) => {
  ele.addEventListener(e, callback)
}

/**
 * Functions
 */

// Smoothly scroll
//
const doScrolling = (element, duration) => {
  const getElementY = query => {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }
  const startingY = window.pageYOffset
  const elementY = getElementY(element)
  // If element is close to page's bottom then window will scroll only to some position above the element.
  const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
  const diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  const easing = t => { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
  let start

  if (!diff) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// Animate.css
//
const animateCSS = (element, animationName, callback) => {
  element.classList.add('animated', animationName)

  const handleAnimationEnd = () => {
    element.classList.remove('animated', animationName)
    element.removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback()
  }

  listen(element, 'animationend', handleAnimationEnd)
}

// Load Medium-zoom.js
//
const loadMediumZoom = () => {
  if (document.getElementsByTagName('img').length > 0) {
    const imgObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadScript('/js/medium-zoom.min.js').then(() => {
          mediumZoom('img', {
            background: 'rgba(0, 0, 0, 0.5)',
            container: {
              height: window.innerHeight - 52,
              top: 4
            }
          })
        })
        imgObserver.disconnect()
      }
    }, { threshold: [0] })
    imgObserver.observe(document.getElementsByTagName('img')[0])
  }
}

// Load katex
//
const loadKatex = () => {
  if (/katex/.test(document.head.innerHTML)) {
    loadScript('/js/katex/katex.min.js').then(() => {
      loadScript('/js/katex/contrib/auto-render.min.js').then(() => {
        renderMathInElement(document.body)
      })
    })
  }
}

// Auto Hide Header
//
let showHeader = true
let lastScrollPosition = window.pageYOffset

const autoHideHeader = () => {
  const header = document.getElementById('site-nav')

  const currentScrollPosition = Math.max(window.pageYOffset, 0)
  if (currentScrollPosition > lastScrollPosition && !showToc) {
    header.classList.remove('slideInUp')
    header.classList.add('slideOutDown')
    showHeader = false
  } else {
    header.classList.remove('slideOutDown')
    header.classList.add('slideInUp')
    showHeader = true
  }
  lastScrollPosition = currentScrollPosition
}

const listenHeader = () => listen(window, 'scroll', autoHideHeader)

// Back to top
//
const toTop = () => {
  const arrowUp = document.getElementById('top')
  let showArrow = false
  let clickArrow = false

  listen(window, 'scroll', throttle(() => {
    if (window.pageYOffset > 200) {
      if (!showArrow && showHeader) {
        arrowUp.style.display = 'block'
        animateCSS(arrowUp, 'bounceInUp', () => {
          showArrow = true
        })
      }
    } else if (showArrow && !clickArrow) {
      animateCSS(arrowUp, 'fadeOutUp', () => {
        arrowUp.style.display = 'none'
        showArrow = false
      })
    }
  }, 250))

  listen(arrowUp, 'click', () => {
    clickArrow = true
    doScrolling('h1', 500)
    animateCSS(arrowUp, 'bounceOutUp', () => {
      arrowUp.style.display = 'none'
      showArrow = false
      clickArrow = false
    })
  })
}

// Toggle toc
//
let showToc = false

const toggleToc = () => {
  const toc = document.getElementById('TableOfContents')
  if (toc) {
    const tocBtn = document.getElementById('toggle-toc')
    tocBtn.style.display = 'block'

    const toggleToc = () => {
      if (window.getComputedStyle(toc, null).getPropertyValue('display') === 'none' || toc.style.display === 'none') {
        toc.style.display = 'block'
        animateCSS(toc, 'bounceInLeft')
        showToc = true
      } else {
        animateCSS(toc, 'bounceOutLeft', () => {
          toc.style.display = 'none'
          showToc = false
        })
      }
    }

    listen(tocBtn, 'click', toggleToc)

    const tocA = toc.querySelectorAll('a')
    tocA.forEach(a => {
      listen(a, 'click', toggleToc)
    })
  }
}

const main = () => {
  loadKatex()
  toggleToc()
  listenHeader()
  toTop()
  loadMediumZoom()
}

main()
