export type UserRole = 'user' | 'admin' | null

export interface AuthState {
	accessToken?: string
	refreshToken?: string
	userRole: UserRole
}

export interface AuthRequest {
	email: string
	password: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
}

export interface RefreshTokenRequest {
	refreshToken: string
}
