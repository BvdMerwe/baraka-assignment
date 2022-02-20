import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from '../features/calendar/calendarSlice'
import gamesSlice from '../features/games/gamesSlice'
import chatSlice from '../features/chat/chatSlice'

export default configureStore({
  reducer: {
	  calendar: calendarSlice,
	  games: gamesSlice,
	  chat: chatSlice,
  },
})