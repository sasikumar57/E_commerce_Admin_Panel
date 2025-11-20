import React, { useState } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ApiCall from '../../assets/DesignComponent/ApiCall'
import PageName from '../../assets/DesignComponent/PageName'

const AddBuyers = () => {

  const navigate = useNavigate()
  const { data, triggerAPI } = ApiCall()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [totalOrders, setTotalOrders] = useState('')
  const [lastOrderDate, setLastOrderDate] = useState('')

  const AddBuyer = async () => {
    const buyer_data = {
      Name: name,
      Email: email,
      TotalOrders: totalOrders,
      LastOrderDate: lastOrderDate
    }

    if (name === '' || email === '' || totalOrders === '' || lastOrderDate === '') {
      Swal.fire({
        title: 'Fillout all the fields',
        text: 'All the fields should be filled',
        icon: 'error'
      })
    } else {
      try {
        // const response = await axios.post(api_url, product_data)
        await triggerAPI('/BuyersData', 'post', buyer_data)
        Swal.fire({
          title: 'Congrats!',
          text: 'Buyer Added Successfully',
          icon: 'success'
        })
        navigate('/buyers')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Oops!',
          text: 'Buyer Adding Failed',
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
        <PageName pname='Add Buyer' />
        <div className='add-form'>
          <div className='input-field'>
            <input type='text' placeholder='Enter Buyer Name' onChange={((e) => { setName(e.target.value) })} />
          </div>
          <div className='input-field'>
            <input type='email' placeholder='Enter Buyer Email' onChange={((e) => { setEmail(e.target.value) })} />
          </div>
          <div className='input-field'>
            <input type='number' placeholder='Enter Total Orders' onChange={((e) => { setTotalOrders(e.target.value) })} />
          </div>
          <div className='input-field'>
            <label>Enter Last Order Date</label>
            <input type='date' placeholder='Enter Last Order Date' onChange={((e) => { setLastOrderDate(e.target.value) })} />
          </div>                        
          
          <div className='addpage-button-field'>
            <button type='submit' onClick={AddBuyer}>Add Buyer</button>
            <button type='button' >Cancel</button>
            <Link to={'/buyers'}><button className='addpage-goback-btn' type='submit'>Go Back to Buyers Page</button></Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddBuyers