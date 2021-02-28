const express = require('express');
const authRouter = express.Router();
const {googleAuthentication} = require("../mildwares/services");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const Constants = require("../config");
/* POST sign in . */
authRouter.post('/signin', function(req, res, next) {
   res.send("SUCCESS");
});

/* GET sign in with google account. */
authRouter.get('/google', googleAuthentication);

/* GET redirect link to get infomation from google . */
authRouter.get('/google/redirect', async function(req, res, next) {
    passport.authenticate('google',{session: false}, 
    (error,userAuth, info) =>{    
        if (error || !userAuth) { 
            console.log(error);
            return res.send({
                status: "Failed",
                message: error.message,
                data: [],
            })
        }
        else{
            req.login(userAuth, (error)=>{
                if (error)
                {
                    console.log(error);
                    return res.send({
                        status: "Failed",
                        message: error.message,
                        data: [],
                    })
                }
                const token = jwt.sign({userAuth}, Constants.JWT.secretKey, { expiresIn: '4h' });
                // return token to client
                return res.send({
                    status: "Success",
                    message: "Successful login with google account",
                    data: token,
                })
            });
        }
    })(req,res,next);
});
module.exports = authRouter;
