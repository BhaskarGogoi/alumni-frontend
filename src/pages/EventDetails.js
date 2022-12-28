import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';

const EventDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event_id = location.state.event_id;

    const [event, setEvent] = useState();
    const [eventLoading, setEventLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState();
    const [loadingRecentPosts, setLoadingRecentPosts] = useState(true);

    let handleEventNavigation = (event_id) => {
        navigate('/event', {
            state: {
                event_id: event_id,
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const getEvent = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_EVENT_BY_ID, {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        event_id: event_id
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setEventLoading(false);
                    setEvent(resJson.event);
                    setLoadingRecentPosts(false);
                    setRecentPosts(resJson.recent_posts);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getEvent()
    }, [event_id]);

    return (
        <section className='mt-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8 p-3'>
                        {eventLoading ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '200px' }}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            : <div className='event-details'>
                                <h4>{event.title}</h4>
                                <img src={Urls.IMAGE + event.image} alt={event.title} />
                                <div className='time'><i className="fas fa-clock"></i> &nbsp; {event.date}</div>
                                <div className='content' dangerouslySetInnerHTML={{ __html: event.content }} />
                            </div>}
                    </div>
                    <div className='col-sm-4 p-3'>
                        {loadingRecentPosts ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '200px' }}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            <div className='recent_posts'>
                                <h4>Recent Posts</h4>
                                {recentPosts.map((post, index) => (
                                    <div className='row mt-4' key={index} onClick={() => handleEventNavigation(post.event_id)}>
                                        <div className='col-sm-5'>
                                            <img src={Urls.IMAGE + post.image} alt={post.title} />
                                        </div>
                                        <div className='col-sm-7'>
                                            <div className='time'>
                                                <i className="fas fa-clock"></i> &nbsp; {post.date}
                                            </div>
                                            <h5>{post.title}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetails