//declearing all files
const express=require("express");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const mongoose=require('mongoose');
const app=express();
app.use(bodyParser.json());
app.use(cookieParser())
const config = require('./config/config').get(process.env.NODE_ENV);

const {User}=require('./models/user')
const {Book}=require('./models/books')
const {auth}=require('./middleware/auth')
mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE,{useNewUrlParser: true})
        .then(()=>{console.log("****DB connected*****")})
        .catch(e=>{console.log(e)})
//GET//
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.email,
        lastname:req.user.lastname
    })
})

app.get('/api/logout', auth, (req, res) => {
    // res.send(req.token)
    // if(req.token!==null){
         req.user.deleteToken(req.token, (err, user) => {
             if (err) return res.status(400).send(err);
             res.sendStatus(200)
         })
//     }
//    res.json({user:"none"})
})


app.get('/api/getBook',(req,res)=>{
    let id=req.query.id;
    Book.findById(id,(err,doc)=>{
        if (err) return res.status(400).send(err.message);
        else res.status(200).send(doc);
    })
})
app.get('/api/getBooks', (req, res) => {
    //localHost:3001/apo/Books?skip=3&limit=2&order=asc
    let skip=parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    //order=asc||desc
    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err.message);
        else res.status(200).send(doc);
    })
})

app.get('/api/getReviewer',(req,res)=>{
    let id=req.query.id;
    User.findById(id,(err,doc)=>{
           if (err) return res.status(400).send(err.message);
           res.json({
               name:doc.name,
               lastname:doc.lastname
           })
    })
})

app.get('/api/users', (req, res) => {
    //localHost:3001/apo/Books?skip=3&limit=2&order=asc
 
    let limit = parseInt(req.query.limit);
    
    //order=asc||desc
    User.find().limit(limit).exec((err, users) => {
        if (err) return res.status(400).send(err.message);
        else res.status(200).send(users);
    })
})

app.get('/api/user_post',(req,res)=>{
    Book.find({ownerId:req.query.id}).exec((err, docs) => {
        if (err) return res.status(400).send(err.message);
        else res.status(200).send(docs);
    })
})

// POST//
app.post('/api/book',(req,res)=>{
    // console.log(req.body)
    const book =new Book(req.body);

    book.save((err,doc)=>{
        if(err) return res.status(400).send(err.message);
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
})

app.post('/api/register',(req,res)=>{
    // console.log(req.body)
    const user=new User(req.body);
    user.save((err,doc)=>{
        if(err) {
            console.log(err)
            return res.json({success:false})};
            res.status(200).json({
            success:true,
            user:doc
        })
    })

})

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        //find user 
        if(!user) return res.json({isAuth:false,msg:'Auth failed.User does not exist'})
        //after finding user match pw
        user.comparePassword(req.body.password,(err,isMatch)=>{
            //if not matched
            if(!isMatch) return res.json({
                isAuth:false,msg:'Wrong Password'
            });
            //if match happens then generate token and save it as cookie
           user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);

            //seeting cookie in browser
            res.cookie('auth',user.token).json({
                isAuth: true,
                id:user._id,
                email:user.email
            });

           })
        })
        //
    })
})
// UPDATE //
app.post('/api/book_update',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if (err) return res.status(400).send(err.message);
        else res.status(200).send(doc);
    })
})


// DELETE//
app.delete('/api/delete_book', (req, res) => {
    let id = req.query._id;
    // console.log(id)

    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

const port=process.env.PORT||5000;
app.listen(port,()=>{console.log("server is running at ",port)})