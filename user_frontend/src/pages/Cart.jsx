import React from 'react'
import { useCart } from "react-use-cart";
import CartCard from '../components/CartCard';
import OrderForm from '../components/OrderForm';
import './Cart.css';

export default function Cart() {
  const {
    isEmpty,
    items,
    emptyCart
  } = useCart();
  

  // if (isEmpty) return <p>Your cart is empty</p>;
  return (
    <div className='cart'>
      <div className='cards-m'>
        <div className='cards'>
          {items && items.map((item,index)=>{
            let order=items.length-index;
            return(
              <div style={{order:order}}>
                <CartCard key={item.id} passItem={item}/>
              </div>
            )
          })}
        </div>
        <button onClick={()=>emptyCart()}>All Card Remove</button>        
      </div>
      <div className='form'>
        <OrderForm/>
      </div>      
    </div>
  )
}
