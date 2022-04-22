import { createSlice } from '@reduxjs/toolkit'
import { localstorage } from '../utils/helpers/general'

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

const settingsFromLocalStorage = localstorage.get('settings')
   ? localstorage.get('settings')
   : initState

const timerSlice = createSlice({
   name: 'timer',
   initialState: settingsFromLocalStorage,
   reducers: {
      updateTimerSettings(state, { payload: settings }) {
         state.settings = settings
      },
   },
})

export const timerActions = timerSlice.actions
export default timerSlice
