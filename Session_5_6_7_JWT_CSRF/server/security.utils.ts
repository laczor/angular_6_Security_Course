


import moment = require("moment");
const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as argon2 from 'argon2';


export const randomBytes = util.promisify(crypto.randomBytes);
//Really important to make this function return a promise, so it can be used as async/await
export const signJwt = util.promisify(jwt.sign);


const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

const SESSION_DURATION = 1000;


export async function createSessionToken(userId:string) {
    return signJwt({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 240,
        subject: userId
    });
}


export async function decodeJwt(token:string) {

    const payload = await jwt.verify(token, RSA_PUBLIC_KEY);

    console.log("decoded JWT payload", payload);

    return payload;
}

export async function createCsrfToken() {
    return await randomBytes(32).then(bytes => bytes.toString("hex"));
}













