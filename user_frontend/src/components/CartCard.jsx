import React,{useState,useEffect} from 'react'
import { useCart } from "react-use-cart";
import axios from 'axios';
import {backendApi} from '../common/Common';
import './CartCard.css';

export default function CartCard(props) {
  const {
    updateItemQuantity,
    removeItem,
    updateItem,
    isEmpty
  } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const {id,price,quantity}=props.passItem

  useEffect(() => {
    axios
      .get(`${backendApi}/products/${id}`)
      .then(res => {
        setProduct(res.data.result[0]);
        setIsLoading(false);
        if(price!=product.product_sell_cost){
          updateItem(`${id}`,{
            price:product.product_sell_cost
          })
        }
        return res;
      })
      .catch(err => console.error(err));
  }, [])
  
  if (isEmpty) return <p>Your cart is empty</p>;
  
  return (
    <div className='cart-cards'>
      {isLoading && <h2>Loading... </h2>}
      {product && 
        <div className='cart-card'>
          <div className='img'>
            <img width={100} src={product.product_img} alt=""/>
            <h3>{product.product_title}</h3>
          </div>
          <div className='button-text'>
            <div>
              <p>{product.product_sell_cost*quantity} tk</p>
            </div>
            <div className='button'>
              <button onClick={() => updateItemQuantity(id, quantity - 1)} disabled={quantity==1?true:false}>-</button>
              <span>{quantity}</span>            
              <button onClick={() => updateItemQuantity(id, quantity + 1)} disabled={quantity==10?true:false}>+</button>
              <button className='remove' onClick={() => removeItem(id)}><p>remove</p></button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
