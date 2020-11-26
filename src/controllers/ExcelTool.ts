import { GraphSignin } from "./GraphSignin";
import * as request from 'request';

export class ExcelTool {

    private signin: GraphSignin;
    private tableId: string;
    private itemId: string;
    constructor(s: GraphSignin, itemid: string, tableid: string) {
        this.signin = s;
        this.tableId = tableid;
        this.itemId = itemid;
    }

    public update(name: String, excel: String) {
        let obj: any =
        {
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
        }, (error, response, body) => {
            console.log("add User status code:" + response.statusCode);
        });

    }
}