import React from 'react'
import { assets } from '../../assets/assets'
import "./AppDownloads.css"

const AppDownloads = () => {
  return (
    <div className="app-downloads" id="app-downloads">
        <p>For Better Exprerience, Download the mobile Application <br /> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
            
        </div>


    </div>
  )
}

export default AppDownloads

