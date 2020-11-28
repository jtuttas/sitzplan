"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.getFile = function (req, res) {
    console.log("URL:" + req.url);
    var file = req.url;
    if (req.url.indexOf("?") != -1) {
        file = req.url.substring(0, req.url.indexOf("?"));
    }
    if (file == "/web/") {
        file = "/web/index.html";
    }
    console.log("File=" + file);
    res.contentType('text/html');
    fs.readFile("." + file, function (err, data) {
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