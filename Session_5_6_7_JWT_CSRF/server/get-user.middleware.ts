


import {decodeJwt} from "./security.utils";
import {Request, Response, NextFunction} from 'express';

//We are trying to get out the cookies.

export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

    const jwt = req.cookies["SESSIONID"];

    if (jwt) {
      //It is a promise, and it will log the error if there has been a problem
      //Important to call next()
        handleSessionCookie(jwt, req)
            .then(() => next())
            .catch(err => {
                console.error(err);
                next();
        })
    }
    else {
      next();
    }
}


//We will actually hande the userData here, and validate the jwt, using promise based function
async function handleSessionCookie(jwt:string, req: Request) {
    try {

        const payload = await decodeJwt(jwt);

        req["userId"] = payload.sub;

    }
    catch(err) {
        console.log("Error: Could not extract user from request:", err.message);
    }
}






