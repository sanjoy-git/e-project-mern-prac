import React,{useState} from 'react'
import {NavLink} from "react-router-dom";
import { useCart } from "react-use-cart";
import './Card.css';

export default function Card(props) {
  const [quantity, setQuantity] = useState(1);
  const { addItem,items } = useCart();

  const addtocart=(id,price)=>{
    if(confirm('add card')){
      addItem({id,price},quantity);
    }
  }

  const {product_id:id,product_title:name,product_market_cost,product_sell_cost:price,product_img:img,product_status}=props.passProduct;
  return (
    <div className='card'>
      <div className='image'>
        <NavLink to={`/details/${id}`}><img src={img} alt="" /></NavLink>
      </div>
      <h4>{name}</h4>
      <h4><span style={{color:'#27ae60'}}>{price*quantity} tk </span><del style={{color:'#c0392b'}}>{product_market_cost*quantity} tk</del></h4>
      {(items.find(r=>r.id==id))?
      <>
        <div className='quantity'>
          <button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}} disabled>-</button><span>{(items.filter(i=>i.id==id))[0].quantity}</span><button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}} disabled>+</button>
        </div>
        <button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}}>Already Cart</button>
      </>:<>
        {(product_status=='stockout')?<>
          <div className='quantity'>
            <button style={{backgroundColor:'#c0392b',color:'#2c3e50'}} disabled>-</button><span>{quantity}</span><button style={{backgroundColor:'#c0392b',color:'#2c3e50'}} disabled>+</button>
          </div>
          <button style={{backgroundColor:'#c0392b',color:'#2c3e50'}}>{product_status}</button>
        </>:<>
          <div className='quantity'>
            <button onClick={()=>setQuantity(quantity-1)} disabled={quantity==1?true:false}>-</button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)} disabled={quantity==10?true:false}>+</button>
          </div>
          <button onClick={()=>addtocart(id,price)}>Add to cart</button>
        </>}
      </>}
      <hr />
    </div>
  )
}

