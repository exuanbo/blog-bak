loadScript('https://ackee.exuanbo.xyz/privacy-respected.js', {
  async: true
}).then(() => {
  ackeeTracker
    .create('https://ackee.exuanbo.xyz', {
      detailed: true
    })
    .record('9d08600f-cf45-4a3f-9088-640d5047c97a')
})
