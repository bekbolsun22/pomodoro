/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TimerDisplay } from '../../components/timer/TimerDisplay'
import { TimerHeader } from '../../components/timer/TimerHeader'
import { TimerSetting } from '../../components/timer/TimerSetting'
import Audio from '../../components/UI/Audio'
import { Background } from '../../components/UI/Background'
import { useSound } from '../../hooks/useSound'
import { useTimer } from '../../hooks/useTimer'
import useToggle from '../../hooks/useToggle'
import { modeActions } from '../../store/modeSlice'
import { timerActions } from '../../store/timerSlice'
import {
   lonkBreakIndexOfStage,
   modeTimerSettings,
   pomodoroIndexOfStage,
   shortBreakIndexOfStage,
   sounds,
} from '../../utils/constants/general'
import startStopSound from '../../assets/sounds/start-stop-sound.mp3'
import { localstorage } from '../../utils/helpers/general'
import { TimerProgressBar } from '../../components/timer/TimerProgressBar'

const Main = () => {
   const stage = useSelector((state) => state.mode.stage)

   const timerSettingsFromStore = useSelector((state) => state.timer)
   const {
      pomodoro,
      shortBreak,
      longBreak,
      longBreakInterval,
      isAutoStartBreaks,
      isAutoStartPomodoros,
   } = useSelector((state) => state.timer.settings)
   const selectedSound = useSelector((state) => state.timer.selectedSound)

   const dispatch = useDispatch()

   const setStage = (stage) => dispatch(modeActions.switchModeStage(stage))

   const [timerSettingValues, setTimerSettingValues] = useState({
      pomodoro,
      shortBreak,
      longBreak,
      longBreakInterval,
   })
   const [isAutoStarts, setIsAutoStarts] = useState({
      isAutoStartBreaks,
      isAutoStartPomodoros,
   })
   const settings = { ...timerSettingValues, ...isAutoStarts }

   const [intervalCount, setIntervalCount] = useState(1)

   const [countOfTimerLoop, setCountOfTimerLoop] = useState(1)

   const [timeStage, setTimeStage] = useState(null)

   const [chartPercent, setChartPercent] = useState(0)

   const [timerTicking, setTimerTicking] = useState(true)

   const [currentTimeUpAlarm, setCurrentTimeUpAlarm] = useState()

   useEffect(() => {
      const currentSound = sounds.find((sound) => sound.title === selectedSound)
      setCurrentTimeUpAlarm(currentSound.src)
   }, [selectedSound])

   const startStop = useSound()

   const timeUpAlarm = useSound()

   const [isVisibleTimerSetting, toggleVisibleTimerSetting] = useToggle(false)

   const switchStageHandler = () => {
      switch (stage) {
         case pomodoroIndexOfStage:
            setCountOfTimerLoop((count) => count + 1)
            if (intervalCount === Number(longBreakInterval)) {
               return setStage(lonkBreakIndexOfStage)
            }
            setIntervalCount((count) => count + 1)
            return setStage(shortBreakIndexOfStage)

         case shortBreakIndexOfStage:
            return setStage(pomodoroIndexOfStage)

         case lonkBreakIndexOfStage:
            if (intervalCount === Number(longBreakInterval)) {
               setIntervalCount(1)
               return setStage(pomodoroIndexOfStage)
            }
            return setStage(pomodoroIndexOfStage)

         default:
            return setStage(pomodoroIndexOfStage)
      }
   }
   const timeUp = useCallback(() => {
      timeUpAlarm.play()
      switchStageHandler()
   }, [timeUpAlarm, switchStageHandler])

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

   const calculatePercentage = useCallback(() => {
      const second = (timeStage * 3600) / 60
      const time = minutes * 60 + seconds
      const percent = 100 - time / second / 0.01
      setChartPercent(percent)
   }, [minutes, seconds, timeStage, consumedSeconds])

   useEffect(() => {
      calculatePercentage()
   }, [calculatePercentage])

   const switchAutoStartTimer = useCallback(() => {
      const currentAutoStart = {
         0: isAutoStartPomodoros,
         1: isAutoStartBreaks,
         2: isAutoStartBreaks,
      }
      if (currentAutoStart[stage] && consumedSeconds) {
         setTimerTicking(false)
      }
      if (!consumedSeconds && !currentAutoStart[stage]) {
         setTimerTicking(true)
      }
   }, [stage, isAutoStartPomodoros, isAutoStartBreaks, consumedSeconds])

   useEffect(() => {
      switchAutoStartTimer()
   }, [switchAutoStartTimer])

   useEffect(() => {
      localstorage.save('settings', timerSettingsFromStore)
   }, [timerSettingsFromStore])

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
   const resetTimerHandler = () => {
      setTimerTicking(true)
      dispatch(timerActions.updateTimerSettings(settings))
   }
   const switchModeStageHandler = (stageFromButton) => {
      const willUserToSwitchMode =
         consumedSeconds && stage !== stageFromButton && !timerTicking
            ? window.confirm('Are you sure you want to switch?')
            : false
      if (willUserToSwitchMode) {
         resetTimerHandler()
         setStage(stageFromButton)
      } else if (!consumedSeconds) {
         setStage(stageFromButton)
      }
      if (timerTicking && consumedSeconds) {
         setStage(stageFromButton)
      }
   }

   const toggleTimerTickingHandler = () => {
      startStop.play()
      setTimerTicking((ticking) => !ticking)
   }

   const moveToNextStageHandler = () => {
      const willUserFinishTheRoundEarly = true
         ? window.confirm(
              'Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)'
           )
         : false
      if (willUserFinishTheRoundEarly) {
         switchStageHandler()
      }
   }
   return (
      <>
         <Background bgColor={modeTimerSettings[stage].color}>
            <TimerHeader onChangeVisible={toggleVisibleTimerSetting} />
            <TimerProgressBar chart={!consumedSeconds ? 0 : chartPercent} />
            <TimerDisplay
               onSwitchModeStage={switchModeStageHandler}
               minutes={minutes}
               seconds={seconds}
               onToggleTimerTicking={toggleTimerTickingHandler}
               isTicking={timerTicking}
               countOfTimerLoop={countOfTimerLoop}
               onMoveToNextStage={moveToNextStageHandler}
            />
         </Background>
         {isVisibleTimerSetting &&
            ReactDOM.createPortal(
               <Background
                  bgColor="#00000066"
                  onClick={saveSettingValuesToStoreHandler}
               />,
               document.getElementById('background')
            )}
         {isVisibleTimerSetting &&
            ReactDOM.createPortal(
               <TimerSetting
                  onChangeVisible={toggleVisibleTimerSetting}
                  settingValues={timerSettingValues}
                  onChangeSettingValues={changeSettingValuesHandler}
                  isAutoStarts={isAutoStarts}
                  onChangeAutoStart={changeAutoStartsHandler}
                  onUpdateSettings={saveSettingValuesToStoreHandler}
               />,
               document.getElementById('modal')
            )}
         <Audio ref={startStop.ref} src={startStopSound} />
         <Audio ref={timeUpAlarm.ref} src={currentTimeUpAlarm} />
      </>
   )
}

export default Main
