let mix = require('laravel-mix');

mix
  // Scenario 1 - Combining Files
  // Scenario 2 - Minify and obfuscate [In production]
  .combine(['src/js/debug.js', 'src/js/script.js'], 'asset/js/index.js', true)
  .setPublicPath('asset');