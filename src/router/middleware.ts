import { LAYOUT } from '@/libs/constants/layout'
import { getAccessToken } from '@/libs/helpers/auth'
import { useUiStore } from '@/stores/uiStore'
import type { NavigationAuthGuard, RouteMeta } from '@/types/route'

export const authGuard: NavigationAuthGuard = (to, from, next) => {
	const uiStore = useUiStore()
	const accessToken = getAccessToken()
	const userRole = 'user'

	const meta = to.meta as RouteMeta
	if (meta.requiresAuth && !accessToken) {
		uiStore.setLayout(LAYOUT.PUBLIC)
		return next({ name: 'login' })
	}
	uiStore.setLayout(LAYOUT.DEFAULT)

	// If authenticated and access to guest route, redirect to home
	if (meta.requiresGuest && accessToken) {
		return next({ name: 'home' })
	}

	// If access to un authorize page, return to home
	if (meta.requiresRole && meta.requiresRole !== userRole) {
		return next({ name: 'home' })
	}

	next()
}
