import { configureStore } from '@reduxjs/toolkit'
import modeSlice from './modeSlice'
import timerSlice from './timerSlice'

export const store = configureStore({
   reducer: {
      mode: modeSlice.reducer,
      timer: timerSlice.reducer,
   },
})
