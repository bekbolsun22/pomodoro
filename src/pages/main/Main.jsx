import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TimerDisplay } from '../../components/timer/TimerDisplay'
import { TimerHeader } from '../../components/timer/TimerHeader'
import { TimerSetting } from '../../components/timer/TimerSetting'
import { Background } from '../../components/UI/Background'
import { useTimer } from '../../hooks/useTimer'
import useToggle from '../../hooks/useToggle'
import { modeActions } from '../../store/modeSlice'
import { timerActions } from '../../store/timerSlice'
import { modeTimerSettings } from '../../utils/constants/general'

const Main = () => {
   const stage = useSelector((state) => state.mode.stage)
   const { pomodoro, shortBreak, longBreak } = useSelector(
      (state) => state.timer.settings
   )
   const dispatch = useDispatch()

   const [isVisibleTimerSetting, toggleVisibleTimerSetting] = useToggle(false)
   const [timerTicking, toggleTimerTicking] = useToggle(true)

   const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
   }
   const timeUp = () => {
      alert(`it's time!`)
   }
   const { minutes, seconds } = useTimer(
      timeStage[stage],
      timeUp,
      stage,
      timerTicking
   )

   const [timerSettingValues, setTimerSettingValues] = useState({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 2,
   })
   const [isAutoStarts, setIsAutoStarts] = useState({
      isAutoStartBreaks: false,
      isAutoStartPomodoros: false,
   })

   const changeSettingValuesHandler = (e) => {
      const { name, value } = e.target
      setTimerSettingValues((values) => {
         return {
            ...values,
            [name]: value,
         }
      })
   }
   const changeAutoStartsHandler = (e) => {
      const { name, checked } = e.target
      setIsAutoStarts((isAuto) => {
         return {
            ...isAuto,
            [name]: checked,
         }
      })
   }
   const saveSettingValuesToStoreHandler = () => {
      const settings = Object.assign(timerSettingValues, isAutoStarts)
      dispatch(timerActions.updateTimerSettings(settings))
   }
   const switchModeStageHandler = (stage) => {
      dispatch(modeActions.switchModeStage(stage))
   }
   return (
      <>
         <Background bgColor={modeTimerSettings[stage].color}>
            <TimerHeader onChangeVisible={toggleVisibleTimerSetting} />
            <TimerDisplay
               onSwitchModeStage={switchModeStageHandler}
               minutes={minutes}
               seconds={seconds}
               onToggleTimerTicking={toggleTimerTicking}
            />
         </Background>
         {isVisibleTimerSetting &&
            ReactDOM.createPortal(
               <Background bgColor="rgba(0, 0, 0, 0.4)">
                  <TimerSetting
                     onChangeVisible={toggleVisibleTimerSetting}
                     settingValues={timerSettingValues}
                     onChangeSettingValues={changeSettingValuesHandler}
                     isAutoStarts={isAutoStarts}
                     onChangeAutoStart={changeAutoStartsHandler}
                     onUpdateSettings={saveSettingValuesToStoreHandler}
                  />
               </Background>,
               document.getElementById('background')
            )}
      </>
   )
}

export default Main
