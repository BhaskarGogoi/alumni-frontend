import React from 'react'

const ProfileStatusBar = ({status}) => {
    if(status === "Paid"){
        return (
            <div className='profile_status_bar' style={{backgroundColor: '#CFE2FF', color: '#08429E'}}>
                <i className="fas fa-clock"></i>
                <span>Under Review</span>
            </div>
        )
    }  else if(status === "approved"){
        return (
            <div className='profile_status_bar' style={{backgroundColor: '#D1E7DD', color: '#215137'}}>
                <i className="fas fa-check-circle"></i>
                <span>Verified</span>
            </div>
        )
    }
}

export default ProfileStatusBar