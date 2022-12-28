import React, { useEffect, useState } from 'react';
import Urls from '../api/Urls';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchAlumni = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(location.state.query);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [alumni, setAlumni] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
        const search = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.SEARCH_ALUMNI, {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        search: searchQuery
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    if (resJson.isAvailable === false) {
                        setIsEmpty(true);
                    } else {
                        setAlumni(resJson.alumni)
                        setIsEmpty(false);
                    }
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        search();
    }, [count]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCount(count + 1);
    }

    const goToAlumniDetails = (alumni_id) => {
        navigate('/alumni-details', {
            state: {
                alumni_id: alumni_id,
            }
        })
    }

    return (
        <div className='container p-3 all-alumni'>
            {loading ?
                <div className='row'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '70vh' }}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div> :
                <div className='row'>
                    <div className='col-sm-12 my-3'>
                        <div className='mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5>Search Results</h5>
                            <form className='search-alumni' onSubmit={handleSubmit} style={{ marginTop: '-8px' }}>
                                <input type="text" placeholder="Search Alumni" onChange={(e) => setSearchQuery(e.target.value)} />
                            </form>
                        </div>
                        {isEmpty ?
                            <div className='empty'>
                                <img src={require('../assets/img/empty.png')} alt="Empty" />
                                <h6>No Records Found!</h6>
                            </div>
                            :
                            <div className='row'>
                                {alumni.map((alumni, index) => (
                                    <div className='col-sm-3' key={index}>
                                        <div className="card shadow alumni-card" style={{ width: '100%' }} onClick={() => goToAlumniDetails(alumni.alumni_id)}>
                                            <img src={Urls.IMAGE + alumni.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{alumni.firstname} {alumni.middlename} {alumni.lastname}</h5>
                                                <p className="card-text">{alumni.course} - {alumni.year_of_passing}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>

            }
        </div>
    )
}

export default SearchAlumni