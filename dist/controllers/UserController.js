"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var result_1 = require("../models/result");
var app_1 = require("../app");
var NodeRSA = require("node-rsa");
exports.setUser = function (req, res) {
    console.log("Post with Data:" + JSON.stringify(req.body));
    var key = new NodeRSA(app_1.rsakey);
    try {
        var decrypted = key.decrypt(req.body.id, 'utf8');
        console.log("Decrypted:" + decrypted);
        var decryptedObject = JSON.parse(decrypted);
        app_1.exel.update(req.body.name, decryptedObject, function (r) {
            res.contentType('application/json');
            res.send(JSON.stringify(r));
        }, function (r) {
            res.contentType('application/json');
            res.send(JSON.stringify(r));
        });
    }
    catch (e) {
        var r = new result_1.Result();
        r.success = false;
        r.msg = "Wrong id";
        r.statuscode = 405;
        res.contentType('application/json');
        res.send(JSON.stringify(r));
    }
};
//# sourceMappingURL=UserController.js.map