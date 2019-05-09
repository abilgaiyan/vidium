const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
    //Provide token to the user who already exists
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: "Provide email and password" })
    }

    //Check if email already exists!!
    User.findOne({ email: email }, (err, existingUser) => {
        if (err) { return next(err) }

        //Throw error if user exists
        if (existingUser) {
            return res.status(422).send({ error: 'Email is already in use' })
        }

        //Save user to DB if email does'nt exists
        const user = new User({
            email: email,
            password: password
        })

        user.save(function (err) {
            if (err) { return next(err) }

            //Indicate user Saved successfully in DB
            // res.json(user);
            res.json({ token: tokenForUser(user) });
        })
    })
}