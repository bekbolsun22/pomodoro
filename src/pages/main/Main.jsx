import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { TimerDisplay } from '../../components/timer/TimerDisplay'
import { TimerHeader } from '../../components/timer/TimerHeader'
import { TimerSetting } from '../../components/timer/TimerSetting'
import { Background } from '../../components/UI/Background'
import { modeTimerSettings } from '../../utils/constants/general'

const Main = () => {
   const stage = useSelector((state) => state.mode.stage)
   const [isVisibleTimerSetting, setIsVisibleTimerSetting] = useState(false)

   const changeVisibleTimerSettingHandler = () => {
      setIsVisibleTimerSetting((visible) => !visible)
   }
   return (
      <>
         <Background bgColor={modeTimerSettings[stage].color}>
            <TimerHeader onChangeVisible={changeVisibleTimerSettingHandler} />
            <TimerDisplay />
         </Background>
         {isVisibleTimerSetting &&
            ReactDOM.createPortal(
               <Background bgColor="rgba(0, 0, 0, 0.4)">
                  <TimerSetting
                     onChangeVisible={changeVisibleTimerSettingHandler}
                  />
               </Background>,
               document.getElementById('background')
            )}
      </>
   )
}

export default Main
