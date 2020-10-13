const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        minlength: [4, 'Invalid length! Too short, username needs to be at least 4 characters long!'],
        maxlength: [32, 'Invalid length! Too long! Maximum is 32 characters.']
    },
    email: {
        type: String,
        required: 'Email is required!',
        lowercase: true,
        minlength: [4, 'Invalid length! Too short, username needs to be at least 4 characters long!'],
        maxlength: [32, 'Invalid length! Too long! Maximum is 32 characters.'],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String, 
        required: 'Password is required!', 
        minlength: [4, 'Invalid length! Too short, username needs to be at least 4 characters long!'],
        maxlength: [32, 'Invalid length! Too long! Maximum is 32 characters.']
    }
});

// methods on User schema
/* hasSamePassword
    arg: prividedPassword - is password that we provide to request 
    return: true or false if passwords are matching or not
*/
userSchema.methods.hasSamePassword = function(providedPassword) {
    return bcrypt.compareSync(providedPassword, this.password)
}

/* lifecycle function s for mongoose */
// right befor save() to db, call this pre() function
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', userSchema);