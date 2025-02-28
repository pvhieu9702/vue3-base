/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	getAccessToken,
	getRefreshToken,
	handleLogout,
	removeAccessToken,
	removeRefreshToken,
	setAccessToken,
	setRefreshToken,
} from '@/libs/helpers/auth'
import type { AuthResponse } from '@/types/auth'
import axios, { type AxiosResponse } from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL_API,
	timeout: import.meta.env.VITE_TIME_OUT_REQUEST,
	headers: {
		'Content-Type': 'application/json',
	},
})

/** Refresh token */
export const refreshTokenHandle = async (): Promise<string | undefined> => {
	try {
		const refreshToken = getRefreshToken()
		if (!refreshToken) return undefined

		const { data: token } = await axios.post<void, AxiosResponse<AuthResponse>>(
			`${import.meta.env.VITE_BASE_URL_API}/refresh`, { refreshToken },
		)
		setAccessToken(token.accessToken)
		setRefreshToken(token.refreshToken)
		return token.accessToken
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error: any) {
		removeAccessToken()
		removeRefreshToken()
		return undefined
	}
}

/** Pre request */
instance.interceptors.request.use(
	async (config: any) => {
		const defaultToken = config.headers?.Authorization
			? String(config.headers.Authorization)
			: undefined
		const accessToken = defaultToken || getAccessToken()
		if (accessToken)
			config.headers.setAuthorization(
				accessToken?.includes('Bearer') ? accessToken : `Bearer ${accessToken}`,
			)

		return config
	},
	async (error: any) => Promise.reject(error),
)

/** Pre response */
instance.interceptors.response.use(
	async (response: any) => Promise.resolve(response),
	async (error: any) => {
		const status = error?.response?.status
		const { url } = error.config
		const noRefreshTokenUrls = ['/refresh']
		const refreshToken = getRefreshToken()

		if (noRefreshTokenUrls.includes(url)) return Promise.reject(error)
		if (status === 401 && !refreshToken) {
			handleLogout()
		}
		if (status === 401 && refreshToken) {
			const newAccessToken = await refreshTokenHandle()
			if (newAccessToken) {
				return instance.request({
					...error.config,
					headers: {
						Authorization: newAccessToken,
					},
				})
			}
			return Promise.reject(error)
		}
		return Promise.reject(error)
	},
)

export default instance
