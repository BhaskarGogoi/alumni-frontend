import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import { LoaderMain, DashboardTopBar } from '../components/index';

const Settings = () => {
  const authToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState();

  useEffect(() => {
    window.scrollTo(0, 0)
    const getProfileDetails = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.SETTINGS, {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setProfileDetails(resJson.user);
          console.log(resJson.user);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProfileDetails()
  }, []);
  return (
    isLoading ? <LoaderMain /> :
      <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
        <DashboardTopBar title="Settings" />
        <div className='dashboard-content shadow-sm'>
          <div className='container'>
            <div className='row'>
              <div className='profile p-4'>
                <h6>Email</h6>
                <h5>{profileDetails.email}</h5>
                <hr />
                <h6>Phone</h6>
                <h5>{profileDetails.phone}</h5>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Settings