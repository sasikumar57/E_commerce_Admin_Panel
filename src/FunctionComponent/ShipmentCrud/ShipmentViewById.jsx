import React, { useEffect, useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import PageName from '../../assets/DesignComponent/PageName'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const ShipmentViewById = () => {

  const { id } = useParams() // to fetch only the id from the url
  const [shipmentData, setShipmentData] = useState([])

  const getData = async () => {
    const response = await axios.get('https://e-commerce-admin-panel-tcs0.onrender.com/ShipmentData/' + id)
    setShipmentData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />

      <main>
        <PageName pname="View Shipment by Id" />
        <div className='viewby-id-form'>
          <p><strong>Product ID: </strong>{shipmentData.id}</p>
          <p><strong>Product Name: </strong>{shipmentData.ProductName}</p>
          <p><strong>Shipped Date: </strong>{shipmentData.ShippedDate}</p>
          <p><strong>Delivered Date: </strong>{shipmentData.DeliveredDate}</p>
          <p><strong>Status: </strong>{shipmentData.Status}</p>
        </div>        
        <div className='go-back-btn'>
          <Link to={'/shipment'}>
            <button className='btn btn-success' type='button'>Go Back to Shipments</button>
          </Link>
        </div>
      </main>
    </>
  )
}

export default ShipmentViewById