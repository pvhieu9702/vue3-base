import type {
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from 'vue-router'
import type { UserRole } from './auth'
import type { LAYOUT } from '@/libs/constants/layout'
import type { ValueOf } from './core'

export type RouteMeta = {
	requiresAuth?: boolean
	requiresGuest?: boolean
	layout?: ValueOf<typeof LAYOUT>
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
