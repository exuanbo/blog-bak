const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const { execFile } = require('child_process')
const hugo = require('hugo-bin')
const uglify = require('gulp-uglify-es').default
const postcss = require('gulp-postcss')
const injectInline = require('@exuanbo/gulp-inject-inline')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()

let isDev = false

function clean() {
  return del(['assets/build', 'public'])
}

function build(cb) {
  const hugoArgs = isDev ? ['--gc', '-e', 'dev'] : ['--gc']
  return execFile(hugo, hugoArgs, error => cb(error))
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
  let plugins = [
    require('postcss-import')({ path: [process.cwd()] }),
    require('tailwindcss')('assets/css/tailwind.config.js')
  ]

  if (!isDev) {
    plugins = plugins.concat([
      require('@fullhuman/postcss-purgecss')({
        content: ['hugo_stats.json'],
        defaultExtractor: content => {
          const els = JSON.parse(content).htmlElements
          return els.tags.concat(els.classes, els.ids)
        },
        fontFace: true,
        whitelist: ['katex']
      }),
      require('cssnano')({
        preset: ['default', { discardComments: { removeAll: true } }]
      }),
      require('autoprefixer')
    ])
  }

  const cssDir = isDev ? 'public/css' : 'assets/build/css'
  return src('assets/css/styles.css').pipe(postcss(plugins)).pipe(dest(cssDir))
}

function html() {
  return src('public/**/*.html', { base: '.' })
    .pipe(injectInline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('.'))
}

function server() {
  isDev = true

  browserSync.init({
    server: {
      baseDir: './public'
    },
    open: false,
    reloadDelay: 2000
  })

  watch(
    [
      'assets/**',
      '!assets/build/**',
      'content/**',
      'layouts/**',
      'static/**',
      'config.toml'
    ],
    { ignoreInitial: false },
    series('default')
  )
  watch('public/**').on('change', browserSync.reload)
}

exports.default = series(clean, parallel(series(build, css), js), html)
exports.hugo = build
exports.css = css
exports.js = js
exports.html = html
exports.server = server
