import React, { useState, useEffect } from 'react';
import { LoaderMain, DashboardTopBar, TopContributors } from '../components/index';
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import ProfileInComplete from '../assets/img/profile-incomplete.png';
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

const Contribute = () => {
    const authToken = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [contributions, setContributions] = useState();
    const [buttonDisable, setButtonDisable] = useState();
    const [isSubmitting, setIsSubmitting] = useState();
    const [amount, setAmount] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [donationHistoryAvailable, setDonationHistoryAvailable] = useState(false);
    const [isRegistered, setIsRegistered] = useState();
    const [topContributors, setTopContributors] = useState();

    const navigate = useNavigate();
    const goToDashboard = () => {
        navigate('/user/dashboard')
    }

    const successToast = (message) =>
        toast.success(message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const errorToast = (message) =>
        toast.error(message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });


    useEffect(() => {
        const getContributions = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_CONTRIBUTIONS, {
                    method: "GET",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    if (resJson.isRegistered === true) {
                        setIsRegistered(true);
                        setEmail(resJson.user.email);
                        setPhone(resJson.user.phone);
                        setName(resJson.name);
                        setTopContributors(resJson.top_contributors);
                        if (resJson.contributions.length > 0) {
                            setDonationHistoryAvailable(true);
                            setContributions(resJson.contributions);
                        }
                    } else {
                        setIsRegistered(false);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getContributions()
    }, []);

    async function displayRazorpay(e) {
        e.preventDefault();
        setButtonDisable("diasbled");
        setIsSubmitting(true);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            // alert('Razorpay SDK failed to load. Are you online?');
            errorToast("Oops! Something went wrong.");
            setButtonDisable("");
            setIsSubmitting(false);
            return
        }
        const options = {
            key: "rzp_test_swhWKwvkJkKVP7",
            currency: "INR",
            amount: amount,
            name: 'Registration',
            description: 'Donation',
            image: "https://example.com/your_logo",

            handler: function (response) {
                setButtonDisable("diasbled");
                setIsSubmitting(false);
                if (response.razorpay_payment_id) {
                    successToast("Payment Successful.")
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                } else {
                    errorToast("Oops! Payment Failed.");
                }
                // alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
            },
            modal: {
                ondismiss: function () {
                    setButtonDisable("diasbled");
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
        loading ? <LoaderMain /> :
            isRegistered ?
                <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
                    <DashboardTopBar title="Contribution" />
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
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-8'>
                                <form onSubmit={displayRazorpay} style={{ maxWidth: '800px', marginBottom: '30px' }}>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className='inputField'>
                                                <label>Amount</label>
                                                <input type="number" className="form-control" required onChange={(e) => setAmount((e.target.value) * 100)} />
                                            </div>
                                        </div>
                                        <button type="submit" className='btn btn-primary my-2 paybutton' disabled={buttonDisable} style={{ maxWidth: 100 }}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Contribute'}</button>
                                    </div>
                                </form>
                                <div className='donation-history'>
                                    <h5>Donation History</h5>
                                    <div className='card shasow-sm'>
                                        <div className='card-body'>
                                            {donationHistoryAvailable ?
                                                contributions.map((contribution, index) => (
                                                    <p key={index}><i className="fas fa-rupee-sign"></i> {contribution.amount}</p>
                                                ))
                                                : "You have not done any donations yet!"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <TopContributors topContributors={topContributors} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
                    <DashboardTopBar title="Contributions" />
                    <div className='dashboard-content shadow-sm'>
                        <div className='container'>
                            <div className='row p-3'>
                                <div className='profile-incomplete'>
                                    <img src={ProfileInComplete} alt="Profile Incomplete" />
                                    <p>Profile Incomplete! Please complete your profile to view details.</p>
                                    <button className='btn btn-primary' onClick={goToDashboard} style={{ width: '150px' }}>Complete Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Contribute