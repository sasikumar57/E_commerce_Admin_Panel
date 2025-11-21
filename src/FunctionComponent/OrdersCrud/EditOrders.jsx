import React, { useEffect, useReducer } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import PageName from '../../assets/DesignComponent/PageName'

const initialState = {
  ProductName: '',
  BuyerName: '',
  OrderDate: '',
  PaymentStatus: '',
  OrderStatus: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ProductName':
      return { ...state, ProductName: action.value }
    case 'BuyerName':
      return { ...state, BuyerName: action.value }
    case 'OrderDate':
      return { ...state, OrderDate: action.value }
    case 'PaymentStatus':
      return { ...state, PaymentStatus: action.value }
    case 'OrderStatus':
      return { ...state, OrderStatus: action.value }
    default:
      return state
  }
}

const EditOrders = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id } = useParams()
  const {
    ProductName,
    BuyerName,
    OrderDate,
    PaymentStatus,
    OrderStatus
  } = state

  const getOrdersData = async () => {
    const response = await axios.get('https://e-commerce-admin-panel-tcs0.onrender.com/OrdersData/' + id)
    dispatch({ type: 'ProductName', value: response.data.ProductName })
    dispatch({ type: 'BuyerName', value: response.data.BuyerName })
    dispatch({ type: 'OrderDate', value: response.data.OrderDate })
    dispatch({ type: 'PaymentStatus', value: response.data.PaymentStatus })
    dispatch({ type: 'OrderStatus', value: response.data.OrderStatus })
  }

  const UpdateValues = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }

  const UpdateOrder = async () => {
    if (ProductName === '' || BuyerName === '' || OrderDate === '' || PaymentStatus === '' || OrderStatus === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    }
    else {
      const response = await axios.put('https://e-commerce-admin-panel-tcs0.onrender.com/OrdersData/' + id, state)
      Swal.fire({
        title: 'Congrats',
        text: 'Order Updated Successfully',
        icon: 'success'
      })
      navigate('/orders')
    }
  }

  useEffect(() => {
    getOrdersData()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <PageName pname='Edit Order' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' name='ProductName' value={ProductName} onChange={UpdateValues} placeholder='Enter Product Name' />
          </div>
          <div className='input-field'>
            <input type='text' name='BuyerName' value={BuyerName} placeholder='Enter Buyer Name' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <label>Enter Order Date</label>
            <input type='date' name='OrderDate' value={OrderDate} placeholder='Enter Order Date' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <select name='PaymentStatus' value={PaymentStatus} onChange={UpdateValues} >
              <option value=''>Select Payment Status</option>
              <option value='Pending'>Pending</option>
              <option value='Paid'>Paid</option>
            </select>
          </div>
          <div className='input-field'>
            <select name='OrderStatus' value={OrderStatus} onChange={UpdateValues} >
              <option value=''>Select Order Status</option>
              <option value='Confirmed'>Confirmed</option>
              <option value='Not Confirmed'>Not Confirmed</option>
              <option value='Shipped'>Shipped</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>

          <div className='addpage-button-field'>
            <button type='submit' onClick={UpdateOrder}>Update Order</button>
            <button type='button' >Cancel</button>
            <Link to={'/orders'}><button className='addpage-goback-btn' type='submit'>Go Back to Orders Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditOrders