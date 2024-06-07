import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/Product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await fetch(`http://localhost:5142/Inventory/${id}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await fetch(`http://localhost:5142/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeProduct = createAsyncThunk(
    'product/removeProduct',
    async ({ id, inventoryId }, { rejectWithValue, dispatch }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/Product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            dispatch(getProducts(inventoryId));
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, formData, inventoryId }, { rejectWithValue, dispatch }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/Product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = dispatch(getProducts(inventoryId));;
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: null,
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload.includes('404')) {
                    state.products = null;
                }
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
