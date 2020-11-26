import { Request, Response } from "express";
import { Result } from "../models/result";
import { exel } from "../app";



export let setUser = (req: Request, res: Response) => {
  console.log("Post with Data!: " + JSON.stringify(req.body));
 
  exel.update(req.body.name,req.body.excel);
  let v: Result = new Result();
  v.success = true;
  v.msg = "Added " + req.body.name;
  res.contentType('application/json');
  res.send(JSON.stringify(v));
};

