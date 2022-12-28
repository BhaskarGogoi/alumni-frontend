import React from 'react'

const LoaderMain = () => {
  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '100vh'}}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
      </div>
  )
}

export default LoaderMain