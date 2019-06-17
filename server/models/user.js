const mongoose=require('mongoose');

//for making PASSWORD
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I=12;

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:6,
        unique: true
    },
    name:{
        type:String,
        maxlength:100
    }, 
    lastname: {
        type: String,
        maxlength: 100
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }

})

userSchema.pre('save',function(next){
    var user=this;//user object
    // check pw is modified or not
    console.log(user)
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        })

    }else{
        next();
    }
})
//comparing PW and returning if isMatch
userSchema.methods.comparePassword=function(candidatePW,cb){
    // console.log(candidatePW, this.password);
    bcrypt.compare(candidatePW,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}
userSchema.methods.generateToken=function(cb){
    var user=this;
    //generateing Token
    var token=jwt.sign(user._id.toHexString(),config.SECRET);
    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })

}
userSchema.statics.findByToken = function (token, cb) {
    
    const user=this;
    // console.log(token)
    jwt.verify(token,config.SECRET,function(err,decode){
        user.find({"_id":decode,"token":token},(err,user)=>{
            if(err) return cb(err);
            // console.log(user)
            cb(null,user);
        })
    })
}
userSchema.methods.deleteToken = function(token,cb){
    var user = this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}



const User=mongoose.model('User',userSchema);

module.exports={User};