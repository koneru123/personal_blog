// https://www.npmjs.com/package/passport-jwt
// This module lets you authenticate endpoints using a JSON web token. 
// It is intended to be used to secure RESTful endpoints without sessions.
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../database/models/User");
const SECRET = process.env.SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passport => {
   // Before authenticating requests, the strategy used by application must be configured.
   passport.use(
      // opts object contains our jwt token and the secret key
      // When this object is passed in JwtStrategy, we get jwt_payload in our callback
      // jwt_payload consist of id and username
      new JwtStrategy(opts, (jwt_payload, done) => {
         User.findOne({ _id: jwt_payload.id })
            .then(user => {
               if (user) {
                  return done(null, user);
               } else {
                  return done(null, false);
               }
            })
            .catch(err =>
               console.log({ error: "Error authenticating the user" })
            );
      })
   );
};