import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middleware'
import { LAYOUT } from '@/libs/config/layout'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
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
					name: 'users',
					component: () => import('@/pages/Users/UserList.vue'),
				},
				{
					path: 'create',
					name: 'createUser',
					component: () => import('@/pages/Users/UserCreate.vue'),
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/pages/LoginView.vue'),
			meta: {
				requiresGuest: true,
				layout: LAYOUT.PUBLIC
			},
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/pages/PageNotFound.vue'),
			meta: {
				layout: LAYOUT.PUBLIC
			}
		},
	],
})

router.beforeEach(authGuard)

export default router
