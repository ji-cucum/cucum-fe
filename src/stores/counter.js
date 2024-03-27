import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Menu } from '@/consts/index'

export const useMenuStore = defineStore('menu', () => {
  const selectedTab = ref(Menu.PALY_LIST)

  return { selectedTab }
})
