webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';
	
	//css
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	// vue及插件
	var Vue = __webpack_require__(11);
	var Router = __webpack_require__(13);
	// 模板引用库
	__webpack_require__(14);
	__webpack_require__(18);
	__webpack_require__(50);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(67);
	__webpack_require__(70);
	__webpack_require__(71);
	var Metronic = __webpack_require__(72);
	var Layout = __webpack_require__(73);
	
	// 业务组件 components
	var App = __webpack_require__(74);
	var Bar = __webpack_require__(83);
	var Foo = __webpack_require__(85);
	var tree = __webpack_require__(100);
	//// setting
	//import setting from './setting';
	//console.log(Metronic.isIE8())
	// debug
	Vue.config.debug = true;
	
	jQuery(document).ready(function () {
	    Metronic.init(); // init metronic core components
	    Layout.init(); // init current layout
	});
	
	// install router
	Vue.use(Router);
	
	var router = new Router();
	
	//配置路由
	router.map({
	    // todo: paginate not yet
	    '/foo': {
	        component: Foo
	    },
	    '/bar': {
	        component: Bar
	    },
	    '/tree': {
	        component: tree
	    }
	});
	
	////默认路由
	//router.redirect({
	//    '*': '/bar'
	//});
	
	//router.alias({
	//    '/home': '/list/1'
	//});
	// 开始
	router.start(App, '#app');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }
])
//# sourceMappingURL=0.326c5508cb57603b01c3.hot-update.js.map