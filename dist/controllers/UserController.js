"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
exports.setUser = function (req, res) {
    console.log("Post with Data!: " + JSON.stringify(req.body));
    app_1.exel.update(req.body.name, req.body.excel, function (r) {
        res.contentType('application/json');
        res.send(JSON.stringify(r));
    }, function (r) {
        res.contentType('application/json');
        res.send(JSON.stringify(r));
    });
};
//# sourceMappingURL=UserController.js.map