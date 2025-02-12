import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: AppLayout,
			children: [
				{
					path: '/',
					name: 'home',
					component: () => import('@/pages/HomeView.vue'),
				},
				{
					path: '/users',
					name: 'users',
					component: () => import('@/pages/Users/UserList.vue'),
				},
			],
		},
	],
})

export default router
