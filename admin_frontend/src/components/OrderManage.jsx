import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {backendApi} from '../common/common';
import'./OrderManage.css';
import OrderCard from '../components/OrderCard';

export default function OrderManage(props) {
  const [orders, setOrders] = useState([])
  const [alert,setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {prev,next,status}=props.passInfo;

  useEffect(() => {
    axios
      .get(`${backendApi}/order-manage/${props.passInfo.status}`,{
        headers:{
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      .then(res => {
        setOrders(res.data.result);
        return res;
      })
      .catch(err => console.error(err));
  }, [status,alert])

  const handleStatus=(id,Change)=>{
    if(Change=='deleteConfirm'){
      if(confirm(Change)){
        axios
          .delete(`${backendApi}/order-manage/${id}`,{
            headers:{
              'Authorization': `${sessionStorage.getItem('token')}`
            }
          })
          .then(res =>{
            setAlert(res.data.alert)
            return res;
          })
          .catch(err => console.error(err));
      }
    }
    else{
      if(confirm(Change)){
        axios
        .put(`${backendApi}/order-manage/status/${id}`,{
          data:{
            status:Change,
          }
        },{
            headers:{
              'Authorization': `${sessionStorage.getItem('token')}`
            }
          })
          .then(res => setAlert(res.data.alert))
          .catch(err => console.error(err));
      }
    }
  }


  return (
    <>
      <div className='order-manage'>
        {orders && orders.map((item,index)=>{
          const order=orders.length-index;
          const bgColor=(index%2==0)?'yellow':'orange';
          return(
            <div style={{order:order,backgroundColor:bgColor,borderRadius:'.5rem'}} key={item.order_id} className="per-order">
              <div className='order-person'>
                <p>Order Date: {item.order_date}</p>
                <p>Name : {item.name}</p>
                <p>Address : {item.address}</p>
                <p>Phone_NO : {item.phone_no}</p>
                <p>Total_amount : {item.total_amount}</p>
                <p>Advance_amount : {item.advance_amount}</p>
                <p>Bkash_TrxId : {item.bkashtrx_id}</p>
              </div>
              <div className='order-control-btn'>
                <button style={{cursor:'pointer'}} onClick={()=>handleStatus(item.order_id,prev)}>{prev}</button>
                <button style={{cursor:'pointer'}} onClick={()=>handleStatus(item.order_id,next)}>{next}</button>
              </div>
              <div className='order-cards'>
                {orders && JSON.parse(item.id_price_quantity).map(item=>{
                  return(
                      <OrderCard key={item.id} passItem={item}/>
                      )
                    })}
              </div>
              <hr />
            </div>
          ) 
        })}
      </div>
    </>
  )
}
