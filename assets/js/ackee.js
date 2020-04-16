loadScript('https://ackee.exuanbo.xyz/privacy-respected.js', { async: true })
  .then(() => {
    ackeeTracker.create({
      server: 'https://ackee.exuanbo.xyz',
      domainId: '46cf7ffb-a271-4f07-9f5d-e3df97a4d5ef'
    }, {
      ignoreLocalhost: true,
      detailed: false
    }).record()
  })
