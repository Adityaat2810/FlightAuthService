const express = require('express')
const{PORT}=require('./config/server-config')
const app = express()

const prepareAndStartserver =() =>{
    app.listen(PORT,()=>{
        console.log(`server startted on Port :${PORT}`);
    })
}

prepareAndStartserver();
