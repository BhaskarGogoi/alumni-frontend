import React from 'react'

const InputField = ({label, type, placeholder, req, eventt}) => {
  return (
    <div className='inputField'>
        <label>{label}</label>
        <input type={type} className="form-control" placeholder={placeholder} required={req} onChange={eventt}/>     
    </div>
  )
}


export default InputField