const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("mongoose").model('User');
const configs = require("../config");


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//==================================== Local strategy ====================================
passport.use("local", new LocalStrategy(
    async function(username, password, done){
        try {
            const user = await User.findOne({username: username}).exec();
        } catch (error) {
            
        }
    }
));

//==================================== Google Oauth20 strategy ====================================
passport.use("google", new GoogleStrategy({
    clientID: configs.GOOGLE.gclientID,
    clientSecret: configs.GOOGLE.gsecret,
    callbackURL: configs.GOOGLE.gCallBackURL,
}, async function(accessToken, refreshToken, profile, cb) {
    //S1: check if email is exists
    try {
        const isExists = await User.findOne({email: profile._json.email});
        //console.log(isExists);
        //S2: cerate new User, based on user's info from google
        if(!isExists)
        {
            const {name, picture, email} = profile._json;
            //S2.1: genarate password for user using Google login
            const newUser = new User({
                username: name,
                profilePicture: picture,
                email: email
            });

            const createdUser = await newUser.save();

            return cb(null,createdUser);
        }
        console.log({profile});
        return cb(null, isExists);
    } catch (error) {
        console.log("[ERROR]: " + error.msg);
    }
    
     

    
    // const user = new userModel({
    //     username: profile.displayName,
    //     email: profile._json.email,
    //     googleProvider:{
    //         id: profile.id,
    //     },
    //     password: hashPassword(profile.id),
    // });
    // console.log({passport: user});
    // //B2: Create user if email not exist
    // const [result,error] = await handleError(userModel.findOne({email: user.email }));
    // if (error)
    // {
    //     return cb(error);
    // }
    // else if (!result){
    //     const newUser = await user.save();
    //     return cb(null, newUser);
    // }
    //B3: else return user 
    //return cb(null, result);
}));