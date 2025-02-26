import { defineStore } from 'pinia'
import type { UiState } from '@/types/ui'
import { LAYOUT } from '@/libs/constants/layout'
import type { ValueOf } from '@/types/core'

export const useUiStore = defineStore('ui', {
	state: (): UiState => ({
		darkMode: false,
		currentLayout: LAYOUT.PUBLIC,
		// currentLayout: LAYOUT.PUBLIC,
	}),
	actions: {
		toggleDarkMode() {
			this.darkMode = !this.darkMode
			document.documentElement.classList.toggle('dark-theme')
		},
		setLayout(layout: ValueOf<typeof LAYOUT>) {
			this.currentLayout = layout
		},
	},
})
