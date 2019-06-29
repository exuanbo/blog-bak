jQuery.cachedScript = function(url, options) {
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

// Open external link in new tab
//
let links = $('a');
for (var i = 0, length = links.length; i < length; i++) {
  if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
      links[i].rel = 'noreferrer';
  }
}

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
})

// Back to top
//
let arrowUp = $('#top');
$(window).on('scroll', () => {
  if(window.pageYOffset > 200) {
    arrowUp.fadeIn();
  }
  else {
    arrowUp.stop().fadeOut();
  }
})

arrowUp.click(() => {
  $('html,body').animate({scrollTop: '0px'}, 100);
})