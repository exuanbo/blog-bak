loadScript('https://cdn.jsdelivr.net/npm/disqusjs@1.3/dist/disqus.js').then(
  () => {
    const loadDisqus = () => {
      new DisqusJS({
        shortname: 'exuanbos',
        siteName: 'Exuanbo&#39s',
        apikey:
          'BgQNLwMb5CNsHCWWQt0ENC0BHzt1DkszGjBOWiTH5S5MQ7k6WRNeFFUbRULH90L9'
      })
    }

    const runningOnBrowser = typeof window !== 'undefined'

    const isBot =
      (runningOnBrowser && !('onscroll' in window)) ||
      (typeof navigator !== 'undefined' &&
        /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(
          navigator.userAgent
        ))

    const supportsIntersectionObserver =
      runningOnBrowser && 'IntersectionObserver' in window

    setTimeout(() => {
      if (!isBot && supportsIntersectionObserver) {
        const disqusObserver = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              loadDisqus()
              disqusObserver.disconnect()
            }
          },
          {
            threshold: [0]
          }
        )
        disqusObserver.observe(document.getElementById('disqus_thread'))
      } else {
        loadDisqus()
      }
    }, 0)
  }
)
