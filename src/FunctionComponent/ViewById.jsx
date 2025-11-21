import React, { useEffect, useState } from 'react'
import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import PageName from '../assets/DesignComponent/PageName'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewById = () => {

  // const navigate = useNavigate()
  const { id } = useParams() // to fetch only the id from the url
  const [productData, setproductData] = useState([])
  // const { data, triggerAPI } = ApiCall()

  const getData = async () => {
    // const response = await triggerAPI(`/ProductsData/${id}`)
    const response = await axios.get('https://e-commerce-admin-panel-tcs0.onrender.com/ProductsData/' + id)
    // await triggerAPI('/ProductsData','get')
    setproductData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])
  // console.log(productData)

  return (
    <>
      <Header />
      <Sidebar />      
      <main>
      <PageName pname="View Product by Id" />
        <div className='viewby-id-form'>
          <p><strong>Product ID: </strong>{productData.id}</p>
          <p><strong>Product Name: </strong>{productData.ProductName}</p>
          <p><strong>Product Type: </strong>{productData.ProductType}</p>
          <p><strong>Product Manufactured By: </strong>{productData.ProductManufacturer}</p>
          <p><strong>Product Shipped By: </strong>{productData.ProductShippedBy}</p>
          <p><strong>Product Price: </strong>{productData.ProductPrice}</p>
        </div>
        {/* <div className='addpage-button-field'>
          <Link to={'/view'}><button className='addpage-goback-btn' type='button'>Go Back to Product Page</button></Link>
        </div> */}
        <div className='go-back-btn'>
          <Link to={'/view'}>
            <button className='btn btn-success' type='button'>Go Back to Products</button>
          </Link>
        </div>

      </main>

    </>
  )
}

export default ViewById