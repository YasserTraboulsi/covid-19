import jwt from 'jsonwebtoken';
import pkg from 'passport-jwt';
import User from './models/userModel.js';
const { Strategy: JwtStrategy, ExtractJwt } = pkg;

export const generateToken = user => {

    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '25d',
        }
    );
}

export const applyPassportStrategy = passport => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET || 'somethingsecret';

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        // jwt_payload is the data that we create when create the token
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                console.log(err)
                return done(err, false);
                // return done.send(status)
            }
            if (user) {
                return done(null, user);
            } else {
                // aw you could create a new account
                return done(null, false);

            }
        });
    }));
}
