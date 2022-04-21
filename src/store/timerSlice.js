import { createSlice } from '@reduxjs/toolkit'

const initState = {
   settings: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 2,
      isAutoStartBreaks: false,
      isAutoStartPomodoros: false,
   },
}

const timerSlice = createSlice({
   name: 'timer',
   initialState: initState,
   reducers: {},
})

export const timerActions = timerSlice.actions
export default timerSlice
