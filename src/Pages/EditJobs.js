import { useState,useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router";
import  { getSingleJob , editJobs } from "../store/jobSlice";
import { UseDispatch, useDispatch,useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

function EditJobs (){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

const jobDoc = useSelector((state)=>{
  return state.jobSlice.editJob
})

const jobmessage = useSelector((state)=>{
  return state.jobSlice.message
})

console.log(jobDoc );


const [formData , updateFormdata] = useState({
  //name: , email: yeh variable ke name change kar sakte hai kyonki yeh varaibles iss usestate ke hai,
    companyName: jobDoc.companyName,
    position: jobDoc.position,
    contract: jobDoc.contract,
    location: jobDoc.location,

})


useEffect(function(){
  dispatch( getSingleJob(params.jobID) )
} , [])
//yeh dono useeffect alag isliye use kare kyonki agr ek sath karte toh function update fir state update 
// fir se function update fir se state update aise karte karte ek infinite loop run hota.
useEffect(function(){
updateFormdata({
  ...jobDoc // form mein jo data chahiye woh iss document se ayega iske liye isko update kar rhe hai taki state mein latest data mile
})
} , [jobDoc])

const handleChange = (e)=>{
    // console.log(formData)
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const editJobSubmit = (e)=>{
    e.preventDefault();
<Toaster position="top-center" />
toast.success('data edited successfully')
    toast.custom(jobmessage)
    const editedJobData ={
      jobID : params.jobID, //isme id hai.
      // backend ko data isi name se chahiye empSalary empName etc. 
      jobName : formData.companyName,
      jobPosition :formData.position,
      jobContract : formData.contract,
      jobLocation : formData.location,
    }
    
    dispatch(editJobs(editedJobData) )
    
    navigate('/job-list')
    }

    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>EditJobs</h2>
        <form onSubmit={editJobSubmit}>


    <div className="form-group">
    <label>Name</label>
    <input value={formData.companyName} type="text" className="form-control"  placeholder="Enter Company Name" name="companyName" onChange={handleChange} />
  </div>



  <div className="form-group">
    <label>position</label>
    <input value={formData.position} type="text" className="form-control"  placeholder="Enter position"  name="position" onChange={handleChange} />
  </div>

 <div className="form-group">
    <label>Contract</label>
    <input value={formData.contract} type="text" className="form-control"  placeholder="Enter Contract" name="contract" onChange={handleChange} />
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



export default React.memo(EditJobs);