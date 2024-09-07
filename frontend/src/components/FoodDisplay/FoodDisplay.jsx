import React, { useContext } from 'react'
import "./FoodDisplay.css"
// import { food_list } from '../../assets/assets'
import { storeContext } from '../../context/storeContext'
import FoodItem from '../foodItem/foodItem'



const FoodDisplay = ({category}) => {

    const {foodlist}= useContext(storeContext)

  return (

    <div className='food-display' id='food-display'>
        <h2> Top Foods near you</h2>
        <div className="food-display-list">
            {
                foodlist.map((item,index)=>{
                    if(category==="All" || category===item.category)
                    return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
                
                })
            }
        </div>

    </div>
  )
}

export default FoodDisplay