import React, { useContext, useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownloads from '../../components/AppDownloads/AppDownloads'
import { storeContext } from '../../context/storeContext'


const Home = () => {

  const [category, setCategory]= useState("All")
  // const {token}= useContext(storeContext)
  // if(token){
  //   window.location.reload()
  // }
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownloads/>
      
      
      
    </div>
  )
}

export default Home
