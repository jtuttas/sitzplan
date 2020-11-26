"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var result_1 = require("../models/result");
var app_1 = require("../app");
exports.setUser = function (req, res) {
    console.log("Post with Data!: " + JSON.stringify(req.body));
    app_1.exel.update(req.body.name, req.body.excel);
    var v = new result_1.Result();
    v.success = true;
    v.msg = "Added " + req.body.name;
    res.contentType('application/json');
    res.send(JSON.stringify(v));
};
//# sourceMappingURL=UserController.js.map