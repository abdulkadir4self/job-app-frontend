import { useState } from "react";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addJob } from "../store/jobSlice";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';



function AddJobForm (){
const dispatch = useDispatch();
const navigate = useNavigate()

const [formData , updateFormdata] = useState({
  companyName : '',
  position: '',
  contract: '',
  location: '',
})

const jobSliceSelector = useSelector((state) => {
  return state.jobSlice.message;
  
  
});
console.log(jobSliceSelector);
const handleChange = (e)=>{
  // console.log(formData)
  // console.log(selector);
  
  
  updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
        
    })
  console.log(formData)
  console.log(e.target.value);
}

const AddJobSubmit = (e) => {
  e.preventDefault();

  // Create a plain object with form data
  const jobData = {
      jobName: formData.companyName,
      jobPosition: formData.position,
      jobContract: formData.contract,
      jobLocation: formData.location,
  };
  console.log('Job Data:', jobData);
  // Dispatch the action with the plain object
  dispatch(addJob(jobData));
  <Toaster position="top-center" />
  toast.custom(jobSliceSelector);
  navigate('/job-list')
}



    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>Add Job Form</h2>
        <form onSubmit={AddJobSubmit}>


    <div className="form-group">
    <label>Name</label>
    <input value={formData.companyName} type="text" className="form-control"  placeholder="Enter Company Name" name="companyName" onChange={handleChange} />
  </div>



  <div className="form-group">
    <label>Position</label>
    <input value={formData.position} type="text" className="form-control"  placeholder="Enter Position"  name="position" onChange={handleChange} />
  </div>

 <div className="form-group">
    <label>Contract</label>
    <input value={formData.contract} type="text" className="form-control"  placeholder="Enter contract" name="contract" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Location</label>
    <input value={formData.location} type="text" className="form-control"  placeholder="Enter Location" name="location" onChange={handleChange} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default React.memo(AddJobForm);