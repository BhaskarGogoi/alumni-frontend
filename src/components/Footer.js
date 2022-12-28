import React from 'react'

const Footer = () => {
  return (
    <>
      <section className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3'>
              <h5>Important Links</h5>
              <ul>
                <li><a href='https://dibru.ac.in/' target="_blank"><i className="fas fa-angle-right"></i> Dibrugarh University</a></li>
                <li><a href='http://www.ccsdu.in/home' target="_blank"><i className="fas fa-angle-right"></i> CCSA</a></li>
                <li><a href='https://placeccsa.wordpress.com/' target="_blank"><i className="fas fa-angle-right"></i> Placements</a></li>
              </ul>
            </div>
            <div className='col-sm-3'>
              <h5>Quick Links</h5>
              <ul>
                <li><a href='/'><i className="fas fa-angle-right"></i> Home</a></li>
                <li><a href='/login'><i className="fas fa-angle-right"></i> Alumni Registration</a></li>
                <li><a href='/all-events'><i className="fas fa-angle-right"></i> News and Events</a></li>
                <li><a href='https://forms.gle/J8Wt5y51nu8ePSVo9' target="_blank"><i className="fas fa-angle-right"></i> Report An Error</a></li>
              </ul>
            </div>
            <div className='col-sm-3'>
              <h5>Contact</h5>
              <p>
                Centre for Computer Science and Applications,
                Dibrugarh University <br />
                Dibrugarh, Assam, 786004 <br />
                <a href="mailto:contact@ccsaalumni.in" style={{ color: '#ffffff' }}><div className='mt-2'><i class="fas fa-envelope"></i> contact@ccsaalumni.in</div></a>
              </p>
            </div>
            <div className='col-sm-3'>
              <h5>Social</h5>
              <div className='social'>
                <a href='https://www.facebook.com/CCSAdibrugarhuniversity' target="_blank">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href='#'>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href='#'>
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <hr />
          &#169; Centre for Computer Science and Applications
        </div>
      </section >
      <section className='footer-developer'>
        <a href='https://www.instagram.com/ibhaskargogoi/' target="_blank">Developed By: Bhaskarjyoti Gogoi</a>
      </section>
    </>

  )
}

export default Footer