import React,{useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux";
import { viewJobs, deleteJob } from '../store/jobSlice';
import {useNavigate} from 'react-router';
import { logout } from "../store/authSlice";


function ViewJobs(){
    const navigate = useNavigate();
    const jobSlice = useSelector((state)=>{
        return state.jobSlice
    })
    const isAdmin = useSelector((state)=>{
        return state.jobSlice.isAdmin
    })
    const dispatch = useDispatch();

    useEffect(function(){
        dispatch( viewJobs() )
       jobSlice.jobs.map((job)=>{console.log(job);
       })
         
        
    }, [])


    return(<>
        <div className='mt-5 p-4'>
        <h1 className='text-center mt-3'>Admin job list</h1>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>position</th>
                        <th>Contract</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                { jobSlice.jobs.map(function(job,index){
                    return (
                        <tr key={index}>
                            <td>{job.companyName}</td>
                            <td>{job.position}</td>
                            <td>{job.contract}</td>
                            <td>{job.location}</td>
                            <td>
                                <button onClick={
                                    (e)=>{
                                        navigate(`/edit/${job._id}`)
                                    }
                                }
                                 className='btn btn-warning mr-2'>
                                    Edit
                                </button>

                                <button onClick={(e)=>{
                                    dispatch(deleteJob(job._id)) 
                                }}
                                 className='btn btn-danger'>
                                Delete
                                </button>
                            </td>


                        </tr>
                    )
                }) }

                </tbody>
            </table>
        </div>
    
    </>)
}

export default React.memo(ViewJobs)