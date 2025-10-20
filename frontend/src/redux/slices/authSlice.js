//    help to authenticate user and manage user state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";  //  createAsyncThunk     for asymchronous API calls
import axios from "axios";

// Get user from local storage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

//check for an existing guest ID in local storage or generate a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

//initial state for the auth slice
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, {rejectWithValue}) => {
        try {
            // const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, userData);

            localStorage.setItem("userInfo", JSON.stringify(response.data));
            localStorage.setItem("userToken", response.data.token);

            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for user Registeration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, userData);

            localStorage.setItem("userInfo", JSON.stringify(response.data));
            localStorage.setItem("userToken", response.data.token);

            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; //reset guest ID on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId);//set a new guest ID in local storage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },  
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Login failed";
            })

            //for register user

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Registration failed";
            })
        }
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;


//logout


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Load from localStorage if available
// const userFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// // Create or reuse guest ID
// const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
// localStorage.setItem("guestId", initialGuestId);

// // Initial state
// const initialState = {
//   user: userFromStorage?.user || null, // ✅ Access nested user object if present
//   token: userFromStorage?.token || null, // ✅ Add token to state
//   guestId: initialGuestId,
//   loading: false,
//   error: null,
// };

// // Async thunk: login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
//         userData
//       );

//       // Save both user + token
//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       return response.data; // ✅ return { user, token }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Login failed" });
//     }
//   }
// );

// // Async thunk: register
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
//         userData
//       );

//       localStorage.setItem("userInfo", JSON.stringify(response.data));
//       return response.data; // ✅ return { user, token }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Registration failed" });
//     }
//   }
// );

// // Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.guestId = `guest_${new Date().getTime()}`;
//       localStorage.removeItem("userInfo");
//       localStorage.setItem("guestId", state.guestId);
//     },
//     generateNewGuestId: (state) => {
//       state.guestId = `guest_${new Date().getTime()}`;
//       localStorage.setItem("guestId", state.guestId);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user; // ✅ save user
//         state.token = action.payload.token; // ✅ save token
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       })

//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { logout, generateNewGuestId } = authSlice.actions;
// export default authSlice.reducer;
