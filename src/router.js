import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Manage from './views/Manage.vue';
import ErrorPage from './views/ErrorPage.vue';
// import Post from './views/Post.vue';

import { defineAsyncComponent } from 'vue';

const Post = defineAsyncComponent({
  loader: () => import('./views/Post.vue'),
  loadingComponent: () => import('./components/Loading.vue'),
  errorComponent: () => import('./views/ErrorPage.vue'),
  delay: 10, // tempo para mostrar o loading (em ms)
  timeout: 5000, // tempo limite para abortar o carregamento
});

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { title: 'Home - Meu Blog' }
  }, // rota raiz
  { 
    path: '/manage', 
    name: 'Gerenciar', 
    component: Manage,
    meta: { title: 'Meu Blog - Gerenciar' }
  }, // rota raiz
  {
    path: '/post/:id/:slug?',
    name: 'PostPorId',
    component: Post
  },
  {
    path: '/error/:code',
    name: 'Erro',
    component: ErrorPage
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
