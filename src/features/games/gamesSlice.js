import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import games from './games.json'

const initialState = {
	status: 'idle',
	items: [],
};

export const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		setCurrentGames(state, payload) {
			state.games = payload
		}
	},
	extraReducers(builder) {
	  builder
		.addCase(fetchGames.pending, (state, action) => {
		  state.status = 'loading'
		})
		.addCase(fetchGames.fulfilled, (state, action) => {
		  state.status = 'succeeded'
		  state.items = state.items.concat(action.payload)
		})
		.addCase(fetchGames.rejected, (state, action) => {
		  state.status = 'failed'
		})
	}
})

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
	//mock an API call
	const fetchedGames = await new Promise((resolve) => {
		setTimeout(() => (resolve(games)), 300);
	});
	return fetchedGames
});

export default gamesSlice.reducer
