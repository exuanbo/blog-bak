loadScript('https://ackee.exuanbo.xyz/privacy-respected.js', {
  async: true
}).then(() => {
  ackeeTracker
    .create({ server: 'https://ackee.exuanbo.xyz' })
    .record('1f9f76ad-23e7-4b4a-9550-af63af44a4bd')
})
