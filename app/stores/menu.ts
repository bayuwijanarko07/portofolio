import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', {
  state: () => ({
    isOpen: false as boolean,
  }),

  actions: {
    showMenu() {
      this.isOpen = true
    },

    hideMenu() {
      this.isOpen = false
    },

    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
})
