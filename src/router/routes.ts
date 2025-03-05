import { LAYOUT } from '@/libs/config/layout'
import type { RouteRecordRaw } from 'vue-router'

export const routeConfig: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/pages/HomeView.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/users',
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '',
				name: 'users.index',
				component: () => import('@/pages/Users/UserList.vue'),
			},
			{
				path: 'create',
				name: 'users.create',
				component: () => import('@/pages/Users/UserCreate.vue'),
			},
			{
				path: ':id(\\d+)',
				name: 'users.show',
				component: () => import('@/pages/Users/UserDetail.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/LoginView.vue'),
		meta: {
			requiresGuest: true,
			layout: LAYOUT.PUBLIC,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/pages/PageNotFound.vue'),
		meta: {
			layout: LAYOUT.PUBLIC,
		},
	},
]
