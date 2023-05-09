import React from 'react'
import { IoLogoFacebook,IoLogoTwitter,IoLogoGoogle,IoIosGift,IoIosLink,IoMdCart } from "react-icons/io"
import './Footer.css'

export default function Footer(props) {
  const {footer_text1,footer_text2,fb_link}=props.passSiteText;
  return (
    <div className='footer'>
      
      <div className='icons'>
        <a href={fb_link} target="_">
          <IoLogoFacebook/>
        </a>
        <IoLogoTwitter/>
        <a href={fb_link} target="_">
          <IoLogoGoogle/>
        </a>
        <IoIosGift/>
      </div><br />

      <div className='text'>
        <p>{footer_text2}</p>
      </div><br />

      <div className='text'>
        <p><h4>Any Help :</h4> support@predictuse.com</p>
      </div><br />

      <div className='develop'>
        <a href={footer_text1} target="_">Predictuse Development Team</a>
        {/* <p>{footer_text1}</p> */}
      </div>
    </div>
  )
}