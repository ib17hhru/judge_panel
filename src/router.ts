import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/judging',
			name: 'judging',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "judging" */ './views/Judging.vue')
		},
		{
			path: '/myratings',
			name: 'myratings',
			component: () => import('./views/MyRatings.vue')
		},
		{
			path: '/stats',
			name: 'stats',
			component: () => import('./views/Stats.vue')
		},
	]
})
