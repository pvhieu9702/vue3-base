import { getAccessToken, getRefreshToken } from '@/libs/helpers/auth'
import { refreshTokenHandle } from '@/services/api/core/axios'
import type { NavigationAuthGuard, RouteMeta } from '@/types/route'

export const authGuard: NavigationAuthGuard = async (to, from, next) => {
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const userRole = 'user'

	const meta = to.meta as RouteMeta
	if (meta.requiresAuth && !accessToken) {
		if (!refreshToken) {
			return next({ name: 'login' })
		}
		await refreshTokenHandle()
	}

	// TODO: Verify access token, nếu fail thì chuyển về trang login

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
