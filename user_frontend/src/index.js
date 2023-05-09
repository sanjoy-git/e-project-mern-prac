import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import { CartProvider, useCart } from "react-use-cart";
import App from './App'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HashRouter>
    <CartProvider>
      <App/>
    </CartProvider>
  </HashRouter>
  // </React.StrictMode>
);