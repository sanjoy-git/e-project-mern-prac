import React from 'react'
import {NavLink} from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='page-not-found' style={{textAlign:'center'}}>
      <h2>Page Not Found</h2>
      <NavLink to="/">Go Home</NavLink>
    </div>
  )
}
