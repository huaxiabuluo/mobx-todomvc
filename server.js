const open             = require('open');
const webpack          = require('webpack');
const internalIP       = require('internal-ip');
const execSync         = require('child_process').execSync;
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
const portal = config.devServer.https ? 'https' : 'http';
const port   = config.devServer.port;
const ip     = '0.0.0.0';

for (let key in config.entry) {
  const arr = config.entry[key];
  if (key !== 'common') {
    arr.unshift("webpack-dev-server/client?" + portal + "://" + ip + ":" + port + "/", "webpack/hot/dev-server");
  }
}

config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

function openBrowser(url) {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync('osascript openChrome.applescript "' + url + '"', {
        cwd: __dirname,
        stdio: 'ignore',
      });
      return;
    } catch (err) {
      // Ignore errors.
    }
  }
  // Fallback to opn
  // (It will always open new tab)
  open(url);
}

new WebpackDevServer(webpack(config), config.devServer).listen(port, ip, (err) => {
  if (err) { console.log(err); }
  console.log('Listening at localhost:' + port);
  console.log('Opening your system browser...');
  openBrowser(portal + '://' + '127.0.0.1' + ':' + port + '/static/index.html');
});
