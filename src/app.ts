import * as express from 'express';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import { GraphSignin } from './controllers/GraphSignin';
import { Client as GraphClient } from "@microsoft/microsoft-graph-client";


/**
 * Controllers (route handlers).
 */
import * as userController from "./controllers/UserController";
import * as webController from "./controllers/webController";
import { ExcelTool } from './controllers/ExcelTool';

console.log("starte..");


/**
 * Azure
 */

export const secrets = require("../config/secrets");



// production apps should import from "@microsoft/microsoft-graph-client"; to grab the NPM module with the types declarations

// These are the types for graph nodes that are published separetlely (User field types, messages, contacts, etc.)
// To reference Microsoft Graph types, see directions at https://github.com/microsoftgraph/msgraph-typescript-typings/
// The dependency has been added in package.json, so just run npm install
let login = new GraphSignin(secrets.refresh_token, secrets.client_id, secrets.client_secret);
export let exel:ExcelTool = new ExcelTool(login,secrets.item_id,secrets.table_id);
login.updateToken(token => {
    console.log("got token!");

    const client = GraphClient.init({
        authProvider: function (done: any) {
            done(null, token);
        }
    });
    // Get the name of the authenticated user
    client.api('/me')
        //.select("givenName")
        .get((err: any, user: MicrosoftGraph.User) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("User Contect:"+JSON.stringify(user));
        });
},
    err => {
        console.error(err);
    }

);


/**
 * Create Express server.
 */
//CORS middleware  
var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');

    next();
}
const app = express();
//var router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(allowCrossDomain);
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
app.get("/web/*",webController.getFile);

app.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
  
    
});

module.exports = app;
