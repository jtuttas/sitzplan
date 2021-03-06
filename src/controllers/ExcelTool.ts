import { GraphSignin } from "./GraphSignin";
import * as request from 'request';
import { Result } from "../models/result";

export class ExcelTool {

    private signin: GraphSignin;
    private itemId: string;
    constructor(s: GraphSignin, itemid: string) {
        this.signin = s;
        this.itemId = itemid;
    }

    public update(name: String, decryptedObject:any,success:(r:Result) => any,error:(err:Result) => any) {
        let obj: any =
        {
            "values": [[name]],
            "valueTypes": [["String"]]
        };
        let excel="worksheets('"+decryptedObject.room+"')/cell(row="+decryptedObject.row+",column="+decryptedObject.col+")";

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
            let r:Result = new Result();
            if (error) {
                r.success=false;
                r.statuscode=response.statusCode;
                r.msg=response.body
                console.log(body);
                error(r);
            }
            r.statuscode=response.statusCode;
            r.success=true;
            r.msg="Added "+name;
            success(r);
            console.log("add User status code:" + response.statusCode);
        });

    }
}