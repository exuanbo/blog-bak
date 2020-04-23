loadScript('https://cdn.jsdelivr.net/npm/medium-zoom@1.0.5/dist/medium-zoom.min.js').then(() => {
  const imgObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      mediumZoom('img', { background: 'rgba(0, 0, 0, 0.5)' })
      imgObserver.disconnect()
    }
  }, {
    threshold: [0]
  })
  imgObserver.observe(document.getElementsByTagName('img')[0])
})
