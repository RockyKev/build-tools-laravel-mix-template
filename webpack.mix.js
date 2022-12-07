let mix = require('laravel-mix');

mix
  // Scenario 1 - Combining Files
  // Scenario 2 - Minify and obfuscate [In production]
  // Scenario 4 - Babel!
  .combine(['src/js/debug.js', 'src/js/script.js'], 'asset/js/index.js', true)

  // Scenario 6 - Generating Sourcemaps
  .sourceMaps(true, 'source-map')
 

    // Scenario 3 - Vendor Prefixes
    // Scenario 5 - Compiling SCSS
  .sass('src/sass/style.scss', 'asset/css')
   

