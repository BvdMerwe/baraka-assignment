import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	currentDate: new Date(Date.now()).toDateString(),
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCurrentDate(state, action) {
			state.currentDate = action.payload;
		}
	},
})

export const { setCurrentDate } = calendarSlice.actions

export default calendarSlice.reducer
