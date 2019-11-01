const path = require('path');
const fs = require('fs');

module.exports = {
    extname: (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    },

    getCodeboxDirLocation: () => {
        return path.dirname(fs.realpathSync(__dirname))
    },

    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    getDirname: () => {
        return path.dirname(process.cwd());
    },

    getLocation: (cdir, path) => {
        return path.replace(cdir, '')
    },

    writeFolder: (dir) => {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    },

    readJSONFile: (filename) => {
        let rawdata = fs.readFileSync(filename);
        return JSON.parse(rawdata);
    },

    writeJSONFile: (json, filename) => {
        let data = JSON.stringify(json, null, 2);
        fs.writeFileSync(filename, data);
    },

    writeFile: (filename, data) => {
        fs.writeFileSync(filename, data);
    }
}