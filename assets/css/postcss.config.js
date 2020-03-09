module.exports = {
  plugins: [
    require('postcss-import')({
      path: [__dirname]
    }),
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
      fontFace: true
    }),
    require('cssnano')({
      preset: 'default'
    }),
    require('autoprefixer')({
      grid: true
    }),
    require('postcss-reporter')
  ]
}
