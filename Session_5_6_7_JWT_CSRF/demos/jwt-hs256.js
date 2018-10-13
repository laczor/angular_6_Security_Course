
//1. We require the package which will do the work for us.
//2. A secret key has to be added
//3. payload as well, which is only conveted to BASE64!
//4. Then when we will run our code, we will have the generated jwt web token.

var jwt = require('jsonwebtoken');

var secretKey = 'secret-key';

var payload = {
  name: 'Alice'
};


// create a JWT
var newToken = jwt.sign(payload, secretKey, {
    algorithm: 'HS256'
});

console.log("JWT created:", newToken);






