import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-Task',
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/edit-Task/:Task_slug',
      name: 'EditTask',
      component: EditTask
    }
  ]
})
