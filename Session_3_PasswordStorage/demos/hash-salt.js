

var crypto = require('crypto');


var password = "monkey";
//With the number of bytes, we generate random salting to the password,
//password,salt,iteration,maximumlenth,codingalgorithm

crypto.randomBytes(256, function(err, salt) {

    crypto.pbkdf2(password, salt, 100000, 512, 'sha256',
        function(err, hash) {

            console.log("The result of hashing " + password + " is:\n\n" +
                hash.toString('hex') + "\n\n");

        });


});
