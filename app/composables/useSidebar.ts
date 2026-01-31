import { useSidebarState } from '@/composables/useSidebarState'

let initialized = false 

export const useSidebar = () => {
  const state = useSidebarState()

  const handleResize = () => {
    if (!import.meta.client) return

    const mobile = window.innerWidth < 1024
    state.isMobile.value = mobile

    if (!mobile) {
      state.isMobileOpen.value = false
    }
  }

  const init = () => {
    if (initialized || !import.meta.client) return
    initialized = true

    handleResize()
    window.addEventListener('resize', handleResize)
  }

  onMounted(init)

  const toggleSidebar = () => {
    if (state.isMobile.value) {
      state.isMobileOpen.value = !state.isMobileOpen.value
    } else {
      state.isExpanded.value = !state.isExpanded.value
    }
  }

  const toggleSubmenu = (item: string) => {
    state.openSubmenu.value =
      state.openSubmenu.value === item ? null : item
  }

  return {
    ...state,
    toggleSidebar,
    toggleMobileSidebar: () =>
      (state.isMobileOpen.value = !state.isMobileOpen.value),
    setIsHovered: (v: boolean) => (state.isHovered.value = v),
    setActiveItem: (v: string | null) => (state.activeItem.value = v),
    toggleSubmenu,
  }
}