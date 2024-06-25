import React, {useState} from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';

const Register = () => {
   
    const navigate = useNavigate();
    const location = useLocation();

    const [buttonDisable, setButtonDisable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


     //form inputs
     const [name, setName] = useState("");
     const [phone, setPhone] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisable(true);
        setIsLoading(true);
        try {
          let res = await fetch(Urls.SERVER + Urls.REGISTER, {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify({
              name: name,
              phone: phone,
              email: location.state.email,
            }),
          });
          let resJson = await res.json();
          if (res.status === 201) {
            setButtonDisable(false);
            setIsLoading(false);
            localStorage.setItem('token', resJson.token)
            navigate('/' + Urls.DASHBOARD)
          } else if(res.status === 400){
            setButtonDisable(false);
            setIsLoading(false);
          } else {
            setButtonDisable(false);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      };

    const goBack = () => {
        navigate('/login')
    }

  return (
      <>
        <div className='auth'>
            <div className='auth-right'>
                <div className='auth-form'>
                    <h4 onClick={goBack}><i class="fas fa-arrow-left"></i></h4>
                    <h2>REGISTER</h2><br/>
                    <form onSubmit={handleSubmit}>                    
                        <label>Phone</label>
                        <input type='number' value={phone} required onChange={(e) => setPhone(e.target.value)}/>
                        <button type='submit' disabled={buttonDisable}>{isLoading? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                    </form>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </div>
            </div> 
        </div>
      </>
        
  )
}

export default Register