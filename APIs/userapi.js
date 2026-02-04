import exp from 'express'
export const userAPP=exp.Router()
import {userModel} from '../models/user-model.js'
import {hash} from 'bcrypt'
import {productModel} from '../models/product-model.js'


//get all users--------------------
userAPP.get('/users',async(req,res)=>{
    let users=await userModel.find()
    res.status(200).json({message:"user list:",payload:users})
})

//get user by id--------------------
userAPP.get('/users/:id',async(req,res)=>{
    let userid=req.params.id
    let user=await userModel.findById(userid)
    if(!user)
        return res.status(404).json({message:"user not found"})
    res.status(200).json({message:"user found",payload:user})
})

//add a new user-------------------
userAPP.post('/users',async(req,res)=>{
    let newuser=req.body
    //validate
    await new userModel(newuser).validate()

    //hash pwd
    let hashedpwd = await hash(newuser.password,10)
    newuser.password=hashedpwd

    let userdoc=new userModel(newuser)
    await userdoc.save()
    res.status(201).json(userdoc)
})

//adding items to cart ------------------
userAPP.put("/user-cart/userid/:uid/productid/:pid",async(req,res)=>{
    let {uid,pid}=req.params
    let user=await userModel.findById(uid)

    if(!user)
        return res.status(404).json({message:"user not found"})
    let product=await productModel.findById(pid)

    if (!product)
        return res.status(404).json({message:"product not found"})
    

    //updating quantity if item already in cart
    for (let i=0;i<user.cart.length;i++){

        if (user.cart[i].product.toString() == pid)
            {
                let quantity = user.cart[i].quantity+=1
                user.cart[i].amount=quantity*product.price
                await user.save()
                return res.status(200).json({message:"item already in cart quantity updated",payload:user})
            }
        }

        // if item not in cart adding the item to the cart 
    let modifiedUser= await userModel.findByIdAndUpdate(
        uid,{$push:{cart:{product:pid}}},{new:true})
            
            res.status(200).json({message:"successfully modified",payload:modifiedUser})
    

})

//compare ids-------------
userAPP.get('/compare/:pid',async(req,res)=>{
    let productId= req.params.pid
    let product=  await productModel.findById(productId)
    
    //strict comparision (===) will also compare datatypes
    //(==) will only compare values
    // if (productId==product._id)
    //     console.log("equal")
    // else
    //     console.log("not equal")

    if (product._id.equals(productId))
        console.log("equal")
    else
        console.log("not equal")
})

//delete a user
userAPP.delete('/del/:id',async(req,res)=>{
    let uid=req.params.id
    let user=await userModel.findByIdAndDelete(uid)
    if(!user)
        return res.status(404).json("user not found")
    res.status(200).json({message:"user deleted:",payload:user})

})

//update user
userAPP.put('/update/:id',async(req,res)=>{
    let uid=req.params.id
    let user= await userModel.findById(uid)
    if (!user)
        return res.status(404).json({message:"user not found",payload:user})
    let modifieduser= req.body
    let updateduser= await userModel.findByIdAndUpdate(uid,{$set:{...modifieduser}},{new:true, runValidators:true})
    
    res.status(200).json({message:"user updated",payload:updateduser})

})