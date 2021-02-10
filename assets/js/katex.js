loadScript(
  "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
).then(() =>
  loadScript(
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js"
  ).then(() => renderMathInElement(document.body))
)
