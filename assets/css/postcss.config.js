module.exports = {
  plugins: [
    require('postcss-import')({ path: [__dirname] }),
    require('tailwindcss')('assets/css/tailwind.config.js'),
    require('@fullhuman/postcss-purgecss')({
      content: ['hugo_stats.json'],
      defaultExtractor: content => {
        let els = JSON.parse(content).htmlElements
        return els.tags.concat(els.classes, els.ids)
      },
      fontFace: true
    }),
    require('cssnano')({ preset: ['default', { discardComments: { removeAll: true } }] }),
    require('autoprefixer')
  ]
}
