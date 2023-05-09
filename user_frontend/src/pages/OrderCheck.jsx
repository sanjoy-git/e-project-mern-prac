import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {backendApi} from "../common/Common";
import OrderCheckCard from '../components/OrderCheckCard';
import './OrderCheck.css';

export default function OrderCheck() {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch=(e)=>{
    e.preventDefault();
    const phoneNo=document.querySelector('#phone-no').value;
    setIsLoading(true);
    axios
      .get(`${backendApi}/orderSearch/${phoneNo}`)
      .then(res => {
        setOrders(res.data.result);
        setIsLoading(false);
        return res;
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='order-check'>
      <form onSubmit={handleSearch}>
        <input type="search" name="" id="phone-no" placeholder='Enter your phone no then order check'/>
        <input type="submit" value="Search"/>
      </form>
      <div className='order-items'>
        {isLoading && <h2>Loading...</h2>}
        {orders && orders.map(item=>{
          return(
            <div key={item.order_id} className="order-item">
              <div>
                <p>Order Date: {item.order_date}</p>
                <p>Name : {item.name}</p>
                <p>Address : {item.address}</p>
                <p>Phone_NO : {item.phone_no}</p>
                <p>Total_amount : {item.total_amount}</p>
                <p>Advance_amount : {item.advance_amount}</p>
                <p>Order status: {item.status}</p>
              </div>
              <div className='card-m'>
              {item && JSON.parse(item.id_price_quantity).map(i=>{
                return(
                    <OrderCheckCard key={i.id} passItem={i}/>
                    )
                  })}
            </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
