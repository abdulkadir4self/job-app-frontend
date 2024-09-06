import { useSelector } from "react-redux";

const AppliedJobs = () => {
 // Retrieve applied jobs from localStorage
 const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

 return (
   <div>
     <h2>Applied Jobs</h2>
     <div className="row"> 
     {appliedJobs.length === 0 ? (
       <p>No jobs applied yet.</p>
     ) : (
      
       appliedJobs.map((job, index) => (
         <div key={index} className="card mb-3 bg-success">
           <div className="card-body bg-green">
             <h5 className="card-title">Company Name: {job.companyName}</h5>
             <p className="card-text">Position: {job.position}</p>
             <p className="card-text">Contract: {job.contract}</p>
             <p className="card-text">Location: {job.location}</p>
             <p className="card-text">status : applied</p>

           </div>
         </div>
       ))
     )}
   </div>
   </div>
 );
};

export default AppliedJobs;
