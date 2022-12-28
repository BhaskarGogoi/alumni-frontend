import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import { LoaderMain, DashboardTopBar } from '../components/index';


const CompleteProfile = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [years, setYears] = useState();
  const [buttonDisable, setButtonDisable] = useState();
  const [isError, setError] = useState();
  const [viewCourses, setViewCourses] = useState(false);
  const [date, setDate] = useState();

  //form inputs
  const [firstname, setFirstname] = useState();
  const [middlename, setMiddlename] = useState();
  const [lastname, setLastname] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [course, setCourse] = useState();
  const [year_of_passing, setYear_of_passing] = useState();
  const [registrationNo, setRegistrationNo] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [pin, setPin] = useState();
  const [occupation, setOccupation] = useState();
  const [company, setCompany] = useState();
  const [occuFrom, setOccuFrom] = useState();
  const [occuTo, setOccuTo] = useState();
  const [compPackage, setCompPackage] = useState();
  const [currently_work_here, setCurrently_work_here] = useState("no");

  //useEffect for page view
  useEffect(() => {
    window.scrollTo(0, 0)
    const current_year = new Date().getFullYear();
    let years = [];
    for (let i = current_year; i >= 1980; i--) {
      years.push(i);
    }
    setYears(years);

    const getCourses = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.GET_ALUMNI_REGISTRATION, {
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
            navigate('/user/dashboard')
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCourses()
  }, []);

  const handlecountry = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const getCourse = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.GET_COURSES, {
          method: "POST",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setCourses(resJson.courses);
          setViewCourses(true);
          setDate(resJson.date);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCourse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable("diasbled");
    setIsSubmitting(true);
    setError("");
    try {
      let res = await fetch(Urls.SERVER + Urls.REGISTER_ALUMNI, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: JSON.stringify({
          firstname: firstname,
          middlename: middlename,
          lastname: lastname,
          gender: gender,
          dob: dob,
          registrationNo: registrationNo,
          course: course,
          year_of_passing: year_of_passing,
          address: address,
          city: city,
          state: state,
          pin: pin,
          country: country,
          occupation: occupation,
          company: company,
          package: compPackage,
          from_date: occuFrom,
          to_date: occuTo,
          currently_work_here: currently_work_here
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setButtonDisable("");
        setIsSubmitting(false);
        navigate('/user/upload-image')
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

  return (
    isLoading ? <LoaderMain /> :
      <div style={{ flex: 1, marginBottom: 50, padding: '5px', marginTop: '20px' }}>
        <DashboardTopBar title="Fill Form" />
        <div className='dashboard-content shadow-sm'>
          <div className='container'>
            <div className='row'>
              <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div className="row">
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Firstname</label>
                      <input type="text" className="form-control" required onChange={(e) => setFirstname(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.firstname}</small> : ""}
                    </div>
                    {/* <InputField type="text" label="Firstname"  req="rerquired" eventt={(e) => this.setFirstname(e.target.value)}/> */}
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Middlename</label>
                      <input type="text" className="form-control" onChange={(e) => setMiddlename(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Lastname</label>
                      <input type="text" className="form-control" required onChange={(e) => setLastname(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.lastname}</small> : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Date of Birth</label>
                      <input type="date" className="form-control" max={date} required onChange={(e) => setDob(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.dob}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label style={{ marginRight: '10px' }}>Gender</label> <br />
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label" >Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Other" onChange={(e) => setGender(e.target.value)} />
                      <label className="form-check-label">Other</label>
                    </div>
                    {isError ? <small className='text-danger'>{isError.gender}</small> : ""}
                  </div>

                </div>
                <div className='row mt-3'>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>University Registration No</label>
                      <input type="text" className="form-control" required onChange={(e) => setRegistrationNo(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.registrationNo}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4 selectInput">
                    <label>Course</label>
                    <select className="form-control" onChange={(e) => setCourse(e.target.value)}>
                      <option>SELECT</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                      <option value="BSc IT">BSc IT</option>
                      <option value="PGDCA">PGDCA</option>
                      <option value="PhD">PhD</option>
                    </select>
                    {isError ? <small className='text-danger'>{isError.course}</small> : ""}
                  </div>
                  <div className="col-sm-4 selectInput">
                    <label>Year of passing</label>
                    <select className="form-control" onChange={(e) => setYear_of_passing(e.target.value)}>
                      <option>SELECT</option>
                      {years.map((years, index) => (
                        <option value={years}>{years}</option>
                      ))}
                    </select>
                    {isError ? <small className='text-danger'>{isError.year_of_passing}</small> : ""}
                  </div>
                </div>
                <div className='row'>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Address</label>
                      <input type="text" className="form-control" required onChange={(e) => setAddress(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.address}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4 selectInput">
                    <label>Country</label>
                    <select className="form-control" onChange={(e) => setCountry(e.target.value)}>
                      <option>SELECT</option>
                      <option value="India">India</option>
                    </select>
                    {isError ? <small className='text-danger'>{isError.country}</small> : ""}
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>State</label>
                      <input type="text" className="form-control" required onChange={(e) => setState(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.state}</small> : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>City</label>
                      <input type="text" className="form-control" required onChange={(e) => setCity(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.city}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Pin</label>
                      <input type="number" className="form-control" required onChange={(e) => setPin(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.pin}</small> : ""}
                    </div>
                  </div>
                </div>
                <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Occupation</label>
                      <input type="text" className="form-control" name="designation" placeholder='Optional' onChange={(e) => setOccupation(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.occupation}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Company/Organization</label>
                      <input type="text" className="form-control" name="organization" placeholder='Optional' onChange={(e) => setCompany(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.company}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>Package</label>
                      <input type="text" className="form-control" name="package" placeholder='Optional' onChange={(e) => setCompPackage(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.package}</small> : ""}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className='inputField'>
                      <label>From</label>
                      <input type="date" className="form-control" name="from_date" max={date} onChange={(e) => setOccuFrom(e.target.value)} />
                      {isError ? <small className='text-danger'>{isError.from_date}</small> : ""}
                    </div>
                  </div>
                  {currently_work_here === 'no' ?
                    <div className='col-sm-4'>
                      <div className='inputField'>
                        <label>To</label>
                        <input type="date" className="form-control" name="to" max={date} onChange={(e) => setOccuTo(e.target.value)} />
                      </div>
                    </div>
                    : ""}
                  <div className="col-sm-4">
                    <div class="mb-3 form-check mt-3">
                      {currently_work_here === "no" ?
                        <input type="checkbox" class="form-check-input" name="currently_work_here" value="yes" onChange={(e) => setCurrently_work_here(e.target.value)} />
                        :
                        <input type="checkbox" class="form-check-input" name="currently_work_here" value="no" onChange={(e) => setCurrently_work_here(e.target.value)} />
                      }
                      <label class="form-check-label" for="exampleCheck1">Currenty Work Here</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isSubmitting ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CompleteProfile