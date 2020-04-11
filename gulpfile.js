const del = require('del')
const { exec } = require('child_process')
const { series } = require('gulp')

function clean() {
  return del(['public'])
}

function hugo(cb) {
  return exec('hugo --gc --minify', (error) => cb(error))
}

exports.default = series(clean, hugo)
