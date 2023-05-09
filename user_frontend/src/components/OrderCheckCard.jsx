import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './OrderCheckCard.css';

import {backendApi} from '../common/Common';

export default function OrderCheckCard(props) {

  const {id,price,quantity}=props.passItem;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({})

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

  return (
    <div className='order-check-card'>
      {isLoading && <h1>Loading...</h1>}
      {product && 
        <div>
          <img width={100} src={product.product_img} alt="" />
        </div>
      }
    </div>
  )
}
