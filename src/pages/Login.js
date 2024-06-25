import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp_mode, set_otp_mode] = useState("");
  const [message, setMessage] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState();

  const navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    setIsLoading(true);
    try {
      let res = await fetch(Urls.SERVER + Urls.SEND_OTP, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: email
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        // if (resJson.otp_mode === 'email') {
        //   setOtpModeEmail(true);
        // } else {
        //   setOtpModeEmail(false);
        // }
        setEmail("")
        setButtonDisable(false);
        setIsLoading(false);
        setMessage(resJson.message);
        navigate('/verify-login-otp', {
          state: {
            otp_mode: resJson.otp_mode,
            email: resJson.email,
            isUserExists: resJson.isUserExists,
            ref_no: resJson.ref_no,
          }
        })
      } else if (res.status === 400) {
        setIsLoading(false);
        setButtonDisable(false);
        setError(resJson.error);
      } else {
        setMessage(resJson.message);
        setButtonDisable(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate('/')
  }
  return (
    <>
      <div style={{ position: 'absolute', float: 'right', top: '10px', right: '20px' }}><h4><i className="fas fa-times" onClick={goBack}></i></h4></div>
      <div className='auth'>
        {/* <div className='auth-left'>
                    <h3>Welcome to Alumni Management System</h3><br/>
                    <h5>Dibrugarh University</h5>
                </div> */}
        <div className='auth-right'>
          <div className='auth-form'>
            <img src={require('../assets/img/auth.png')} alt="Login" style={{ width: '250px' }} />
            <center>
              <h2>LOGIN / REGISTER</h2><br />
            </center>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input type='text' value={email} required onChange={(e) => setEmail(e.target.value)} />
              {isError ? <small className='text-danger'>{isError.email}</small> : ""}
              <button type='submit' disabled={buttonDisable}>{isLoading ? <div class='spinner-border text-light' role='status'></div> : 'Get OTP'}</button>
            </form>
            {/* <p className='mt-3'>Don't have an account? <a onClick={goToRegister} className='text-primary'>Register Here</a></p> */}
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login