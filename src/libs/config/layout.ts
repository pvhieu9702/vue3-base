import type { SidebarItemInterface } from "@/types/layout"

export const LAYOUT = Object.freeze({
	DEFAULT: 'DEFAULT',
	PUBLIC: 'PUBLIC',
})

export const APP_SIDEBAR_CONFIG: SidebarItemInterface[] = [
	{
		label: 'Home',
		to: '/',
		icon: 'pi pi-home',
	},
	{
		label: 'Users',
		to: '/users',
		icon: 'pi pi-users',
	},
]
