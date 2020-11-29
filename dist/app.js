"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var GraphSignin_1 = require("./controllers/GraphSignin");
var microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
/**
 * Controllers (route handlers).
 */
var userController = require("./controllers/UserController");
var ExcelTool_1 = require("./controllers/ExcelTool");
var secrets_1 = require("./secrets");
var fs = require("fs");
console.log("starte...");
/**
 * Secrets und RSA Schlüssel einlesen
 */
var se = new secrets_1.secrets();
exports.rsakey = fs.readFileSync("config/rsa.private");
console.log("RSA Key is:" + exports.rsakey);
// production apps should import from "@microsoft/microsoft-graph-client"; to grab the NPM module with the types declarations
// These are the types for graph nodes that are published separetlely (User field types, messages, contacts, etc.)
// To reference Microsoft Graph types, see directions at https://github.com/microsoftgraph/msgraph-typescript-typings/
// The dependency has been added in package.json, so just run npm install
var login = new GraphSignin_1.GraphSignin(se.refresh_token, se.client_id, se.client_secret);
exports.exel = new ExcelTool_1.ExcelTool(login, se.item_id);
function timeout() {
    setTimeout(function () {
        console.log("tick");
        updateTokens();
        timeout();
    }, 1000 * 60 * 30);
}
timeout();
updateTokens();
function updateTokens() {
    login.updateToken(function (token, refreshtoken) {
        console.log("got token!");
        se.accessToken = token;
        se.refresh_token = refreshtoken;
        se.store();
        var client = microsoft_graph_client_1.Client.init({
            authProvider: function (done) {
                done(null, token);
            }
        });
    }, function (err) {
        console.error(err);
    });
}
/**
 * Create Express server.
 */
//CORS middleware  
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
};
var app = express();
//var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use('*/web', express.static('static'));
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3001);
/**
 * Start Express server.
 */
app.route('/api/v1/');
app.route('/api/v1/')
    .post(userController.setUser);
//app.get("/web/*", webController.getFile);
app.listen(app.get("port"), function () {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
module.exports = app;
//# sourceMappingURL=app.js.map