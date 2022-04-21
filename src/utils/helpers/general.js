export const getTimeInFormat = {
   minutesAndSeconds(value) {
      const seconds = (value * 3600) / 60
      const time = `${Math.floor(seconds / 60)}:${seconds % 60}`
      const [minute, second] = time.split(':')
      return { minute: Number(minute), second: Number(second) }
   },
   clock(minutes, seconds) {
      const second = `${
         seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`
      }`.split('.')[0]
      const time = `${minutes}:${second}`
      return time
   },
}
