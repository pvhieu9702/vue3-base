import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middleware'
import { routeConfig } from './routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routeConfig,
	linkActiveClass: 'nav-active-link',
	linkExactActiveClass: 'nav-exact-active-link',
})

router.beforeEach(authGuard)

export default router
