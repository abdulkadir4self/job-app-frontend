import React from "react";
import { NavLink } from "react-router-dom";
import { UseSelector,useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function Navbar(){
  // const isLoggedIn = useSelector((state)=>{
  //   return state.authSlice.isLoggedIn
  // })
  const isLoggedIn = useSelector (state => state.authSlice.isLoggedIn)
  const isAdmin =  useSelector (state => state.authSlice.isAdmin)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // agr isLoggedIn ? MenuAfterLogin : MenuBeforeLogin
    return(<>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/" onClick={()=>{
        dispatch(logout())
        navigate('/login')
        }}>Jobsy</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
   {
    isAdmin ? (<>
    
      <li className="nav-item">
        <NavLink to='/add-job' className="nav-link" href="#">Job Form</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/job-list' className="nav-link" href="#">Job Listing</NavLink>
      </li>
      <button className="btn btn-danger" onClick={function(){
        <Toaster position="top-center" />
        toast.error("you have logged out")
        dispatch(logout())
        navigate('/login')
      }}>Logout</button>
    </>) 
    : (<>
      {
        isLoggedIn ? 

      (<>  <li className="nav-item">
        <NavLink to='/job' className="nav-link" href="#">Job</NavLink>
      </li> 
      <li className="nav-item">
        <NavLink to='/applied-job' className="nav-link" >applied jobs</NavLink>
      </li>
      <button className="btn btn-danger" onClick={function(){
         <Toaster position="top-center" />
         toast.error("you have logged out")
        dispatch(logout())
        navigate('/login')
      }}>Logout</button> </>)

      : (<>
      <li className="nav-item">
        <NavLink to='/register' className="nav-link" href="#">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
      </li>
      </>)
        
      }
      
    </>)
   } 

    </ul>
  </div>
</nav>
    
    </>)
}

export default React.memo(Navbar)
