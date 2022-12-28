import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';

const VerifyLoginOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpModeEmail, setOtpModeEmail] = useState(false);
  const [otpMode, setOtpMode] = useState(location.state.otp_mode);
  const [phone, setPhone] = useState(location.state.phone);
  const [email, setEmail] = useState(location.state.email);
  const [refNo, setRefNo] = useState(location.state.ref_no);
  const phoneLastChar = location.state.phone.slice(-4);
  const isUserExists = location.state.isUserExists;

  //form inputs
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const resendOtp = async () => {
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
          phone: phone
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setButtonDisable(false);
        setIsLoading(false);
        setRefNo(resJson.ref_no);
        setMessage(resJson.message);
      } else {
        setButtonDisable(false);
        setIsLoading(false);
        setMessage(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    setIsLoading(true);
    try {
      let res = await fetch(Urls.SERVER + Urls.VERIFY_OTP, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          otp: otp,
          ref_no: refNo,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setOtp("");
        setButtonDisable(false);
        setButtonDisable(false);
        setIsLoading(false);
        setMessage(resJson.message);
        if (resJson.isVarified) {
          //if user doesnot exists refirect the user to register page
          if (isUserExists === 'false') {
            navigate('/' + Urls.REGISTER, {
              state: {
                phone: phone
              }
            })
          } else {
            //if user exists hit login url and log in the user
            try {
              let loginResponse = await fetch(Urls.SERVER + Urls.LOGIN, {
                method: "POST",
                headers: new Headers({
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                  otp: otp,
                  ref_no: refNo,
                  phone: phone
                }),
              });
              let resResponseJson = await loginResponse.json();
              if (loginResponse.status === 200) {
                localStorage.setItem('token', resResponseJson.token)
                navigate('/' + Urls.DASHBOARD)
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      } else {
        setMessage(resJson.message);
        setButtonDisable(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='center-screen'>
      <img src={require('../assets/img/auth.png')} alt='Auth' style={{ width: '250px' }} />
      <h3 className='mt-2'>OTP Verification</h3>
      {otpMode === 'email' ?
        <h5 className='mt-3 text-center'>Please enter the OTP sent to the following email id. <br /> {email}</h5>
        :
        <h5 className='mt-3 text-center'>Enter the OTP sent via sms to your phone. <br /> (+91 xxxxxx{phoneLastChar})</h5>
      }
      <div className='auth-form mt-5'>
        <form onSubmit={handleSubmit}>
          <input type='number' value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type='submit' disabled={buttonDisable}>{isLoading ? <div className='spinner-border text-light' role='status'></div> : 'Verify OTP'} </button>
          <div className='mt-2' >Didn't received the otp? <span onClick={resendOtp} style={{ cursor: 'pointer', color: '#4285F4' }}>Resend</span></div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  )
}

export default VerifyLoginOTP