// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [{
  path: '/', component: () => import('@/layouts/default/Dashboard'), children: [
    {path: '/home', name: 'Home', component: () => import('@/views/Home.vue')},
    {path: '/playlist', name: 'PlayList', component: () => import('@/views/PlayList.vue')},
    {path: '/scene', name: 'Scene', component: () => import('@/views/Scene.vue')},
    {path: '/instance', name: 'Instance', component: () => import('@/views/Instance.vue')},
    {path: '/instance/:name', name: 'InstanceDetail', component: () => import('@/views/instance/Detail.vue')},
    {path: '/output', name: 'Output', component: () => import('@/views/Output.vue')},
    {path: '/server', name: 'Server', component: () => import('@/views/Server.vue')}
  ],
},]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes,
})

export default router
