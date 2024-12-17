import { createRouter, createWebHistory } from 'vue-router';
import ProductPage from '../components/ProductPage.vue';
import AdminProduct from '../components/AdminProduct.vue';
import WhatsNew from '../components/WhatsNew.vue';
import Admin from '../components/Admin.vue';

const routes = [
  {
    path: '/product',  // Pastikan path ini benar
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/admin-product',
    name: 'AdminProduct',
    component: AdminProduct
  },
  {
    path: '/whats-new',
    name: 'WhatsNew',
    component: WhatsNew
  },
  {
    path: '/admin',  
    name: 'Admin',
    component: Admin
  },
  // Rute lainnya jika ada
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
