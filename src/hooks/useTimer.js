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
   }, [timeStage])

   useEffect(() => {
      getTickingTime()
   }, [getTickingTime])

   const clockTicking = useCallback(() => {
      if (minutes === 0 && seconds === 0) {
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
         }
      }, 1000)
      return () => {
         clearInterval(timer)
      }
   }, [
      ticking,
      stage,
      consumedSeconds,
      clockTicking,
      setConsumedSeconds,
      timeUp,
   ])
   return { minutes, seconds, consumedSeconds }
}
