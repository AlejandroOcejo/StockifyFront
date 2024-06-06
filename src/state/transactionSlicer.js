import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/Product/${id}/transactions`, {
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
                if (action.payload.includes('404')) {
                    state.transactions = null;
                }
            });
    },
});

export default transactionSlice.reducer;
