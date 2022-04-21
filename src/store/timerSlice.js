import { createSlice } from '@reduxjs/toolkit'

const initState = {
   settings: {
      pomodoro: 0.1,
      shortBreak: 0.2,
      longBreak: 0.1,
      longBreakInterval: 2,
      isAutoStartBreaks: false,
      isAutoStartPomodoros: false,
   },
}

const timerSlice = createSlice({
   name: 'timer',
   initialState: initState,
   reducers: {
      updateTimerSettings(state, { payload: settings }) {
         state.settings = settings
      },
   },
})

export const timerActions = timerSlice.actions
export default timerSlice
