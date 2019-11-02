var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');

var spawnSync = childProcess.spawnSync;

var tempFile = path.resolve('/tmp', `temp-${process.pid}${Date.now()}.tmp`)

var ed = /^win/.test(process.platform) ? 'notepad' : 'vim';
ed = process.env.VISUAL || process.env.EDITOR || ed;

exports.editorSync = function(option) {
  option = option || {};
  tempFile = option.file || tempFile

  if (option.content != undefined) {
    fs.writeFileSync(tempFile, option.content);
  }

  spawnSync(option.editor || ed, [tempFile], {
      stdio: 'inherit'
  });

  var contents = fs.readFileSync(tempFile, 'utf8');
  
  return contents;
}