import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all the users
export const fetchUsers=createAsyncThunk("admin/fetchUsers",async(_,{rejectWithValue})=>{
    
         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        );
        return response.data;
});

//add the create user action
export const adduser = createAsyncThunk("admin/addUser", async(userData, {rejectWithValue})=>{
    try {
         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, userData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
        
    } catch (error) {
        return rejectWithValue(error.response.data);
        
    }
});

//update the user info
export const updateUser = createAsyncThunk("admin/updateUser", async({id, name, email, role})=>{
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${id}`, {name, email, role},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return response.data.user;
});

//Delete the user
export const deleteUser = createAsyncThunk("admin/deleteUser", async(id)=>{
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${id}`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return id;
});

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
         //Fetch user
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
         })
        .addCase(fetchUsers.fulfilled,(state, action)=>{
            state.loading=false;
            state.users=action.payload;
        })
        .addCase(fetchUsers.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.error.message;
         })
         //update user
        .addCase(updateUser.fulfilled,(state, action)=>{
            const updateUser= action.payload;//.user;/////////////changed   .user
            const userIndex= state.users.findIndex((user) => user._id === updateUser._id);
            if (userIndex !== -1){
                state.users[userIndex]=updateUser;
            }
        })
        //delete user
        .addCase(deleteUser.fulfilled,(state, action)=>{
            state.users= state.users.filter((user)=> user._id !== action.payload);
        })
        //Add user
        .addCase(adduser.pending,(state)=>{
            state.loading=true;
            state.error= null;
         })
        .addCase(adduser.fulfilled,(state, action)=>{
            state.loading=false;
            state.users.push(action.payload.user); // this will add the user
        })
        .addCase(adduser.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload.message;
         })
        
    }
});

export default adminSlice.reducer;
