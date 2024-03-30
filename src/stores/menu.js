import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({ selectedTab: 1 }),
})
