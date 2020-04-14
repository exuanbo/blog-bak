const del = require('del')
const { exec } = require('child_process')
const { src, dest, series } = require('gulp')
const uglify = require('gulp-uglify-es').default
const htmlmin = require('gulp-htmlmin')

function clean() {
  return del(['build', 'public'])
}

function js() {
  return src('assets/js/*.js')
    .pipe(uglify({ output: { comments: false } }))
    .pipe(dest('assets/build/js'))
}

function hugo(cb) {
  return exec('hugo --gc', (error) => cb(error))
}

function html() {
  return src('public/**/*.html', { base: '.' })
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(dest('.'))
}

exports.default = series(clean, js, hugo, html)
