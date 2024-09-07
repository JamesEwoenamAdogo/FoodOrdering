import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
          {
              showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>
          }
          <div className="app">
            <ToastContainer/>
            <Navbar setShowLogin={setShowLogin}/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/order" element={<PlaceOrder/>}/>
            </Routes>
            <Footer/>
            


          </div>
    </>
  )
}

export default App