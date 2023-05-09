import React from 'react'
import './HomeSlider.css';
import Slider from "react-slick";

export default function HomeSlider(props) {
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='home-slider'>
      <Slider {...settings}>
        <div className='slide-1'>
          <h3>Call For Order : </h3>
          <p>{props.orderNumber}</p>
          <h4>Any Help : </h4>
          <p>{props.helpNumber}</p>
        </div>
        <div className='slide-2'>
          <h3>Call For Order : </h3>
          <p>{props.orderNumber}</p>
          <h4>Any Help : </h4>
          <p>{props.helpNumber}</p>
        </div>
      </Slider>
    </div>
  )
}
