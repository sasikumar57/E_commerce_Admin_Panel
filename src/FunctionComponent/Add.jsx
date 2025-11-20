import React, { useState } from 'react'
import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import ApiCall from '../assets/DesignComponent/ApiCall'
import PageName from '../assets/DesignComponent/PageName'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Add = () => {
  const navigate = useNavigate()
  // const api_url = 'http://localhost:3000/ProductsData'
  const {data, triggerAPI} = ApiCall()

  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState('')
  const [productManufacturer, setProductManufacturer] = useState('')
  const [productShippedBy, setProductShippedBy] = useState('')
  const [productPrice, setProductPrice] = useState('')

  const AddProduct = async () => {
    const product_data = {
      ProductName: productName,
      ProductType: productType,
      ProductManufacturer: productManufacturer,
      ProductShippedBy: productShippedBy,
      ProductPrice: productPrice
    }

    if (productName === '' || productType === '' || productManufacturer === '' || productShippedBy === '' || productPrice === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    } else {
      try {
        // const response = await axios.post(api_url, product_data)
        await triggerAPI('/ProductsData', 'post', product_data)
        Swal.fire({
          title: 'Congrats!',
          text: 'Product Added Successfully',
          icon: 'success'
        })
        navigate('/view')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Oops!',
          text: 'Product Adding Failed',
          icon: 'error'
        })
      }
    }

  }

  const ClearFrom = () => {
    setProductName('')
    setProductType('')
    setProductManufacturer('')
    setProductShippedBy('')
    setProductPrice('')

  }

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        {/* <div className='pagename'>
          Ajio Shopping Site | Add Products
        </div> */}
        <PageName pname='Add Products'/>
        <div className='add-form'>
          <div className='input-field'>

            <input type='text' placeholder='Enter Product Name' onChange={((e) => { setProductName(e.target.value) })} />
          </div>
          <div className='input-field'>

            <input type='text' placeholder='Enter Product Type' onChange={((e) => { setProductType(e.target.value) })} />
          </div>
          <div className='input-field'>

            <input type='text' placeholder='Enter Product Manufacturer' onChange={((e) => { setProductManufacturer(e.target.value) })} />
          </div>
          <div className='input-field'>

            <input type='text' placeholder='Enter Product Shipped By' onChange={((e) => { setProductShippedBy(e.target.value) })} />
          </div>
          <div className='input-field'>

            <input type='number' placeholder='Enter Product Price' onChange={((e) => { setProductPrice(e.target.value) })} />
          </div>
          <div className='addpage-button-field'>
            <button type='submit' onClick={AddProduct}>Add Product</button>
            <button type='button' onClick={ClearFrom}>Cancel</button>
            <Link to={'/view'}><button className='addpage-goback-btn' type='submit'>Go Back to Products Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Add