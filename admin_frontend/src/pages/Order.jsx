import React from 'react'
import {Route,Routes} from 'react-router-dom';
import OrderManage from '../components/OrderManage'
import OrderNavbar from '../components/OrderNavbar';
import './Order.css'

export default function Order() {
  
  
  return (
    <div className='order'>
      <OrderNavbar/>
      <Routes>
        <Route path='/' element={<OrderManage passInfo={{prev:'delete',next:'confirm',status:'pending'}}/>}/>
        <Route path='/confirmOrder' element={<OrderManage passInfo={{prev:'pending',next:'delivering',status:'confirm'}}/>}/>
        <Route path='/deliveringOrder' element={<OrderManage passInfo={{prev:'cancle',next:'delivered',status:'delivering'}}/>}/>
        <Route path='/deliveredOrder' element={<OrderManage passInfo={{prev:'pending',next:'delete',status:'delivered'}}/>}/>
        <Route path='/cancelOrder' element={<OrderManage passInfo={{prev:'pending',next:'delete',status:'cancle'}}/>}/>
        <Route path='/deleteOrder' element={<OrderManage passInfo={{prev:'pending',next:'deleteConfirm',status:'delete'}}/>}/>
      </Routes>
    </div>
  )
}
