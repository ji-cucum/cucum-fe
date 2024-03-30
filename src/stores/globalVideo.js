import { defineStore } from 'pinia'

export const useGlobalVideoStore = defineStore('globalVideo', {
  state: () => ({ videoId: null }),
})
