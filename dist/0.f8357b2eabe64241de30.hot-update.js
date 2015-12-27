webpackHotUpdate(0,{

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	
	//     <div class="zTreeDemoBackground left">
	
	//         <ul id="treeDemo" class="ztree"></ul>
	
	//     </div>
	
	// </template>
	
	// <script>
	__webpack_require__(106);
	__webpack_require__(107);
	exports.default = {
	    props: {
	        znodes: Array,
	        setting: Object
	    },
	    ready: function ready() {
	        var zNodes = this.znodes;
	        var setting = this.setting;
	        //           setting、 zNodes为zTree保留字
	        $(document).ready(function () {
	            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	        });
	    }
	};
	// sometimes footer render error.

	// </script>

	// <style>

	// </style>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }

})
//# sourceMappingURL=0.f8357b2eabe64241de30.hot-update.js.map