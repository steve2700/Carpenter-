// save as purge.js
const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Running PurgeCSS...');
  
  const result = await new PurgeCSS().purge({
    content: ['*.html'],
    css: ['css/bootstrap.min.css', 'css/style.css'],
    safelist: ['active', 'show', 'fade', 'collapse']
  });
  
  // Ensure directory exists
  if (!fs.existsSync('css')) {
    fs.mkdirSync('css');
  }
  
  // Combine all CSS results
  const combinedCSS = result.map(item => item.css).join('\n');
  
  // Write to output file
  fs.writeFileSync(path.join('css', 'all.min.css'), combinedCSS);
  
  console.log('CSS optimized and saved to css/all.min.css');
})();
