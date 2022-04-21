import { useState } from 'react'

const useToggle = (initialState = false) => {
   const [state, setState] = useState(initialState)

   const toggleHandler = () => setState((prevState) => !prevState)

   return [state, toggleHandler]
}

export default useToggle
