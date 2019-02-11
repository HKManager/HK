const path = require('path')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const postcss = require('rollup-plugin-postcss')
const copy = require('rollup-plugin-copy-glob')
const json = require('rollup-plugin-json')
const resolve = require('rollup-plugin-node-resolve')
const svgo = require('rollup-plugin-svgo')

const version = process.env.VERSION || require('../package.json').version

const resolvePath = (p) => path.resolve(__dirname, '../', p)

const banner =
  '/*!\n' +
  ` * ApexCharts v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} Juned Chhipa\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  'web-cjs': {
    entry: resolvePath('src/apexcharts.js'),
    dest: resolvePath('dist/apexcharts.common.js'),
    format: 'cjs',
    banner
  },
  'web-esm': {
    entry: resolvePath('src/apexcharts.js'),
    dest: resolvePath('dist/apexcharts.esm.js'),
    format: 'es',
    banner
  },
  'web-umd-dev': {
    entry: resolvePath('src/apexcharts.js'),
    dest: resolvePath('dist/apexcharts.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  'web-umd-prod': {
    entry: resolvePath('src/apexcharts.js'),
    dest: resolvePath('dist/apexcharts.min.js'),
    format: 'umd',
    env: 'development',
    banner
  }
}

/**
 * Generate proper Rollup configuration from build definition object
 * @param {string} name Build config key
 */
function generateConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    plugins: [
      resolve(),
      json({
        preferConst: true
      }),
      postcss(),
      svgo({
        raw: true
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: 'ApexCharts'
    }
  }
  if (opts.env) {
    config.plugins.push(
      replace({ 'process.env.NODE_ENV': JSON.stringify(opts.env) })
    )
  }

  if (name === 'web-umd-prod') {
    config.plugins.push(copy([{
        files: 'src/assets/apexcharts.css',
        dest: 'dist'
      },
      {
        files: 'src/locales/*.*',
        dest: 'dist/locales'
      },
    ], {
      verbose: true,
      watch: false
    }))
  }

  return config
}

// If target specified, only generate this one, otherwise return all build configurations
if (process.env.TARGET) {
  module.exports = generateConfig(process.env.TARGET)
} else {
  exports.getBuild = generateConfig
  exports.getAllBuilds = () => Object.keys(builds).map(generateConfig)
}
