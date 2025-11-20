import React, { useEffect, useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import PageName from '../../assets/DesignComponent/PageName'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const OrdersViewById = () => {

  const { id } = useParams() // to fetch only the id from the url
  const [orderData, setOrderData] = useState([])

  const getData = async () => {
    const response = await axios.get('http://localhost:3000/OrdersData/' + id)
    setOrderData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <Header />
      <Sidebar />

      <main>
        <PageName pname="View Order by Id" />
        <div className='viewby-id-form'>
          <p><strong>Product ID: </strong>{orderData.id}</p>
          <p><strong>Product Name: </strong>{orderData.ProductName}</p>
          <p><strong>Buyer Name: </strong>{orderData.BuyerName}</p>
          <p><strong>Order Date: </strong>{orderData.OrderDate}</p>
          <p><strong>Payment Status: </strong>{orderData.PaymentStatus}</p>
          <p><strong>Order Status: </strong>{orderData.OrderStatus}</p>
        </div>        
        <div className='go-back-btn'>
          <Link to={'/orders'}>
            <button className='btn btn-success' type='button'>Go Back to Orders</button>
          </Link>
        </div>
      </main>
    </>
  )
}

export default OrdersViewById