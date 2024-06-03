import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'login/postUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5142/Auth/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const token = data.token;
      return { user: data, token: token, userName: formData.username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    user: null,
    userName: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userName = action.payload.userName;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.userName);
        localStorage.setItem('isTenant', action.payload.user.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
