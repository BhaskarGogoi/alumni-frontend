import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';


const FillForm = ({ status, alumniDetails, courses }) => {
    const navigate = useNavigate();

    const goToCompleteProfile = () => {
        navigate('/user/complete-profile')
    }
    const gotToUploadImage = () => {
        navigate('/user/upload-image')
    }
    const gotToProfile = () => {
        navigate('/user/profile')
    }
    const [button, setButton] = useState();
    useEffect(() => {
        if (status === "Not Registered") {
            setButton(<button className='btn btn-primary shadow' onClick={goToCompleteProfile} >Fill Now</button>)
        } else if (status === "submitted") {
            setButton(<button className='btn btn-primary shadow' onClick={gotToUploadImage} >Upload Image</button>)
        } else if (status === "Image Uploaded") {
            setButton(<button className='btn btn-primary shadow' onClick={gotToProfile} >View Profile</button>)
        }
    }, [])


    if (status === 'Not Registered') {
        return (
            <div>
                <div className='my-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Complete your alumni profile.</h5>
                    {button}
                </div>
            </div>
        )
    } else if (status === 'submitted') {
        return (
            <div>
                <div className='my-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Complete your alumni profile.</h5>
                    {button}
                </div>
            </div>
        )
    } else if (status === 'Image Uploaded') {

        return (
            <div>
                <div className='my-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Profile Under Review</h5>
                    {button}
                </div>
            </div>
        )

    } else if (status === 'approved') {
        return (
            <div className='py-3'>
                <h6>Profile</h6>
                <div style={{ display: 'flex' }}>
                    <img src={Urls.IMAGE + `${alumniDetails.image}`} width={100} />
                    <div style={{ marginLeft: '20px' }}>
                        <b>Name:</b> {alumniDetails.firstname} {alumniDetails.middlename} {alumniDetails.lastname} <br />
                        <b>Courses: </b>
                        {courses.map((course, index) => (
                            <span><br /> {course.course} - {course.year_of_passing}</span>
                        ))}
                        <br />
                        <button className='btn-orange' onClick={gotToProfile}>View Profile</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default FillForm
