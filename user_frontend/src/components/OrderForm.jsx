import React,{useState,useEffect} from 'react'
import { useCart } from "react-use-cart";
import './OrderForm.css';
import axios from 'axios';
import {backendApi} from '../common/Common'

export default function OrderForm() {
  const {
    isEmpty,
    items,
    emptyCart
  } = useCart();

  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("Please add to cart and order....");
  const [orderProducts, setOrderProducts] = useState("");

  useEffect(() => {
    setTotalAmount(0);
    items && items.map(item=>{
      setTotalAmount(pre=>pre+item.price*item.quantity);
    })
  }, [items]);

  

  const orderConform=(e)=>{
    e.preventDefault();
    
    const name=document.getElementById('name').value;
    const address=document.getElementById('address').value;
    const phoneNo=document.getElementById('phoneno').value;
    const advanceAmount=document.getElementById('advance-amount').value;
    const bkashtrxId=document.getElementById('bkashtrxid').value;

    setOrderProducts("");

    const orderData={
      name,
      address,
      phoneNo,
      totalAmount,
      advanceAmount,
      bkashtrxId,
      cartProducts:JSON.stringify(items),
    }

    if(confirm('Order Conform')){
      axios
      .post(`${backendApi}/order`,{
        data:orderData
      })
      .then(res => {
        setMessage(res.data.message);
        if(res){
          emptyCart();
        }
        return res
      })
      .catch(err => console.error(err));
    }
  }

  if (isEmpty) return <p>{message}</p>;
  
  return (
    <div className='order-form'>
      <form className='order-submit' onSubmit={orderConform}>
        <div>
          <label>Name : </label>
          <input type="text" id="name" placeholder='Enter your name' required/>
        </div>

        <div>
          <label>Address : <mark>Big Bazar, Thana , jella</mark></label>
          <input type="text" id="address" placeholder='Big Bazar, Thana , jella'  required/>
        </div>

        <div>
          <label>Phone No : </label>
          <input type="number" id="phoneno" placeholder='Enter your phone no' required/>
        </div>

        <div>
          <label>Advance : </label>
          <input type="number" id="advance-amount" placeholder='Order conform for advance' required/>
        </div>

        <div>
          <label>Bkash TrxId : </label>
          <input type="text" id="bkashtrxid" placeholder='Enter your bkash trxid' required/>
        </div>

        <div className='total-amount'>
          <mark style={{fontSize:'large'}}>Total : {totalAmount} tk</mark>          
        </div> 
        <div>
          <input type="submit" value="Order Conform"/>
        </div>
        <div>
          <p className='message'>{(message=="Please add to cart and order....")? "" : <h3>{message}</h3>}</p>
        </div>
      </form>
    </div>
  )
}
