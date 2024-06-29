//database connection starts here

//database connection ends here



//import statements
require('dotenv').config()
const cloudinary =require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'duw8iduep', 
  api_key: '876392824933795', 
  api_secret: 'Ggr6CB2pjwskFORCDQgciDie_Zc' 
});
require('./db')
const express = require('express')
const app = express()
const cookieparser =require('cookie-parser')
const cors=require('cors')
const path=require('path')
app.use(cookieparser({//set cookie settings
    secure: true,
    httpOnly: true,
    sameSite: 'none'
}))
app.use(cors({
    origin:true, // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));
  
app.use(express.static(path.join(__dirname,'public')))
const fileupload = require('express-fileupload')
const userRoutes = require('./routes/userRoutes')
const guideRoutes= require('./routes/guideRoutes')
const adminRoutes= require('./routes/adminRoutes')
const checkAuthStatus= require('./assets/authChecker')
const galleryRoutes= require('./routes/galleryRoutes')
const advertisementRoutes = require('./routes/advertisementRoutes')
const parser = require('body-parser')
const tripRoutes=require('./routes/tripRoutes')
const feedBackRoutes=require('./routes/feedBackRoutes')
app.use(fileupload({
    useTempFiles: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes defined here
app.post('/api/checkAuthStatus',checkAuthStatus)//general route handler to check authstatus
app.use("/api/user", userRoutes);
app.use("/api/guide", guideRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trips",tripRoutes)
app.use("/api/gallery",galleryRoutes)
app.use('/api/feedback',feedBackRoutes)
app.use("/api/advertisement",advertisementRoutes)
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("app listening at port 8000")
})