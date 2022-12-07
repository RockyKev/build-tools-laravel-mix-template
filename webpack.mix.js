const path = require('path');
const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

require('laravel-mix-eslint')

mix
  // Scenario 1 - Combining Files
  // Scenario 2 - Minify and obfuscate [In production]
  // Scenario 4 - Babel!
  .combine(['src/js/debug.js', 'src/js/script.js'], 'asset/js/index.js', true)

  // Scenario 9 - Compiling TS into Web Langs
  .ts('src/ts/test.ts', 'asset/js/typescript.js')

  // Scenario 10 - Borrowing Libraries and NPM
  // Scenario 11 - Treeshaking
  .js('src/lib/library.js', 'asset/js/library.js')

  // TODO: doesn't work yet
  // Scenario 7 - Linting
  .eslint({
    fix: false,
    context: './asset/js/index.js',
    extensions: ['js', 'ts'],
    emitWarning: true,
    emitError: true,
    emitWarning: true,
    failOnWarning: false,
    failOnError: false,
    eslintPath: require.resolve('eslint')
  })

  // Scenario 6 - Generating Sourcemaps
  .sourceMaps(true, 'source-map')
 

    // Scenario 3 - Vendor Prefixes
    // Scenario 5 - Compiling SCSS
  .sass('src/sass/style.scss', 'asset/css')
   

  // TODO: Test
  // Scenario 8 - Hot-Reloading
  // .webpackConfig({
  //   plugins: [new LiveReloadPlugin()]
  // });


  // Copy images
  .copyDirectory('src/img', 'asset/img');

