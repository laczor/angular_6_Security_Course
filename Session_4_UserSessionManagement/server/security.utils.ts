import { User } from "../src/app/model/user";
import { sessionStore } from "./session-storage";
import { Response } from "express";

const util = require('util');
const crypto = require('crypto');


//Using promisify, to actually convert the structure of the callback.
//So instead of adding a callback, we can use .then()
export const randomBytes = util.promisify(crypto.randomBytes);


//So this is the old-callBack style, where you put the callback function as a second argumetn
//Demos/HASH.js
// crypto.randomBytes(256, function(err, salt) {
//
//   crypto.pbkdf2(password, salt, 100000, 512, 'sha256',
//     function(err, hash) {
//
//       console.log("The result of hashing " + password + " is:\n\n" +
//         hash.toString('hex') + "\n\n");
//
//     });
//
//
// });


export async function initializeUserSession (user: User, res: Response) {

  const sessionId = await randomBytes(32)
    .then(bytes => bytes.toString('hex'))
    .catch((err) => {
      console.log('error with randomBytes')
    })
  ;
  console.log("sessionId", sessionId);

  sessionStore.createSession(sessionId, user);

  res.cookie("SESSIONID", sessionId, {httpOnly: true, secure: true});

  res.status(200).json({id: user.id, email: user.email});
}

