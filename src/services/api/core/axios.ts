/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, getRefreshToken, handleLogout } from "@/libs/helpers/auth";
import axios, { type AxiosResponse } from "axios";

const IS_REFRESH_TOKEN = false
let isTokenExpired = false
let refreshTokenRequest: Promise<unknown> | null = null

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: import.meta.env.VITE_TIME_OUT_REQUEST,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Refresh token */
const refreshTokenHandle = async (): Promise<string | undefined> => {
  try {
    const token = getRefreshToken()
    await axios.get<void, AxiosResponse<unknown>>(
      `${import.meta.env.BASE_URL}/auth/refresh`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      },
    )
    // [TODO]: Set accessToken
    // [TODO]: Set refreshToken

    return 'new token'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    // [TODO]: Remove accessToken
    // [TODO]: Remove refreshToken
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
    const noRefreshTokenUrls = ['/auth/refresh']

    if (noRefreshTokenUrls.includes(url)) return Promise.reject(error)
    if (status === 401 && !IS_REFRESH_TOKEN) {
      handleLogout()
      window.location.reload()
    }
    if (status === 401 && IS_REFRESH_TOKEN) isTokenExpired = true

    const token = getRefreshToken()
    if (isTokenExpired && token) {
      refreshTokenRequest = refreshTokenRequest || refreshTokenHandle()

      const newToken = await refreshTokenRequest
      refreshTokenRequest = null
      isTokenExpired = false

      if (newToken)
        return instance.request({
          ...error.config,
          headers: {
            Authorization: newToken,
          },
        })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)


export default instance