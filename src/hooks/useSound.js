import { useRef } from 'react'

export const useSound = () => {
   const ref = useRef()

   const play = () => {
      return ref.current.play()
   }
   const pause = () => {
      return ref.current.pause()
   }
   return { ref, play, pause }
}
