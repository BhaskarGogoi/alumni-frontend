import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/du.png';

const DashboardNav = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/')
  }
  return (
    <>
      <nav className='dashboard-nav'>
        <div className='logo'>
          <img src={logo} alt="Logo" />
          <h5 onClick={goToHome}>Home</h5>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', height: '85%', justifyContent: 'space-between' }}>
          <ul>
            <li><NavLink to="/user/dashboard" className='nav-link'><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink></li>
            <li><NavLink to="/user/profile" className='nav-link'><i className="fas fa-user-alt"></i> Profile</NavLink></li>
            <li><NavLink to="/user/notifications" className='nav-link'><i className="fas fa-bell"></i> Notifications</NavLink></li>
            <li><NavLink to="/user/testimonial" className='nav-link'><i class="fas fa-quote-left"></i> Testimonial</NavLink></li>
            {/* <li><NavLink to="/user/contribute" className='nav-link'><i class="fas fa-donate"></i> Contribute</NavLink></li> */}
          </ul>
          <ul>
            <li><NavLink to="/user/settings" className='nav-link'><i className="fas fa-cog"></i> Settings</NavLink></li>
            <li><NavLink to="/user/logout" className='nav-link'><i className="fas fa-sign-out-alt"></i> Logout</NavLink></li>
          </ul>
        </div>

      </nav>

      <nav className='bottom-nav'>
        <NavLink to="/" className='nav-link'><i class="fas fa-home"></i> Home</NavLink>
        <NavLink to="/user/dashboard" className='nav-link'><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink>
        <NavLink to="/user/profile" className='nav-link'><i className="fas fa-user-alt"></i> Profile</NavLink>
        <NavLink to="/user/notifications" className='nav-link'><i className="fas fa-bell"></i> Notifications</NavLink>

        {/* <NavLink to="/user/contribute" className='nav-link'><i class="fas fa-donate"></i> Contribute</NavLink> */}
        {/* <NavLink to="/user/settings" className='nav-link'><i className="fas fa-cog"></i> Settings</NavLink> */}
      </nav>
    </>
  )
}

export default DashboardNav