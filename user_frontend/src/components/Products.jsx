import React,{useState,useEffect,Suspense} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

import {backendApi} from "../common/Common";
import Card from './Card';
import './Products.css'


export default function Products() {
  const { category } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([])


  useEffect(() => {
    axios
      .get(`${backendApi}/products/category/${category?category:"all"}`,{
        // headers:{
        //   'Authorization': `${sessionStorage.getItem('')}`
        // }
      })
      .then(res => {
        setProducts(res.data);
        setIsLoading(false);
        // console.log(res.data)
        return res;
      })
      .catch(err => console.error(err));
  }, [category])

  // console.log(category)
  return (
    <div className='products'>
      {isLoading && <h2>Loading ... </h2>}
      <Suspense fallback={<h2>Loading ... </h2>}>
        {products && products.map((item,index)=>{
            let order=products.length-index;
            return(
              <div style={{order:order}} key={item.product_id}>
                <Card passProduct={item}/>
              </div>
            )
          })}  
      </Suspense>
    </div>
  )
}
