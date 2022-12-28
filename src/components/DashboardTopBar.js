import React from 'react'
import { useNavigate } from 'react-router-dom';


const DashboardTopBar = ({ title }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }

  const goToSettings = () => {
    navigate('/user/settings')
  }

  return (
    <div className='dashboard-topbar shadow-sm'>
      <h4>{title}</h4>
      <div className="dropdown mydropdown">
        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <div className='button-content'>
            <i className="far fa-user-circle"></i>
            <i className="fas fa-angle-down"></i>
          </div>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" onClick={goToSettings}>Settings</a></li>
          <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default DashboardTopBar