import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import Slide1 from '../assets/img/slides/slide1.jpg';
import Slide2 from '../assets/img/slides/slide2.jpg';
import Slide3 from '../assets/img/slides/slide3.jpg';

const IndexPage = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState();
    const [isNotification, setIsNotification] = useState(false);
    const [loadingNotification, setLoadingNotification] = useState(true);
    const [events, setEvents] = useState();
    const [areEvents, setAreEvents] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [areTestimonials, setAreTestimonials] = useState(false);
    const [testimonials, setTestimonials] = useState();
    const [loadingSlides, setLoadingSlides] = useState(true);
    const [slides, setSlides] = useState();

    let handleEventNavigation = (event_id) => {
        navigate('/event', {
            state: {
                event_id: event_id,
            }
        })
    }
    const goToAbout = () => {
        navigate('/about')
    }
    const goToDashboard = () => {
        navigate('/user/dashboard')
    }
    const goToAllEvents = () => {
        navigate('/all-events')
    }
    const goToAllNotifications = () => {
        navigate('/all-notifications')
    }

    const goToAlumniDetails = (alumni_id) => {
        navigate('/alumni-details', {
            state: {
                alumni_id: alumni_id,
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const getHome = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.HOME, {
                    method: "GET",
                    mode: "cors",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setSlides(resJson.sliders);
                    setLoadingSlides(false);
                    setLoadingNotification(false);
                    setLoadingEvents(false);
                    //check if notifications available
                    if (resJson.notifications.length > 0) {
                        setIsNotification(true);
                        setNotifications(resJson.notifications);
                    }
                    //check if events are available
                    if (resJson.events.length > 0) {
                        setAreEvents(true);
                        setEvents(resJson.events);
                    }
                    //check if testimonials are available
                    if (resJson.testimonials.length > 0) {
                        setAreTestimonials(true);
                        setTestimonials(resJson.testimonials);
                        console.log(resJson.testimonials);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getHome()
    }, []);
    return (
        <>
            <section>
                {loadingSlides ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '200px' }}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                        <div class="carousel-indicators">
                            {slides.map((slide, index) => (
                                index === 0 ?
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    :
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label="Slide 1 + {index}"></button>
                            ))}
                            {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                        </div>
                        <div class="carousel-inner">
                            {slides.map((slide, index) => (
                                index === 0 ?
                                    <div class="carousel-item active" key={index}>
                                        <img src={Urls.IMAGE + slide.image} class="d-block w-100" />
                                    </div>
                                    :
                                    <div class="carousel-item" key={index}>
                                        <img src={Urls.IMAGE + slide.image} class="d-block w-100" />
                                    </div>
                            ))}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                }
            </section>
            {/* <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6' style={{ padding: 0 }}>
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={Slide1} className="d-block w-100" alt="Slide 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src={Slide2} className="d-block w-100" alt="Slide 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src={Slide3} className="d-block w-100" alt="Slide 3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6 carousel-about'>
                        <h5 className='heading'>WELCOME TO</h5>
                        <h3>Centre for Computer Science and Applications' Alumni Assiociation</h3>
                        <button onClick={goToDashboard}>GET STARTED</button>
                    </div>
                </div>
            </div> */}
            <section id="about">
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='about'>
                                <header><h4>ABOUT</h4></header>
                                <p>It is one of the premier institutes of North-East-India imparting computer education. Dibrugarh University initiated its journey of imparting computer education by establishing a Computer Centre in 1976. The Computer Centre was established with the objective of creating Computer awareness among the teachers, research scholars and employees of the University. It started Computer education by introducing a "Six-months Certificate Course on Computer Programming".</p>
                                <button onClick={goToAbout}>Read More &nbsp;<i className="fas fa-angle-right"></i></button>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='notifications'>
                                <header><h4>NOTIFICATIONS</h4></header>
                                {loadingNotification ?
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '200px' }}>
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    isNotification ?
                                        <div>
                                            {notifications.map((notification, index) => (
                                                <div key={index}>
                                                    <div className='notification-card shadow-sm'>
                                                        <i className="fas fa-bell"></i>
                                                        <p>
                                                            {notification.notification}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={goToAllNotifications}>View All &nbsp;<i className="fas fa-angle-right"></i></button></div>
                                        : <div><i className="fas fa-bell"></i> No Notifications Yet</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="events">
                <div className='container'>
                    <div className='row'>
                        <header>
                            <h4>OUR EVENTS</h4>
                            <button onClick={goToAllEvents}>View All &nbsp;<i className="fas fa-angle-right"></i></button>
                        </header>
                    </div>
                    {loadingEvents ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '200px' }}>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        areEvents ?
                            <div className='row'>
                                {events.map((event, index) => (
                                    <div className='col-sm-4' key={index} >
                                        <div className='event-card' onClick={() => handleEventNavigation(event.event_id)}>
                                            <img src={Urls.IMAGE + event.image} alt={event.title} />
                                            <h5>{event.title}</h5>
                                            <h6>READ MORE <i className="fas fa-arrow-right"></i></h6>
                                        </div>
                                    </div>
                                ))}
                            </div> : "No Events Yet!"}
                </div>
            </section>
            {areTestimonials ?
                <section className='testimonial'>
                    <div className='container'>
                        <div className='row'>
                            <header>
                                <h4>WHAT OUR ALUMNI SAYS</h4>
                            </header>
                            <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="true">
                                <div class="carousel-indicators" style={{ display: 'none' }}>
                                    {/* {events.map((event, index) => (
                                        <div className='col-sm-4' key={index} >
                                            <div className='event-card' onClick={() => handleEventNavigation(event.event_id)}>
                                                <img src={Urls.IMAGE + event.image} alt={event.title} />
                                                <h5>{event.title}</h5>
                                                <h6>READ MORE <i className="fas fa-arrow-right"></i></h6>
                                            </div>
                                        </div>
                                    ))} */}

                                    {testimonials.map((testimony, index) => (
                                        index === 0 ?
                                            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" class="active" aria-current="true" aria-label={testimony.t_id}></button>
                                            :
                                            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to={index} aria-label={testimony.t_id}></button>

                                    ))}

                                    {/* {slides.map((slide, index) => (
                                    index === 0 ?
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        :
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label="Slide 1 + {index}"></button>
                                    ))} */}
                                    {/* 
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="active" aria-current="true" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="active" aria-current="true" aria-label="Slide 3"></button> */}
                                </div>
                                <div class="carousel-inner">
                                    {testimonials.map((testimony, index) => (
                                        index === 0 ?
                                            <div class="carousel-item active" key={index}>
                                                <div className='text'>
                                                    <i className="fas fa-quote-left quote"></i>
                                                    <div className='message'>
                                                        <p>{testimony.testimony}</p>
                                                    </div>
                                                    <div className='author' style={{ cursor: 'pointer' }} onClick={() => goToAlumniDetails(testimony.alumni_id)}>
                                                        <b>{testimony.firstname} {testimony.middlename} {testimony.lastname}</b><br />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div class="carousel-item" key={index}>
                                                <div className='text'>
                                                    <i className="fas fa-quote-left quote"></i>
                                                    <div className='message'>
                                                        <p>{testimony.testimony}</p>
                                                    </div>
                                                    <div className='author' style={{ cursor: 'pointer' }} onClick={() => goToAlumniDetails(testimony.alumni_id)}>
                                                        <b>{testimony.firstname} {testimony.middlename} {testimony.lastname}</b><br />
                                                    </div>
                                                </div>
                                            </div>
                                    ))}


                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                : ""}
        </>

    )
}

export default IndexPage