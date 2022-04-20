import React from 'react'
import { useSelector } from 'react-redux'
import { TimerDisplay } from '../../components/timer/TimerDisplay'
import { Background } from '../../components/UI/Background'
import { modeTimerSettings } from '../../utils/constants/general'

const Main = () => {
   const stage = useSelector((state) => state.mode.stage)
   return (
      <Background bgColor={modeTimerSettings[stage].color}>
         {/* Here must be Header component */}
         <TimerDisplay />
      </Background>
   )
}

export default Main
