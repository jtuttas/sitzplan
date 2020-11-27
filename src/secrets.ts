import * as fs from 'fs';

export class secrets {

    accessToken:string;
    refresh_token:string;
    client_id:string;
    client_secret:string;
    item_id:string;
    table_id:string;

    constructor() {
        const se: secrets = require("../config/secrets");
        this.accessToken=se.accessToken;
        this.refresh_token=se.refresh_token;
        this.client_id=se.client_id;
        this.client_secret=se.client_secret;
        this.item_id=se.item_id;
        this.table_id=se.table_id;
    }

    public store() {
        let data = JSON.stringify(this);
        fs.writeFileSync('config/secrets.json', data);
    }
}