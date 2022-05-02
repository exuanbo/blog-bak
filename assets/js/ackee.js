loadScript('https://ackee.exuanbo.xyz/privacy-respected.js', {
  async: true
}).then(() => {
  ackeeTracker
    .create('https://ackee.exuanbo.xyz', {
      detailed: true
    })
    .record('16bbfa87-0305-4ca1-8210-cbddc1e4aa7a')
})
