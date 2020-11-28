"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var secrets = /** @class */ (function () {
    function secrets() {
        var se = require("../config/secrets");
        this.accessToken = se.accessToken;
        this.refresh_token = se.refresh_token;
        this.client_id = se.client_id;
        this.client_secret = se.client_secret;
        this.item_id = se.item_id;
    }
    secrets.prototype.store = function () {
        var data = JSON.stringify(this);
        fs.writeFileSync('config/secrets.json', data);
    };
    return secrets;
}());
exports.secrets = secrets;
//# sourceMappingURL=secrets.js.map