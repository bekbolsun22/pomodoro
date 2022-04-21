import React, { forwardRef } from 'react'

const Audio = forwardRef((props, ref) => {
   return (
      <audio ref={ref} src={props.src}>
         <track kind="captions" />
      </audio>
   )
})

export default Audio
