import exp from 'express'
import {connect} from 'mongoose'
import {userAPP} from './APIs/userapi.js'
import {productApp} from './APIs/product-api.js'

const app =exp()

async function connectDB(){
    try{
        await connect('mongodb://localhost:27017/ecommerce')
        console.log("connected to db")
        app.listen(6666,()=>console.log("listening on port 6666....."))

    }
    catch(e){
        console.log("error occured",e)
    }
}
connectDB()
app.use(exp.json())
app.use('/user-api',userAPP)
app.use('/product-api',productApp)