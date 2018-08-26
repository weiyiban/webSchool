import Vue from 'vue'
import Router from 'vue-router'
import index from '@/app'
import login from '@/components/login'
import schoolList from '@/components/school/schoolList'
import addSchool from '@/components/school/addSchool'
import bundleProduct from '@/components/school/product/bundleProduct'
import addBundleProduct from '@/components/school/product/addBundleProduct'
import complaintList from '@/components/complaints/complaintList'
import usersList from '@/components/user/usersList'
import addUser from '@/components/user/addUser'
import admin from '@/components/admin'

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
      path: '/admin',
      name: 'admin',
      component: admin
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
      path: '/bundleProduct/:code',
      name: 'bundleProduct',
      component: bundleProduct
    },
    {
      path: '/addBundleProduct',
      name: 'addBundleProduct',
      component: addBundleProduct
    },
    {
      path: '/complaintList',
      name: 'complaintList',
      component: complaintList
    },
    {
      path: '/usersList',
      name: 'usersList',
      component: usersList
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: addUser
    }
  ]
})
