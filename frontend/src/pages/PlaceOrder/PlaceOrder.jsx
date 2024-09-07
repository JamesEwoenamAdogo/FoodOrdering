import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { storeContext } from '../../context/storeContext'
import axios from 'axios'
// import dotenv from "dotenv"
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify'
// import jwt_decode from "jwt-decode"
// dotenv.config()

const config = {
  reference: (new Date()).getTime().toString(),
  email: "jamesadogo8@gmail.com",
  amount: 10, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: "pk_test_6de475727ef5e6daafff1ac640a65a76bffd00c5",
  currency:"ghs"
  
};

// you can call this function anything
const onSuccess = (reference) => {
// Implementation for whatever you want to do with reference and after success call.
toast.success("Payment Successful")

console.log(reference);
};

// you can call this function anything
const onClose = () => {
// implementation for  whatever you want to do when the Paystack dialog closed.
toast.error("Closed")
console.log('closed')
}

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
        <button onClick={() => {
            initializePayment(onSuccess, onClose)
        }}>PROCED TO CHECKOUT </button>
    </div>
  );
};

const PlaceOrder = () => {
  const {getTotalCartItems,token,foodlist,cartItems,url}= useContext(storeContext)
  const [data,setData]=useState({
    fullName:"",
    location:"",
    phone:""
  })
  const placeOrder = async(event)=>{
    event.preventDefault()
    let orderItems=[]
    foodlist.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo["quantity"]= cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address: data,
      items:orderItems,
      amount: getTotalCartItems().totalAmount+2
    }
    const response = await axios.post(url+"/api/v1/place-order",orderData,{headers:{token}})
    if(response.data.success){

      
      
    }
    else{
      toast.error("Error")
    }

    
  }
  useEffect(()=>{console.log(data)},[data])

  const onChangeHandler= async(event)=>{
    const name= event.target.name
    const value = event.target.value
    setData((data)=>({...data,[name]:value}))

  }
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='fullName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder="Full Name" />
          {/* <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last Name" /> */}
        </div>
        {/* <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address' /> */}
        {/* <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street Address' /> */}
        <div className="multi-fields">
          <input required name="location" value={data.city} onChange={onChangeHandler} type="text" placeholder="location" />
          {/* <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" /> */}
        </div>
        <div className="multi-fields">
          {/* <input required name="zipCode" value={data.zipCode} onChange={onChangeHandler} type="text" placeholder="Zip-Code" /> */}
          {/* <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" /> */}
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone Number' />



      </div>
      <div className="place-order-right">
        <div className="cart-total">
              <h2>Cart Total</h2>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartItems().totalAmount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery</p>
                <p>{!getTotalCartItems().totalAmount?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>{!getTotalCartItems().totalAmount?0:getTotalCartItems().totalAmount + 2}</p>
              </div>
          </div>
          {
            data.fullName&&data.phone&&data.location?<PaystackHookExample/>:""


          }
          
          {/* <button type="submit" >PROCEED TO CHECKOUT</button> */}




      </div>


    </form>
  )
}

export default PlaceOrder