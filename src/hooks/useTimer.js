import { useCallback, useEffect, useState } from 'react'

export const useTimer = (timeStage, timeUp, stage, ticking) => {
   const [minutes, setMinutes] = useState(0)
   const [seconds, setSeconds] = useState(0)
   const [consumedSeconds, setConsumedSeconds] = useState(0)

   const getTickingTime = useCallback(() => {
      const seconds = (timeStage * 3600) / 60
      const time = `${Math.floor(seconds / 60)}:${
         seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`
      }`
      const [minute, second] = time.split(':')
      setMinutes(Number(minute))
      setSeconds(Number(second))
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
