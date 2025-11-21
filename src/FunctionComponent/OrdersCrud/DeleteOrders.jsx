import React, { useEffect } from 'react'
import Header from '../../assets/DesignComponent/Header'
import Sidebar from '../../assets/DesignComponent/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const DeleteOrders = () => {

  const navigate = useNavigate()
  const { id } = useParams() // to fetch only the id from the url
  const api_url = 'https://e-commerce-admin-panel-tcs0.onrender.com/OrdersData/'

  const deleteData = async () => {

    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'Data cannot be recoverd later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it.',
      cancelButtonText: 'No, Keep it.'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(api_url + id)
        // const response = await triggerAPI(`/ProductData/${id}`, 'delete')
        Swal.fire({
          title: 'Deleted',
          text: 'Order Deleted Successfully!',
          icon: 'success'
        })
        navigate('/orders')
      }
      else {
        Swal.fire({
          title: 'Cancelled!',
          text: 'Order Deletion Cancelled',
          icon: 'error'
        })
        navigate('/orders')
      }
    })
  }

  useEffect(() => {
    deleteData()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />
    </>
  )
}

export default DeleteOrders