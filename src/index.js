const express = require('express')
const{PORT}=require('./config/server-config')
const app = express()
const bodyParser=require('body-parser')
const apiRoutes =require('./routes/index')

const prepareAndStartserver =() =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    // app.use(express.json());

    app.use('/api',apiRoutes)

    app.get("/", (req,res)=>{
        res.json({
            message: "Success"
        })
    })
    app.listen(PORT,()=>{
        console.log(`server startted on Port :${PORT}`);
    })
 }

prepareAndStartserver();
