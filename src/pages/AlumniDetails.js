import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Urls from '../api/Urls';

const AlumniDetails = () => {
    const location = useLocation();
    const alumni_id = location.state.alumni_id;
    const [loading, setLoading] = useState(true);

    const [alumni, setAlumni] = useState();
    const [occupations, setOccupations] = useState();
    const [courses, setCourses] = useState();
    const [higherEducation, setHigherEducation] = useState();
    const [socialHandles, setSocialHandles] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
        const getAlumni = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_ALUMNI_BY_ID, {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        alumni_id: alumni_id
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setLoading(false);
                    setAlumni(resJson.alumni);
                    setOccupations(resJson.occupations);
                    setCourses(resJson.courses);
                    setHigherEducation(resJson.higher_education);
                    setSocialHandles(resJson.social_handles);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAlumni()
    }, [alumni_id]);

    return (
        <div className='container'>
            {loading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '75vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className='alumni-details'>
                    <h5>Alumni Details</h5>
                    <div className="card shadow-sm" style={{ width: '100%' }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-sm-8'>
                                    <div className="row">
                                        <div className='col-sm-12' style={{ textAlign: 'center' }}>
                                            <img src={Urls.IMAGE + `${alumni.image}`} alt={alumni.firstname} className="top-image" />
                                        </div>
                                        <div className='col-sm-12' style={{ textAlign: 'center' }}>
                                            <div className='top-social-handles'>
                                                {socialHandles.map((socialHandle, index) => (
                                                    <div>
                                                        {socialHandle.social_handle_type === 'facebook' ?
                                                            <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-facebook-f"></i></a>
                                                            :
                                                            socialHandle.social_handle_type === 'instagram' ?
                                                                <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-instagram"></i></a>
                                                                :
                                                                socialHandle.social_handle_type === 'linkedin' ?
                                                                    <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                                                    :
                                                                    socialHandle.social_handle_type === 'website' ?
                                                                        <a href={socialHandle.social_handle} target="_blank"><i class="fas fa-globe"></i></a>
                                                                        : ''
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <i className="fas fa-user-circle"></i> {alumni.firstname} {alumni.middlename} {alumni.lastname}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <i className="fas fa-venus-mars"></i> {alumni.gender}
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className="col-sm-12" style={{ display: 'flex' }}>
                                            <i className="fas fa-map-marked"></i>
                                            &nbsp;
                                            <div>
                                                {alumni.address}, {alumni.city}, {alumni.state}, {alumni.country}, {alumni.pin}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <img src={Urls.IMAGE + `${alumni.image}`} alt={alumni.firstname} className="side-image" />
                                    {/* </div>
                                <div className='col-sm-4'> */}
                                    <div className='side-social-handles'>
                                        {socialHandles.map((socialHandle, index) => (
                                            <div>
                                                {socialHandle.social_handle_type === 'facebook' ?
                                                    <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-facebook-f"></i></a>
                                                    :
                                                    socialHandle.social_handle_type === 'instagram' ?
                                                        <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-instagram"></i></a>
                                                        :
                                                        socialHandle.social_handle_type === 'linkedin' ?
                                                            <a href={socialHandle.social_handle} target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                                            :
                                                            socialHandle.social_handle_type === 'website' ?
                                                                <a href={socialHandle.social_handle} target="_blank"><i class="fas fa-globe"></i></a>
                                                                : ''
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='card shadow-sm mt-3'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <h5>Course(s)</h5>
                                    {courses.map((course, index) => (
                                        <div className='mt-3'>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <i className="fas fa-graduation-cap"></i>
                                                    <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                                                        {course.course} <br />
                                                        <div style={{ fontSize: '12px' }}>{course.year_of_passing}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {occupations.length > 0 ?

                                    <div className='col-sm-6'>
                                        <h5>Occupation(s)</h5>
                                        {occupations.map((occupation, index) => (
                                            <div className='mt-3'>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <i className="fas fa-briefcase"></i>
                                                        <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                                                            {occupation.designation} at {occupation.organization} <br />
                                                            <div style={{ fontSize: '12px' }}>{occupation.from_date} - {occupation.to_date}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : ""
                                }
                                {higherEducation.length != 0 ?
                                    <div className='col-sm-6 mt-4'>
                                        <h5>Higher Education</h5>
                                        {higherEducation.map((higher_education, index) => (
                                            <div className='mt-3'>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <i className="fas fa-briefcase"></i>
                                                        <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                                                            {higher_education.course} at {higher_education.institute} <br />
                                                            <div style={{ fontSize: '12px' }}>{higher_education.year_of_passing}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AlumniDetails