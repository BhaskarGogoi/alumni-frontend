import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Urls from '../api/Urls';
import { DashboardTopBar } from '../components/index';


const UploadImage = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [companyDocument, setCompanyDocument] = useState();
  const [isError, setError] = useState();
  const [isUploading, setIsLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setButtonDisable("diasbled");

    const formData = new FormData()
    formData.append("image", image);
    formData.append("companyDocument", companyDocument);

    try {
      let res = await fetch(Urls.SERVER + Urls.UPLOAD_IMAGE, {
        method: "POST",
        headers: new Headers({
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }),
        body: formData,
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setIsLoading(false)
        setButtonDisable("");
        if (resJson.message === "Uploaded") {
          navigate('/user/profile')
        } else if (resJson.message === "Already Uploaded") {
          navigate('/user/dashboard')
        }
      } else if (res.status === 400) {
        setError(resJson.error);
        setIsLoading(false);
        setButtonDisable("");
      } else {
        setIsLoading(false);
        setButtonDisable("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ flex: 1, paddingTop: '20px', minHeight: '100vh' }}>
      <DashboardTopBar title="Upload Image" />
      <div className='dashboard-content shadow-sm'>
        <div className='container'>
          <div className='row'>
            <div className='image_upload'>
              <form onSubmit={handleSubmit}>
                <div className='inputField'>
                  <label>Your Image</label>
                  <input type="file" name='image' accept="image/jpg, image/jpeg, image/png" className="form-control" required onChange={(e) => setImage(e.target.files[0])} style={{ maxWidth: 300 }} />
                  {isError ? <small className='text-danger'>{isError.image}</small> : ""}
                </div>
                {/* <div className='inputField'>
                  <label>Salary Slip/Offer Letter</label>
                  <input type="file" name='companyDocument' accept="image/jpg, image/jpeg, image/png" className="form-control" required onChange={(e) => setCompanyDocument(e.target.files[0])} style={{ maxWidth: 300 }} />
                  {isError ? <small className='text-danger'>{isError.companyDocument}</small> : ""}
                </div> */}
                <button type="submit" className='btn btn-primary my-2 ' disabled={buttonDisable}>{isUploading ? <div className='spinner-border text-light' role='status'></div> : 'Submit'}</button>
              </form>
              <div>
                <p style={{ color: 'red' }}>Only .jpg, .jpeg and .png files are allowed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadImage