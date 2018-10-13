

import * as express from 'express';
import {Application} from "express";
import * as fs from 'fs';
import * as https from 'https';
import {readAllLessons} from "./read-all-lessons.route";
import {createUser} from "./create-user.route";
const bodyParser = require('body-parser');               //To automatically extract the information from the body of the request.

const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');
// Will enable you to use commandLineArguments in your code
// So you can actually, create optional or not optional command line arguments, which you can insert to the execution code

//For example, if you execute like the below:

//1. ts-node server.ts --> it will run a simple http server
//2. ts-node server.ts --secure --> it will rung a https server.

const optionDefinitions = [
    { name: 'secure', type: Boolean,  defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/signup')
    .post(createUser);


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








