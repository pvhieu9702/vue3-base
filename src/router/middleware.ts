import { getAccessToken, getRefreshToken, isTokenExpired } from '@/libs/helpers/auth'
import { refreshTokenHandle } from '@/services/api/core/axios'
import type { NavigationAuthGuard, RouteMeta } from '@/types/route'

export const authGuard: NavigationAuthGuard = async (to, _, next) => {
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const userRole = 'user'

	const meta = to.meta as RouteMeta
	console.log('accessToken', isTokenExpired(accessToken), accessToken);
	console.log('meta', to.meta, to.path);
	if (meta.requiresAuth && (!accessToken || isTokenExpired(accessToken))) {
		//TODO: Cần redirect về màn login nếu refresh token hết hạn
		if (!refreshToken) {
			// if (!refreshToken || isTokenExpired(refreshToken)) {
			return next({
				name: 'login',
				query: { redirect: to.fullPath }
			})
		}
		await refreshTokenHandle()
	}

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
