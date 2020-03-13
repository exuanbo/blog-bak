module.exports = {
  plugins: [
    require('postcss-import')({ path: [__dirname] }),
    require('tailwindcss')('assets/css/tailwind.config.js'),
    // Configuration of purgecss for Tailwindcss
    // see https://tailwindcss.com/docs/controlling-file-size/#setting-up-purgecss
    require('@fullhuman/postcss-purgecss')({
      // Specify the paths to all of the template files in your project
      content: [
        'layouts/**/*.html',
        'public/**/*.html'
      ],
      // Include any special characters you're using in this regular expression
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      // Remove unused @font-face rules
      fontFace: true
    }),
    // Let cssnano do the minification instead of Hugo Pipes
    require('cssnano')({ preset: ['default', { discardComments: { removeAll: true } }] }),
    require('autoprefixer'),
    require('postcss-reporter')()
  ]
}
