import React from 'react'
import Header from './assets/DesignComponent/Header'
import Sidebar from './assets/DesignComponent/Sidebar'
import PageName from './assets/DesignComponent/PageName'

const Home = () => {

  const name = sessionStorage.getItem('name')

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <div className='content'>
          {/* <p className='pagename'>Ajio Shopping Site | Homepage</p> */}
          <PageName pname='Homepage'/>
          <p className='greet'>Welcome to the Home Page</p>
          {name ? null
            :
            <>
              <p className='greet1'><a href='/login' className='homepage-login-link'>Login</a> to view Data</p>
            </>
          }
        </div>
      </main>
    </>
  )
}

export default Home