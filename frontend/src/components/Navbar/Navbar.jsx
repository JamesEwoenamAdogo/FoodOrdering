import React, { Profiler, useContext, useState } from 'react'
import "./navbar.css"
import { assets } from '../../assets/assets'
import {Link, useNavigate} from "react-router-dom"
// import decode_jwt  from "jwt-decode"
import { storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {
    const [menu, setmenu]= useState("Home")
    const {getTotalCartItems,token,setToken,username,setusername,setCartItems}= useContext(storeContext)
    const [alt,setalt]=useState(false)
    const navigate = useNavigate()
    localStorage.setItem("username",username)
    // const dotController = ()=>{
    //     let cartNumber =0;

    //     for(const item in cartItems){
    //         cartNumber+=cartItems[item]
    //     }
    //     const redDot = !cartNumber?"no-dot":"dot"
    //     return redDot
    // }
    const LogOut = async()=>{
        localStorage.removeItem("token")
        setToken("")
        setusername("")
        navigate("/")
        
        toast.success("Logout successful")

    }
  return (
    <div className='navbar'>
        <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>{setmenu("Home"),setalt(false)}} className={menu==="Home"?"active":""}>Home</Link>
            <a href="#explore-menu" onClick={()=>{setmenu("Menu")}} className={menu==="Menu"?"active":""}>{alt?"":"Menu"}</a>
            <a href="#app-downloads" onClick={()=>{setmenu("mobile-app")}} className={menu==="mobile-app"?"active":""}>{alt?"":"Mobile-app"}</a>
            <a href="#footer" onClick={()=>{setmenu("Contact-Us")}} className={menu==="Contact-Us"?"active":""}>{alt?"":"Contact-Us"}</a>
        </ul>
        <p style={{color:"tomato",fontWeight:"bolder",fontSize:"30px"}}>{localStorage.getItem("username")?`Welcome ${localStorage.getItem("username")}`:""}</p>
        <div className="navbar-right">
            {/* <img src={assets.search_icon} alt="" /> */}
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" onClick={()=>{setalt(true)}} /> </Link>
                {!token?<></>:<div className={!getTotalCartItems().totalItems?"":"dot"}><span>{!getTotalCartItems().totalItems?"":getTotalCartItems().totalItems}</span></div>}
            </div>
            {
                !token?<button onClick={()=>setShowLogin(true)}> Sign Up</button>:
                <div className="navbar-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul className="navbar-profile-dropdown">
                        <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={LogOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        
                    </ul>
                    <div>
                        
                    </div>
                    
                </div>
            }
            
        </div>
        


    </div>
  )
}


export default Navbar