import { defineStore } from 'pinia'
import type { AuthState, UserRole } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => ({
		isAuthenticated: false,
		userRole: null,
	}),
	actions: {
		login(role: UserRole) {
			this.isAuthenticated = true
			this.userRole = role
		},
		logout() {
			this.isAuthenticated = false
			this.userRole = null
		},
	},
})
