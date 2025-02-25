import { useAuthStore } from '@/stores/authStore'
import type { NavigationAuthGuard, RouteMeta } from '@/types/route'

export const authGuard: NavigationAuthGuard = (to, from, next) => {
	const { userRole, isAuthenticated } = useAuthStore()

	const meta = to.meta as RouteMeta
	if (meta.requiresAuth && !isAuthenticated) {
		return next({ name: 'login' })
	}

	// If authenticated and access to guest route, redirect to home
	if (meta.requiresGuest && isAuthenticated) {
		return next({ name: 'home' })
	}

	// If access to un authorize page, return to home
	if (meta.requiresRole && meta.requiresRole !== userRole) {
		return next({ name: 'home' })
	}

	next()
}
