import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import downArrow from '../../assets/icons/down-arrow.svg'
import { alarmSoundOptions } from '../../utils/constants/general'
import { timerActions } from '../../store/timerSlice'

export const TimerSettingSelectDropdown = () => {
   const selectedSound = useSelector((state) => state.timer.selectedSound)
   const dispatch = useDispatch()

   const [isActive, setIsActive] = useState(false)

   const openOptionsHandler = () => {
      setIsActive((isActive) => !isActive)
   }
   const optionChangeHandler = (option) => {
      setIsActive(false)
      dispatch(timerActions.updateTimeUpAlarm(option))
   }
   return (
      <div>
         <DropdownSelect onClick={openOptionsHandler}>
            {selectedSound}
            <img src={downArrow} alt="down-arrow" />
         </DropdownSelect>
         {isActive && (
            <DropdownOption>
               {alarmSoundOptions.map((option) => (
                  <DropdownItem
                     key={option.id}
                     onClick={() => optionChangeHandler(option.value)}
                  >
                     {option.value}
                  </DropdownItem>
               ))}
            </DropdownOption>
         )}
      </div>
   )
}

const DropdownSelect = styled.button`
   background-color: #ebebeb;
   width: 130px;
   height: 40px;
   cursor: pointer;
   color: rgb(120, 120, 120);
   background-color: rgb(235, 235, 235);
   font-size: 14px;
   display: flex;
   border-radius: 4px;
   justify-content: space-between;
   align-items: center;
   padding: 5px 12px;
   border: none;
   font-family: 'Poppins', sans-serif;
   & img {
      width: 20px;
   }
`
const DropdownOption = styled.div`
   position: absolute;
   width: 130px;
   z-index: 15;
   background: #fff;
   display: flex;
   flex-direction: column;
   box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
   color: #3f3f3f;
   font-size: 14px;
   padding: 7px 0;
   border-radius: 4px;
   margin-top: 3px;
   font-family: 'Poppins', sans-serif;
`
const DropdownItem = styled.div`
   padding: 12px;
   color: rgb(120, 120, 120);
   cursor: pointer;
   display: flex;
   align-items: center;
   &:hover {
      background-color: #e9e9e9;
   }
`
