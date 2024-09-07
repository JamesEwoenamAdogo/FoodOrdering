import { orderModel } from "../models/Order.js";
import { userModel } from "../models/userModel.js";
import Paystack from "paystack";
// import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()
// Require the library

const paystack = Paystack("secret_key")
export const placeOrder = async(req,res)=>{
  try{
    const {item, address, amount}=req.body;
    const newOrder = new orderModel({
      userId: req.body.userId,
      item:item,
      address:address,
      amount:amount

    })
    newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
    paystack.plan.create({
      name: "Food Payment",
      amount: amount,
      interval: 'monthly'
    })
      .then(function(error, body) {
         console.log(error);
        console.log(body);
      });
    paystack.plan.create({
      name: "Delivery",
      amount: 2,
      interval: 'monthly'
    })
      .then(function(error, body) {
         console.log(error);
        console.log(body);
      });
    
    res.status(201).json({success:true, message:"Payment successful"})


  }catch(error){

    console.log(error)
    res.status(500).json({message:"Error"})
  }

    

}








































// const stripe = new Stripe(process.env.STRIPE_KEY)

// export const placeOrder = async(req,res)=>{
//     try{
//         const frontend_Url = `http://localhost:8000/5173`
//         const newOrder= new orderModel({
//             userId:req.body.userId,
//             item:req.body.items,
//             amount: req.body.amount,
//             address: req.body.address
//         })
//         await newOrder.save()
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"USD",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price,
//             },
//             quantity:item.quantity
//         }
//         ))

//         line_items.push({
//             price_data:{
//                 currency:"USD",
//                 product_data:{
//                     name:"Delivery"
//                 },
//                 unit_amount:5*15,
                
//             },
//             quantity:1
//         })
//         const session= await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:"payment",
//             success_url: `${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_Url}/verify?success=false&orderId=${newOrder._id}`
//         })
//         res.status(200).json({success:true, success_url:session.url})

//     }catch(error){
//         console.log(error)
//         res.status(500).json({success:false,message:error})

//     }
// }

