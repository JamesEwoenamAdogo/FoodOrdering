import { food_Model } from "../models/foodModel.js"
import fs from "fs"




export const addFood = async(req,res)=>{

    try{

        const image_filename = `${req.file.filename}`
        
        const {name,description,price,category}= req.body
        const food = new food_Model({
            name,description,price,category,image:image_filename
        })
        await food.save()
        return res.status(200).json({message:"food added succesfully",success:true})



    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})

    }
   
}

export const listFoods= async(req,res)=>{
    try{
        const foods = await food_Model.find({})
        res.status(200).json({data:foods,success:true})
    }catch(error){
        console.log(error)
        res.staus(500).json({message:"error"})
    }
    
}
export const removeFood= async(req,res)=>{
    try{
        const food = await food_Model.findById(req.body.id)
        console.log(food)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await food_Model.findByIdAndDelete(req.body.id)
        res.status(200).json({message:"deleted successfully"})


    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
        
    }
}