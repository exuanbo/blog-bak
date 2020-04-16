const del = require('del')
const { src, dest, series, watch } = require('gulp')
const uglify = require('gulp-uglify-es').default
const { execFile } = require('child_process')
const hugo = require('hugo-bin')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()

function clean() {
  return del(['assets/build', 'public'])
}

function js() {
  return src('assets/js/*.js')
    .pipe(uglify({ output: { comments: false } }))
    .pipe(dest('assets/build/js'))
}

function build(cb) {
  return execFile(hugo, ['--gc'], (error) => cb(error))
}

function html() {
  return src('public/**/*.html', { base: '.' })
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

exports.default = series(clean, js, build, html)
exports.js = js
exports.build = build
exports.html = html
exports.server = server
