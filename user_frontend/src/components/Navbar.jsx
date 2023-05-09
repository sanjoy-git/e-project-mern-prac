import React,{useState} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { useCart } from "react-use-cart";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
// import { BsSearch } from "react-icons/bs";
import {backendApi} from '../common/Common'

export default function Navbar() {

  const [menuToggle, setMenuToggle] = useState(false);

  const {
    totalUniqueItems
  } = useCart();

  return (
    <div className='navbar'>
      <div className='nav-m'>
        <Link className='logo' to="/">
          {/* <h3>predictuse</h3>
          <small>shop</small> */}
          <img src={`${backendApi}/site-img/predictuse.png`} alt="" />
        </Link>

        <div className='menu' onMouseOver={()=>setMenuToggle(true)} onMouseLeave={()=>setMenuToggle(false)}>
          <button><BsList/></button>
          {menuToggle && 
            <nav className='toggle-nav'>
              <Link to="/home/all">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/blogs">Blog</Link>
            </nav>
          }
        </div>

        <nav className='nav'>
          <Link to="/home/all">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/blogs">Blog</Link>
        </nav>  
      </div>
      <div className='icons'>
        <Link to="/cart"><BsFillCartPlusFill/> <sup style={{color:'black',backgroundColor:'yellow',padding:'1px',borderRadius:'10px',fontWeight:"bold"}}>{totalUniqueItems}</sup></Link>
        <Link to="/orderCheck">Your_Order</Link>
        <Link to="/notification"><BsFillBellFill/></Link>
        <Link to="/orderCheck"><BsPersonLinesFill/></Link>
      </div>
    </div>
  )
}
