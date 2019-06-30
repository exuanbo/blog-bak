jQuery.cachedScript = (url, options)  => {
  // Allow user to set any option except for dataType, cache, and url
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax(options);
};

// Fix toc
//
(() => {
  var toc = document.getElementById('TableOfContents');
  if (!toc) return;
  var li, ul = toc.querySelector('ul');
  if (ul.childElementCount !== 1) return;
  li = ul.firstElementChild;
  if (li.tagName !== 'LI') return;
  // remove <ul><li></li></ul> where only <ul> only contains one <li>
  ul.outerHTML = li.innerHTML;
})();

// Open external link in new tab
//
(() => {
  let links = $('a');
  for (var i = 0, length = links.length; i < length; i++) {
    if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
        links[i].rel = 'noreferrer';
    }
  }
})();

// Center images
//
(() => {
  function center_el(tagName) {
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

// Load comments
//
// let commentsLoaded = false;
let comments = $('#vcomments');
let commentsLoader = $('#comments-loader');

const valineJsUrl = '/js/Valine.min.js';

const loadComments = () => {
  $.cachedScript(valineJsUrl)
    .done(() => {
      new Valine({
        el: '#vcomments',
        appId: '89VYThwE6PdkAYLdYXE8jIMK-MdYXbMMI',
        appKey: 'cq3bSJa9tmdhLuTQ7PT6rpzM',
        notify: false,
        verify: false,
        avatar: 'hide',
        placeholder: '说点什么吧...'
      });
      commentsLoader.hide();
      comments.fadeIn('slow');
    })
    .fail(() => {
      console.log('Failed to load Valine.min.js');
    })
};

// // Load comments if the window is not scrollable
//
// if ((comments.length > 0) && (comments.offset().top < window.innerHeight)) {
//   commentsLoader.css('display', 'block');
//   loadComments();
//   commentsLoaded = true;
// }

// $(window).on('scroll', () => {
//
//   if ((comments.length > 0) && (commentsLoaded == false)) {
//     if (window.pageYOffset + window.innerHeight > comments.offset().top) {
//       commentsLoader.css('display', 'block');
//       loadComments();
//       commentsLoaded = true;
//     }
//   }
// });

// Click to load comments
//
commentsLoader.find('button').click(() => {
  loadComments();
});

// Back to top
//
let arrowUp = $('#top');
$(window).on('scroll', () => {
  if(window.pageYOffset > 200) {
    arrowUp.slideDown('fast');
  }
  else {
    arrowUp.stop().slideUp('fast');
  }
});

arrowUp.click(() => {
  $('html,body').animate({scrollTop: '0px'}, 200);
});

// Toggle toc
//
let menu = $('#toggle-toc');
let toc = $('#TableOfContents');

menu.click(() => {
  if (toc.css('display') === 'none') {
    toc.fadeIn('fast');
  }
});

toc.find('a').click(() => {
  toc.fadeOut('fast');
});

$(document).mouseup((e) => {
  if (!toc.is(e.target) && !toc.has(e.target).length) {
      toc.fadeOut('fast');
  }
});