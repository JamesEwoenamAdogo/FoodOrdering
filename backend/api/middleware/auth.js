import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const authMiddleware = async(req,res,next)=>{
    try{
        const {token} = req.headers
        if(!token){
            res.status(400).json({success:false,message:"token not provided"})
        }
        const token_decoded=  jwt.verify(token, process.env.TOKEN_SECRET)
        req.body.userId= token_decoded.id
        next()
    }catch(error){
        console.log(error)
    }
}