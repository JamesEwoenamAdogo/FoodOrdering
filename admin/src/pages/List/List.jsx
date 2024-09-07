import React, { useEffect, useState } from 'react'
import "./List.css"
import { toast } from 'react-toastify'
import axios from "axios"

const List = ({url}) => {
  const [list,setList] = useState([]);
  
  const image_url= "http://localhost:8000";
  
 

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/food-list`)
    console.log(response.data.data)
    
    if(response.data.success){
       setList(response.data.data)
      

    }
    else{
      toast.error("Error")
    }

    
    
  }
  const removeFoods= async(food_id)=>{
    const response = await axios.post(`${url}/remove-food`,{id:food_id})
    await fetchList()

  }
  useEffect(()=>{ fetchList()},[])

  return (
    <div className="list add flex-col">
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>

        </div>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className="list-table-format">
                <img src={`${image_url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>{removeFoods(item._id)} } className="cursor">X</p>
              </div>
            )

          })
        }
      </div>


    </div>
  )
}

export default List