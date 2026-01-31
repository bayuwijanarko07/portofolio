export const useSidebarState = () => {
  const isExpanded = useState<boolean>('sidebar-expanded', () => true)
  const isMobileOpen = useState<boolean>('sidebar-mobile-open', () => false)
  const isHovered = useState<boolean>('sidebar-hovered', () => false)
  const activeItem = useState<string | null>('sidebar-active', () => null)
  const openSubmenu = useState<string | null>('sidebar-submenu', () => null)
  const isMobile = useState<boolean>('sidebar-mobile', () => false)

  return {
    isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    isMobile,
  }
}