import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewJobs, deleteJob } from "../store/jobSlice";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";
import { applyJob } from "../store/jobSlice"; 
import '../App.css'
import toast, { Toaster } from 'react-hot-toast';


function ViewUserJobs() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const jobSlice = useSelector((state) => {
    return state.jobSlice;
  });
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(viewJobs());
  }, []);

  window.addEventListener('popstate' ,()=>{
    dispatch(logout())
    window.location.href = '/login'
  
  } )
  
  const handleApply = (job) => {
    // Retrieve the current applied jobs from localStorage
    let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    // Add the new job to the array
    appliedJobs.push(job);

    // Save the updated array back to localStorage
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    
    console.log("Job applied:", job); // Optional: for debugging
    <Toaster position="top-center" />
    toast.success("you have successfully applied for the job")
  };
  
  return (
    <>
      <div>
      <h1 className='text-center mt-5'>jobs for user</h1>
        <form  class="form-inline my-2 my-lg-3">
          <input style={{maxWidth: '300px' , width: '320px'}}
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search Company or location or contract"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        <div className="row">
          {jobSlice.jobs
            .filter((item) => {
    return search.toLowerCase() === "" 
      ? item 
      : item.companyName.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search) ||
        item.contract.toLowerCase().includes(search)
      
  })
            .map(function (job, index) {
              return (
                <div key={index} className="col-md-3 mb-3">
                  <div className="card">
                    <div class="card-body">
                      <h5 class="card-title">
                        company Name : {job.companyName}
                      </h5>
                      <p class="card-text"> Position : {job.position} </p>
                      <p class="card-text"> Contract : {job.contract} </p>
                      <p class="card-text"> Location : {job.location} </p>
                      <button  
                       onClick={() => handleApply(job)}  
                    className="btn btn-primary"
                  >
                    Apply
                  </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default React.memo(ViewUserJobs);
