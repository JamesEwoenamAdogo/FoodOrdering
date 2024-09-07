import React, { useContext } from 'react'
import "./Cart.css"
import { storeContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  
  const {cartItems, foodlist, removeCartItems,getTotalCartItems,url} = useContext(storeContext)
  const navigate = useNavigate()
  return (
    <div className="cart">
        <div className="cartItems">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
            <br />
            <hr />
            {
              foodlist.map((item,index)=>{
                if(cartItems[item._id]>0){
                  return (
                  <div>
                      <div className='cart-items-title cart-items-item'>
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>${cartItems[item._id]*item.price}</p>
                        <p onClick={()=>removeCartItems(item._id)} className="cross">x</p>



                      </div>
                      <hr/>
                  </div>)
                }
              })
            }

          
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartItems().totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{!getTotalCartItems()?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{!getTotalCartItems()?0:getTotalCartItems().totalAmount + 2}</p>
            </div>
            { !getTotalCartItems()?<></>:
              <button onClick={()=>{navigate("/order")}}>PROCEED TO CHECKOUT</button>

            }
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo code' />
                <button>SUBMIT</button>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Cart