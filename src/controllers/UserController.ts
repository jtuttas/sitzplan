import { Request, Response } from "express";
import { Result } from "../models/result";
import { exel, rsakey } from "../app";
import * as NodeRSA from 'node-rsa';


export let setUser = (req: Request, res: Response) => {
  console.log("Post with Data:" + JSON.stringify(req.body));
  const key = new NodeRSA(rsakey);
 
  try {
    let decrypted = key.decrypt(req.body.id, 'utf8');
    console.log("Decrypted:"+decrypted);
    let decryptedObject = JSON.parse(decrypted);
    
    exel.update(req.body.name,decryptedObject,(r)=> {
      res.contentType('application/json');
      res.send(JSON.stringify(r));  
    },(r)=> {
      res.contentType('application/json');
      res.send(JSON.stringify(r));      
    }
    );
  }
  catch (e) {
    let r:Result = new Result();
    r.success=false;
    r.msg="Wrong id";
    r.statuscode=405;
    res.contentType('application/json');
    res.send(JSON.stringify(r));
  }

};

