import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ProductNavbar from '../components/ProductNavbar'
import Products from '../components/Products'
import './Home.css';
import HomeSlider from '../components/HomeSlider';

export default function Home(props) {
  const {order_number,help_number}=props.passSiteTextHome;
  return (
    <div className='home'>
      <HomeSlider orderNumber={order_number} helpNumber={help_number}/>
      <ProductNavbar/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/:category' element={<Products/>}/>
      </Routes>      
    </div>
  )
}
