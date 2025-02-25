import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middleware'

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
			},
		},
	],
})

router.beforeEach(authGuard)

export default router
