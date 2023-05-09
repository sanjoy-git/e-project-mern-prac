import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ProductNavbar from '../components/ProductNavbar'
import Products from '../components/Products'
import './ProductsPage.css'

export default function ProductsPage() {
  return (
    <div className='product-page'>
      <Products/>
    </div>
  )
}
