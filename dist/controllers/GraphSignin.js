"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var GraphSignin = /** @class */ (function () {
    function GraphSignin(refresh, clientID, clientSecret) {
        this.refresh_token = refresh;
        this.client_id = clientID;
        this.client_sercret = clientSecret;
    }
    GraphSignin.prototype.updateToken = function (success, error) {
        var _this = this;
        var data = 'client_id=' + this.client_id +
            '&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read' +
            '&refresh_token=' + this.refresh_token +
            '&redirect_uri=https://login.live.com/oauth20_desktop.srf' +
            '&grant_type=refresh_token';
        request({
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            method: "POST",
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            },
            form: data,
        }, function (error, response, body) {
            console.log("update Token retuerned status code:" + response.statusCode);
            if (response.statusCode == 200) {
                var obj = JSON.parse(body);
                _this.token = obj.access_token;
                _this.refresh_token = obj.refresh_token;
                console.log("update acces token to: " + _this.token.substring(0, 20) + "...");
                success(_this.token);
            }
            else {
                console.error(body);
            }
            if (error) {
                console.error(body);
            }
        });
    };
    GraphSignin.prototype.getAccessToken = function () {
        return this.token;
    };
    return GraphSignin;
}());
exports.GraphSignin = GraphSignin;
//# sourceMappingURL=GraphSignin.js.map