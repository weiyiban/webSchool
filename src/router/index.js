import Vue from 'vue'
import Router from 'vue-router'
import index from '@/app'
import login from '@/components/login'
import schoolList from '@/components/school/schoolList'
import addSchool from '@/components/school/addSchool'
import updataSchool from '@/components/school/updataSchool'
import bundleProduct from '@/components/product/bundleProduct'
import addBundleProduct from '@/components/product/addBundleProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/schoolList',
      name: 'schoolList',
      component: schoolList
    },
    {
      path: '/addSchool',
      name: 'addSchool',
      component: addSchool
    },
    {
      path: '/updataSchool/:row',
      name: 'updataSchool',
      component: updataSchool
    },
    {
      path: '/bundleProduct',
      name: 'bundleProduct',
      component: bundleProduct
    },
    {
      path: '/addBundleProduct',
      name: 'addBundleProduct',
      component: addBundleProduct
    }
  ]
})
