import { defineStore } from 'pinia'
import type { UiState } from '@/types/ui'
import { getCookie, setCookie } from '@/libs/helpers/cookie'
import { UI_COOKIE } from '@/libs/config/local'

export const useUiStore = defineStore('ui', {
	state: (): UiState => {
		const cookieUi = getCookie(UI_COOKIE)
		const parseCookie = cookieUi ? JSON.parse(cookieUi) : null
		return {
			darkMode: parseCookie?.darkMode ?? false,
		}
	},
	actions: {
		toggleDarkMode() {
			this.darkMode = !this.darkMode
			document.documentElement.classList.toggle('dark-theme')
			saveUiCookie(this.$state)
		},
	},
})

const saveUiCookie = (state: UiState) => {
	setCookie(UI_COOKIE, JSON.stringify(state))
}
