import styled from '@emotion/styled'
import React from 'react'
import { Modal } from '../UI/Modal'
import close from '../../assets/icons/x.svg'
import { Input } from '../UI/Input'

export const TimerSetting = ({
   onChangeVisible,
   settingValues,
   onChangeSettingValues,
   isAutoStarts,
   onChangeAutoStart,
   onUpdateSettings,
}) => {
   const { pomodoro, shortBreak, longBreak, longBreakInterval } = settingValues
   const { isAutoStartBreaks, isAutoStartPomodoros } = isAutoStarts
   const isDisabled = Object.values(settingValues).some(
      (setting) => Number(setting) <= 0
   )
   return (
      <Modal>
         <SettingBlock>
            <SettingTop>
               <SettingText>TIMER SETTING</SettingText>
               <CloseButton src={close} alt="close" onClick={onChangeVisible} />
            </SettingTop>

            <SettingInputs>
               <SettingLabel>Time (minutes)</SettingLabel>
               <InputWrapper>
                  <InputBlock>
                     <SettingText fontSize="14px">Pomodoro</SettingText>
                     <Input
                        type="number"
                        w="100%"
                        p="10px"
                        m="5px 0 0 0"
                        bgColor="rgb(239, 239, 239)"
                        borderRds="4px"
                        fontSize="16px"
                        color="rgb(85, 85, 85)"
                        name="pomodoro"
                        onChange={onChangeSettingValues}
                        value={pomodoro}
                     />
                  </InputBlock>
                  <InputBlock>
                     <SettingText fontSize="14px">Short Break</SettingText>
                     <Input
                        type="number"
                        w="100%"
                        p="10px"
                        m="5px 0 0 0"
                        bgColor="rgb(239, 239, 239)"
                        borderRds="4px"
                        fontSize="16px"
                        color="rgb(85, 85, 85)"
                        name="shortBreak"
                        onChange={onChangeSettingValues}
                        value={shortBreak}
                     />
                  </InputBlock>
                  <InputBlock>
                     <SettingText fontSize="14px">Long Break</SettingText>
                     <Input
                        type="number"
                        w="100%"
                        p="10px"
                        m="5px 0 0 0"
                        bgColor="rgb(239, 239, 239)"
                        borderRds="4px"
                        fontSize="16px"
                        color="rgb(85, 85, 85)"
                        name="longBreak"
                        onChange={onChangeSettingValues}
                        value={longBreak}
                     />
                  </InputBlock>
               </InputWrapper>
            </SettingInputs>

            <AdvancedSettingsWrapper borderBottom>
               <SettingLabel>Auto start Breaks?</SettingLabel>
               <AutoStartCheckbox>
                  <input
                     type="checkbox"
                     name="isAutoStartBreaks"
                     onChange={onChangeAutoStart}
                     checked={isAutoStartBreaks}
                  />
                  <span />
               </AutoStartCheckbox>
            </AdvancedSettingsWrapper>
            <AdvancedSettingsWrapper borderBottom>
               <SettingLabel>Auto start Pomodoros?</SettingLabel>
               <AutoStartCheckbox>
                  <input
                     type="checkbox"
                     name="isAutoStartPomodoros"
                     onChange={onChangeAutoStart}
                     checked={isAutoStartPomodoros}
                  />
                  <span />
               </AutoStartCheckbox>
            </AdvancedSettingsWrapper>
            <AdvancedSettingsWrapper borderBottom>
               <SettingLabel>Long Break interval</SettingLabel>
               <LongBreakIntervalInputWrapper>
                  <Input
                     type="number"
                     w="100%"
                     p="10px"
                     m="5px 0 0 0"
                     bgColor="rgb(239, 239, 239)"
                     borderRds="4px"
                     fontSize="16px"
                     color="rgb(85, 85, 85)"
                     name="longBreakInterval"
                     onChange={onChangeSettingValues}
                     value={longBreakInterval}
                  />
               </LongBreakIntervalInputWrapper>
            </AdvancedSettingsWrapper>
            <AdvancedSettingsWrapper>
               <SettingLabel>Alarm Sound</SettingLabel>
               <AlarmSoundSelectWrapper>
                  <select>
                     <option value="Digital">Digital</option>
                     <option value="Bell">Bell</option>
                     <option value="Bird">Bird</option>
                     <option value="Kitchen">Kitchen</option>
                     <option value="Wood">Wood</option>
                  </select>
               </AlarmSoundSelectWrapper>
            </AdvancedSettingsWrapper>
         </SettingBlock>
         <SaveSettingButtonWrapper>
            <button onClick={onUpdateSettings} disabled={isDisabled}>
               OK
            </button>
         </SaveSettingButtonWrapper>
      </Modal>
   )
}

const SettingBlock = styled.div`
   padding: 20px 20px 0px;
   font-family: 'ArialRounded';
`

const SettingTop = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-bottom: 12px;
`
const SettingText = styled.h1`
   font-size: ${({ fontSize }) => fontSize || '16px'};
   color: rgb(187, 187, 187);
   font-weight: bold;
`
const CloseButton = styled.img`
   width: 25px;
   opacity: 0.6;
   cursor: pointer;
   &:hover {
      opacity: 1;
   }
`
const SettingLabel = styled.h2`
   color: rgb(85, 85, 85);
   font-weight: bold;
   font-size: 16px;
`

const SettingInputs = styled.div`
   padding: 20px 0;
   border-block: 1px solid #e6e5e5;
`
const InputWrapper = styled.div`
   display: flex;
   width: 360px;
   justify-content: space-between;
   margin-top: 5px;
`

const InputBlock = styled.div`
   display: flex;
   flex-direction: column;
   width: 98px;
`

const AdvancedSettingsWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 20px 0;
   border-bottom: ${({ borderBottom }) =>
      borderBottom ? '1px solid #e6e5e5' : 's'};
`

const AutoStartCheckbox = styled.label`
   font-size: 17px;
   position: relative;
   display: inline-block;
   width: 49px;
   height: 28px;
   & input {
      opacity: 1;
      width: 0;
      height: 0;
   }
   & input:checked + span {
      background-color: #5fdd54;
      border: 1px solid transparent;
   }
   & input:checked + span:before {
      transform: translateX(1.2em);
   }
   & span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #cccccc;
      transition: 0.4s;
      border-radius: 30px;
      border: 1px solid #ccc;
   }
   & span::before {
      position: absolute;
      content: '';
      height: 1.5em;
      width: 1.5em;
      border-radius: 16px;
      left: 0px;
      top: 0;
      bottom: 0;
      background-color: white;
      box-shadow: 0 2px 5px #9999996a;
      transition: 0.4s;
   }
`

const LongBreakIntervalInputWrapper = styled.div`
   width: 75px;
`
const AlarmSoundSelectWrapper = styled.div`
   & select {
      cursor: pointer;
      width: 130px;
      color: rgb(120, 120, 120);
      font-weight: 500;
      border-radius: 4px;
      background-color: rgb(235, 235, 235);
      padding: 12px;
      font-size: 14px;
      outline: none;
      border: none;
   }
`

const SaveSettingButtonWrapper = styled.div`
   padding: 14px 20px;
   text-align: right;
   border-bottom-left-radius: 8px;
   border-bottom-right-radius: 8px;
   background-color: rgb(239, 239, 239);
   & button {
      border-radius: 4px;
      cursor: pointer;
      color: white;
      opacity: 0.9;
      font-size: 14px;
      padding: 8px 12px;
      width: 70px;
      background-color: rgb(34, 34, 34);
      border: 2px solid rgb(34, 34, 34);
      &:hover {
         opacity: 1;
      }
      &:disabled {
         opacity: 0.5;
         cursor: default;
      }
   }
`
