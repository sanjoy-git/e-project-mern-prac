import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CRUD from './pages/CRUD'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Order from './pages/Order'
import SiteText from './pages/SiteText'

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={(sessionStorage.getItem("login")=="success")?<CRUD/>:<Login/>}/>
        <Route path='/order/*' element={(sessionStorage.getItem("login")=="success")?<Order/>:<Login/>}/>
        <Route path='/sitetext' element={(sessionStorage.getItem("login")=="success")?<SiteText/>:<Login/>}/>
      </Routes>
    </div>
  )
}
