import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {

  const handleLogOut=()=>{
    if(confirm('logout conform')){
      // sessionStorage.removeItem("login");
      sessionStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className='navbar'>
      <nav>
        <NavLink className="link" to='/'><h3><span>predictuse</span><br /><span>Shop(Admin)</span></h3></NavLink>
        <NavLink className="link" to='/order'>Order</NavLink>
        <NavLink className="link" to='/sitetext'>SiteText</NavLink>
        <button className="link" onClick={handleLogOut}>{(sessionStorage.getItem("login")=="success")?<span>LOGOUT</span>:<span>Login</span>}</button>
      </nav>
    </div>
  )
}
