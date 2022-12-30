const express = require('express')
const app = express()
const port = 5000
const dotenv=require('dotenv')
const bp=require("body-parser")
const { urlencoded } = require('body-parser')
const cors=require("cors")
const Jimp =require("jimp")
const cloudinary=require('cloudinary').v2
const axios=require("axios")

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})  

app.use(bp.json({limit:'5mb'}))
app.use(bp.urlencoded({limit:'5mb',extended:true}))
app.use(cors({origin:"http://localhost:3000"}))
app.use(express.static('public'));


app.post('/', async (req, res) => {
try{
  const data={
    width:req.body.width,
    height:req.body.height,
    crop:"scale",
    api_key:process.env.API_KEY,
    folder:"image resize"
  }
    // Upload the image
    const  resp = await cloudinary.uploader.upload(req.body.file, data);
  
  if(resp){res.status(200).json({"success":true,"message":resp.secure_url})}
}catch(e){console.log(e.message)}
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})