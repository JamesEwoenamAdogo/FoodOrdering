import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import dotenv from "dotenv"
dotenv.config();


// Login User

const createToken = async(id,name)=>{
    const Token_Secret = process.env.TOKEN_SECRET
    const token = jwt.sign({id,name}, Token_Secret)
    return token
}

export const RegisterUser = async(req,res)=>{
    try{
        const {name, password,email}= req.body;
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return res.status(404).json({success:false,message:"user already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(404).json({message:"wrong email format", success:false})
        }
        if(password.length<8){
            
            return res.status(400).json({message:"Password length is invalid: should be minimum of 8 characters",success:false})

        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name,
            password: hashedPassword,
            email
        })
        const user = await newUser.save()
        const token = await createToken(user._id,user.name)
        // console.log(user._id)
        return res.json({token,success:true})


    }catch(error){
        console.log(error)
        return res.json({success:false})

    }
}

export const LoginUser = async(req,res)=>{
    try{
        const {email,password}= req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"user does not exist"})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(400).json({success:false, message:"invalid credentials"})
        }
        const token = await createToken(user._id,user.name)
        // const cartData = user.cartData
        // let cartItems=0
        // for(item in cartData){
        //     cartItems+=cartData[item]
        // }
        
        
        
        return res.status(200).json({token:token,success:true,message:"login successful"})



    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
}

export const googleOauth= async(req,res)=>{
    try{
        const {email,name}= req.body
        const existing = await userModel.findOne({email})
        if(!existing){
            const hashedpassword = await bcrypt.hash(email,10)
            const user = await new userModel({
                name,email,password:hashedpassword
            })
            const newUser= await user.save()
            const token = jwt.sign({id:newUser._id,name,email} , process.env.TOKEN_SECRET)
            res.status(200).json({token,success:true})
           
        }
        const token = jwt.sign({id:existing._id,name,email} , process.env.TOKEN_SECRET)
        res.status(200).json({token,success:true})

        

        

        

        

    }catch(error){
        res.status(500).json({message:"Error"})
        console.log(error)
    }

}