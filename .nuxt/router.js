import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _59fe41cd = () => import('../pages/about/_.vue' /* webpackChunkName: "pages/about/_" */).then(m => m.default || m)
const _a97604ce = () => import('../pages/comparison/_.vue' /* webpackChunkName: "pages/comparison/_" */).then(m => m.default || m)
const _737c1516 = () => import('../pages/country/_.vue' /* webpackChunkName: "pages/country/_" */).then(m => m.default || m)
const _5f1b9090 = () => import('../pages/sources/_.vue' /* webpackChunkName: "pages/sources/_" */).then(m => m.default || m)
const _a7e85386 = () => import('../pages/sustainable/_.vue' /* webpackChunkName: "pages/sustainable/_" */).then(m => m.default || m)
const _5e9c9c39 = () => import('../pages/thematic/_.vue' /* webpackChunkName: "pages/thematic/_" */).then(m => m.default || m)
const _2d98b87c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/about/*",
			component: _59fe41cd,
			name: "about-all"
		},
		{
			path: "/comparison/*",
			component: _a97604ce,
			name: "comparison-all"
		},
		{
			path: "/country/*",
			component: _737c1516,
			name: "country-all"
		},
		{
			path: "/sources/*",
			component: _5f1b9090,
			name: "sources-all"
		},
		{
			path: "/sustainable/*",
			component: _a7e85386,
			name: "sustainable-all"
		},
		{
			path: "/thematic/*",
			component: _5e9c9c39,
			name: "thematic-all"
		},
		{
			path: "/",
			component: _2d98b87c,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
