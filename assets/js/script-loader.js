// https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript

const loadScript = (source, options) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    const prior = document.getElementsByTagName('script')[0]

    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null
        script.onreadystatechange = null
        script = undefined

        isAbort ? reject(new Error('Failed to load script')) : resolve()
      }
    }

    const attributes = {
      async: false,
      defer: true
    }

    if (options) {
      for (const i in options) {
        attributes[i] = options[i]
      }
    }

    for (const i in attributes) {
      script[i] = attributes[i]
    }

    script.onload = onloadHander
    script.onreadystatechange = onloadHander
    script.src = source
    prior.parentNode.insertBefore(script, prior)
  })
}
