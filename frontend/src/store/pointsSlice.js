import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
  const response = await api.get('/hits');
  return response.data;
});

export const addPoint = createAsyncThunk('points/addPoint', async (pointData) => {
  const response = await api.post('/hits', pointData);
  return response.data;
});

export const clearPoints = createAsyncThunk('points/clearPoints', async () => {
    await api.delete('/hits');
    return [];
});

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addPoint.fulfilled, (state, action) => {
        state.items.push(action.payload); // Добавляем новую точку в конец
      })
      .addCase(clearPoints.fulfilled, (state) => {
          state.items = [];
      });
  },
});

export default pointsSlice.reducer;