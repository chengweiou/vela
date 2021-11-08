import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      components: { full: () => import('./full.vue') },
      children: [
        { name: 'log', path: 'log', component: () => import('@/view/log/index.vue') },
        { name: 'refresh', path: 'refresh', component: () => import('@/view/refresh.vue') },
        { name: 'login', path: '', component: () => import('@/view/login/index.vue') },
      ],
    },
    {
      path: '/vela',
      components: { full: () => import('./admin.vue') },
      children: [
        { name: 'personRoomRelateList', path: 'personRoomRelate', component: () => import('@/view/personRoomRelate/list.vue') },
        { name: 'friendList', path: 'friend', component: () => import('@/view/friend/list.vue') },
        { name: 'room', path: 'room/:id', component: () => import('@/view/room/index.vue') },
      ],
    },
  ],
})
