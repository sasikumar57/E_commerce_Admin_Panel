import React, { useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ApiCall from '../../assets/DesignComponent/ApiCall'
import PageName from '../../assets/DesignComponent/PageName'

const AddOrders = () => {

  const navigate = useNavigate()
  const { data, triggerAPI } = ApiCall()

  const [productName, setProductName] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [orderStatus, setOrderStatus] = useState('')

  const AddOrder = async () => {
    const order_data = {
      ProductName: productName,
      BuyerName: buyerName,
      OrderDate: orderDate,
      PaymentStatus: paymentStatus,
      OrderStatus: orderStatus
    }

    if (productName === '' || buyerName === '' || orderDate === '' || paymentStatus === '' || orderStatus === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    } else {
      try {
        // const response = await axios.post(api_url, product_data)
        await triggerAPI('/OrdersData', 'post', order_data)
        Swal.fire({
          title: 'Congrats!',
          text: 'Order Added Successfully',
          icon: 'success'
        })
        navigate('/orders')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Oops!',
          text: 'Order Adding Failed',
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
        <PageName pname='Add Order' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' placeholder='Enter Product Name' onChange={((e) => { setProductName(e.target.value) })} />
          </div>
          <div className='input-field'>
            <input type='text' placeholder='Enter Buyer Name' onChange={((e) => { setBuyerName(e.target.value) })} />
          </div>
          <div className='input-field'>
            <label>Enter Order Date</label>
            <input type='date' placeholder='Enter Order Date' onChange={((e) => { setOrderDate(e.target.value) })} />
          </div>    
          <div className='input-field'>
            <select value={paymentStatus} onChange={((e) => { setPaymentStatus(e.target.value) })} >
              <option value=''>Select Payment Status</option>
              <option value='Pending'>Pending</option>
              <option value='Paid'>Paid</option>              
            </select>
          </div>
          <div className='input-field'>
            <select value={orderStatus} onChange={((e) => { setOrderStatus(e.target.value) })} >
              <option value=''>Select Order Status</option>
              <option value='Confirmed'>Confirmed</option>
              <option value='Not Confirmed'>Not Confirmed</option>
              <option value='Shipped'>Shipped</option>              
              <option value='Delivered'>Delivered</option>              
            </select>
          </div>
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={AddOrder}>Add Order</button>
            <button type='button' >Cancel</button>
            <Link to={'/orders'}><button className='addpage-goback-btn' type='submit'>Go Back to Orders Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddOrders