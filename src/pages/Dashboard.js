import React, { useEffect, useState } from 'react';
import FillForm from '../components/FillForm';
import Urls from '../api/Urls';
import { LoaderMain, DashboardTopBar, TimelineBox } from '../components/index';


const Dashboard = () => {
  const authToken = localStorage.getItem("token");

  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alumniDetails, setAlumniDetails] = useState();
  const [viewTimeline, setViewTimeline] = useState(true);
  const [courses, setCourses] = useState();

  useEffect(() => {
    window.scrollTo(0, 0)
    const getDashboard = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.GET_DASHBOARD, {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setAlumniDetails(resJson.alumni_details)
          //set Timeline view
          if (resJson.message === "approved" || resJson.message === "Not Registered") {
            setViewTimeline(false);
            setCourses(resJson.courses);
          }
          setStatus(resJson.message);
          setIsLoading(false);
          // message.error("Loaded");
        }
      } catch (err) {
        console.log(err);
      }
    }
    getDashboard()
  }, []);

  return (
    isLoading ? <LoaderMain /> :
      <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
        <DashboardTopBar title="Dashboard" />
        <div className='dashboard-content shadow-sm'>
          <div className='container'>
            <div className='row'>
              <FillForm status={status} alumniDetails={alumniDetails} courses={courses} />
            </div>
          </div>
        </div>

        {viewTimeline ?
          <div className='dashboard-content shadow-sm mt-3 p-4'>
            <div className='container'>
              <div className='row'>
                <h6>Timeline</h6> <br /> <br />
                <TimelineBox status={status} />
              </div>
            </div>
          </div> : ""}
      </div>

  )
}

export default Dashboard