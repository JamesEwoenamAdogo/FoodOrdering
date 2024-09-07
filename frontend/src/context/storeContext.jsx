import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
// import { food_list } from "../assets/assets";

export const storeContext = createContext(null)


const StoreContextProvider = (props)=>{
    const [token, setToken]= useState("")
    const [cartItems, setCartItems] =useState({})
    const [food_list,setFood_list] = useState([])
    const url = "https://foodordering-c6ex.onrender.com"

    const addCartItems=async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){

            await axios.post(url+"/api/v1/add-cart",{itemId},{headers:{token}})
        }
    }
    const loadCartItems = async(token)=>{
        console.log(token)
        const response = await axios.get(url+"/api/v1/all-cart",{headers:{token}})
        setCartItems(response.data.cartItems)
        console.log(cartItems)
    }

    useEffect(()=>{
        async function loadData(){
            const response =await  axios.get(url+"/api/v1/food-list",)
            const foods = response.data.data
            setFood_list(foods)
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartItems(localStorage.getItem("token"))

            }
            

        }
        loadData()
        
    },[])

    const removeCartItems=async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/v1/remove",{itemId},{headers:{token}})
        }
    }
    
    const getTotalCartItems=()=>{
        
        let totalAmount =0;
        let totalItems=0;
        for(const items in cartItems){
            if(cartItems[items]>0){
            const itemInfo = food_list.find((product)=>items===product._id)
            totalAmount+=itemInfo.price*cartItems[items]
            totalItems+=cartItems[items]
            
        }
       
        

                
        }
        return {totalAmount,totalItems};
            
    }
    const[username,setusername]=useState("")


    useEffect(()=>{console.log(username)},[])
    const contextValue = {
        foodlist: food_list,
        cartItems,
        // setCartItems,
        addCartItems,
        removeCartItems,
        getTotalCartItems,
        url,
        token,
        setToken,
        setusername,
        username,
        setCartItems,
        loadCartItems




    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}

        </storeContext.Provider>
    )
}

export default StoreContextProvider
