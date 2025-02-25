export type UserRole = 'user' | 'admin' | null

export interface AuthState {
	isAuthenticated: boolean
	userRole: UserRole
}
