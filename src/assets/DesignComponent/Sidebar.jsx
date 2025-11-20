import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const name = sessionStorage.getItem('name')

  return (
    <>
      <nav>
        <div className='sidebar-first-section'>
          <p>Hi {name ? name : "Admin"}</p>
        </div>
        <div className='sidebar-second-section'>
          <ul>
            <li><a href="/">Home <i className='fa fa-home sideicons'></i></a></li>
            {name ?
            <>
            <li><a href="/view">Products <i className='fa fa-right-long sideicons'></i></a></li>
            <li><a href="/shipment">Shipment <i className='fa fa-right-long sideicons'></i></a></li>
            <li><a href="/orders">Orders <i className='fa fa-right-long sideicons'></i></a></li>
            <li><a href="/buyers">Buyers <i className='fa fa-right-long sideicons'></i></a></li>
            <li><a href="/sellers">Sellers <i className='fa fa-right-long sideicons'></i></a></li>
            <li><a href="/admin">Admin<i className='fa fa-right-long sideicons'></i></a></li>
            </>
            : null }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar