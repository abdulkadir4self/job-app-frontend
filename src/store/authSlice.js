import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Register from "../../pages/Register";



const initialState = {
    isAdmin : false,
    isLoggedIn : false,
    token: null,
    user: {},
    message : '',
    success : false,
    loginSuccess : false,
    loginMessage : '',
    
}

export const register = createAsyncThunk('auth/register' , async function(registerformData){
    try {
        const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/register` , {
            method : 'POST',
            body: JSON.stringify(registerformData),
            headers : {
                'Content-Type' : 'application/json'
            }
        })


        const registerResponseData = await registerResponse.json();
        console.log(registerResponseData);
        return registerResponseData; //  yahan se return karenge to data action.payload mein jayega jo
        // humne builder mein jo addcase mein action.payload banaya hai wahan
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})


export const loginAction = createAsyncThunk('auth/loginAction' , async function(loginData){
    try {
        const response = await fetch( `${process.env.REACT_APP_API_URL}/auth/login` , {
            method : 'POST',
            body: JSON.stringify(loginData),
            headers : {
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


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout : function(state){
            state.token = null;
            // localStorage.clear();
            state.isLoggedIn = false;
            state.isAdmin = false
            state.user = {};
            state.message = '';
        },
        login : function(state , action){
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.user = action.payload.user;
        }
    },
    extraReducers: function(builder){
        builder.addCase(register.pending , function(state){
            state.message = 'please wait...';
            state.success = false;
        });
        
        builder.addCase(register.fulfilled , function(state , action){
            state.message = 'user resgistered successfully';
            state.success = true;
        });

        builder.addCase(register.rejected , function(state , action){
            state.message = 'failed to register';
            state.success = false;
        });


        // login starts here
        builder.addCase(loginAction.pending , function(state){
            state.loginMessage = 'please wait...';
            state.loginSuccess = false;
            state.isLoggedIn = false;
        });
        
        builder.addCase(loginAction.fulfilled , function(state , action){
            if(action.payload.status === 1){
                if(action.payload.isAdmin){
                     state.isAdmin = true
                     state.loginMessage = 'admin logged in successfully';
            state.loginSuccess = true;
            state.token = action.payload.token;
            console.log(action.payload);
            localStorage.setItem('_token' , state.token);
            state.isLoggedIn = true;
                }
            else{
                state.loginMessage = 'user logged in successfully';
            state.loginSuccess = true;
            state.token = action.payload.token;
            console.log(action.payload);
            localStorage.setItem('_token' , state.token);
            state.isLoggedIn = true;
            }
           
            }
            else{
            state.loginMessage = 'failed to login';
            state.loginSuccess = false;
            state.isLoggedIn = false;
            state.isAdmin = false
            }
            // console.log(action.payload);
            // console.log(state);
            

        });

        builder.addCase(loginAction.rejected , function(state , action){
            state.loginMessage = 'failed to login';
            state.loginSuccess = false;
            state.isLoggedIn = false;

        });
    }

    
})


export const {login , logout  } = authSlice.actions;
export default authSlice.reducer;