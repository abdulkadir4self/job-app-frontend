import { useEffect, useState } from "react";
import React from "react";
import { loginAction } from "../../store/authSlice";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

function Login (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdmin = useSelector(function(state){
        return state.authSlice.isAdmin
    });
    const isLoggedIn = useSelector(function(state){
        return state.authSlice.isLoggedIn
    });

    const message = useSelector(function(state){
        return state.authSlice.message
    });

    useEffect( function(){
        if(isAdmin){
            navigate('/admin')
        }
        else if(isLoggedIn){
            navigate('/job')
        }
        
    } , [isAdmin , isLoggedIn])

const [formData , updateFormdata] = useState({
    email: '',
    password: ''
})




const handleChange = (e)=>{
    // console.log(formData)
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const loginUser = (e)=>{
    e.preventDefault();
    dispatch(loginAction(formData));
    <Toaster position="top-center" />
    toast.custom(message)
    updateFormdata({
        email: '',
        password: ''  
    })
}

    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
   

  <div className="form-group">
    <label>Email address</label>
    <input value={formData.email} type="email" className="form-control"  placeholder="Enter email"  name="email" onChange={handleChange} />
  </div>


  <div className="form-group">
    <label>Password</label>
    <input value={formData.password} type="password" className="form-control" placeholder="Password"  name="password" onChange={handleChange} />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default Login;