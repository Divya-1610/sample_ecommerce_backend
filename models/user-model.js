import {Schema,model} from 'mongoose'
import { type } from 'os'


// const cartSchema=new Schema({
//     product:{
//         type:Schema.Types.ObjectId,
//         ref:'product',
//     }
// })

const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true
        },

        quantity:{
            type:Number,
            default:1,
            min:1,
        },
        amount:{
            type:Number
        }
    
})
const userSchema=new Schema({
    username:{
        type:String,
        required: [true, "name is required"],
        minLength:4
    },
    email:{
        type:String,
        reqruired:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"enter password"],
    },
    cart:{
        type:[cartSchema]
    }
})

export const userModel=model("user",userSchema)