import bellsAlarmSound from '../../assets/sounds/bells.mp3'
import birdAlarmSound from '../../assets/sounds/bird.mp3'
import digitalAlarmSound from '../../assets/sounds/digital.mp3'

export const modeTimerSettings = {
   0: { color: '#d95550', message: 'Time to focus!' },
   1: { color: '#4c9195', message: 'Time for a break!' },
   2: { color: '#457ca3', message: 'Time for a break!' },
}

export const alarmSoundOptions = [
   { value: 'Bells', id: 'e1' },
   { value: 'Bird', id: 'e2' },
   { value: 'Digital', id: 'e3' },
]

export const sounds = [
   {
      src: bellsAlarmSound,
      title: 'Bells',
   },
   {
      src: birdAlarmSound,
      title: 'Bird',
   },
   {
      src: digitalAlarmSound,
      title: 'Digital',
   },
]

export const pomodoroIndexOfStage = 0
export const shortBreakIndexOfStage = 1
export const lonkBreakIndexOfStage = 2
