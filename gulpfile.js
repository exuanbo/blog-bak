const del = require('del')
const { src, dest, series } = require('gulp')
const uglify = require('gulp-uglify-es').default
const { execFile } = require('child_process')
const hugo = require('hugo-bin')
const htmlmin = require('gulp-htmlmin')

function clean() {
  return del(['build', 'public'])
}

function js() {
  return src('assets/js/*.js')
    .pipe(uglify({ output: { comments: false } }))
    .pipe(dest('assets/build/js'))
}

function build(cb) {
  return execFile(hugo, ['--gc'], (error, stdout) => {
    if (error) cb(error)
    console.log('\n' + stdout)
  })
}

function html() {
  return src('public/**/*.html', { base: '.' })
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(dest('.'))
}

exports.default = series(clean, js, build, html)
