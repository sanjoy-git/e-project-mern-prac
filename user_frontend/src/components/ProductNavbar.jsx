import React from 'react'
import {NavLink} from 'react-router-dom'
import './ProductNavbar.css'

export default function ProductNavbar() {
  return (
    <div className='product-navbar'>
      <nav>
        <NavLink to="/home/all" activeClassName="active">All</NavLink>
        <NavLink to="/home/cosmetics" activeClassName="active">Cosmetics</NavLink>
        <NavLink to="/home/bodymassager" activeClassName="active">BodyMassager</NavLink>
        <NavLink to="/home/garments" activeClassName="active">Garments</NavLink>
        <NavLink to="/home/technology" activeClassName="active">Technology</NavLink>
        <NavLink to="/home/food" activeClassName="active">Food</NavLink>
      </nav>
    </div>
  )
}
