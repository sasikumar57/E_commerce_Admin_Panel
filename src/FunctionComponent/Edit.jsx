import React, { useEffect, useReducer } from 'react'
import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import PageName from '../assets/DesignComponent/PageName'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const initialState = {
  ProductName: '',
  ProductType: '',
  ProductManufacturer: '',
  ProductShippedBy: '',
  ProductPrice: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ProductName':
      return { ...state, ProductName: action.value }
    case 'ProductType':
      return { ...state, ProductType: action.value }
    case 'ProductManufacturer':
      return { ...state, ProductManufacturer: action.value }
    case 'ProductShippedBy':
      return { ...state, ProductShippedBy: action.value }
    case 'ProductPrice':
      return { ...state, ProductPrice: action.value }
    default:
      return state
  }
}

const Edit = () => {

  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { id } = useParams()
  const {
    ProductName,
    ProductType,
    ProductManufacturer,
    ProductShippedBy,
    ProductPrice
  } = state

  const getProductData = async () => {
    const response = await axios.get('http://localhost:3000/ProductsData/' + id)
    dispatch({ type: 'ProductName', value: response.data.ProductName })
    dispatch({ type: 'ProductType', value: response.data.ProductType })
    dispatch({ type: 'ProductManufacturer', value: response.data.ProductManufacturer })
    dispatch({ type: 'ProductShippedBy', value: response.data.ProductShippedBy })
    dispatch({ type: 'ProductPrice', value: response.data.ProductPrice })

  }

  const UpdateValues = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }

  const UpdateProduct = async () => {
    if (ProductName === '' || ProductType === '' || ProductManufacturer === '' || ProductShippedBy === '' || ProductPrice === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    }
    else {
      const response = await axios.put('http://localhost:3000/ProductsData/' + id, state)
      Swal.fire({
        title: 'Congrats',
        text: 'Product Updated Successfully',
        icon: 'success'
      })
      navigate('/view')
    }

  }

  useEffect(() => {
    getProductData()
  }, [])


  return (
    <>
      <Header />
      <Sidebar />
      <main>
        {/* <div className='pagename'>
          Ajio Shopping Site | Edit Products
        </div> */}
        <PageName pname='Edit Product'/>
        <div className='edit-form'>
          <div className='input-field'>

            <input type='text' name='ProductName' value={ProductName} onChange={UpdateValues} placeholder='Enter Product Name' />
          </div>
          <div className='input-field'>

            <input type='text' name='ProductType' value={ProductType} onChange={UpdateValues} placeholder='Enter Product Type' />
          </div>
          <div className='input-field'>

            <input type='text' name='ProductManufacturer' value={ProductManufacturer} onChange={UpdateValues} placeholder='Enter Product Manufacturer' />
          </div>
          <div className='input-field'>

            <input type='text' name='ProductShippedBy' value={ProductShippedBy} onChange={UpdateValues} placeholder='Enter Product Shipped By' />
          </div>
          <div className='input-field'>

            <input type='number' name='ProductPrice' value={ProductPrice} onChange={UpdateValues} placeholder='Enter Product Price' />
          </div>
          <div className='editpage-button-field'>
            <button type='submit' onClick={UpdateProduct}>Edit Product</button>
            <button type='reset'>Cancel</button>
            <Link to={'/view'}><button className='editpage-goback-btn' type='submit'>Go Back to Product Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Edit