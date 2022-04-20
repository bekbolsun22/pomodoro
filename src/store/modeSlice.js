import { createSlice } from '@reduxjs/toolkit'

const initState = {
   stage: 0,
}

const modeSlice = createSlice({
   name: 'mode',
   initialState: initState,
   reducers: {
      switchModeStage(state, { payload: stage }) {
         state.stage = stage
      },
   },
})

export const modeActions = modeSlice.actions
export default modeSlice
