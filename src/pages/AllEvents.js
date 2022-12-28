import React, { useState, useEffect } from 'react';
import Urls from '../api/Urls';
import { useNavigate } from 'react-router-dom';


const AllEvents = () => {
    const navigate = useNavigate();

    const [loadingEvents, setLoadingEvents] = useState(true);
    const [events, setEvents] = useState();
    const [totalEvents, setTotalEvents] = useState();
    const [sliceUpper, setSliceUpper] = useState(3);
    const [showLoadMore, setShowLoadMore] = useState(true);

    const handleEventNavigation = (event_id) => {
        navigate('/event', {
            state: {
                event_id: event_id,
            }
        })
    }
    const loadMore = () => {
        setSliceUpper((prevValue) => prevValue + 3);
        if (sliceUpper >= totalEvents) {
            setShowLoadMore(false);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const getAllEvents = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_ALL_EVENTS, {
                    method: "GET",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setLoadingEvents(false);
                    //check if events are available
                    if (resJson.events.length > 0) {
                        setTotalEvents(resJson.events.length);
                        setEvents(resJson.events);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAllEvents()
    }, []);


    return (
        <section className='mt-4'>
            <div className='container'>
                <div className='row'>
                    {loadingEvents ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '80vh' }}>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        <div className='mb-4'>
                            <div className='row'>
                                {events.slice(0, sliceUpper).map((event, index) => (
                                    <div className='col-sm-4' key={index} >
                                        <div className='event-card' onClick={() => handleEventNavigation(event.event_id)}>
                                            <img src={Urls.IMAGE + event.image} alt={event.title} />
                                            <h5>{event.title}</h5>
                                            <h6 className='mt-3'>READ MORE <i className="fas fa-arrow-right"></i></h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {showLoadMore ?
                                <div className='row' style={{ textAign: 'center' }}>
                                    <button className='event-load-more-btn' onClick={loadMore}>Load More</button>
                                </div> :
                                <div className='no_more_event'>
                                    <i class="far fa-frown icon"></i> No More Events!
                                </div>}
                        </div>}
                </div>
            </div>
        </section>
    )
}

export default AllEvents