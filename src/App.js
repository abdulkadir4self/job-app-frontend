import logo from './logo.svg';
import './App.css';
import { Route ,Routes } from 'react-router';
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';
import Register from './Pages/Register';
import AddJobForm from './Pages/AddJobForm';
import ViewJobs from './Pages/ViewJobs';
import EditJobs from './Pages/EditJobs';
import ViewUserJobs from './Pages/ViewUserJobs';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import AppliedJobs from './Pages/Appliedjobs';
import toast, { Toaster } from 'react-hot-toast';

function App() {
 
 
 
 
 return (<>
  <Toaster position="top-center" />
 <Header />
   <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/applied-job' element={<AppliedJobs/>}/> 
      <Route path='/admin' element={<Admin/>}/> 
      <Route path='add-job' element={ <AddJobForm/>}/> 
      <Route path='job' element={ <ViewUserJobs/>}/> 
      <Route path='job-list' element={ <ViewJobs/>}/> 
      <Route path='/edit/:jobID' element={ <EditJobs/>}/>
      <Route path='login' element={ <Login/> } />
      <Route path='register' element={ <Register/>}/> 
      {/* <Route path='*' element={ NotFound}/>  */}

    </Routes>
  </>);
}

export default App;
