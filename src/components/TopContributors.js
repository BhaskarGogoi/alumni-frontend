import React from 'react'
import Urls from '../api/Urls'

const TopContributors = ({topContributors}) => {
  return (
    <div className='top-contributors'>
        <h5>Top Contributors</h5>
        {topContributors.map((contribution, index) => (
                <div className='top-contributor-card shadow-sm' key={index}>
                        <img src={Urls.IMAGE + `${contribution.image}`} />
                        <div className='content'>
                             <strong>{contribution.firstname} {contribution.middlename} {contribution.lastname}</strong>
                             <span><i className="fas fa-rupee-sign"></i> {contribution.amount}</span>
                        </div>
                </div>                    
        ))}
    </div>
  )
}

export default TopContributors