import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Add from './FunctionComponent/Add'
import Edit from './FunctionComponent/Edit'
import Delete from './FunctionComponent/Delete'
import ViewById from './FunctionComponent/ViewById'
import View from './FunctionComponent/View'
import Login from './FunctionComponent/Login'
import Registration from './FunctionComponent/Registration'
import Shipment from './FunctionComponent/Shipment'
import Orders from './FunctionComponent/Orders'
import Buyers from './FunctionComponent/Buyers'
import Sellers from './FunctionComponent/Sellers'
import AdminDetails from './FunctionComponent/AdminDetails'
import AddShipment from './FunctionComponent/ShipmentCrud/AddShipment'
import EditShipment from './FunctionComponent/ShipmentCrud/EditShipment'
import DeleteShipment from './FunctionComponent/ShipmentCrud/DeleteShipment'
import ShipmentViewById from './FunctionComponent/ShipmentCrud/ShipmentViewById'
import AddOrders from './FunctionComponent/OrdersCrud/AddOrders'
import EditOrders from './FunctionComponent/OrdersCrud/EditOrders'
import DeleteOrders from './FunctionComponent/OrdersCrud/DeleteOrders'
import OrdersViewById from './FunctionComponent/OrdersCrud/OrdersViewById'
import AddBuyers from './FunctionComponent/BuyersCrud/AddBuyers'
import EditBuyers from './FunctionComponent/BuyersCrud/EditBuyers'
import DeleteBuyers from './FunctionComponent/BuyersCrud/DeleteBuyers'
import AddSellers from './FunctionComponent/SellersCrud/AddSellers'
import EditSellers from './FunctionComponent/SellersCrud/EditSellers'
import DeleteSellers from './FunctionComponent/SellersCrud/DeleteSellers'

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/add' Component={Add}/>
      <Route path='/edit/:id' Component={Edit}/>
      <Route path='/delete/:id' Component={Delete}/>
      <Route path='/view/:id' Component={ViewById}/>
      <Route path='/view' Component={View}/>
      <Route path='/login' Component={Login}/>
      <Route path='/registration' Component={Registration}/>
      <Route path='/shipment' Component={Shipment}/>
      <Route path='/orders' Component={Orders}/>
      <Route path='/buyers' Component={Buyers}/>
      <Route path='/sellers' Component={Sellers}/>
      <Route path='/admin' Component={AdminDetails}/>
      <Route path='/shipment/add' Component={AddShipment}/>
      <Route path='/shipment/edit/:id' Component={EditShipment}/>
      <Route path='/shipment/delete/:id' Component={DeleteShipment}/>
      <Route path='/shipment/view/:id' Component={ShipmentViewById}/>      
      <Route path='/orders/add' Component={AddOrders}/>
      <Route path='/orders/edit/:id' Component={EditOrders}/>
      <Route path='/orders/delete/:id' Component={DeleteOrders}/>
      <Route path='/orders/view/:id' Component={OrdersViewById}/>
      <Route path='/buyers/add' Component={AddBuyers}/>
      <Route path='/buyers/edit/:id' Component={EditBuyers}/>
      <Route path='/buyers/delete/:id' Component={DeleteBuyers}/>      
      <Route path='/sellers/add' Component={AddSellers}/>
      <Route path='/sellers/edit/:id' Component={EditSellers}/>
      <Route path='/sellers/delete/:id' Component={DeleteSellers}/>   
    </Routes>
  )
}

export default App