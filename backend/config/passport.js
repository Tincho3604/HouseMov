const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const User = require('../models/userModel')


//Se declara la estrategia de passport para obtener el token de un usuario

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
}, (payload, done) => {
    User.findById(payload._doc._id)
        .then(user => {
            if(!user){
                return done(null, false)
            }else{
                return done(null, user)
            }
        })
        .catch(error =>{
            return done(error, false)
        })
}))