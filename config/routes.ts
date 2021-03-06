import _ from 'lodash'

interface Router {
  path?: string;
  component?: string;
  Routes?: string[];
  routes?: Router[]
  authority?: string[];
  name?: string;
  icon?: string;
  redirect?: string;
}

const baseRoutes: Router = {
  path: '/',
  component: '../layouts/BlankLayout',
  routes: [],
}

const userRoutes: Router = {
  path: '/user',
  component: '../layouts/UserLayout',
  routes: [
    {
      path: '/user',
      redirect: '/user/login',
    },
    {
      name: 'login',
      icon: 'smile',
      path: '/user/login',
      component: './user/login',
    },
    {
      name: 'register-result',
      icon: 'smile',
      path: '/user/register-result',
      component: './user/register-result',
    },
    {
      name: 'register',
      icon: 'smile',
      path: '/user/register',
      component: './user/register',
    },
    {
      component: '404',
    },
  ]
}



const asyncRoutes: Router = {
  path: '/',
  component: '../layouts/BasicLayout',
  Routes: ['src/pages/Authorized'],
  authority: ['admin', 'user'],
  routes: [
    {
      path: '/',
      redirect: '/account',
      authority: ['admin', 'user'],
    },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      component: './account',
    },
    {
      name: 'articles',
      icon: 'table',
      path: '/articles',
      routes: [
        {
          path: '/articles',
          component: './articles',
        },
        {
          path: '/articles/add',
          component: './articles/$id',
        },
        {
          path: '/articles/edit/:id',
          component: './articles/$id',
        },
        {
          path: '/articles/comments/:id',
          component: './articles/comments',
        }
      ]
    },
    {
      name: 'messages',
      icon: 'message',
      path: '/messages',
      routes: [
        {
          path: '/messages',
          component: './messages',
        },
        {
          path: '/messages/:id',
          component: './messages/$id',
        }
      ]
    },
    {
      name: 'tags',
      icon: 'tags',
      path: '/tags',
      component: './tags',
    },
    {
      name: 'course',
      icon: 'group',
      path: '/course',
      component: './course',
    },
    {
      name: 'share',
      icon: 'shareAlt',
      path: '/share',
      component: './share',
    },
    {
      name: 'collects',
      icon: 'warning',
      path: '/collects',
      component: './collects',
    },
    {
      component: '404',
    },
  ]
}

// eslint-disable-next-line func-names
const routes: Router[] = (function() {
  const arr: Router = _.cloneDeep(baseRoutes)
  arr.routes.push(userRoutes)
  arr.routes.push(asyncRoutes)
  return _.concat([], arr)
})()

export default routes



// const antdRoutes: Router = {
//   path: '/',
//   component: '../layouts/BasicLayout',
//   Routes: ['src/pages/Authorized'],
//   authority: ['admin', 'user'],
//   routes: [
//     {
//       path: '/dashboard',
//       name: 'dashboard',
//       icon: 'dashboard',
//       routes: [
//         {
//           name: 'analysis',
//           icon: 'smile',
//           path: '/dashboard/analysis',
//           component: './dashboard/analysis',
//         },
//         {
//           name: 'monitor',
//           icon: 'smile',
//           path: '/dashboard/monitor',
//           component: './dashboard/monitor',
//         },
//         {
//           name: 'workplace',
//           icon: 'smile',
//           path: '/dashboard/workplace',
//           component: './dashboard/workplace',
//         },
//       ],
//     },
//     {
//       path: '/form',
//       icon: 'form',
//       name: 'form',
//       routes: [
//         {
//           name: 'basic-form',
//           icon: 'smile',
//           path: '/form/basic-form',
//           component: './form/basic-form',
//         },
//         {
//           name: 'step-form',
//           icon: 'smile',
//           path: '/form/step-form',
//           component: './form/step-form',
//         },
//         {
//           name: 'advanced-form',
//           icon: 'smile',
//           path: '/form/advanced-form',
//           component: './form/advanced-form',
//         },
//       ],
//     },
//     {
//       path: '/list',
//       icon: 'table',
//       name: 'list',
//       routes: [
//         {
//           path: '/list/search',
//           name: 'search-list',
//           component: './list/search',
//           routes: [
//             {
//               path: '/list/search',
//               redirect: '/list/search/articles',
//             },
//             {
//               name: 'articles',
//               icon: 'smile',
//               path: '/list/search/articles',
//               component: './list/search/articles',
//             },
//             {
//               name: 'projects',
//               icon: 'smile',
//               path: '/list/search/projects',
//               component: './list/search/projects',
//             },
//             {
//               name: 'applications',
//               icon: 'smile',
//               path: '/list/search/applications',
//               component: './list/search/applications',
//             },
//           ],
//         },
//         {
//           name: 'table-list',
//           icon: 'smile',
//           path: '/list/table-list',
//           component: './list/table-list',
//         },
//         {
//           name: 'basic-list',
//           icon: 'smile',
//           path: '/list/basic-list',
//           component: './list/basic-list',
//         },
//         {
//           name: 'card-list',
//           icon: 'smile',
//           path: '/list/card-list',
//           component: './list/card-list',
//         },
//       ],
//     },
//     {
//       path: '/profile',
//       name: 'profile',
//       icon: 'profile',
//       routes: [
//         {
//           name: 'basic',
//           icon: 'smile',
//           path: '/profile/basic',
//           component: './profile/basic',
//         },
//         {
//           name: 'advanced',
//           icon: 'smile',
//           path: '/profile/advanced',
//           component: './profile/advanced',
//         },
//       ],
//     },
//     {
//       name: 'result',
//       icon: 'CheckCircleOutlined',
//       path: '/result',
//       routes: [
//         {
//           name: 'success',
//           icon: 'smile',
//           path: '/result/success',
//           component: './result/success',
//         },
//         {
//           name: 'fail',
//           icon: 'smile',
//           path: '/result/fail',
//           component: './result/fail',
//         },
//       ],
//     },
//     {
//       name: 'exception',
//       icon: 'warning',
//       path: '/exception',
//       routes: [
//         {
//           name: '403',
//           icon: 'smile',
//           path: '/exception/403',
//           component: './exception/403',
//         },
//         {
//           name: '404',
//           icon: 'smile',
//           path: '/exception/404',
//           component: './exception/404',
//         },
//         {
//           name: '500',
//           icon: 'smile',
//           path: '/exception/500',
//           component: './exception/500',
//         },
//       ],
//     },
//     {
//       name: 'account',
//       icon: 'user',
//       path: '/account',
//       routes: [
//         {
//           name: 'center',
//           icon: 'smile',
//           path: '/account/center',
//           component: './account/center',
//         },
//         {
//           name: 'settings',
//           icon: 'smile',
//           path: '/account/settings',
//           component: './account/settings',
//         },
//       ],
//     },
//     {
//       name: 'editor',
//       icon: 'highlight',
//       path: '/editor',
//       routes: [
//         {
//           name: 'flow',
//           icon: 'smile',
//           path: '/editor/flow',
//           component: './editor/flow',
//         },
//         {
//           name: 'mind',
//           icon: 'smile',
//           path: '/editor/mind',
//           component: './editor/mind',
//         },
//         {
//           name: 'koni',
//           icon: 'smile',
//           path: '/editor/koni',
//           component: './editor/koni',
//         },
//       ],
//     },
//     {
//       path: '/',
//       redirect: '/dashboard/analysis',
//       authority: ['admin', 'user'],
//     },
//     {
//       component: '404',
//     },
//   ],
// }