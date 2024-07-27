const express = require ("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const ImageModel = require("./models/img")
const UserModel = require("./models/user")

const app = express();
app.use(express.json())
// app.use(express.static('public'))
app.use(cors());


mongoose.connect("mongodb://localhost:27017/mobigic");
app.post('/login',(req,res)=>{
    const {email,password}= req.body;
    UserModel.findOne({email:email})
    .then((user)=>{
        if(user) {
        if(user.password === password){
            res.json("success")
        } else{
            res.json("password incorrect")
      } } else {
res.json("data not found")
      } 
    })
})
app.post('/',(req,res)=>{
UserModel.create(req.body)
.then((one)=>res.json(one))
.catch((err)=>res.json(err))
})
// storing imges in backend

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
         cb(null, "../mobi/src/images")
    },
    filename: (req,file, cb)=> {
        const uniqueSuffix =Date.now();
 cb(null, uniqueSuffix + file.originalname);
    },
})
const upload = multer({storage:storage})
app.post('/upload',upload.single('image'),(req,res)=>{
    ImageModel.create({image: req.file.filename})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

app.get('/getImage',async(req,res)=>{
    try{ImageModel.find({})
    .then((data)=>{
        res.send({ status:"ok",data: data});
    })}
  catch(err){
    res.json({status : err})
  }
});


app.listen(3001,()=>{
    console.log("server is running");
})
