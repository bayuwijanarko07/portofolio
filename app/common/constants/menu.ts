import type { MenuItemProps } from '~/types/menu'

export const ICON_SIZE = "1.3rem"

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: 'Home',
    href: '/',
    icon: 'mdi:home-outline',
    iconSize : ICON_SIZE,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Home',
  },
  {
    title: 'About',
    href: '/about',
    icon: 'mdi:user-outline',
    iconSize : ICON_SIZE,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: About',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: 'mdi:collection',
    iconSize : ICON_SIZE,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Projects',
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: 'mdi:contact-outline',
    iconSize : ICON_SIZE,
    isShow: true,
    isExternal: false,
    eventName: 'Pages: Contact',
  },
]
