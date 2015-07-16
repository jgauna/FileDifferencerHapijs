// Load the server
var settings = require('./settings');
var server = require(settings.rootPath + '/server');
var fs = require('fs');
var multiparty = require('multiparty');
var path = require("path");
var rootDir = path.join(__dirname, '../../public/', 'uploads/');
// Server methods
var doFileComparation = function(req, next) {
    var form = new multiparty.Form(),
        didSuccess = false;
    form.parse(req.payload, function(err, fields, files) {
        var newpath,
            file,
            filesContainer = [],
            fileNameArr,
            fileExtension,
            fileQuantity = files.file.length;

        for (var i = 0; i < fileQuantity; i++) {
            if (files.file[i].size) {
                file = fs.readFileSync(files.file[i].path);
                fileNameArr = files.file[i].originalFilename.split('.');
                fileExtension = fileNameArr[fileNameArr.length - 1];
                // We support .txt extensions and no extension files (linux's files)
                if (fileExtension === 'txt' || !fileExtension) {
                    newpath = rootDir + files.file[i].originalFilename;
                    fs.writeFileSync(newpath, file);
                    filesContainer.push(file);
                    didSuccess = true;
                } else {
                    didSuccess = false;
                }
            }
        }
        if (!err && didSuccess) {
            next(false, compareFiles(filesContainer));
        } else {
            next(true, null);
        }
    });
};

var compareFiles = function(files) {
    var compare = [],
        result,
        filesQuantity = files.length;

    for (var i = 0; i < filesQuantity; i++) {
        compare.push(files[i].toString().trim().split('\n'));
    }

    result = getFilesDiff(compare);

    return result;
}

var getFilesDiff = function(filesArr) {
    var result = {
        lines: [],
        diff: [],
        explain: []
    };

    for (var file = 0; file < filesArr.length; file++) {
        if (filesArr[file + 1]) {
            for (var line = 0; line < filesArr[file + 1].length; line++) {
                result.lines.push(line);
                if (filesArr[0][line] !== '' && filesArr[file][line] !== filesArr[file + 1][line] && !filesArr[file][line] && filesArr[file + 1][line]) {
                    result.diff.push('+');
                    result.explain.push(filesArr[file + 1][line]);
                } else if (filesArr[0][line] !== filesArr[file + 1][line] && filesArr[file][line] === '') {
                    result.diff.push('-');
                    result.explain.push(filesArr[file][line]);
                } else if (filesArr[0][line] !== filesArr[file + 1][line]) {
                    result.diff.push('*');
                    result.explain.push(filesArr[0][line] + ' | ' + filesArr[file + 1][line]);
                } else {
                    result.diff.push(' ');
                    result.explain.push(filesArr[0][line]);
                }
            }
        }
    }
    return result;
}

server.method({
    name: 'doFileComparation',
    method: doFileComparation
});