import React,{useState,useEffect} from 'react'
import {backendApi} from '../common/common'
import axios from 'axios';
import './SiteText.css';

export default function SiteText() {
  const [isLoading, setIsLoading] = useState(true);
  const [siteTextId, setSiteTextId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [bkashNumber, setBkashNumber] = useState(null);
  const [helpNumber, setHelpNumber] = useState(null);
  const [topNote, setTopNote] = useState(null);
  const [footerText1, setFooterText1] = useState(null);
  const [footerText2, setFooterText2] = useState(null);
  const [fbLink, setFbLink] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const [siteLink, setSiteLink] = useState(null);
  const [alert,setAlert] = useState("");

  useEffect(() => {
    axios
      .get(`${backendApi}/site-text-admin`,{
        headers:{
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      .then(res => {
        const {site_text_id,order_number,bkash_number,help_number,top_note,footer_text1,footer_text2,fb_link,youtube_link,site_link}=res.data.result[0];

        setSiteTextId(site_text_id);
        setOrderNumber(order_number);
        setBkashNumber(bkash_number);
        setHelpNumber(help_number);
        setTopNote(top_note);
        setFooterText1(footer_text1);
        setFooterText2(footer_text2);
        setFbLink(fb_link);
        setYoutubeLink(youtube_link);
        setSiteLink(site_link);
        setIsLoading(false);
        return res;
      })
      .catch(err => console.error(err));
  }, [alert])

  const handleSiteTextUpdate=(e)=>{
    e.preventDefault();
    if(confirm("update text")){
      axios
        .put(`${backendApi}/site-text-admin/${siteTextId}`,{
          data:{
            orderNumber,
            bkashNumber,
            helpNumber,
            topNote,
            footerText1,
            footerText2,
            fbLink,
            youtubeLink,
            siteLink
          }
        },{
          headers:{
            'Authorization': `${sessionStorage.getItem('token')}`
          }
        })
        .then(res => {
          setAlert(res.data.alert);
          return res;
        })
        .catch(err => console.error(err));
    }
  }


  
  return (
    <div className='site-text'>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && 
      <div className='form'>
        <form onSubmit={handleSiteTextUpdate}>
          <div>
            <label>Order Number :</label>
            <input type="text" value={orderNumber} onChange={(e)=>setOrderNumber(e.target.value)}/>
          </div>
          <div>
            <label>Bkash Number :</label>
            <input type="text" value={bkashNumber} onChange={(e)=>setBkashNumber (e.target.value)}/>
          </div>
          <div>
            <label>Help Number :</label>
            <input type="text" value={helpNumber} onChange={(e)=>setHelpNumber(e.target.value)}/>
          </div>
          <div>
            <label>Top Note :</label>
            <input type="text" value={topNote} onChange={(e)=>setTopNote(e.target.value)}/>
          </div>
          <div>
            <label>Footer Text1 :</label>
            <textarea id="" cols="30" rows="5" value={footerText1} onChange={(e)=>setFooterText1(e.target.value)}></textarea>
          </div>
          <div>
            <label>Footer Text2 :</label>
            <textarea id="" cols="30" rows="5" value={footerText2} onChange={(e)=>setFooterText2(e.target.value)}></textarea>
          </div>
          <div>
            <label>FB Link :</label>
            <input type="text" value={fbLink} onChange={(e)=>setFbLink(e.target.value)}/>
          </div>
          <div>
            <label>Yputube Link :</label>
            <input type="text" value={youtubeLink} onChange={(e)=>setYoutubeLink(e.target.value)}/>
          </div>
          <div>
            <label>Site Link :</label>
            <input type="text" value={siteLink} onChange={(e)=>setSiteLink(e.target.value)}/>
          </div>
          <input type="submit" value="Update" />
        </form>
      </div>
      }
    </div>
  )
}
