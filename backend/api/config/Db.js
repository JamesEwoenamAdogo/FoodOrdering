import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://jamesadogo8:James10001000@cluster0.8b1mhgn.mongodb.net/food-ordering").then(()=>{console.log("Database connected")})
}