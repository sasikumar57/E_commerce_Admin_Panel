import React, { useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ApiCall from '../../assets/DesignComponent/ApiCall'
import PageName from '../../assets/DesignComponent/PageName'

const AddShipment = () => {

  const navigate = useNavigate()
  const { data, triggerAPI } = ApiCall()

  const [productName, setProductName] = useState('')
  const [shippedDate, setShippedDate] = useState('')
  const [deliveredDate, setDeliveredDate] = useState('')
  const [status, setStatus] = useState('')

  const AddProduct = async () => {
    const shipment_data = {
      ProductName: productName,
      ShippedDate: shippedDate,
      DeliveredDate: deliveredDate,
      Status: status
    }

    if (productName === '' || shippedDate === '' || deliveredDate === '' || status === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    } else {
      try {
        // const response = await axios.post(api_url, product_data)
        await triggerAPI('/ShipmentData', 'post', shipment_data)
        Swal.fire({
          title: 'Congrats!',
          text: 'Shipment Added Successfully',
          icon: 'success'
        })
        navigate('/shipment')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Oops!',
          text: 'Shipment Adding Failed',
          icon: 'error'
        })
      }
    }

  }

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        {/* <div className='pagename'>
          Ajio Shopping Site | Add Products
        </div> */}
        <PageName pname='Add Shipments' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' placeholder='Enter Product Name' onChange={((e) => { setProductName(e.target.value) })} />
          </div>
          <div className='input-field'>
            <label>Enter Shipped Date</label>
            <input type='date' placeholder='Enter Shipped Date' onChange={((e) => { setShippedDate(e.target.value) })} />
          </div>
          <div className='input-field'>
          <label>Enter Delivering Date</label>
            <input type='date' placeholder='Enter Delivering Date' onChange={((e) => { setDeliveredDate(e.target.value) })} />
          </div>
          <div className='input-field'>
            <select value={status} onChange={((e) => { setStatus(e.target.value) })} >
              <option value=''>Select Status</option>
              <option value='Pending'>Pending</option>
              <option value='Shipped'>Shipped</option>
              <option value='In Transit'>In Transit</option>
              <option value='Returned'>Returned</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={AddProduct}>Add Shipment</button>
            <button type='button' >Cancel</button>
            <Link to={'/shipment'}><button className='addpage-goback-btn' type='submit'>Go Back to Shipment Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddShipment