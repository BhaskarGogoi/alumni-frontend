import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import {LoaderMain, DashboardTopBar} from '../components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const Payment = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonDisable, setButtonDisable] = useState();

  const paymentSuccessToast = () => 
  toast.success('Payment Successful', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const paymentFailedToast = (message) => 
  toast.error(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  
  useEffect( () => {  
    const paymentDetails = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.CHECK_PAYMENT, {
          method: "GET",
          headers: new Headers({
              'Accept': 'application/json',
              'Content-Type': 'application/json', 
              'Authorization' : 'Bearer ' + authToken
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          if(resJson.message === "Paid"){
            navigate('/user/dashboard')
          } else if(resJson.message === "Image Uploaded"){
              setName(resJson.name);
              setEmail(resJson.email);
              setPhone(resJson.phone);
              setIsLoading(false);
          } else {
            navigate('/user/dashboard')
          }
          // setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }    
    paymentDetails()
  },[]);

  async function displayRazorpay(e) {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			// alert('Razorpay SDK failed to load. Are you online?');
      paymentFailedToast("Oops! Something went wrong.");
      setButtonDisable("");
      setIsSubmitting(false);
			return
		}
		const options = {
			key: "rzp_test_swhWKwvkJkKVP7",
			currency: "INR",
			amount: "50000",
			name: 'Registration',
			description: 'Alumni Registration',
      image: "https://example.com/your_logo",

			handler: function (response) {
        setButtonDisable("diasbled");
        setIsSubmitting(false);
        if(response.razorpay_payment_id){
          paymentSuccessToast();
          setTimeout(() => {
            navigate('/user/dashboard')
          }, 3000);
        } else {
          paymentFailedToast("Oops! Payment Failed.");
        }
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
			},
      modal: {
        ondismiss: function(){
          setButtonDisable("");
          setIsSubmitting(false);
         }
      },
			prefill: {
				name: name,
				email: email,
				contact: phone,
			},
      "theme": {
        "color": "#F56060"
      }
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
  return (
    isLoading ? <LoaderMain/> :
    <div style={{flex: 1, padding: '20px', minHeight: '100vh'}}>
          <DashboardTopBar title="Payment"/>
          <div className='dashboard-content shadow-sm'>
            <div className='container'>
              <div className='row'>
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              <form onSubmit={displayRazorpay} style={{maxWidth: '800px'}}>
                  <div className="row">
                    <div className="col-sm-4">
                      Registration Fee: 500/-

                      <button type="submit" className='btn btn-primary my-2 paybutton' disabled={buttonDisable} style={{maxWidth: 100}}>{isSubmitting? <div className='spinner-border text-light' role='status'></div> : 'Pay Now'}</button>               
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>          
      </div>
  )
}

export default Payment