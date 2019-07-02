/**
 * Utils
 */

// Load and run script via AJAX
//
const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    const prior = beforeEl || document.getElementsByTagName('script')[0];

    script.async = async;
    script.defer = defer;

    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject();
        } else {
          resolve();
        }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  });
}

// addEventListener helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Smoothly scroll
//
const getElementY = query => {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
}

const doScrolling = (element, duration) => {
	let startingY = window.pageYOffset;
  let elementY = getElementY(element);
  // If element is close to page's bottom then window will scroll only to some position above the element.
  let targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
	let diff = targetY - startingY;
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  let easing = t => { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
  let start;

  if (!diff) return;

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(step = timestamp => {
    if (!start) start = timestamp;
    // Elapsed miliseconds since start of scrolling.
    let time = timestamp - start;
		// Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1);
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

		// Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

// Animate.css
//
const animateCSS = (element, animationName, callback) => {
  element.classList.add('animated', animationName);

  const handleAnimationEnd = () => {
    element.classList.remove('animated', animationName);
    element.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  element.addEventListener('animationend', handleAnimationEnd);
}

// Fix toc
//
(() => {
  let toc = document.getElementById('TableOfContents');
  if (!toc) return;
  let li, ul = toc.querySelector('ul');
  if (ul.childElementCount !== 1) return;
  li = ul.firstElementChild;
  if (li.tagName !== 'LI') return;
  // remove <ul><li></li></ul> where only <ul> only contains one <li>
  ul.outerHTML = li.innerHTML;
})();

// Open external link in new tab
//
(() => {
  let links = document.getElementsByTagName('a');
  for (let i = 0, length = links.length; i < length; i++) {
    if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
        links[i].rel = 'noreferrer';
    }
  }
})();

// Center images
//
(() => {
  let center_el = (tagName) => {
    let tags = document.getElementsByTagName(tagName), i, tag;
    for (i = 0; i < tags.length; i++) {
      tag = tags[i];
      let parent = tag.parentElement;
      // center an image if it is the only element of its parent
      if (parent.childNodes.length === 1) {
        // if there is a link on image, check grandparent
        if (parent.nodeName === 'A') {
          parent = parent.parentElement;
          if (parent.childNodes.length != 1) continue;
        }
        if (parent.nodeName === 'P') parent.style.textAlign = 'center';
      }
    }
  }
  let tagNames = ['img', 'embed', 'object'];
  for (let i = 0; i < tagNames.length; i++) {
      center_el(tagNames[i]);
  }
})();

// Load katex
//
if (document.getElementsByClassName('math').length !== 0) {
  const katexUrl = '/js/katex/katex.min.js';
  const autoRenderUrl = '/js/katex/contrib/auto-render.min.js';

  loadScript(katexUrl).then(() => {
    loadScript(autoRenderUrl).then(() => {
      renderMathInElement(document.body);
    })
  });
}

// Load comments
//
let comments = document.getElementById('vcomments');
if (comments) {
  let commentsLoader = document.getElementById('comments-loader');

  const valineJsUrl = '/js/Valine.min.js';

  const loadComments = () => {
    loadScript(valineJsUrl).then(() => {
        new Valine({
          el: '#vcomments',
          appId: '89VYThwE6PdkAYLdYXE8jIMK-MdYXbMMI',
          appKey: 'cq3bSJa9tmdhLuTQ7PT6rpzM',
          notify: false,
          verify: false,
          avatar: 'hide',
          placeholder: '说点什么吧...'
        });
        animateCSS(commentsLoader, 'fadeOutDown', () => {
          commentsLoader.style.display = 'none';
          comments.style.display = 'block';
          animateCSS(comments, 'fadeInDown');
        });
      }, () => {
        console.log('Failed to load Valine.min.js');
      });
  }

  listen('#comments-loader', 'click', loadComments);
}

// Back to top
//
let arrowUp = document.getElementById('top');
window.addEventListener('scroll', () => {
  if(window.pageYOffset > 200) {
    arrowUp.style.display = 'block';
  }
  else {
    arrowUp.style.display = 'none';
  }
});

listen('#top', 'click', doScrolling.bind(null, 'h1', 250));

// Toggle toc
//
let toc = document.getElementById('TableOfContents');
if (toc) {
  let tocA = toc.querySelectorAll('a');

  const toggleToc = () => {
    if (window.getComputedStyle(toc,null).getPropertyValue('display') == 'none' || toc.style.display == 'none') {
      toc.style.display = 'block';
      animateCSS(toc, 'bounceInLeft');
    } else {
      animateCSS(toc, 'bounceOutLeft', () => {
        toc.style.display = 'none';
      });
    }
  }

  listen('#toggle-toc', 'click', () => {
    toggleToc();
  });

  tocA.forEach(a => {
    a.addEventListener('click', () => {
      toggleToc();
    })
  });
}