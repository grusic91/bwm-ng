const { request } = require('http');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/dev');
const User = require('../../models/user.js');

/* REGISTER user */
exports.registerUser = (req, res) => {
    const {username, email, password, passwordConfirmation} = req.body;

    if (username.length < 4) {
        return res.status(422)
            .send({errors: [{title: 'Username is too short.', detail: 'At least 4 characters.'}]})
    }

    if (!password || !email) {
        return res.sendApiError({
            status: 422, 
            title: 'Missing data', 
            detail: 'Email and password are required!'
        })
    }

    if (password !== passwordConfirmation) {
        return res.sendApiError({
            title: 'Invalid password', 
            detail: 'Password is not matching the confirmation password!'
        });
    }

    // check if user by email if already exist in DB
    User.findOne({email}, (error, existingUser) => {
        if (error) { return res.mongoError(error); }

        if (existingUser) {
            return res.sendApiError({
                title: 'Invalid Email', 
                detail: 'User with provided Email Already exist!'
            });
        }

        const user = new User({username, email, password});
        user.save((error) => {
            if (error) {
              return res.mongoError(error);
            }
            return res.json({status: 'registered!'});
        });
    });
}


exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {       
        return res.sendApiError({
            status: 422, 
            title: 'Missing data', 
            detail: 'Email and password are required!'
        })
    }
    User.findOne({email}, (error, existingUser) => {
        if (error) { return res.mongoError(error); }

        if (!existingUser) {
            return res.sendApiError({
                status: 422, 
                title: 'Invalid Email', 
                detail: 'User with that email does not exist!'
            });
        }

        if (existingUser.hasSamePassword(password)) {
            // Generate JWT
            const token = jwt.sign({
                sub: existingUser.id,
                email: existingUser.email,
              }, JWT_SECRET, { expiresIn: '2h' });
            return res.json(token);
        } else {
            return res.sendApiError({
                status: 422, 
                title: 'Invalid password',
                detail: 'Provided password is wrong!'
            });
        }
    });
}

exports.onlyAuhtUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decodedToken = pareseToken(token);
        if (!decodedToken) { return notAuthorized(res) }
    
        User.findById(decodedToken.sub, (error, foundUser) => {
            if (error) {
                return res.mongoError(error);
            }
            if (foundUser) {
                res.locals.user = foundUser;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function pareseToken(token) {
    try {
        return jwt.verify(token.split(' ')[1], JWT_SECRET);
    }
    catch (error) {
        return null
    }   
}

function notAuthorized(res) {
    return res.status(401)
    .send(
        {errors: [{title: 'Not Authorized', detail:'You need to login to get access'}]}
    )
}
