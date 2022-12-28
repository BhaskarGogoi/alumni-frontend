import React, { useState, useEffect } from 'react';
import { LoaderMain, DashboardTopBar } from '../components/index';
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls'
import ProfileInComplete from '../assets/img/profile-incomplete.png';

const Testimonial = () => {
    const authToken = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [ifTestimonyExists, setIfTestimonyExists] = useState();
    const [ifProfileExists, setIfProfileExists] = useState();
    const [isError, setError] = useState();
    const [testimony, setTestimony] = useState();
    const [testimonyId, setTestimonyId] = useState();
    const [buttonDisable, setButtonDisable] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getTestimonial = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_TESTIMONY, {
                    method: "GET",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    if (resJson.ifProfileExists === true) {
                        setIfProfileExists(true);
                        if (resJson.ifTestimonialExists === true) {
                            setIfTestimonyExists(true);
                            setTestimony(resJson.testimonial);
                        } else {
                            setIfTestimonyExists(false);
                        }
                    } else {
                        setIfProfileExists(false);
                    }

                }
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getTestimonial()
    }, [count]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisable("diasbled");
        setIsSubmitting(true);
        setError("");
        try {
            let res = await fetch(Urls.SERVER + Urls.ADD_TESTIMONY, {
                method: "POST",
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                }),
                body: JSON.stringify({
                    testimony: testimony,
                }),
            });
            let resJson = await res.json();
            if (res.status === 201) {
                setCount(count + 1);
                setButtonDisable("");
                setIsSubmitting(false);
                window.location.reload();
            } else if (res.status === 400) {
                setButtonDisable("");
                setIsSubmitting(false);
                setError(resJson.error);
            } else {
                setButtonDisable("");
                setIsSubmitting(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTestimony = async (e) => {
        e.preventDefault();
        setButtonDisable("diasbled");
        setIsSubmitting(true);
        setError("");
        try {
            let res = await fetch(Urls.SERVER + Urls.DELETE_TESTIMONY, {
                method: "POST",
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                }),
                body: JSON.stringify({
                    t_id: testimony.t_id,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setButtonDisable("");
                setIsSubmitting(false);
                window.location.reload();
            } else if (res.status === 400) {
                setButtonDisable("");
                setIsSubmitting(false);
                setError(resJson.error);
            } else {
                setButtonDisable("");
                setIsSubmitting(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate();
    const goToDashboard = () => {
        navigate('/user/dashboard')
    }

    return (
        loading ? <LoaderMain /> :
            ifProfileExists ?
                ifTestimonyExists ?
                    <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
                        <DashboardTopBar title="Testimonial" />
                        <div className='container shadow-sm rounded p-3'>
                            <div>{testimony.testimony}</div>
                            <form onSubmit={deleteTestimony}>
                                <input type='hidden' required onChange={(e) => setTestimonyId(testimony.testimony)} />
                                <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Delete'}</button>
                            </form>
                        </div>
                    </div>
                    :
                    <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
                        <DashboardTopBar title="Testimonial" />
                        <div className='container shadow-sm rounded p-3'>
                            <div className='row'>
                                <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                                    <div className="row">
                                        <div class="mb-3">
                                            <label className="form-label">Write Testimonial</label>
                                            <textarea className="form-control" rows="3" required onChange={(e) => setTestimony(e.target.value)}></textarea>
                                            {isError ? <small className='text-danger'>{isError.testimony}</small> : ""}
                                        </div>
                                    </div>
                                    <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                :

                <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
                    <DashboardTopBar title="Profle Details" />
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

export default Testimonial