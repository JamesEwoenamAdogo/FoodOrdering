import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = ({url}) => {
    const [img, setImg]= useState(false)
    const [data,setData]= useState({
        name:" ",
        description:" ",
        price:" ",
        category:"Salad"
    })
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value= e.target.value;
        setData((prev)=>({...prev, [name]:value}))
        console.log(name,value)
        
    }
    useEffect(()=>{
        console.log(data)
    }),[data]
    
    const onSubmitHandler=  async (event)=>{
        event.preventDefault()
        const url="http://localhost:8000/api/v1"
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",img)

        const response = await axios.post(`${url}/add-food`, formData)
        if (response.data.success){
            setData({...{
                name:" ",
                description:" ",
                price:" ",
                category:"Salad"
            }

            })
            setImg(false)
            toast.success(response.data.message)

            

        }
        else{
            toast.error(response.data.message)
        }

    }
  return (
    <div className="add-list">
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p> Upload File</p>
                <label htmlFor="image">
                    <img src={img?URL.createObjectURL(img):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImg(e.target.files[0])}type="file" id="image" hidden required />

            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type Here"/>
               
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Type description"></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" id="">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Price" />


                    </div>



            </div>
            <button type='submit' className="add-button"> Add  </button>





        </form>



    </div>
  )
}

export default Add