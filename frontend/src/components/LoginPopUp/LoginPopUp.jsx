import React, { useContext, useEffect, useRef, useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/storeContext'
import axios from "axios"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPopUp = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Sign-Up")
    const {url,token,setToken,setusername,setCartItems,cartItems,loadCartItems,username} = useContext(storeContext)
    const [data,setData]= useState({
        name:"",
        email:"",
        password:"",
    })
    const [loginData, setLoginData]= useState({
        email:"",
        password:""
    })
    const [success,setSuccess]= useState(true)
    const[errorMessage,seterrorMessage]= useState("")
    const navigate = useNavigate()
    const[width,setWidth]=useState(0)
    const upddateWidth = useRef(null)
    
   
    const onChangeHandler= (event)=>{
        
        const name= event.target.name
        const value = event.target.value 
        setData((prev)=>({...prev,[name]:value}))
        
    }
    const onChangeHandlerLogin= (event)=>{
        
        const name= event.target.name
        const value = event.target.value 
        setLoginData((prev)=>({...prev,[name]:value}))
        
    }
    const handleLogin= async (event)=>{
        // const navigate = useNavigate()
        event.preventDefault()
        let newUrl = ""
        let response =""
        try{
            if(currState==="Login"){
                // document.getElementsByTagName("input").value=" " 
                newUrl = url+"/api/v1/login-user"
                response =  await axios.post(newUrl, loginData)
                setToken(response.data.token)
                localStorage.setItem("token",JSON.stringify(response.data.token))
            
                setLoginData({email:"", password:""})
                setShowLogin(false)
                const userDetails = jwtDecode(response.data.token)
                setusername(userDetails.name)
                localStorage.setItem("username", userDetails.name)
                console.log(userDetails)

                await loadCartItems(token)
                window.location.reload()
                console.log(cartItems)
                toast.success("Login Successful")
               
                
                console.log()
                
                
              
            }
            else if(currState==="Sign-Up"){
                newUrl= url+"/api/v1/register-user"
                response =  await axios.post(newUrl,data)
                console.log(data)
                if(response.data.success){
                    setCurrState("Login")                
                    setShowLogin(true)
                    setLoginData({email:"",password:""})
                    toast.success("Account created successfully")
                    seterrorMessage("")
                                       
                }
                
            }
            
           
           
        
        }catch(error){
            console.log(response.response)

            seterrorMessage(error.response.data.message)
            setSuccess(false)


        }
        
        


    }

    const updateWidthButton=()=>{
        if(upddateWidth.current){
            setWidth(upddateWidth.current.offsetWidth)
        }
    }
    const googleAuth = async (credentialResponse) => {
        // const navigate = useNavigate()
        try{
            const decode = jwtDecode(credentialResponse?.credential)
            console.log(decode);
            
            const response = await axios.post(url+"/api/v1/register-user-another-way",{name:`${decode.given_name} ${decode.family_name}`,email:decode.email})
            if(response.data.success){
                setToken(response.data.token)
                setusername(decode.given_name)
                localStorage.setItem("token",response.data.token)
                console.log(username)

                setShowLogin(false)
               
                await loadCartItems(localStorage.getItem("token"))
                // console.log(cartItems)
                toast.success("Login Successful")
                

            }
        }
        catch(error){
            console.log(error)
            seterrorMessage(error.response.data.message)
        }
    }
    useEffect(() => {
        updateWidthButton(); // Set initial width
        window.addEventListener('resize', updateWidthButton);
        return () => {
            window.removeEventListener('resize', updateWidthButton);
        };
    }, []);
    
  return (
    <div className="login-popUp">
        <form onSubmit={handleLogin} action="" className="login-popup-container">
           
            <div className="login-popUp-title">
                <h2>{currState}</h2>
                <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
                
                
            </div>
            
            <p style={{color:"red", textAlign:"center"}}>{`${errorMessage? errorMessage : " "}`}</p>    
            <div className="login-popup-input">
                {
                    currState==="Login"?<>

                    <input name="email" onChange={onChangeHandlerLogin}  value={loginData.email} type="email" placeholder='your email' required />
                    <input  name="password" onChange={onChangeHandlerLogin} value={loginData.password} type="password" placeholder="your password" required />
                    
                    </>:<>
                    <input name="name" onChange={onChangeHandler}  value={data.name} type="text" placeholder='your name' required  />
                    <input name="email" onChange={onChangeHandler}  value={data.email} type="email" placeholder='your email' required/>
                    <input  name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="your password" required  /> 
                    </>
    
                }
                
            </div>
            <button ref={upddateWidth} type='submit'>{currState=="Sign-Up"? "Create account":"Login"}</button>
          
            





            {currState==="Sign-Up"? 
                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>By clicking you have agreed to our terms and conditions</p>
                </div>:<></>
            }

            {
                currState==="Login"?
                <p>Create an account? <span onClick={()=> {setCurrState("Sign-Up");setData({name:"",email:"",password:""})}}>Click here</span></p>:
                <p>Already have an account? <span onClick={()=> setCurrState("Login")}> Click here</span></p>



            }
            
            
        </form>
        


    </div>
  )
}

export default LoginPopUp
