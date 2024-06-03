import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/user`, {
                method: 'GET',
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

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, formData }, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/user/${id}`, {
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

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, { rejectWithValue, dispatch }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5142/user/${id}`, {
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
            dispatch(getUsers());
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null,
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
