const User = require('../../models/user.js');

/* REGISTER user */
exports.registerUser = (req, res) => {
    const {username, email, password, passwordConfirmation} = req.body;

    if (username.length < 4) {
        return res.status(422)
            .send({errors: [{title: 'Username is too short.', detail: 'At least 4 characters.'}]})
    }

    if (!password || !email) {
        return res.status(422)
            .send({errors: [{title: 'Missing data', detail: 'Email and password are required!'}]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422)
            .send({errors: [{title: 'Invalid password', detail: 'Password is not matching the confirmation password!'}]});
    }

    // check if user by email if already exist in DB
    User.findOne({email}, (error, existingUser) => {
        if (error) {
            res.status(422)
            .send({errors: [{title: 'DB error', detail: 'Something went wrong'}]});
        }

        if (existingUser) {
            res.status(422)
            .send({errors: [{title: 'Invalid User', detail: 'That user already exist!'}]});
        }

        const user = new User({username, email, password});
        user.save((err) => {
            if (err) {
                res.status(422)
                .send({errors: [{title: 'DB error', detail: 'Something went wrong'}]});
            }
            return res.json({status: 'registered!'})
        })        
    })
}


exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(422)
            .send({errors: [{title: 'Missing data', detail: 'Email and password are required!'}]});
    }
    User.findOne({email}, (error, existingUser) => {
        if (error) {
            res.status(422)
            .send({errors: [{title: 'DB error', detail: 'Something went wrong'}]});
        }
        if (!existingUser) {
            res.status(422)
                .send({errors:  [{title: 'No matching user', detail: 'First you need to register!'}]})
        }

        if (existingUser.hasSamePassword(password)) {
            // Generate JWT
            return res.json({token: 'token will be assigned here'})
        } else {
            res.status(422)
                .send({errors:  [{title: 'Invalid password', detail: 'Provided password is wrong!'}]})
        }


    })
}

