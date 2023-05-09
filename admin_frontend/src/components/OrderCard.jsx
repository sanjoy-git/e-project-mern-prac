import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './OrderCard.css';

import {backendApi} from '../common/common';

export default function OrderCard(props) {
  const {id,price,quantity}=props.passItem;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
    .get(`${backendApi}/rud/read/${id}`,{
      headers:{
        'Authorization': `${sessionStorage.getItem('token')}`
      }
    })
    .then(res => {
      setProduct(res.data.result[0]);
      setIsLoading(false);
      console.log(res)
      return res;
    })
    .catch(err => console.error(err));
  }, [])
  
  return (
    <div className='order-card'>
      {
        <div style={{textAlign:'center'}}>
          <img src={product.product_img} alt="" />
        </div>
      }
      <p>{product.product_title}</p>
      <p>{`${price} tk * ${quantity} = ${price*quantity} tk`}</p>
    </div>
  )
}
