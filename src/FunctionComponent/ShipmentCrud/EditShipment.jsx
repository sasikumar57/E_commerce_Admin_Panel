import React, { useEffect, useReducer } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import PageName from '../../assets/DesignComponent/PageName'

const initialState = {
  ProductName: '',
  ShippedDate: '',
  DeliveredDate: '',
  Status: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ProductName':
      return { ...state, ProductName: action.value }
    case 'ShippedDate':
      return { ...state, ShippedDate: action.value }
    case 'DeliveredDate':
      return { ...state, DeliveredDate: action.value }
    case 'Status':
      return { ...state, Status: action.value }
    default:
      return state
  }
}

const EditShipment = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id } = useParams()
  const {
    ProductName,
    ShippedDate,
    DeliveredDate,
    Status
  } = state

  const getShipmentData = async () => {
    const response = await axios.get('http://localhost:3000/ShipmentData/' + id)
    dispatch({ type: 'ProductName', value: response.data.ProductName })
    dispatch({ type: 'ShippedDate', value: response.data.ShippedDate })
    dispatch({ type: 'DeliveredDate', value: response.data.DeliveredDate })
    dispatch({ type: 'Status', value: response.data.Status })
  }

  const UpdateValues = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }

  const UpdateShipment = async () => {
    if (ProductName === '' || ShippedDate === '' || DeliveredDate === '' || Status === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    }
    else {
      const response = await axios.put('http://localhost:3000/ShipmentData/' + id, state)
      Swal.fire({
        title: 'Congrats',
        text: 'Shipment Updated Successfully',
        icon: 'success'
      })
      navigate('/shipment')
    }
  }

  useEffect(() => {
    getShipmentData()
  }, [])



  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <PageName pname='Edit Shipments' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' name='ProductName' value={ProductName} onChange={UpdateValues} placeholder='Enter Product Name' />
          </div>
          <div className='input-field'>
            <label>Enter Shipped Date</label>
            <input type='date' name='ShippedDate' value={ShippedDate} onChange={UpdateValues} placeholder='Enter Shipped Date' />
          </div>
          <div className='input-field'>
          <label>Enter Delivering Date</label>
            <input type='date' name='DeliveredDate' value={DeliveredDate} onChange={UpdateValues} placeholder='Enter Delivering Date' />
          </div>
          <div className='input-field'>
            <select name='Status' value={Status} onChange={UpdateValues}>
              <option value=''>Select Status</option>
              <option value='Pending'>Pending</option>
              <option value='Shipped'>Shipped</option>
              <option value='In Transit'>In Transit</option>
              <option value='Returned'>Returned</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={UpdateShipment}>Edit Shipment</button>
            <button type='button' >Cancel</button>
            <Link to={'/shipment'}><button className='addpage-goback-btn' type='submit'>Go Back to Shipment Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditShipment