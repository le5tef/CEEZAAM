import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    open: [] as string[],
  }),
  getters: {
    active: (state) => (state.open.length > 0 ? state.open[0] : null),
    allOpen: (state) => state.open,
  },
  actions: {
    openDialog(payload: string) {
      this.open.unshift(payload)
    },
    closeDialog(payload: string) {
      this.open = this.open.filter((e) => e !== payload)
    },
  },
})
