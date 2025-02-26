import instance from '../core/axios'
import type { AuthRequest, AuthResponse, RefreshTokenRequest } from '@/types/auth'

export const AuthApi = {
  login: async (data: AuthRequest): Promise<AuthResponse> => {
    const response = await instance.post(`/login`, data)
    return response.data
  },
  refreshToken: async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    const response = await instance.post(`/refresh`, data)
    return response.data
  },
}
