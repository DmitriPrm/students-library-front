import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from "@/shared/lib/navigation/routes.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: appRoutes.MAIN.path,
      name: appRoutes.MAIN.name,
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: appRoutes.DEANS_OFFICE.path,
      name: appRoutes.DEANS_OFFICE.name,
      component: () => import('@/views/DeansOffice.vue'),
    },
    {
      path: appRoutes.LIBRARY.path,
      name: appRoutes.LIBRARY.name,
      component: () => import('@/views/LibraryPage.vue'),
    },
    {
      path: appRoutes.BOOKS_LOAN.path,
      name: appRoutes.BOOKS_LOAN.name,
      component: () => import('@/views/BooksLoan.vue'),
    },
  ],
})

export default router
