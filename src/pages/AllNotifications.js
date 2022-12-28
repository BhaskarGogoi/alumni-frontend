import React, { useState, useEffect } from 'react';
import Urls from '../api/Urls';

const AllNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    window.scrollTo(0, 0)
    const getAllNotifications = async () => {
      try {
        let res = await fetch(Urls.SERVER + Urls.GET_ALL_NOTIFICATIONS, {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setLoading(false);
          setNotifications(resJson.notifications)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllNotifications()
  }, []);

  return (
    <div className='all-notifications'>
      <div className='container p-4'>
        <div className='row'>
          <header>All Notifications</header>
          {loading ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '80vh' }}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div> :
            notifications.map((notification, index) => (
              <div className='notification-card mb-3 shadow-sm'>
                <i className="fas fa-bell"></i> &nbsp; &nbsp;
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ flex: 1 }}>{notification.notification}</div> <div>{notification.date}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default AllNotifications