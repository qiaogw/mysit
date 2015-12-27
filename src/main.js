//css
require('bootstrap/dist/css/bootstrap.css')
require('font-awesome/css/font-awesome.css')
require('../lib/assets/global/plugins/uniform/css/uniform.default.css')
// vue及插件
var Vue = require('vue')
var Router = require('vue-router')
// 模板引用库
require('../lib/assets/global/plugins/jquery-migrate.min.js')
require('../lib/assets/global/plugins/jquery-ui/jquery-ui.min.js')
require('bootstrap')
require('../lib/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js')
require('../lib/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js')
require('../lib/assets/global/plugins/jquery.blockui.min.js')
require('../lib/assets/global/plugins/jquery.cokie.min.js')
require('../lib/assets/global/plugins/uniform/jquery.uniform.min.js')
require('../lib/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')


// 业务组件 components
var App = require( './App.vue')
var Bar = require( './views/bar.vue')
var Foo = require('./views/foo.vue')
var tree = require('./views/tree_demo.vue')
//// setting
//import setting from './setting';
//console.log(Metronic.isIE8())
// debug
Vue.config.debug = true



// install router
Vue.use(Router)


var router = new Router()

//配置路由
router.map({
    // todo: paginate not yet
     '/foo': {
        component: Foo,
    },
    '/bar': {
        component: Bar,
    },
    '/tree': {
        component: tree,
    }
});

//默认路由
router.redirect({
    '*': '/bar'
});

//router.alias({
//    '/home': '/list/1'
//});
// 开始
router.start(App, '#app');