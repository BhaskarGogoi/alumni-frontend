import React, { useEffect, useState } from 'react';
import logo from '../assets/du.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const authToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  },)

  return (

    <>
      <nav className="navbar navbar-expand-lg main-nav">
        <a className="navbar-brand" href="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" />
            <div style={{ marginLeft: '5px' }}>
              <h5>Centre For Computer Science and Applications</h5>
              <h6>Alumni Association</h6>
            </div>
          </div>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          {/* <span><i class="far fa-bars" style={{ color: '#fff' }}></i></span> */}
          <i class="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className='nav-link'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/alumni" className='nav-link'>Alumni</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className='nav-link'>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/all-events" className='nav-link'>News and Events</NavLink>
            </li>
            {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> */}
            {isAuthenticated ?
              <div className='nav-auth-button' onClick={goToLogin}>
                Dashboard
              </div>
              : <div className='nav-auth-button' onClick={goToLogin}>
                Login/Sign Up
              </div>}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
