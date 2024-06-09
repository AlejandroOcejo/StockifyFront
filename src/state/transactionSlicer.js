import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTransactions = createAsyncThunk(
    'transaction/getAllTransactions',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/Transaction`, {
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

export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/Product/${id}/transactions`, {
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

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        loading: false,
        error: null,
        transactions: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload && action.payload.includes('404')) {
                    state.transactions = null;
                }
            })
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload && action.payload.includes('404')) {
                    state.transactions = null;
                }
            });
    },
});

export default transactionSlice.reducer;
