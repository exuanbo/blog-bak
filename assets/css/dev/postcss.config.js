module.exports = {
  plugins: [
    require('postcss-import')({ path: [__dirname] }),
    require('tailwindcss')('assets/css/tailwind.config.js'),
    require('autoprefixer'),
    require('postcss-reporter')({ clearReportedMessages: true })
  ]
}
