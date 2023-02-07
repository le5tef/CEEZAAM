import { defineStore } from 'pinia'
import type { CurrentDeviceInterface } from 'current-device'

export const useUiStore = defineStore('ui', {
  state: () => ({
    /* eslint max-len: 'off' */
    isIe: null as null | boolean,
    isEdge: null as null | boolean,
    isUcBrowser: null as null | boolean,
    device: null as CurrentDeviceInterface | null, // <String> 'mobile', 'desktop' or 'tablet'
    windowWidth: 0, // ширина ОКНА браузера, не зависит от наличия скроллбара или ширины контента страницы
    windowHeight: 0, // высота ОКНА браузера, внимание - высота ОКНА, а не самой страницы
    documentWidth: 0, // ширина контента страницы, уменьшается, если есть скроллбар, может быть меньше/больше ширины ОКНА браузера
    documentHeight: 0, // высота контента, читай - самой страницы. как правило, больше высоты ОКНА
    scrollbarWidth: 0, // ширина скроллбара, равна 0, если скроллбара нет или скроллбар поверх страницы
    scrollY: 0,
    tabletBreakpoint: 768,
    desktopBreakpoint: 1024,
    xlDesktopBreakpoint: 1440,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1920,
    isSidebarActive: false,
    isGlobalLoaderActive: true,
    modals: [
      // { name: MODAL.CONFIRM_ACTION, isActive: false },
    ],
    overlayIsActive: null as null | boolean,
  }),
  getters: {
    isXs(): boolean {
      return this.windowWidth < this.sm
    },
    isSm(): boolean {
      return this.windowWidth >= this.sm && this.windowWidth < this.md
    },
    isMd(): boolean {
      return this.windowWidth >= this.md && this.windowWidth < this.lg
    },
    isLg(): boolean {
      return this.windowWidth >= this.lg && this.windowWidth < this.xl
    },
    isXl(): boolean {
      return this.windowWidth >= this.xl
    },
    smAndDown(): boolean {
      return this.isSm || this.isXs
    },
    mdAndDown(): boolean {
      return this.isSm || this.isXs || this.isMd
    },
    lgAndDown(): boolean {
      return this.isSm || this.isXs || this.isMd || this.isLg
    },
    smAndUp(): boolean {
      return this.isSm || this.isXl || this.isLg || this.isMd
    },
    mdAndUp(): boolean {
      return this.isXl || this.isLg || this.isMd
    },
    lgAndUp(): boolean {
      return this.isXl || this.isLg
    },
    isMobileDevice({ device }) {
      if (!device) return null

      return !device?.desktop()
    },
    isAppleDevice({ device }) {
      if (!device) return null

      return device?.ios() || navigator.platform.toLowerCase().includes('mac')
    },

    // Если нужно знать, когда изменится ширина или высота окна
    // Вместо window.addEventListener('resize') => watch: { windowSize() { ... } }
    windowSize({ windowWidth, windowHeight }) {
      return windowWidth + windowHeight
    },
    // Если нужно знать, когда изменится ширина или высота документа
    documentSize({ documentWidth, documentHeight }) {
      return documentWidth + documentHeight
    },
    isDesktopWidth({ windowWidth, desktopBreakpoint }) {
      return windowWidth >= desktopBreakpoint
    },
    isMobileWidth({ windowWidth, tabletBreakpoint }) {
      return windowWidth < tabletBreakpoint
    },
  },
  actions: {
    setIsIe(payload: boolean) {
      this.isIe = payload
    },
    setIsEdge(payload: boolean) {
      this.isEdge = payload
    },
    setIsUcBrowser(payload: boolean) {
      this.isUcBrowser = payload
    },
    setDevice(payload: CurrentDeviceInterface) {
      this.device = payload
    },
    // eslint-disable-next-line
    setViewportInfo(payload: any) {
      this.windowWidth = payload.windowWidth
      this.windowHeight = payload.windowHeight
      this.documentWidth = payload.documentWidth
      this.documentHeight = payload.documentHeight
      this.scrollbarWidth = payload.scrollbarWidth
    },
    setWindowHeight(payload: number) {
      this.windowHeight = payload
    },
    setScrollY(payload: number) {
      this.scrollY = payload
    },
    toggleSidebarActive() {
      this.isSidebarActive = !this.isSidebarActive
    },
    setIsGlobalLoaderActive(payload: boolean) {
      this.isGlobalLoaderActive = payload
    },
    hideAllUiModals() {
      // eslint-disable-next-line
      ;(this.modals as Array<any>).forEach((el) => {
        // eslint-disable-line
        el.isActive = false
      })
    },
  },
})
