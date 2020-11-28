import * as fs from 'fs';
import { Request, Response } from "express";

export let getFile = (req: Request, res: Response) => {
    console.log("URL:"+req.url);
    
    let file=req.url
    if (req.url.indexOf("?")!=-1) {
        file=req.url.substring(0,req.url.indexOf("?"));
    }
    console.log("File=" + file);
    
    res.contentType('text/html');
    fs.readFile("."+file,(err,data)=> {
              
        if (err) {
            res.statusCode=404;
            res.send("File "+file+" not found!");
        }
        else {
            res.send(data);
        }
    })
    
}