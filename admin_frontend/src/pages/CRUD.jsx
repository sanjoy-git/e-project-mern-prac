import React,{useState,useEffect,useReducer} from 'react'
import axios from 'axios'
import {backendApi} from '../common/common'
import './CRUD.css'
import Card from '../components/Card'

const initialState={
  response:{},
  products:[],
  isLoading:true
}

const reducer=(state,action)=>{
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        response:action.payload,
        isLoading:true,
      }
    case 'SUCCESS':
      return {
        ...state,
        products:action.payload,
        isLoading:false,
      }
    default:
      throw new Error();
  }
}

export default function CRUD() {

  const [state, dispatch] = useReducer(reducer,initialState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendApi}/rud/read`,{
        headers:{
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      .then(res => {
        dispatch({type:"SUCCESS",payload:res.data});
        setLoading(false);
        return res;
      })
      .catch(err => console.error(err));
  }, [state.response.alert])


  const handleSubmit=(e)=>{
    e.preventDefault();
    const pCategory=document.querySelector('#p-category').value;
    const pImg=document.querySelector('#p-img').files;
    const pTitle=document.querySelector('#p-title').value;
    const pDec=document.querySelector('#p-dec').value;
    const pSize=document.querySelector('#p-size').value;
    const pMarketCost=document.querySelector('#p-m-cost').value;
    const pSellCost=document.querySelector('#p-s-cost').value;


    let formData = new FormData();

    formData.append("pCategory",pCategory);
    formData.append("img",pImg[0]);
    formData.append("pTitle",pTitle);
    formData.append("pDec",pDec);
    formData.append("pSize",pSize);
    formData.append("pMarketCost",pMarketCost);
    formData.append("pSellCost",pSellCost);

    if(confirm("Product Post")){
      setLoading(true);
      axios
        .post(`${backendApi}/cu`,formData,{
          headers:{
            'Authorization': `${sessionStorage.getItem('token')}`
          }
        })
        .then((res)=>{
          dispatch({type:"REQUEST",payload:res.data});
          return res;
        })
        .catch((err)=>console.log(err))
    }
  }

  const handleRemoveCard=(product_id,product_file_name)=>{
    if(confirm("Product Remove")){
      axios
      .delete(`${backendApi}/rud/delete/${product_id}`,{
        data:{
          fileName:product_file_name
        },
        headers:{
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      .then(res => {
        dispatch({type:"REQUEST",payload:res.data});
        return res;
      })
      .catch(err => console.error(err))
    }
  }

  const handleUpdateCard=(product_id,updateInfo)=>{
    if(confirm("Product Update")){
      axios
      .put(`${backendApi}/rud/update/${product_id}`,{data:updateInfo},{
        headers:{
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      .then(res => {
        dispatch({type:"REQUEST",payload:res.data});
        return res;
      })
      .catch(err => console.error(err))
    }
  }

  const handleFileChange=(product_id,product_file_name,file)=>{
    // console.log(product_id)
    // console.log(product_file_name)
    let formData = new FormData();
    formData.append("img",file[0]);
    formData.append("fileName",product_file_name);

    if(confirm("File Change")){
      axios
        .put(`${backendApi}/cu/${product_id}`,formData,{
          headers:{
            'Authorization': `${sessionStorage.getItem('token')}`
          }
        })
        .then((res)=>{
          dispatch({type:"REQUEST",payload:res.data});
          return res;
        })
        .catch((err)=>console.log(err))
    }
  }



  // const [focus, setFocus] = useState(2);

  // const handleFocus=(e)=>{
  //   e.preventDefault();
  //   if(focus>=2 && focus<=6){
  //     if(e.keyCode==40){
  //       setFocus(focus+1);
  //     }
  //     else if(e.keyCode==38){
  //       setFocus(focus-1);
  //     }
  //   }else{
  //     setFocus(2);
  //   }

  //   switch (focus) {  
  //     case 2:
  //       document.querySelector('#p-title').focus();
  //       break;
  //     case 3:
  //       document.querySelector('#p-dec').focus();
  //       break;
  //     case 4:
  //       document.querySelector('#p-size').focus();
  //       break;
  //     case 5:
  //       document.querySelector('#p-m-cost').focus();
  //       break;
  //     case 6:
  //       document.querySelector('#p-s-cost').focus();
  //       break;    
  //     default:
  //       break;
  //   }

  // }
   

  

  return (
    <div className='crud'>
      <form className='insert-form' onSubmit={handleSubmit}>
        <div>
          <label> Product Category</label>
          <select autoFocus id="p-category">
            <option value="cosmetics">Cosmetics</option>
            <option value="bodymassager">BodyMassager</option>
            <option value="garments">Garments</option>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
          </select>
        </div>
        <div>
          <label>File </label>
          <input style={{cursor:'pointer'}} type="file" id='p-img' required/>
        </div>
        <div>
          <label>Title </label>
          <input type="text" id="p-title" placeholder='product Title' required/>
        </div>
        <div>
          <label>Decription </label>
          <textarea id='p-dec' cols="40" rows="10" placeholder='product Decription' required></textarea>
        </div>
        <div>
          <label>Size </label>
          <input type="text" id="p-size" placeholder='prpdict Size'/>
        </div>
        <div>
          <label>Market Cost </label>
          <input type="number" id="p-m-cost" placeholder='product Market Cost' required/>
        </div>
        <div>
          <label>Sell Cost </label>
          <input type="number" id="p-s-cost" placeholder='product Sell Cost' required/>
        </div>
        <div>
          {/* <input type="submit" value="Add Product"/><br/> */}
          <button type='submit' disabled={loading}>{loading?<span>Loading</span>:<span>Add Products</span>}</button>
        </div>
      </form>
      <div className='cards'>
        {state.isLoading && <h1>Loading...</h1>}
        {(!state.isLoading && state.products[0]) && state.products.map(item=><Card key={item.product_id} product={item} passRemoveCard={handleRemoveCard} passUpdateCard={handleUpdateCard} passFileChenge={handleFileChange}/>)}
      </div>
    </div>
  )
}
