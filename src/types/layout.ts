export interface SidebarItemInterface {
	to?: string
	label: string
	disabled?: boolean
	visible?: boolean
	url?: string
	icon?: string
	target?: LinkTarget
	items?: SidebarItemInterface[]
}

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top' | string
