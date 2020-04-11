const del = require('del')
const { exec } = require('child_process')
const { src, dest, series } = require('gulp')
const htmlmin = require('gulp-htmlmin')

function clean() {
  return del(['public'])
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

exports.default = series(clean, hugo, html)
