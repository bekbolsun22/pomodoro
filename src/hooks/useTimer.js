import { useCallback, useEffect, useState } from 'react'
import { getTimeInFormat } from '../utils/helpers/general'

export const useTimer = (timeStage, timeUp, stage, ticking) => {
   const [minutes, setMinutes] = useState(0)
   const [seconds, setSeconds] = useState(0)
   const [consumedSeconds, setConsumedSeconds] = useState(0)

   const getTickingTime = useCallback(() => {
      const { minute, second } = getTimeInFormat.minutesAndSeconds(timeStage)
      setMinutes(minute)
      setSeconds(second)
   }, [timeStage, stage])

   useEffect(() => {
      getTickingTime()
   }, [getTickingTime])

   useEffect(() => {
      setConsumedSeconds(0)
   }, [stage])

   const clockTicking = useCallback(() => {
      if (minutes === 0 && seconds === 1) {
         timeUp()
      } else if (seconds === 0) {
         setMinutes((minute) => minute - 1)
         setSeconds(59)
      } else {
         setSeconds((second) => second - 1)
      }
   }, [minutes, seconds, stage, timeUp])

   useEffect(() => {
      window.onbeforeunload = () => {
         return consumedSeconds && !ticking ? 'Show warning' : null
      }
      const timer = setInterval(() => {
         if (!ticking) {
            clockTicking()
            setConsumedSeconds((second) => second + 1)
         } else {
            clearInterval(timer)
         }
      }, 1000)
      return () => {
         clearInterval(timer)
      }
   }, [ticking, consumedSeconds, clockTicking, setConsumedSeconds])

   return { minutes, seconds, consumedSeconds }
}
