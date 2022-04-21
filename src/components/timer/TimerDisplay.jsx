import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { TimerOption } from './TimerOption'
import { modeTimerSettings } from '../../utils/constants/general'
import { getTimeInFormat } from '../../utils/helpers/general'

const options = [
   { mode: 'Pomodoro', stage: 0 },
   { mode: 'Short Break', stage: 1 },
   { mode: 'Long Break', stage: 2 },
]

export const TimerDisplay = ({
   onSwitchModeStage,
   minutes,
   seconds,
   onToggleTimerTicking,
   isTicking,
   countOfTimerLoop,
}) => {
   const stage = useSelector((state) => state.mode.stage)
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
                     onSwitchMode={onSwitchModeStage}
                  />
               ))}
            </Options>
            <Timer>{getTimeInFormat.clock(minutes, seconds)}</Timer>
            <StartTimerButton
               color={modeTimerSettings[stage].color}
               isStarted={isTicking}
            >
               <button onClick={onToggleTimerTicking}>
                  {isTicking ? 'START' : 'STOP'}
               </button>
            </StartTimerButton>
         </TimerBlock>
         <CountOfTimerLoop>#{countOfTimerLoop}</CountOfTimerLoop>
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
   margin: 20px auto;
   border-radius: 6px;
   margin-bottom: 20px;
`
const Options = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
const Timer = styled.div`
   font-size: 110px;
   font-weight: bold;
   text-align: center;
   margin-top: 20px;
   font-family: 'Istok Web', sans-serif;
   font-weight: bold;
   letter-spacing: 5px;
`
const StartTimerButton = styled.div`
   display: flex;
   justify-content: center;
   & button {
      cursor: pointer;
      border: none;
      margin: 10px 0px 0px;
      padding: 0px 12px;
      border-radius: 4px;
      box-shadow: ${({ isStarted }) =>
         isStarted ? 'rgb(235 235 235) 0px 6px 0px' : ''};
      position: relative;
      top: ${({ isStarted }) => (isStarted ? '0' : '7px')};
      font-size: 22px;
      color: ${({ color }) => color || ''};
      height: 55px;
      font-weight: bold;
      width: 200px;
      background-color: white;
      font-family: 'Nunito', sans-serif;
      letter-spacing: 0.5px;
      transition: color 0.5s ease-in-out 0s;
   }
`
const CountOfTimerLoop = styled.p`
   font-size: 16px;
   opacity: 0.6;
   margin-bottom: 4px;
   text-align: center;
   font-family: 'Nunito', sans-serif;
`

const TimerMessage = styled.h1`
   font-size: 19px;
   color: white;
   overflow-wrap: break-word;
   text-align: center;
   font-family: 'Open Sans', sans-serif;
   font-weight: 100;
`
