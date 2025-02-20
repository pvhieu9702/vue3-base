import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
	const isDarkMode = ref<boolean>(false)

	function toggleDarkMode() {
		isDarkMode.value = !isDarkMode.value
		document.documentElement.classList.toggle('dark-theme')
	}

	return { isDarkMode, toggleDarkMode }
})
