import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const response = await api.post('/auth/register', { username, password });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Registration failed');
      }
    }
  );

const token = localStorage.getItem('jwt_token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: token ? { username: 'User' } : null, // Упрощение, т.к. JWT
    token: token || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt_token');
    },
    clearError: (state) => {
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token || action.payload; // Адаптация под формат ответа
        state.user = { username: 'Student' };
        localStorage.setItem('jwt_token', state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.status = 'succeeded'; // Можно сразу логинить после регистрации
          state.token = action.payload.token || action.payload;
          localStorage.setItem('jwt_token', state.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;