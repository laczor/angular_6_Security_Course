

import * as express from 'express';
import {Application} from "express";
import * as fs from 'fs';
import * as https from 'https';
import {readAllLessons} from "./read-all-lessons.route";
import {userInfo} from "./user-info.route";
const bodyParser = require('body-parser');

const jwksRsa = require('jwks-rsa');      //This is what will fetch the public key from the JSON data recieved from the link
const jwt = require('express-jwt');      //Express middleware to check if a user has been authenticated or not


const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean,  defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);
//We are fetching the public key, and adding to this jwt-express custom built middleware

const checkIfAuthenticated = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,    //we make only 10 request / minute
        jwksUri: "https://angularuniv-security-course.auth0.com/.well-known/jwks.json"
    }),
    algorithms: ['RS256']
});


// it will mark the request if there is an error
app.use(checkIfAuthenticated);
// There is a second middleware, which will catch the error immediately.
app.use((err, req, res, next) => {
    if (err && err.name == "UnauthorizedError") {
        res.status(err.status).json({message: err.message});
    }
    else {
        next();
    }
});


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/userinfo')
    .put(userInfo);


if (options.secure) {

    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer.address().port));

}
else {

    // launch an HTTP Server
    const httpServer = app.listen(9000, () => {
        console.log("HTTP Server running at https://localhost:" + httpServer.address().port);
    });

}

