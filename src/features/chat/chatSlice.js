import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	count: 0,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
	},
	extraReducers(builder) {
	  builder
		.addCase(fetchChatCount.pending, (state, action) => {
		  state.status = 'loading'
		})
		.addCase(fetchChatCount.fulfilled, (state, action) => {
		  state.status = 'succeeded'
		  state.count = action.payload;
		})
		.addCase(fetchChatCount.rejected, (state, action) => {
		  state.status = 'failed'
		})
	}
})

export const fetchChatCount = createAsyncThunk('chat/fetchChatCount', async () => {
	//mock an API call
	const fetchedChatCount = await new Promise((resolve) => {
		setTimeout(() => (resolve(Math.trunc(Math.random() * 10) + 1)), 300);
	});
	return fetchedChatCount
});

export default chatSlice.reducer
