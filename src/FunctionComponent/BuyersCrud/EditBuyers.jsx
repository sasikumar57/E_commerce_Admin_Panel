import React, { useEffect, useReducer } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import PageName from '../../assets/DesignComponent/PageName'

const initialState = {
  Name: '',
  Email: '',
  TotalOrders: '',
  LastOrderDate: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'Name':
      return { ...state, Name: action.value }
    case 'Email':
      return { ...state, Email: action.value }
    case 'TotalOrders':
      return { ...state, TotalOrders: action.value }
    case 'LastOrderDate':
      return { ...state, LastOrderDate: action.value }
    default:
      return state
  }
}

const EditBuyers = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id } = useParams()
  const {
    Name,
    Email,
    TotalOrders,
    LastOrderDate,
  } = state

  const getBuyersData = async () => {
    const response = await axios.get('https://e-commerce-admin-panel-tcs0.onrender.com/BuyersData/' + id)
    dispatch({ type: 'Name', value: response.data.Name })
    dispatch({ type: 'Email', value: response.data.Email })
    dispatch({ type: 'TotalOrders', value: response.data.TotalOrders })
    dispatch({ type: 'LastOrderDate', value: response.data.LastOrderDate })
  }

  const UpdateValues = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }

  const UpdateBuyer = async () => {
    if (Name === '' || Email === '' || TotalOrders === '' || LastOrderDate === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    }
    else {
      const response = await axios.put('https://e-commerce-admin-panel-tcs0.onrender.com/BuyersData/' + id, state)
      Swal.fire({
        title: 'Congrats',
        text: 'Buyer Updated Successfully',
        icon: 'success'
      })
      navigate('/buyers')
    }
  }

  useEffect(() => {
    getBuyersData()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />
      <main>        
        <PageName pname='Edit Buyer' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' name='Name' value={Name} placeholder='Enter Buyer Name' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <input type='email' name='Email' value={Email} placeholder='Enter Buyer Email' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <input type='number' name='TotalOrders' value={TotalOrders} placeholder='Enter Total Orders' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <label>Enter Last Order Date</label>
            <input type='date' name='LastOrderDate' value={LastOrderDate} placeholder='Enter Last Order Date' onChange={UpdateValues} />
          </div>                        
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={UpdateBuyer}>Update Buyer</button>
            <button type='button' >Cancel</button>
            <Link to={'/buyers'}><button className='addpage-goback-btn' type='submit'>Go Back to Buyers Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditBuyers