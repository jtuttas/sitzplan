import * as fs from 'fs';
import { Request, Response } from "express";

export let getFile = (req: Request, res: Response) => {
    let file:string = req.originalUrl.substring(req.originalUrl.lastIndexOf("/")+1);
    if (file.indexOf("?")!=-1) {
        file=file.substring(0,file.indexOf("?"));
    }
    if (file=="") {
        file="index.html";
    }
    console.log("File=" + file);
    console.log("sheet="+req.query.sheet);
    
    res.contentType('text/html');
    fs.readFile("./web/"+file,(err,data)=> {
              
        if (err) {
            res.statusCode=404;
            res.send("File "+file+" not found!");
        }
        else {
            res.send(data);
        }
    })
    
}