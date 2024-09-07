import React, { useContext} from 'react'
import "./foodItem.css"
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/storeContext'

const foodItem = ({id,name,price,description,image}) => {
    // const [itemcount, setItemCount]= useState(0)
    const{url}= useContext(storeContext)
    const {addCartItems, removeCartItems,cartItems} = useContext(storeContext);
    // console.log(cartItems[id])
  return (
    <div className="food-Item">
        <div className="food-item-image-container">
            <img className="food-item-image" src={url+"/images/"+image} alt="" />
            { !cartItems[id]
                ? <img className="add" onClick={()=>addCartItems(id)} src={assets.add_icon_white} alt="" /> :
                <div className="food-item-counter">
                    <img src={assets.remove_icon_red} onClick={()=>removeCartItems(id)} alt="" />
                     <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>addCartItems(id)} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">
                
            GH₵{price}
            </p>
        </div>
        



    </div>
  )
}

export default foodItem