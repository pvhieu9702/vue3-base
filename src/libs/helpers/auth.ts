import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/libs/config/local'
import { getCookie, removeCookie, setCookie } from '@/libs/helpers/cookie'
import router from '@/router'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment'

export const getAccessToken = (): string | null => {
	return getCookie(ACCESS_TOKEN) || null
}

export const getRefreshToken = (): string | null => {
	return getCookie(REFRESH_TOKEN) || null
}

export const setAccessToken = (token: string) => {
	setCookie(ACCESS_TOKEN, token, 1)
}

export const setRefreshToken = (token: string) => {
	setCookie(REFRESH_TOKEN, token, 7)
}

export const removeAccessToken = () => {
	removeCookie(ACCESS_TOKEN)
}

export const removeRefreshToken = () => {
	removeCookie(REFRESH_TOKEN)
}

export const handleLogout = async () => {
	removeCookie(ACCESS_TOKEN)
	removeCookie(REFRESH_TOKEN)
	router.push({ name: 'login' })
}

export const isTokenExpired = (token?: string | null): boolean => {
	if (!token) return true
	try {
		const decoded: { exp: number } = jwtDecode(token)
		return moment().isAfter(moment.unix(decoded.exp))
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return true
	}
}
