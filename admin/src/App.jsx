import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/sidebar/Sidebar'
import "./index.css"
import {Routes,Route} from "react-router-dom"
import List from './pages/List/List'
import Order from './pages/order/Order'
import Add from './pages/add/Add'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url = "http://localhost:8000/api/v1"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/order" element={<Order url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          
          
        </Routes>
      </div>


    </div>
  )
}

export default App