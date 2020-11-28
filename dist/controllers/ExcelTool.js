"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var result_1 = require("../models/result");
var ExcelTool = /** @class */ (function () {
    function ExcelTool(s, itemid) {
        this.signin = s;
        this.itemId = itemid;
    }
    ExcelTool.prototype.update = function (name, decryptedObject, success, error) {
        var obj = {
            "values": [[name]],
            "valueTypes": [["String"]]
        };
        var excel = "worksheets('" + decryptedObject.room + "')/cell(row=" + decryptedObject.row + ",column=" + decryptedObject.col + ")";
        console.log("Send to Server:" + JSON.stringify(obj));
        console.log("URL:" + 'https://graph.microsoft.com/v1.0/me/drive/items/' + this.itemId + '/workbook/' + excel);
        request({
            uri: 'https://graph.microsoft.com/v1.0/me/drive/items/' + this.itemId + '/workbook/' + excel,
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.signin.getAccessToken()
            },
            form: JSON.stringify(obj),
        }, function (error, response, body) {
            var r = new result_1.Result();
            if (error) {
                r.success = false;
                r.statuscode = response.statusCode;
                r.msg = response.body;
                console.log(body);
                error(r);
            }
            r.statuscode = response.statusCode;
            r.success = true;
            r.msg = "Added " + name;
            success(r);
            console.log("add User status code:" + response.statusCode);
        });
    };
    return ExcelTool;
}());
exports.ExcelTool = ExcelTool;
//# sourceMappingURL=ExcelTool.js.map