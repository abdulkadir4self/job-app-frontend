import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
const URL = `${process.env.REACT_APP_API_URL}/adminJob`;

const initialState = {
    success : false,
    jobs: [],
    message : '',
    editJob: {  
        companyName : '',
        position: '',
        contract: '',
        location: '',
    },
   
}


export const addJob = createAsyncThunk('job/addJob', async function(jobData, { rejectWithValue }) {
    const token = localStorage.getItem('_token'); 
    console.log('Dispatching addJob with:', jobData);
    
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(jobData), // Correctly stringify the plain object
            headers: {
                'Authorization': token, 
                'Content-Type': 'application/json', // Specify JSON content type
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const data = await response.json();
        console.log('Response from backend:', data);
        return data;
    } 
    catch (error) {
        console.log('Fetch error:', error);
        return rejectWithValue(error.message);
    }
});


//view job
export const viewJobs = createAsyncThunk('job/viewJob' , async function(){
    const token = localStorage.getItem('_token');
    try {
        const response = await fetch( URL , {
            method : 'GET', 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; 
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//get single job
export const getSingleJob = createAsyncThunk('job/getSingleJob' , async function(jobID){
    const token = localStorage.getItem('_token'); 
    try {
        //localho.......:5004/api/v1/employees/gdsgdshgdhgds
        const response = await fetch( `${URL}/${jobID}` , {
            method : 'GET', 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//delete job
export const deleteJob = createAsyncThunk('job/deleteJob' , async function(jobID){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        const response = await fetch( `${URL}/${jobID}` , {
            method : 'DELETE', 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return {data , jobID}; 
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})



//edit job
export const editJobs = createAsyncThunk('job/editJob' , async function(editedJobData){
    const token = localStorage.getItem('_token'); //agr token nhi rahega toh null jayega token ki jagah
    try {
        //localho.......:5004/api/v1/employees/gdsgdshgdhgds
        const response = await fetch( `${URL}/${editedJobData.jobID}` , {
            method : 'PUT',
            body: JSON.stringify(editedJobData), 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data;
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})


const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers : {
        clearjobs : function(state , action){
            state.jobs = [];
        },
        clearMessage : function(state , action){
            state.message = '';
        },
    },
    extraReducers: function(builder){
        builder.addCase(addJob.pending , function(state){
            state.message = 'please wait. we are adding job';
            state.success = false;
        });
        builder.addCase(addJob.fulfilled , function(state , action){
            state.message = 'job added successfully';
            state.success = true;
        });
        builder.addCase(addJob.rejected , function(state , action){
            state.message = 'job could not added successfully';
            state.success = false;
        });


        //view job request
        builder.addCase(viewJobs.pending , function(state){
            state.jobs = [];
            state.message = 'loading ...please wait.';
            state.success = false;
        });
        builder.addCase(viewJobs.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.jobs = action.payload.data;//kyonki backend se data object ke andar real wala data hai.
            //yeh data ko hum redux mein store kar rhe hai. state.employee = action.payload.data; yeh line likhke
            state.message = 'job fetched successfully';
            state.success = true;
            console.log(state.appliedjobs);
            
           }
           else{
            state.jobs = [];
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(viewJobs.rejected , function(state , action){
            state.jobs = [];
            state.message = 'pls try again. server error';//rejected mein server se problem hota hai isliye
            // reject hota hai.
            state.success = false;
        });

        //delete job
        builder.addCase(deleteJob.pending , function(state){
            state.message = 'deleting job ...please wait.';
            state.success = false;
        });
        builder.addCase(deleteJob.fulfilled , function(state , action){
           if(action.payload.data.status == 1){
            state.jobs = state.jobs.filter(function(job){
                return job._id != action.payload.jobID
            });
            state.message = 'job deletion successfully';
            state.success = true;
           }
           else{
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(deleteJob.rejected , function(state , action){
            state.message = 'pls try again. server error';//rejected mein server se problem hota hai isliye
            // reject hota hai.
            state.success = false;
        });

//get simgle job
        builder.addCase(getSingleJob.pending , function(state){
            state.editJob =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'getting jobs ...please wait.';
            state.success = false;
        });
        builder.addCase(getSingleJob.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.editJob = action.payload.data;
            state.message = 'got jobs  successfully';
            state.success = true;
           }
           else{
            state.editJob =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(getSingleJob.rejected , function(state , action){
            state.editJob =  {  name: '', email: '', phone : '', salary : '', designation: '', };
            state.message = 'pls try again. server error';
            state.success = false;
        });

        //edit job
        builder.addCase(editJobs.pending , function(state){
            state.message = 'getting employees ...please wait.';
            state.success = false;
        });
        builder.addCase(editJobs.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.message = 'got employee  successfully';
            state.success = true;
           }
           else{
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(editJobs.rejected , function(state , action){
            state.message = 'pls try again. server error';
            state.success = false;
        });
    },
    
 

    
})

export const { clearjobs , clearMessage , applyJob} = jobSlice.actions;
export default jobSlice.reducer;