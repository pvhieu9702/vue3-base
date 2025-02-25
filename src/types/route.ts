import type {
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from 'vue-router'
import type { UserRole } from './auth'

export type RouteMeta = {
	requiresAuth?: boolean
	requiresGuest?: boolean
	requiresRole?: UserRole
}

export type AppRoute = RouteRecordRaw & {
	meta?: RouteMeta
}

export type NavigationAuthGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext,
) => void
