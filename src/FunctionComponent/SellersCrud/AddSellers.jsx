import React, { useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ApiCall from '../../assets/DesignComponent/ApiCall'
import PageName from '../../assets/DesignComponent/PageName'

const AddSellers = () => {

  const navigate = useNavigate()
  const { data, triggerAPI } = ApiCall()

  const [name, setName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [totalProductsListed, setTotalProductsListed] = useState('')

  const AddSeller = async () => {
    const seller_data = {
      Name: name,
      ContactInfo: contactInfo,
      TotalProductsListed: totalProductsListed,
    }

    if (name === '' || contactInfo === '' || totalProductsListed === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    } else {
      try {
        // const response = await axios.post(api_url, product_data)
        await triggerAPI('/SellersData', 'post', seller_data)
        Swal.fire({
          title: 'Congrats!',
          text: 'Seller Added Successfully',
          icon: 'success'
        })
        navigate('/sellers')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Oops!',
          text: 'Seller Adding Failed',
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
        <PageName pname='Add Seller' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' placeholder='Enter Seller Name' onChange={((e) => { setName(e.target.value) })} />
          </div>
          <div className='input-field'>
            <input type='text' placeholder='Enter Contact Info' onChange={((e) => { setContactInfo(e.target.value) })} />
          </div>
          <div className='input-field'>
            <input type='number' placeholder='Enter Total Products Listed' onChange={((e) => { setTotalProductsListed(e.target.value) })} />
          </div>
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={AddSeller}>Add Seller</button>
            <button type='button' >Cancel</button>
            <Link to={'/sellers'}><button className='addpage-goback-btn' type='submit'>Go Back to Sellers Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddSellers