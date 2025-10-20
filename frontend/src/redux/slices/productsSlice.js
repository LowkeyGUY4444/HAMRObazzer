//    help to fetch products and manage product state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";  //  createAsyncThunk     for asymchronous API calls
import axios from "axios";

// async thunk to fetch products by collection and optional filter
export const fetchProductsByFilter = createAsyncThunk( "products/fetchByFilter",
    async ({ collection, size, color, gender, minPrice, maxPrice, sortBy,search, category, material, brand, limit }) => {
        const query = new URLSearchParams();
        if(collection) query.append("collections", collection);
        if(size) query.append("size", size);
        if(color) query.append("color", color);
        if(gender) query.append("gender", gender);
        if(minPrice) query.append("minPrice", minPrice);
        if(maxPrice) query.append("maxPrice", maxPrice);
        if(sortBy) query.append("sortBy", sortBy);
        if(search) query.append("search", search);
        if(category) query.append("category", category);
        if(material) query.append("material", material);
        if(brand) query.append("brand", brand);
        if(limit) query.append("limit", limit);

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?${query.toString()}`);
        return response.data;
    }
);

// async thunk to create a new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// async thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchDetails",
    async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        return response.data;
    }
);

// async thunk to update product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);

//async to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async ({id}) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/similar/${id}`);
        return response.data;
    }
);

// slice for managing product related state
const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct:null, // store the details of a single selected product
        similarProducts: [],
        loading: false,
        error: null,
        filters:{
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice:"",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",

        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice:"",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",  
            };
        },
    },
    extraReducers: (builder) => {
        // Handle fetching products by filter
        builder
            .addCase(fetchProductsByFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductsByFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle create products  

            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // Handle fetching single product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        // Handle updating a product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                // Update the product in the products array if it exists
                const updatedProduct = action.payload;
                const index = state.products.findIndex((product)=>product._id===updateProduct._id);
                if(index !== -1){
                    state.products[index]=updateProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        // Handle fetch similar products
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
                //state.similarProducts = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        }
});
export const {setFilters, clearFilters} = productsSlice.actions;
export default productsSlice.reducer;



