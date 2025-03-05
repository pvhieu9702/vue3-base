export const isMatchRoute = (path: string, routePattern: string): boolean => {
	console.log('path', path)
	console.log('routePattern', routePattern)

	// Exact path
	if (path === routePattern) return true

	//
	if (routePattern === '/') return path === '/'

	return path.startsWith(routePattern + '/')
}
