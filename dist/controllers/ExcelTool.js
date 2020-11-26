"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var ExcelTool = /** @class */ (function () {
    function ExcelTool(s, itemid, tableid) {
        this.signin = s;
        this.tableId = tableid;
        this.itemId = itemid;
    }
    ExcelTool.prototype.update = function (name, excel) {
        var obj = {
            "values": [[name]],
            "valueTypes": [["String"]]
        };
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
            console.log("add User status code:" + response.statusCode);
        });
    };
    return ExcelTool;
}());
exports.ExcelTool = ExcelTool;
//# sourceMappingURL=ExcelTool.js.map