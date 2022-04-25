export const getTimeInFormat = {
   minutesAndSeconds(value) {
      const seconds = (value * 3600) / 60
      const time = `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`
      const [minute, second] = time.split(':')
      return { minute: Number(minute), second: Number(second) }
   },
   clock(minutes, seconds) {
      const second = `${
         seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`
      }`.split('.')[0]
      const minute = `${minutes * 60 > 540 ? minutes : `0${minutes}`}`
      const time = `${minute}:${second}`
      return time
   },
}

export const localstorage = {
   save(key, value) {
      return localStorage.setItem(key, JSON.stringify(value))
   },
   get(key) {
      return JSON.parse(localStorage.getItem(key))
   },
   remove(key) {
      return localStorage.removeItem(key)
   },
}
