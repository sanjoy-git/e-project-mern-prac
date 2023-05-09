import React,{useState} from 'react'
import './Card.css';

export default function Card(props) {
  const {product,passRemoveCard,passUpdateCard,passFileChenge}=props
  const {product_id,product_category,product_file_name,product_img,product_title,product_dec,product_size,product_market_cost,product_sell_cost,product_status}=product

  const [isLoading, setIsLoading] = useState(true);
  const [textUpdate, setTextUpdate] = useState(false);
  const [fileUpdate, setFileUpdate] = useState(false);

  const [title, setTitle] = useState(product_title);
  const [category, setCategory] = useState(product_category);
  const [decription, setDecription] = useState(product_dec);
  const [size, setSize] = useState(product_size);
  const [marketCost, setMarketCost] = useState(product_market_cost);
  const [sellCost, setSellCost] = useState(product_sell_cost);
  const [status, setStatus] = useState(product_status);

  const handleFile=(e)=>{
    e.preventDefault();
    const pImg=document.querySelector('#img').files;
    passFileChenge(product_id,product_file_name,pImg);
  }

  const handleUpdatepass=(e)=>{
    e.preventDefault();
    const updataInfo={
      title,
      category,
      decription,
      size,
      marketCost,
      sellCost,
      status
    }
    passUpdateCard(product_id,updataInfo)
  }

  
  return (
    <div className='card'>
      {
        product &&
        <div>
          <img width={100} src={product_img} alt="" />
          <h2>{product_title}</h2>
          <h3>{product_sell_cost}</h3>
          <h4>{product_status}</h4>
        </div>
      }

      <button style={{cursor:'pointer'}} onClick={()=>setFileUpdate(!fileUpdate)}>{fileUpdate?"Image Change Off":"Image Change On"}</button>

      {
        fileUpdate && 
        <form className='file-change-form' onSubmit={handleFile}>
          <div>
            <label>File </label>
            <input type="file" id='img' required/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      }
 
      <button style={{cursor:'pointer'}} onClick={()=>setTextUpdate(!textUpdate)}>{textUpdate?"Edit Off":"Edit On"}</button>
      
      {
        textUpdate &&
        <form className='edit-form' onSubmit={handleUpdatepass}>
          <div>
            <label> Product Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="garments">Garments</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="technology">Technology</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div>
            <label>Title </label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='product Title' required/>
          </div>
          <div>
            <label>Decription </label>
            <textarea cols="40" rows="10" value={decription} onChange={(e)=>setDecription(e.target.value)}  placeholder='product Decription' required></textarea>
          </div>
          <div>
            <label>Size </label>
            <input type="text" value={size} onChange={(e)=>setSize(e.target.value)}  placeholder='prpdict Size'/>
          </div>
          <div>
            <label>Market Cost </label>
            <input type="number" value={marketCost} onChange={(e)=>setMarketCost(e.target.value)}  placeholder='product Market Cost' required/>
          </div>
          <div>
            <label>Sell Cost </label>
            <input type="number" value={sellCost} onChange={(e)=>setSellCost(e.target.value)} placeholder='product Sell Cost' required/>
          </div>
          <div>
            <label>Stock </label>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="stock">Stock</option>
              <option value="stockout">Stock_Out</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Update Product"/><br/>
          </div>
        </form>
      }

      <button className='remove' onClick={()=>passRemoveCard(product_id,product_file_name)} disabled={textUpdate?true:false}>Remove</button>

    </div>
  )
}
