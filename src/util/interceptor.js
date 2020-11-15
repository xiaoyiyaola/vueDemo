import axios from 'axios'
import router from '@/router'
// import store from '@/store'

axios.default.timeout = 5000

// axios拦截响应
axios.interceptors.response.use(response => {
  // 后端的checkLogin返回的json数据作为跳转依据
  if (response.status !== 200) {
    router.replace({
      path: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }

  // if (!response.data.session) {
  //   router.replace({
  //     path: 'login',
  //     query: {
  //       redirect: router.currentRoute.fullPath
  //     }
  //   })
  // }
  return response
}, err => {
  return Promise.reject(err)
})

// router.beforeEach(async (to, from, next) => {
//   //如果不存在菜单信息，则走动态授权
//   if (store.state.menus.length === 0) {
//     //确保初始化信息完成后才会执行下一步动作
//     await init();
//     let nodesList = [];
//     //递归获取权限菜单列表
//     initNodes(menuNodes, nodesList);
//     store.commit('UPDATE_DATA', {
//       key: 'menus',
//       value: nodesList
//     });
//     //获取路由权限信息
//     const asyncNodes = getAsyncNodes(nodesList, []);
//     //添加拥有权限的路由信息
//     router.addRoutes(asyncNodes);
//     registerRouteRefresh = false;
//     next({
//       ...to,
//       replace: true
//     })
//   } else {
//     //如果是页面刷新，需要重新加载下动态路由
//     if (registerRouteRefresh) {
//       let nodesList = [];
//       //递归获取权限菜单列表
//       initNodes(menuNodes, nodesList);
//       //获取路由权限信息
//       const asyncNodes = getAsyncNodes(nodesList, []);
//       //添加拥有权限的路由信息
//       router.addRoutes(asyncNodes);
//       registerRouteRefresh = false;
//       //确保路由加载完成
//       next({
//         ...to,
//         replace: true
//       })
//     }
//     next()
//   }
// })

export default axios
