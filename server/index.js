const express = require('express')
const app = express()
const port =process.env.Port  ||3000;
const mongoose= require('mongoose');
const router= require('./routes/router');
const authRouter=require('./routes/auth')
const connectDB= require('./db/connect');
const dotenv= require('dotenv');
dotenv.config();

app.use(express.json())
app.use('/api/v1/courses',router);
app.use('/api/v1/auth',authRouter);

{
    /**
     * mongoose.connect(process.env.ConnectionString,
{useNewUrlParser:true},
()=>{
    console.log('connected to Db');
})

     */
}

const start=async()=>{
    try {
await connectDB(process.env.ConnectionString)


     app.listen(port,console.log(`Server is listening on ${port}.....`))   
    } catch (error) {
        console.log(error)
    }
}


start()
