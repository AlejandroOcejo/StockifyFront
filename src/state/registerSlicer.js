import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const checkUser = createAsyncThunk('checkUser/postUser', async (formData) => {
  try {
    const response = await fetch(
      `http://localhost:5142/Login?username=${formData.username}&password=0`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    if (data === 'Tenant not found') {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
});

export const registerUser = createAsyncThunk(
  'registerUser/postRegister',
  async (formData, { dispatch, rejectWithValue }) => {
    const isRegistered = await dispatch(checkUser(formData)).unwrap();
    if (!isRegistered) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        };
        const response = await fetch(`http://localhost:5142/Tenant`, requestOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      return rejectWithValue('User is already registered.');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
