import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import { LoaderMain, DashboardTopBar, ProfileStatusBar } from '../components/index';
import ProfileInComplete from '../assets/img/profile-incomplete.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const authToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState();
  const [time, setTime] = useState();
  const [occupations, setOccupations] = useState();
  const [showSocialHandles, setShowSocialHandles] = useState();
  const [coursesCompleted, setCoursesCompleted] = useState();
  const [higherEducations, setHigherEducations] = useState();
  const [status, setStatus] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setError] = useState();
  const [occupationLength, setOccupationLength] = useState();

  //form inputs
  const [designation, setDesignation] = useState();
  const [organization, setOrganization] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [currently_work_here, set_currently_work_here] = useState("no");

  const [course, setCourse] = useState();
  const [year_of_passing, set_year_of_passing] = useState();
  const [years, setYears] = useState();

  const [higherEducation, setHigherEducation] = useState();
  const [higher_education_passing_year, set_higher_education_passing_year] = useState();
  const [institute, setInstitute] = useState();

  const [socialHandle, setSocialHandle] = useState();
  const [socialHandleType, setSocialHandleType] = useState();


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

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/user/dashboard')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const current_year = new Date().getFullYear();
    let years = [];
    for (let i = current_year; i >= 1980; i--) {
      years.push(i);
    }
    setYears(years);

    const getProfileDetails = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.GET_PROFILE_DETAILS, {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setProfileDetails(resJson.alumni);
          setOccupations(resJson.occupations);
          setCoursesCompleted(resJson.courses);
          setHigherEducations(resJson.higherEducation);
          setOccupationLength(resJson.occupations.length);
          setShowSocialHandles(resJson.social_handles);
          setTime(resJson.time)
          if (resJson.alumni.status === "Image Uploaded") {
            setStatus(true);
          } else if (resJson.alumni.status === "approved") {
            setStatus(true);
          }
        } else if (resJson.status === "not-completed") {
          setStatus(false);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProfileDetails()
  }, [occupationLength]);

  const addCourses = async (e) => {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
    setError("");
    try {
      let res = await fetch(Urls.SERVER + Urls.ADD_COURSE, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: JSON.stringify({
          course: course,
          year_of_passing: year_of_passing
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setButtonDisable("");
        setIsSubmitting(false);
        setOccupationLength(occupationLength + 1);
        successToast("Course Added");
      } else if (res.status === 400) {
        setButtonDisable("");
        setIsSubmitting(false);
        setError(resJson.error);
        errorToast("Oops! Something went wrong.");
      } else {
        setButtonDisable("");
        setIsSubmitting(false);
        errorToast("Oops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeCourse = async (courses_completed_id) => {
    if (window.confirm("Are you want to delete?")) {
      setButtonDisable("diasbled");
      setIsSubmitting(true);
      try {
        let res = await fetch(Urls.SERVER + Urls.REMOVE_COURSE, {
          method: "POST",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }),
          body: JSON.stringify({
            courses_completed_id: courses_completed_id
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setButtonDisable("");
          setIsSubmitting(false);
          setOccupationLength(occupationLength - 1);
          successToast("Course Deleted");
        } else if (res.status === 400) {
          setButtonDisable("");
          setIsSubmitting(false);
          setError(resJson.error);
          errorToast("Oops! Something went wrong.");
        } else {
          setButtonDisable("");
          setIsSubmitting(false);
          errorToast("Oops! Something went wrong.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //add higher education
  const addHigherEducation = async (e) => {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
    setError("");
    try {
      let res = await fetch(Urls.SERVER + Urls.ADD_HIGHER_EDUCATION, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: JSON.stringify({
          course: higherEducation,
          year_of_passing: higher_education_passing_year,
          institute: institute
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setButtonDisable("");
        setIsSubmitting(false);
        setOccupationLength(occupationLength + 1);
        successToast("Course Added");
      } else if (res.status === 400) {
        setButtonDisable("");
        setIsSubmitting(false);
        setError(resJson.error);
        errorToast("Oops! Something went wrong.");
      } else {
        setButtonDisable("");
        setIsSubmitting(false);
        errorToast("Oops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeHigherEducation = async (higher_education_id) => {
    if (window.confirm("Are you want to delete?")) {
      setButtonDisable("diasbled");
      setIsSubmitting(true);
      try {
        let res = await fetch(Urls.SERVER + Urls.REMOVE_HIGHER_EDUCATION, {
          method: "POST",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }),
          body: JSON.stringify({
            higher_education_id: higher_education_id
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setButtonDisable("");
          setIsSubmitting(false);
          setOccupationLength(occupationLength - 1);
          successToast("Course Deleted");
        } else if (res.status === 400) {
          setButtonDisable("");
          setIsSubmitting(false);
          setError(resJson.error);
          errorToast("Oops! Something went wrong.");
        } else {
          setButtonDisable("");
          setIsSubmitting(false);
          errorToast("Oops! Something went wrong.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //social handle
  const addSocialHandle = async (e) => {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
    setError("");
    try {
      let res = await fetch(Urls.SERVER + Urls.ADD_SOCIAL_HANDLE, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: JSON.stringify({
          socialHandle: socialHandle,
          socialHandleType: socialHandleType
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setButtonDisable("");
        setIsSubmitting(false);
        setOccupationLength(occupationLength + 1);
        successToast("Social Handle Added");
      } else if (res.status === 400) {
        setButtonDisable("");
        setIsSubmitting(false);
        setError(resJson.error);
        errorToast("Oops! Something went wrong.");
      } else {
        setButtonDisable("");
        setIsSubmitting(false);
        errorToast("Oops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeSocialHandle = async (social_handle_id) => {
    if (window.confirm("Are you want to delete?")) {
      setButtonDisable("diasbled");
      setIsSubmitting(true);
      try {
        let res = await fetch(Urls.SERVER + Urls.REMOVE_SOCIAL_HANDLE, {
          method: "POST",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }),
          body: JSON.stringify({
            social_handle_id: social_handle_id
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setButtonDisable("");
          setIsSubmitting(false);
          setOccupationLength(occupationLength - 1);
          successToast("Social Handle Deleted");
        } else if (res.status === 400) {
          setButtonDisable("");
          setIsSubmitting(false);
          setError(resJson.error);
          errorToast("Oops! Something went wrong.");
        } else {
          setButtonDisable("");
          setIsSubmitting(false);
          errorToast("Oops! Something went wrong.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //add occupations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
    setError("");
    try {
      let res = await fetch(Urls.SERVER + Urls.ADD_OCCUPATION, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: JSON.stringify({
          designation: designation,
          organization: organization,
          from_date: fromDate,
          to_date: toDate,
          currently_work_here: currently_work_here
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setButtonDisable("");
        setIsSubmitting(false);
        setOccupationLength(occupationLength + 1);
        successToast("Occupation Added");
      } else if (res.status === 400) {
        setButtonDisable("");
        setIsSubmitting(false);
        setError(resJson.error);
        errorToast("Oops! Something went wrong.");
      } else {
        setButtonDisable("");
        setIsSubmitting(false);
        errorToast("Oops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeOccupation = async (occupation_id) => {
    if (window.confirm("Are you want to delete?")) {
      setButtonDisable("diasbled");
      setIsSubmitting(true);
      try {
        let res = await fetch(Urls.SERVER + Urls.REMOVE_OCCUPATION, {
          method: "POST",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }),
          body: JSON.stringify({
            occupation_id: occupation_id
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setButtonDisable("");
          setIsSubmitting(false);
          setOccupationLength(occupationLength - 1);
          successToast("Occupation Deleted");
        } else if (res.status === 400) {
          setButtonDisable("");
          setIsSubmitting(false);
          setError(resJson.error);
          errorToast("Oops! Something went wrong.");
        } else {
          setButtonDisable("");
          setIsSubmitting(false);
          errorToast("Oops! Something went wrong.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    isLoading ? <LoaderMain /> :
      status ?
        <div className='profile-details' style={{ flex: 1, marginBottom: 90, paddingTop: '20px', }}>
          {/* add occupation modal */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Occupation</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Occupation</label>
                          <input type="text" className="form-control" name="designation" required onChange={(e) => setDesignation(e.target.value)} />
                          {isError ? <small className='text-danger'>{isError.designation}</small> : ""}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Company/Organization</label>
                          <input type="text" className="form-control" name="organization" required onChange={(e) => setOrganization(e.target.value)} />
                          {isError ? <small className='text-danger'>{isError.organization}</small> : ""}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>From</label>
                          <input type="date" className="form-control" name="from" required onChange={(e) => setFromDate(e.target.value)} />
                        </div>
                      </div>
                      {currently_work_here === 'no' ?
                        <div className='col-sm-6'>
                          <div className='inputField'>
                            <label>To</label>
                            <input type="date" className="form-control" name="to" required onChange={(e) => setToDate(e.target.value)} />
                          </div>
                        </div>
                        : ""}
                      <div className="col-sm-6">
                        <div className="mb-3 form-check mt-3">
                          {currently_work_here === "no" ?
                            <input type="checkbox" className="form-check-input" name="currently_work_here" value="yes" onChange={(e) => set_currently_work_here(e.target.value)} />
                            :
                            <input type="checkbox" className="form-check-input" name="currently_work_here" value="no" onChange={(e) => set_currently_work_here(e.target.value)} />
                          }
                          <label className="form-check-label">Currenty Work Here</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {/* add course modal */}
          <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-labelledby="addCourseModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Course</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addCourses}>
                    <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Course</label>
                          <select className="form-control" onChange={(e) => setCourse(e.target.value)}>
                            <option>SELECT</option>
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="PGDCA">PGDCA</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Year of passing</label>
                          <select className="form-control" onChange={(e) => set_year_of_passing(e.target.value)}>
                            <option>SELECT</option>
                            {years.map((years, index) => (
                              <option value={years}>{years}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {/* add higher education modal */}
          <div className="modal fade" id="addHigherEducationModal" tabIndex="-1" aria-labelledby="addHigherEducationModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Higher Education</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addHigherEducation}>
                    <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Course</label>
                          <select className="form-control" onChange={(e) => setHigherEducation(e.target.value)} required>
                            <option>SELECT</option>
                            <option value="SLET">SLET</option>
                            <option value="NET">NET</option>
                            <option value="PHD">PHD</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Year of passing</label>
                          <select className="form-control" onChange={(e) => set_higher_education_passing_year(e.target.value)} required>
                            <option>SELECT</option>
                            {years.map((years, index) => (
                              <option value={years}>{years}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='col-sm-12'>
                        <div className='inputField'>
                          <label>Institute/Board</label>
                          <input type="text" className="form-control" name="institute" required onChange={(e) => setInstitute(e.target.value)} />
                          {isError ? <small className='text-danger'>{isError.institute}</small> : ""}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {/* add social handle modal */}
          <div className="modal fade" id="addSocialHandleModal" tabIndex="-1" aria-labelledby="addSocialHandleModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Social Handle</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addSocialHandle}>
                    <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                      <div className="col-sm-6">
                        <div className='inputField'>
                          <label>Choose Social Handle</label>
                          <select className="form-control" onChange={(e) => setSocialHandleType(e.target.value)} required>
                            <option>SELECT</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">Linkedin</option>
                            <option value="website">Portfolio Website</option>
                          </select>
                          {isError ? <small className='text-danger'>{isError.socialHandleType}</small> : ""}
                        </div>
                      </div>
                      <div className='col-sm-12'>
                        <div className='inputField'>
                          <label>Profile Url</label>
                          <input type="url" className="form-control" name="profile_url" required placeholder="eg. https://www.facebook.com/JohnDoe" onChange={(e) => setSocialHandle(e.target.value)} />
                          {isError ? <small className='text-danger'>{isError.socialHandle}</small> : ""}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>


          <DashboardTopBar title="Profle Details" />
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
          <div className='dashboard-content shadow-sm top-image'>
            <div className='container' style={{ textAlign: 'center' }}>
              <img src={Urls.IMAGE + `${profileDetails.image}`} alt={profileDetails.firstname} style={{ width: '100px' }} />
            </div>
          </div>
          <div className='dashboard-content shadow-sm mt-2'>
            <div className='container'>
              <div className='row p-3'>
                <div className='col-sm-10'>
                  <div className='mb-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <h5>Personal Details</h5> <ProfileStatusBar status={profileDetails.status} />
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <i className="fas fa-user-circle"></i> {profileDetails.firstname} {profileDetails.middlename} {profileDetails.lastname}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <i className="fas fa-venus-mars"></i> {profileDetails.gender}
                      </div>
                      <div className="col-sm-4">
                        <i className="fas fa-birthday-cake"></i> {profileDetails.dob}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <i className="fas fa-university"></i> Reg No: {profileDetails.registrationNo}
                      </div>
                    </div>
                    <div className='row'>
                      <div className="col-sm-12" style={{ display: 'flex' }}>
                        <i className="fas fa-map-marked"></i>
                        &nbsp;
                        <div>
                          {profileDetails.address}, {profileDetails.city}, {profileDetails.state}, {profileDetails.country}, {profileDetails.pin}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className='col-sm-2 side-image'>
                  <img src={Urls.IMAGE + `${profileDetails.image}`} alt={profileDetails.firstname} style={{ width: '100px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className='dashboard-content shadow-sm mt-2'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-6 p-3'>
                  <h5 className='mb-2'>Courses Taken</h5>
                  {coursesCompleted.map((course, index) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-graduation-cap"></i>
                        <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                          {course.course} - {course.year_of_passing}
                        </div>
                      </div>
                      <button className='remove-btn' onClick={() => removeCourse(course.courses_completed_id)} disabled={buttonDisable}><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                  <div data-bs-toggle="modal" data-bs-target="#addCourseModal">
                    <i className="fas fa-pen" style={{ backgroundColor: 'transparent', color: '#1876F2', cursor: 'pointer' }}></i>
                    <span style={{ color: '#1876F2', cursor: 'pointer' }}>Add Course</span>
                  </div>
                </div>
                <div className='col-sm-6 p-3'>
                  <h5>Higher Education From Other Institute</h5>
                  {higherEducations.map((higherEducation, index) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-briefcase"></i>
                        <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                          {higherEducation.course} at {higherEducation.institute} <br />
                          <div style={{ fontSize: '12px' }}>{higherEducation.year_of_passing}</div>
                        </div>
                      </div>
                      <button className='remove-btn' onClick={() => removeHigherEducation(higherEducation.higher_education_id)} disabled={buttonDisable}><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                  <div data-bs-toggle="modal" data-bs-target="#addHigherEducationModal">
                    <i className="fas fa-pen" style={{ backgroundColor: 'transparent', color: '#1876F2', cursor: 'pointer' }}></i>
                    <span style={{ color: '#1876F2', cursor: 'pointer' }}>Add Course</span>
                  </div>
                </div>
                <div className='col-sm-6 p-3'>
                  <h5>Occupation(s)</h5>
                  {occupations.map((occupation, index) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-briefcase"></i>
                        <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                          {occupation.designation} at {occupation.organization} <br />
                          <div style={{ fontSize: '12px' }}>{occupation.from_date} - {occupation.to_date}</div>
                          {occupation.package ?
                            <div style={{ fontSize: '12px' }}>Package: {occupation.package}</div>
                            : ""
                          }
                        </div>
                      </div>
                      <button className='remove-btn' onClick={() => removeOccupation(occupation.occupation_id)} disabled={buttonDisable}><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                  <div data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fas fa-pen" style={{ backgroundColor: 'transparent', color: '#1876F2', cursor: 'pointer' }}></i>
                    <span style={{ color: '#1876F2', cursor: 'pointer' }}>Add Occupation</span>
                  </div>
                </div>

                <div className='col-sm-6 p-3'>
                  <h5>Social Handles</h5>
                  {showSocialHandles.map((socialHandle, index) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      {socialHandle.social_handle_type === 'facebook' ?
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <i class="fab fa-facebook-f"></i>
                          <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                            <a href={socialHandle.social_handle} target="_blank">Facebook</a>
                          </div>
                        </div>
                        :
                        socialHandle.social_handle_type === 'instagram' ?
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i class="fab fa-instagram"></i>
                            <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                              <a href={socialHandle.social_handle} target="_blank">Instagram</a>
                            </div>
                          </div>
                          :
                          socialHandle.social_handle_type === 'linkedin' ?
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <i class="fab fa-linkedin-in"></i>
                              <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                                <a href={socialHandle.social_handle} target="_blank">Linkedin</a>
                              </div>
                            </div>
                            :
                            socialHandle.social_handle_type === 'website' ?
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <i class="fas fa-globe"></i>
                                <div style={{ marginLeft: '4px', marginTop: '-12px' }}>
                                  <a href={socialHandle.social_handle} target="_blank">Portfolio Website</a>
                                </div>
                              </div>
                              : ''
                      }
                      <button className='remove-btn' onClick={() => removeSocialHandle(socialHandle.social_handle_id)} disabled={buttonDisable}><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                  <div data-bs-toggle="modal" data-bs-target="#addSocialHandleModal">
                    <i className="fas fa-pen" style={{ backgroundColor: 'transparent', color: '#1876F2', cursor: 'pointer' }}></i>
                    <span style={{ color: '#1876F2', cursor: 'pointer' }}>Add Social Handle</span>
                  </div>
                </div>
                {/* <div className='col-sm-6 p-3'>
                    <h5>Payment Details</h5>
                    <p>
                      <i className="fas fa-rupee-sign"></i> {profileDetails.amount}  <br/>
                      <i className="far fa-credit-card"></i> {profileDetails.method} <br/>
                      <i className="fas fa-clock"></i> {time} <br/>  
                    </p>
                </div>                     */}
              </div>
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

export default Profile