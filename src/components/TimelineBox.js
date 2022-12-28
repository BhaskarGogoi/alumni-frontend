import React from 'react'

const TimelineBox = ({ status }) => {
  if (status === 'submitted') {
    return (
      <>
        <div className='timeline'>
          <div className='timestamp'>
            Step 1
          </div>
          <div className='divider'>
            <div className='circle-active'><i class="fas fa-dot-circle"></i></div>
            <div className='line'></div>
          </div>
          <div className='message'>
            Submitted
          </div>
        </div>
        <div className='timeline'>
          <div className='timestamp'>
            Step 2
          </div>
          <div className='divider'>
            <div className='circle'><i class="fas fa-dot-circle"></i></div>
            <div className='line'></div>
          </div>
          <div className='message'>
            Image Uploaded
          </div>
        </div>
        <div className='timeline'>
          <div className='timestamp'>
            Step 3
          </div>
          <div className='divider'>
            <div className='circle'><i class="fas fa-dot-circle"></i></div>
            <div className='line'></div>
          </div>
          <div className='message'>
            Under Review
          </div>
        </div>
        <div className='timeline'>
          <div className='timestamp'>
            Step 4
          </div>
          <div className='divider'>
            <div className='circle'><i class="fas fa-dot-circle"></i></div>
          </div>
          <div className='message'>
            Verified
          </div>
        </div>
      </>
    )
  } else if (status === 'Image Uploaded') {
    return (
      <>
        <div className='timeline'>
          <div className='timestamp'>
            Step 1
          </div>
          <div className='divider'>
            <div className='circle-active'><i class="fas fa-dot-circle"></i></div>
            <div className='line-active'></div>
          </div>
          <div className='message'>
            Submitted
          </div>
        </div>
        <div className='timeline'>
          <div className='timestamp'>
            Step 2
          </div>
          <div className='divider'>
            <div className='circle-active'><i class="fas fa-dot-circle"></i></div>
            <div className='line-active'></div>
          </div>
          <div className='message'>
            Image Uploaded
          </div>
        </div>

        <div className='timeline'>
          <div className='timestamp'>
            Step 3
          </div>
          <div className='divider'>
            <div className='circle-active'><i class="fas fa-dot-circle"></i></div>
            <div className='line'></div>
          </div>
          <div className='message'>
            Under Review
          </div>
        </div>
        <div className='timeline'>
          <div className='timestamp'>
            Step 4
          </div>
          <div className='divider'>
            <div className='circle'><i class="fas fa-dot-circle"></i></div>
          </div>
          <div className='message'>
            Verified
          </div>
        </div>
      </>
    )
  }
}

export default TimelineBox