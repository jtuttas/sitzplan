"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.getFile = function (req, res) {
    var file = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") + 1);
    if (file.indexOf("?") != -1) {
        file = file.substring(0, file.indexOf("?"));
    }
    if (file == "") {
        file = "index.html";
    }
    console.log("File=" + file);
    console.log("sheet=" + req.query.sheet);
    res.contentType('text/html');
    fs.readFile("./web/" + file, function (err, data) {
        if (err) {
            res.statusCode = 404;
            res.send("File " + file + " not found!");
        }
        else {
            res.send(data);
        }
    });
};
//# sourceMappingURL=webController.js.map