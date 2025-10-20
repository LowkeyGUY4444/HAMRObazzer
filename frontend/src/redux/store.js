import{ configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import ordersReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminproductReducer from "./slices/adminproductSlice"
import adminorderReducer from "./slices/adminorderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: ordersReducer,
        admin: adminReducer,
        adminProducts: adminproductReducer,  // ✅ match selector
        adminOrders: adminorderReducer, 
    },
    
});
export default store;