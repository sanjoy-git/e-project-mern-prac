import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom';
import './OrderNavbar.css';
import axios from 'axios';
import {backendApi} from '../common/common';
// import { BsFillArrowLeftCircleFill } from "react-icons/bs";
// import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function OrderNavbar() {
  const notifyArray=["pending","confirm","delivering","delivered","cancle","delete"];
  const [pending, setPending] = useState(0);
  const [confirm, setConfirm] = useState(0);
  const [delivering, setDelivering] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [cancle, setCancle] = useState(0);
  const [delete1, setDelete1] = useState(0);
  
  return (
    <div className='order-navbar'>
      <NavLink to="">pendingOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
      <NavLink to="confirmOrder">confirmOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
      <NavLink to="deliveringOrder">deliveringOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
      <NavLink to="deliveredOrder">deliveredOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
      <NavLink to="cancelOrder">cancelOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
      <NavLink to="deleteOrder">deleteOrder <sup style={{color:'yellow',backgroundColor:'black',borderRadius:'1rem'}}>*</sup></NavLink>
    </div>
  )
}
