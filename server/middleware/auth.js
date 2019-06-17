const {User}=require('./../models/user');
//this function checks if the the user is logged in or not
let auth = (req, res, next) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        // console.log("at user  *****", user)
        if (err) throw err;
        if (!user[0]) return res.json({
            error: true
        });
        // console.log(user)
        req.token = token;
        req.user = user[0];
        next();
    })

}

//es5 export.its not react
module.exports={auth}