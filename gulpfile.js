const del = require('del')
const { src, dest, series, parallel, watch } = require('gulp')
const uglify = require('gulp-uglify-es').default
const { execFile } = require('child_process')
const hugo = require('hugo-bin')
const injectInline = require('@exuanbo/gulp-inject-inline')
const htmlmin = require('gulp-htmlmin')
const postcss = require('gulp-postcss')
const browserSync = require('browser-sync').create()

function clean() {
  return del(['assets/build', 'public'])
}

function build(cb) {
  return execFile(hugo, ['--gc', '--quiet'], (error) => cb(error))
}

function js() {
  return src('assets/js/*.js')
    .pipe(
      uglify({
        mangle: false,
        output: { comments: false }
      })
    )
    .pipe(dest('assets/build/js'))
}

function css() {
  const plugins = [
    require('postcss-import')({ path: [process.cwd()] }),
    require('tailwindcss')('assets/css/tailwind.config.js'),
    require('@fullhuman/postcss-purgecss')({
      content: ['hugo_stats.json'],
      defaultExtractor: content => {
        let els = JSON.parse(content).htmlElements
        return els.tags.concat(els.classes, els.ids)
      },
      fontFace: true,
      whitelist: ['katex']
    }),
    require('cssnano')({
      preset: [
        'default',
        { discardComments: { removeAll: true } }
      ]
    }),
    require('autoprefixer')
  ]

  return src('assets/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(dest('assets/build/css'))
}

function html() {
  return src('public/**/*.html', { base: '.' })
    .pipe(injectInline())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true,
      })
    )
    .pipe(dest('.'))
}

function server() {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  })
  watch(
    [
      'assets/**',
      '!assets/build/**',
      'content/**',
      'layouts/**',
      'static/**',
      'config.toml',
    ],
    { ignoreInitial: false },
    series('default')
  )
  watch('public/**').on('change', browserSync.reload)
}

exports.default = series(clean, parallel(series(build, css), js), html)
exports.build = build
exports.css = css
exports.js = js
exports.html = html
exports.server = server
