import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useCart } from "react-use-cart";
import ReactImageZoom from 'react-image-zoom';

import {backendApi} from "../common/Common";
import './CardDetails.css'

export default function CardDetails() {

  const [quantity, setQuantity] = useState(1);
  const { addItem,items } = useCart();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});


  useEffect(() => {
    axios
      .get(`${backendApi}/products/${id}`)
      .then(res => {
        setProduct(res.data.result[0]);
        setIsLoading(false);
        return res;
      })
      .catch(err => console.error(err));
  }, [])


  const addtocart=(id,price)=>{
    if(confirm('add card')){
      addItem({id,price},quantity);
    }
  }
  
  return (
    <div className='card-details'>
      {isLoading && <h2>Loading ...</h2>}
      {product && 
        <div className='card-details-in'>
          <div className='image'>
            {product.product_img && <ReactImageZoom {...{width:200,scale:1,zoomPosition:'bottom',img:product.product_img}}/>}
          </div>
          <div className='description'>
            {(items.find(r=>r.id==id))?<>
              <div className='quantity'>
                <button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}} disabled>-</button><span>{(items.filter(i=>i.id==id))[0].quantity}</span><button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}} disabled>+</button>
              </div>
              <div>
                <button style={{backgroundColor:'#FFDE03',color:'#2c3e50'}}>Already Cart</button>
              </div>
            </>:<>
              {(product.product_status=='stockout')?<>
                <div className='quantity'>
                  <button style={{backgroundColor:'#c0392b',color:'#2c3e50'}} disabled>-</button><span>{quantity}</span><button style={{backgroundColor:'#c0392b',color:'#2c3e50'}} disabled>+</button>
                </div>
                <div>
                  <button style={{backgroundColor:'#c0392b',color:'#2c3e50'}}>{product.product_status}</button>
                </div>
              </>:<>              
                <div className='quantity'>
                  <button onClick={()=>setQuantity(quantity-1)} disabled={quantity==1?true:false}>-</button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)} disabled={quantity==10?true:false}>+</button>
                </div>
                <div className='add-cart'>
                  <button onClick={()=>addtocart(product.product_id,product.product_sell_cost)}>Add to cart</button>
                </div>
              </>}
            </>}
            <div className="main-text">
              <h3><span style={{color:'#27ae60'}}>{product.product_sell_cost * quantity} tk </span><del>{product.product_market_cost * quantity} tk</del></h3>
              <hr />
              <h2>{product.product_title}</h2>
              <span>{product.product_size}</span>
            </div>
            <hr />
            <div className="dec">
              <h3>Product Decription</h3>
              <div>
                {product.product_dec}
              </div>
            </div> 
          </div>
        </div>
      }  
    </div>
  )
}
