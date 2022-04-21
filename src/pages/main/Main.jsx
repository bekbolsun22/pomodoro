/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react'
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

   const { pomodoro, shortBreak, longBreak, longBreakInterval } = useSelector(
      (state) => state.timer.settings
   )
   // console.log(pomodoro)
   const dispatch = useDispatch()
   const setStage = (stage) => dispatch(modeActions.switchModeStage(stage))

   const [timerSettingValues, setTimerSettingValues] = useState({
      pomodoro: 0.1,
      shortBreak: 0.1,
      longBreak: 0.1,
      longBreakInterval: 2,
   })
   const [isAutoStarts, setIsAutoStarts] = useState({
      isAutoStartBreaks: false,
      isAutoStartPomodoros: false,
   })
   const settings = { ...timerSettingValues, ...isAutoStarts }
   const [intervalCount, setIntervalCount] = useState(1)
   const [countOfTimerLoop, setCountOfTimerLoop] = useState(1)

   const timeUp = useCallback(() => {
      switch (stage) {
         case 0:
            if (intervalCount === Number(longBreakInterval)) {
               return setStage(2)
            }
            setIntervalCount((count) => count + 1)
            setCountOfTimerLoop((count) => count + 1)
            return setStage(1)
         case 1:
            return setStage(0)
         case 2:
            if (intervalCount === Number(longBreakInterval)) {
               setIntervalCount(1)
               return setStage(0)
            }
            return setStage(0)

         default:
            return setStage(0)
      }
   }, [stage, intervalCount, longBreakInterval])

   const [timeStage, setTimeStage] = useState(null)
   const [timerTicking, setTimerTicking] = useState(true)
   const [isVisibleTimerSetting, toggleVisibleTimerSetting] = useToggle(false)

   useEffect(() => {
      const currentMode = {
         0: pomodoro,
         1: shortBreak,
         2: longBreak,
      }
      setTimeStage(currentMode[stage])
   }, [pomodoro, shortBreak, longBreak, stage])

   const { minutes, seconds, consumedSeconds } = useTimer(
      timeStage,
      timeUp,
      stage,
      timerTicking
   )
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
      dispatch(timerActions.updateTimerSettings(settings))
      toggleVisibleTimerSetting()
   }
   const resetTimer = () => {
      dispatch(timerActions.updateTimerSettings(settings))
   }
   const switchModeStageHandler = (stageFromButton) => {
      const isYes =
         consumedSeconds && stage !== stageFromButton && !timerTicking
            ? window.confirm('Are you sure you want to switch?')
            : false
      if (isYes) {
         resetTimer()
         setStage(stageFromButton)
         setTimerTicking(true)
      } else if (!consumedSeconds) {
         setStage(stageFromButton)
      }
      if (timerTicking && consumedSeconds) {
         setStage(stageFromButton)
      }
   }

   const toggleTimerTicking = () => {
      setTimerTicking((ticking) => !ticking)
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
               isTicking={timerTicking}
               countOfTimerLoop={countOfTimerLoop}
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
