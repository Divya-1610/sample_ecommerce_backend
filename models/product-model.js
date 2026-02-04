import {Schema,model} from 'mongoose'

const productSchema=new Schema({
    productname:{
        type:String,
        required:[true,"enter product name"],
    },
    price:{
        type:Number,
        required:[true,"enter the price"],
        min:10
    },
    brand:{
        type:String,
        required:true
    },
    
})

export const productModel=model("product",productSchema)