import { useState } from "react";
import React from "react";
import {useDispatch} from 'react-redux';
import { register } from "../store/authSlice";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';



function Register (){
const dispatch = useDispatch();
const [formData , updateFormdata] = useState({
    name: '',
    email: '',
    password: ''
})

const navigate = useNavigate()

const handleChange = (e)=>{
    // console.log(formData)
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const registerUser = function(e){
    e.preventDefault();
    dispatch(register(formData));
    <Toaster position="top-center" />
    toast.success("you have successfully registered. please log in to continue")
    updateFormdata({
        name: '',
        email: '',
        password: ''  
    })
    
    navigate('/login')
    
}


    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>Register</h2>
        <form onSubmit={ registerUser}>
    <div className="form-group">
    <label>Name</label>
    <input value={formData.name} type="text" className="form-control"  placeholder="Enter Name" name="name" onChange={handleChange} />
  </div>
{/* itne sare inputs banane se accha hum ek input component banake usko props pass karke bhi yeh kaam kar sakte hai */}


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



export default React.memo(Register);