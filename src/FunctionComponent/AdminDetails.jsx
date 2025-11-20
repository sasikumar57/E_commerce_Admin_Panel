import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import PageName from '../assets/DesignComponent/PageName'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import './AdminDetails.css';

const AdminDetails = () => {
  const api_url = 'http://localhost:3000/UserDetails';

  const [admin, setAdmin] = useState({});
  const [showCredentials, setShowCredentials] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fetch admin data from session storage and API
  useEffect(() => {
    const name = sessionStorage.getItem('name');
    if (name) {
      getAdminData(name);
    }
  }, []);

  const getAdminData = async (name) => {
    try {
      const response = await axios.get(api_url);
      const adminUser = response.data.find(user => user.Name === name);

      if (adminUser) {
        setAdmin(adminUser);
        setEmail(adminUser.Email);
        setPassword(adminUser.Password);

        // Ensure session is up-to-date
        sessionStorage.setItem('name', adminUser.Name);
        sessionStorage.setItem('email', adminUser.Email);
        sessionStorage.setItem('password', adminUser.Password);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  // ✅ Toggle credentials visibility
  const handleToggleCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  // ✅ Update admin credentials
  const handleUpdate = async () => {
    if (!email || !password) {
      Swal.fire('Error!', 'All fields are required!', 'error');
      return;
    }

    try {
      await axios.put(`${api_url}/${admin.id}`, {
        Name: admin.Name,
        Email: email,
        Password: password,
        Re_enterPassword: password,
      });

      // ✅ Update session storage after modifying credentials
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);

      Swal.fire('Success!', 'Admin credentials updated successfully.', 'success');
      getAdminData(admin.Name); // ✅ Refresh state after updating
      setShowCredentials(false);
    } catch (error) {
      console.error('Error updating admin credentials:', error);
      Swal.fire('Error!', 'Failed to update admin credentials.', 'error');
    }
  };

  // ✅ Delete admin account
  const handleDelete = async () => {
    if (!admin.id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this admin account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${api_url}/${admin.id}`);
          Swal.fire('Deleted!', 'Admin account has been deleted.', 'success');

          // ✅ Clear session storage after deletion
          sessionStorage.clear();

          // ✅ Redirect to login page after deletion
          window.location.href = '/login';
        } catch (error) {
          console.error('Error deleting admin account:', error);
          Swal.fire('Error!', 'Failed to delete admin account.', 'error');
        }
      }
    });
  };

  return (
    <>
    <Header />
    <Sidebar />
    <main>
    <PageName pname="Admin Details" />
    <div className="admin-container">
      {/* ✅ Admin Profile Card */}
      <div className="admin-profile-card">
        <i className="fa fa-user-circle admin-icon"></i>
        <h2 className="admin-name">{admin.Name || 'Admin'}</h2>
        <div className="admin-info">
          <strong>Email:</strong> {admin.Email || 'Not available'}
        </div>
        <button
          className="change-credentials-btn"
          onClick={handleToggleCredentials}
        >
          {showCredentials ? 'Hide Credentials' : 'Change Credentials'}
        </button>
        <button className="delete-admin-btn" onClick={handleDelete}>
          Delete Admin Account
        </button>
      </div>

      {/* ✅ Admin Credentials Card */}
      {showCredentials && (
        <div className="admin-credentials-card">
          <h4>Change Admin Credentials</h4>
          <div className="admin-credentials-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="admin-credentials-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="update-credentials-btn" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      )}
    </div>
    </main>
    </>
  );
};

export default AdminDetails;


    // <>
    //         <Header />
    //         <Sidebar />
    //         <main>
    //             <PageName pname="Admin" />
                
    //         </main>
    //     </>