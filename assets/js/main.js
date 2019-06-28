let links = $("a");
for (var i = 0, length = links.length; i < length; i++) {
  if (links[i].hostname != window.location.hostname) {
      links[i].target = "_blank";
      links[i].rel = "noreferrer";
  }
}

// Load comments
let commentsLoaded = false;
let comments = $("#vcomments");
let commentsLoader = $("comments-loader");

const valineJsUrl = '/js/Valine.min.js';

const loadComments = () => {
  $.getScript(valineJsUrl, () => {
    new Valine({
      el: '#vcomments',
      appId: '89VYThwE6PdkAYLdYXE8jIMK-MdYXbMMI',
      appKey: 'cq3bSJa9tmdhLuTQ7PT6rpzM',
      notify: false,
      verify: false,
      avatar: 'hide',
      placeholder: '说点什么吧...'
    });
    commentsLoader.css("display", "none");
    }
  );
};

// Load comments if the window is not scrollable
if ((comments.length > 0) && (comments.offset().top < window.innerHeight)) {
  commentsLoader.css("display", "block");
  loadComments();
  commentsLoaded = true;
}

window.addEventListener('scroll', () => {
  if ((comments.length > 0) && (commentsLoaded == false)) {
    if (window.pageYOffset + window.innerHeight > comments.offset().top) {
      commentsLoader.css("display", "block");
      loadComments();
      commentsLoaded = true;
    }
  }
});