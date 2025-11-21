import React, { useEffect, useReducer } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import PageName from '../../assets/DesignComponent/PageName'

const initialState = {
  Name: '',
  ContactInfo: '',
  TotalProductsListed: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'Name':
      return { ...state, Name: action.value }
    case 'ContactInfo':
      return { ...state, ContactInfo: action.value }
    case 'TotalProductsListed':
      return { ...state, TotalProductsListed: action.value }
    default:
      return state
  }
}

const EditSellers = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id } = useParams()
  const {
    Name,
    ContactInfo,
    TotalProductsListed
  } = state

  const getSellersData = async () => {
    const response = await axios.get('https://e-commerce-admin-panel-tcs0.onrender.com/SellersData/' + id)
    dispatch({ type: 'Name', value: response.data.Name })
    dispatch({ type: 'ContactInfo', value: response.data.ContactInfo })
    dispatch({ type: 'TotalProductsListed', value: response.data.TotalProductsListed })
  }

  const UpdateValues = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }

  const UpdateSeller = async () => {
    if (Name === '' || ContactInfo === '' || TotalProductsListed === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    }
    else {
      const response = await axios.put('https://e-commerce-admin-panel-tcs0.onrender.com/SellersData/' + id, state)
      Swal.fire({
        title: 'Congrats',
        text: 'Seller Updated Successfully',
        icon: 'success'
      })
      navigate('/sellers')
    }
  }

  useEffect(() => {
    getSellersData()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <PageName pname='Edit Seller' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' name='Name' value={Name} placeholder='Enter Seller Name' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <input type='text' name='ContactInfo' value={ContactInfo} placeholder='Enter Contact Info' onChange={UpdateValues} />
          </div>
          <div className='input-field'>
            <input type='number' name='TotalProductsListed' value={TotalProductsListed} placeholder='Enter Total Products Listed' onChange={UpdateValues} />
          </div>
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={UpdateSeller}>Update Seller</button>
            <button type='button' >Cancel</button>
            <Link to={'/sellers'}><button className='addpage-goback-btn' type='submit'>Go Back to Sellers Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditSellers