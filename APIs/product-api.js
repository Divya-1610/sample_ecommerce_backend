import exp from 'express'
export const productApp=exp.Router()
import {productModel} from '../models/product-model.js'


//get all products
productApp.get('/products',async(req,res)=>{
    let products=await productModel.find()
    res.status(200).json({message:"product list:",payload:products})
})

//get products by id
productApp.get('/products/:id',async(req,res)=>{
    let product= await productModel.findById(req.params.id)
    res.status(200).json({message:"product found:",payload:product})

})
//to add a new product
productApp.post('/products',async(req,res)=>{
    let newproduct=req.body
    let productdoc= productModel(newproduct)
    await productdoc.save()
    res.status(201).json(productdoc)
})

//update product
productApp.put('/products/update/:id',async(req,res)=>{
    let pid=req.params.id
    let product= await productModel.findById(pid)
    if (!product)
        return res.status(404).json({message:"product not found",payload:product})
    let modifiedprod= req.body
    let updatedprod= await productModel.findByIdAndUpdate(pid,{$set:{...modifiedprod}},{new:true, runValidators:true})
    
    res.status(200).json({message:"product updated",payload:updatedprod})

})

//delete product
productApp.delete('/products/:id',async(req,res)=>{
    let delproduct= await productModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"product deleted",payload:delproduct})
})