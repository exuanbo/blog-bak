loadScript('https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js')
  .then(() => {
    loadScript(
      'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js',
      'sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI',
      'anonymous'
    ).then(() => {
      renderMathInElement(document.body)
    })
  })
