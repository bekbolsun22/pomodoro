import React from 'react'
import styled from '@emotion/styled'

export const TimerOption = ({ isActive, mode, stage, onSwitchMode }) => {
   return (
      <OptionButton
         type="button"
         onClick={() => onSwitchMode(stage)}
         isActive={isActive}
      >
         <span>{mode}</span>
      </OptionButton>
   )
}

const OptionButton = styled.button`
   border: none;
   border-radius: 4px;
   font-size: 15px;
   padding: 2px 12px;
   height: 28px;
   cursor: pointer;
   background: ${({ isActive }) => (isActive ? 'rgba(0, 0, 0, 0.15)' : 'none')};
   color: white;
   opacity: 1;
   & span {
      font-weight: ${({ isActive }) => (isActive ? 700 : 300)};
   }
`
