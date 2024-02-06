const express = require('express')
const{PORT}=require('./config/server-config')
const app = express()
const bodyParser=require('body-parser')
const apiRoutes =require('./routes/index')
const db= require('./models/index')

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
    app.listen(PORT,async ()=>{
        console.log(`server startted on Port :${PORT}`);
        if(process.env.DB_SYNC){
         db.sequelize.sync({alter:true})   
        }

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(4);

        // u1.addRole(r1);

    })
 }

prepareAndStartserver();
