import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { modeActions } from '../../store/modeSlice'
import { TimerOption } from './TimerOption'
import { Button } from '../UI/Button'
import { modeTimerSettings } from '../../utils/constants/general'

const options = [
   { mode: 'Pomodoro', stage: 0 },
   { mode: 'Short Break', stage: 1 },
   { mode: 'Long Break', stage: 2 },
]

export const TimerDisplay = () => {
   const stage = useSelector((state) => state.mode.stage)
   const dispath = useDispatch()

   const switchModeStageHandler = (stage) => {
      dispath(modeActions.switchModeStage(stage))
   }
   return (
      <TimerDisplayBlock>
         <TimerBlock>
            <Options>
               {options.map((option) => (
                  <TimerOption
                     key={option.stage}
                     isActive={option.stage === stage}
                     mode={option.mode}
                     stage={option.stage}
                     onSwitchMode={switchModeStageHandler}
                  />
               ))}
            </Options>
            <Timer>25:00</Timer>
            <StartTimerButton>
               <Button>Start</Button>
            </StartTimerButton>
         </TimerBlock>
         <CountOfTimerLoop>#1</CountOfTimerLoop>
         <TimerMessage>{modeTimerSettings[stage].message}</TimerMessage>
      </TimerDisplayBlock>
   )
}
const TimerDisplayBlock = styled.div`
   max-width: 480px;
   margin: auto;
   color: white;
`
const TimerBlock = styled.div`
   background-color: rgba(255, 255, 255, 0.1);
   width: 480px;
   padding: 20px 0px 30px;
   margin: 50px auto;
   border-radius: 6px;
   margin-bottom: 20px;
`
const Options = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
const Timer = styled.div`
   font-size: 120px;
   font-weight: bold;
   text-align: center;
   margin-top: 20px;
`
const StartTimerButton = styled.div`
   display: flex;
   justify-content: center;
   & button {
      cursor: pointer;
      border: none;
      margin: 20px 0px 0px;
      padding: 0px 12px;
      border-radius: 4px;
      box-shadow: rgb(235 235 235) 0px 6px 0px;
      font-size: 22px;
      height: 55px;
      color: rgb(76, 145, 149);
      font-weight: bold;
      width: 200px;
      background-color: white;
      transition: color 0.5s ease-in-out 0s;
   }
`
const CountOfTimerLoop = styled.p`
   font-size: 16px;
   opacity: 0.6;
   margin-bottom: 4px;
   text-align: center;
`

const TimerMessage = styled.h1`
   font-size: 18px;
   font-weight: 100;
   color: white;
   overflow-wrap: break-word;
   text-align: center;
`
