/**
 * Utils
 */

document.body.addEventListener('touchstart', function () {})

// Load and run script via AJAX
//
const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    const prior = beforeEl || document.getElementsByTagName('script')[0]

    script.async = async
    script.defer = defer

    function onloadHander (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null
        script.onreadystatechange = null
        script = undefined

        if (isAbort) {
          reject(new Error('Failed to load'))
        } else {
          resolve()
        }
      }
    }

    script.onload = onloadHander
    script.onreadystatechange = onloadHander

    script.src = source
    prior.parentNode.insertBefore(script, prior)
  })
}

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
const getElementY = query => {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}

const doScrolling = (element, duration) => {
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

// Fix toc
//
(() => {
  const toc = document.getElementById('TableOfContents')
  if (!toc) return
  const ul = toc.querySelector('ul')
  if (ul.childElementCount !== 1) return
  const li = ul.firstElementChild
  if (li.tagName !== 'LI') return
  // remove <ul><li></li></ul> where only <ul> only contains one <li>
  ul.outerHTML = li.innerHTML
})();

// Open external link in new tab
//
(() => {
  const links = document.getElementsByTagName('a')
  for (let i = 0, length = links.length; i < length; i++) {
    if (links[i].hostname !== window.location.hostname) {
      links[i].target = '_blank'
      links[i].rel = 'noreferrer'
    }
  }
})();

// Center images
//
(() => {
  const centerEl = (tagName) => {
    const tags = document.getElementsByTagName(tagName)
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      let parent = tag.parentElement
      // center an image if it is the only element of its parent
      if (parent.childNodes.length === 1) {
        // if there is a link on image, check grandparent
        if (parent.nodeName === 'A') {
          parent = parent.parentElement
          if (parent.childNodes.length !== 1) continue
        }
        if (parent.nodeName === 'P') parent.style.textAlign = 'center'
      }
    }
  }

  const tagNames = ['img', 'embed', 'object']
  for (let i = 0; i < tagNames.length; i++) {
    centerEl(tagNames[i])
  }
})()

// Load Medium-zoom.js
//
if (document.getElementsByTagName('img').length > 0) {
  loadScript('/js/medium-zoom.min.js').then(() => {
    mediumZoom('img', {
      background: 'rgba(0, 0, 0, 0.5)',
      container: {
        height: window.innerHeight - 52,
        top: 4
      }
    })
  })
}

// Load katex
//
const math = /<link rel="stylesheet" href="\.\.\/\.\.\/css\/katex\.min\.css">/
if (math.test(document.head.innerHTML)) {
  const katexUrl = '/js/katex/katex.min.js'
  const autoRenderUrl = '/js/katex/contrib/auto-render.min.js'

  loadScript(katexUrl).then(() => {
    loadScript(autoRenderUrl).then(() => {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      })
    })
  })
}

// Load comments
//
const comments = document.getElementById('vcomments')
if (comments) {
  const commentsLoader = document.getElementById('comments-loader')
  const valineJsUrl = '/js/Valine.min.js'

  const loadComments = () => {
    loadScript(valineJsUrl).then(() => {
      var valine = new Valine()
      valine.init({
        el: '#vcomments',
        appId: '89VYThwE6PdkAYLdYXE8jIMK-MdYXbMMI',
        appKey: 'cq3bSJa9tmdhLuTQ7PT6rpzM',
        lang: 'zh-cn',
        notify: false,
        verify: false,
        avatar: 'robohash'
      })
      animateCSS(commentsLoader, 'fadeOutDown', () => {
        commentsLoader.style.display = 'none'
        comments.style.display = 'block'
        animateCSS(comments, 'fadeInDown')
      })
    }, () => {
      console.log('Failed to load Valine.min.js')
    })
  }

  listen(commentsLoader.children[0], 'click', loadComments)
}

// Auto Hide Header
//
const header = document.getElementById('site-nav')
let lastScrollPosition = window.pageYOffset
let showHeader = true

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0)
  if (currentScrollPosition > lastScrollPosition) {
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

listen(window, 'scroll', throttle(() => {
  autoHideHeader()
}, 250))

// Back to top
//
const arrowUp = document.getElementById('top')
let showArrow = false
let clickArrow = false

listen(window, 'scroll', throttle(() => {
  if (window.pageYOffset > 200) {
    if (showArrow === false && showHeader === true) {
      arrowUp.style.display = 'block'
      animateCSS(arrowUp, 'bounceInUp', () => {
        showArrow = true
      })
    }
  } else if (showArrow === true && clickArrow === false) {
    animateCSS(arrowUp, 'fadeOutUp', () => {
      arrowUp.style.display = 'none'
      showArrow = false
    })
  }
}, 500))

listen(arrowUp, 'click', () => {
  clickArrow = true
  doScrolling('h1', 500)
  animateCSS(arrowUp, 'bounceOutUp', () => {
    arrowUp.style.display = 'none'
    showArrow = false
    clickArrow = false
  })
})

// Toggle toc
//
const toc = document.getElementById('TableOfContents')
if (toc) {
  const tocA = toc.querySelectorAll('a')

  const toggleToc = () => {
    if (window.getComputedStyle(toc, null).getPropertyValue('display') === 'none' || toc.style.display === 'none') {
      toc.style.display = 'block'
      animateCSS(toc, 'bounceInLeft')
    } else {
      animateCSS(toc, 'bounceOutLeft', () => {
        toc.style.display = 'none'
      })
    }
  }

  listen(document.getElementById('toggle-toc'), 'click', toggleToc)

  tocA.forEach(a => {
    listen(a, 'click', toggleToc)
  })
}
