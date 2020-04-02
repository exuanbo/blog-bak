const del = require('del')
const { exec } = require('child_process')
const { series } = require('gulp')

function clean() {
  return del(['public'])
}

function hugo() {
  return exec('hugo --gc && hugo --minify', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
  })
}

exports.default = series(clean, hugo)
