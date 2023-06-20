import React,{useState,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderCheck from './pages/OrderCheck'
import Navbar from './components/Navbar'
import CardDatails from './components/CardDetails'
import {backendApi} from './common/Common';
import axios from 'axios';
import Footer from './components/Footer'
import './App.css'
import ProductsPage from './pages/ProductsPage'
import Offers from './components/Offers'
import Blogs from './components/Blogs'
import PageNotFound from './components/PageNotFound'
import Notification from './components/Notification'

export default function App() {
  const [siteText, setSiteText] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${backendApi}/siteText`)
      .then(res => {
        setSiteText(res.data.result[0]);
        setIsLoading(false);
        return res;
      })
      .catch(err => console.error(err));
  }, [])
  
  return (
    <div className='app'>
      {isLoading && <h2>Loading...</h2>}
      {siteText && 
        <div>
          <div style={{ width:'100%',position:'fixed', top:'0px', zIndex:'100'}}>
            <Navbar/>
          </div>
          <div style={{marginTop:'50px'}}>
            <Routes>
              <Route path='/offers' element={<Offers/>}/>
              <Route path='/blogs' element={<Blogs/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/orderCheck' element={<OrderCheck/>}/>
              <Route path='/notification' element={<Notification/>}/>
              <Route path='/details/:id' element={<CardDatails/>}/>
              <Route path='/products' element={<ProductsPage/>}/>
              <Route path='/home/*' element={<Home passSiteTextHome={siteText}/>}/>
              <Route path='/' element={<Home passSiteTextHome={siteText}/>}/>
              {/* <Route path='/home'>
                <Home passSiteTextHome={siteText}/>
              </Route> */}
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          </div>
          <Footer passSiteText={siteText}/>
        </div>      
      }
    </div>
  )
}
