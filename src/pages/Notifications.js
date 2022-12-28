import React, { useEffect, useState } from 'react'
import Urls from '../api/Urls';
import { LoaderMain, DashboardTopBar, ProfileStatusBar } from '../components/index';
import EmptyBox from '../assets/empty-box.gif';


const Notifications = () => {
  const authToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
    const getProfileDetails = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.NOTIFICATIONS, {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          if (resJson.notifications.length === 0) {
            setIsAvailable(false);
          } else {
            setNotifications(resJson.notifications);
            setIsAvailable(true);
          }
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
        <DashboardTopBar title="Notifications" />
        <div className='dashboard-content' style={{ backgroundColor: 'transparent' }}>
          <div className='container'>
            <div className='row p-3'>
              {isAvailable ?
                notifications.map((notification, index) => (
                  <div className='notification-card shadow-sm'>
                    <i className="fas fa-bell"></i>
                    <p>
                      {notification.notification}
                    </p>
                  </div>
                ))
                : <div className='empty-gif'>
                  <img src={EmptyBox} />
                  No Notifications Found!
                </div>
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default Notifications