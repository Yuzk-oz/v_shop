import Vue from 'vue';
import VueRouter from 'vue-router';




Vue.use(VueRouter);


const Login = () =>
    import ('../components/Login')

const Home = () =>
    import ('../components/Home')


const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home
    }],
    mode: 'history',
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从那个路径来
    // next 是一个函数,表示放行
    //     next()  next('/login')  强制跳转
    if (to.path === '/login') return next()


    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})


export default router;