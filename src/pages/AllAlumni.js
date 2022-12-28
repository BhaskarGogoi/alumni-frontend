import React, { useState, useEffect } from 'react'
import Urls from '../api/Urls';
import { useNavigate } from 'react-router-dom';

const AllAlumni = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [alumni, setAlumni] = useState();
    const [year, setYear] = useState("all");
    const [years, setYears] = useState();
    const [course, setCourse] = useState("all");
    const [empty, setEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const [view, setView] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
        const current_year = new Date().getFullYear();
        let years = [];
        for (let i = current_year; i >= 1980; i--) {
            years.push(i);
        }
        setYears(years);
    }, [])

    useEffect(() => {
        const getAlumni = async () => {
            try {
                let res = await fetch(Urls.SERVER + Urls.GET_ALL_ALUMNI, {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        year: year,
                        course: course,
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    if (resJson.alumni === "Empty") {
                        setEmpty(true);
                    } else {
                        setView(resJson.view);
                        setAlumni(resJson.alumni)
                        setEmpty(false);
                    }
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAlumni()
    }, [year, course]);

    const goToAlumniDetails = (alumni_id) => {
        navigate('/alumni-details', {
            state: {
                alumni_id: alumni_id,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/search-alumni', {
            state: {
                query: searchQuery
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
                        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <form className='search-alumni' onSubmit={handleSubmit}>
                                <input type="text" name="search" placeholder="Search Alumni" onChange={(e) => setSearchQuery(e.target.value)} />
                            </form>
                            <div className='filters'>
                                <span style={{ marginTop: '12px' }}>Filter By</span>
                                <div className='select-box'>
                                    <span>By Course</span>
                                    <select onChange={(e) => setCourse(e.target.value)}>
                                        <option value="all">All</option>
                                        <option value="MCA">MCA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="BSc IT">BSc IT</option>
                                        <option value="PGDCA">PGDCA</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                                <div className='select-box'>
                                    <span>By Year</span>
                                    <select onChange={(e) => setYear(e.target.value)}>
                                        <option value="all">All</option>
                                        {years.map((year, index) => (
                                            <option value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr />
                    </div>
                    {empty ?
                        <div className='empty'>
                            <img src={require('../assets/img/empty.png')} alt="Empty" />
                            <h6>No Records Found!</h6>
                        </div>
                        :
                        <div className='allAlumniRow'>
                            {alumni.map((alumni, index) => (
                                <div className='alumni-card-main' key={index}>
                                    <div className="card shadow alumni-card" style={{ width: '100%' }} onClick={() => goToAlumniDetails(alumni.alumni_id)}>
                                        <img src={Urls.IMAGE + alumni.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{alumni.firstname} {alumni.middlename} {alumni.lastname}</h5>
                                            {view == "1" ?
                                                <p>
                                                    {alumni.courses.map((course, index) => (
                                                        <span>{course}</span>
                                                    ))}
                                                </p>
                                                : <p>{alumni.course} - {alumni.year_of_passing}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>}
        </div>
    )
}

export default AllAlumni