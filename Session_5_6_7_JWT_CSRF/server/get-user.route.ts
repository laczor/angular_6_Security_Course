

import {Request, Response} from "express";
import {db} from "./database";



export function getUser(req:Request, res:Response) {
    //So we will have the userId in our request, only if it passes our first middleware jwt decoding.
    const user = db.findUserById(req["userId"]);

    if (user) {
        res.status(200).json({email:user.email, id:user.id});
    }
    else {
        res.sendStatus(204);
    }
}
