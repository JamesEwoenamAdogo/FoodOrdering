import { userModel } from "../models/userModel.js";


export const addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        console.log(userData.cartData)
        let cartData = await userData.cartData

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.status(200).json({success:true,message:"cart added successfully"})

    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"error"})

    }

}



export const removeFromCart= async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
            
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.status(200).json({success:true, message:"Removed from cart"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"error"})

    }

}

export const getCart = async (req,res)=>{
    
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData

        res.status(200).json({cartItems: cartData, success:true})
        

    }catch(error){
        console.log(error)
        res.status(500).json({sucess:false})
    }
    

}

