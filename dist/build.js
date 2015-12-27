webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	//默认路由
	router.redirect({
	    '*': '/bar'
	});
	
	//router.alias({
	//    '/home': '/list/1'
	//});
	// 开始
	router.start(App, '#app');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var babelHelpers = {};
	
	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}
	
	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;
	
	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }
	
	    this.matcher.add(this.path, target);
	
	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};
	
	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}
	
	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },
	
	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;
	
	    var match = generateMatch(path, matcher, delegate);
	
	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }
	
	    callback(match);
	  }
	};
	
	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;
	
	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}
	
	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }
	
	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}
	
	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;
	
	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);
	
	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}
	
	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();
	
	  callback(generateMatch("", matcher, this.delegate));
	
	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}
	
	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}
	
	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat
	
	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;
	
	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },
	
	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },
	
	  generate: function generate() {
	    return this.string;
	  }
	};
	
	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },
	
	  regex: function regex() {
	    return "([^/]+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },
	
	  regex: function regex() {
	    return "(.+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};
	
	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }
	
	  var segments = route.split("/"),
	      results = [];
	
	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';
	
	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;
	
	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }
	
	  specificity.val = +specificity.val;
	
	  return results;
	}
	
	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.
	
	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}
	
	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];
	
	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	      if (isEqual) {
	        return child;
	      }
	    }
	  },
	
	  put: function put(charSpec) {
	    var state;
	
	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }
	
	    // Make a new state for the character spec
	    state = new State(charSpec);
	
	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);
	
	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }
	
	    // Return the new state
	    return state;
	  },
	
	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;
	
	    // DEBUG "  " + debugState(this)
	    var returned = [];
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];
	
	      charSpec = child.charSpec;
	
	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }
	
	    return returned;
	  }
	
	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};
	
	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}
	
	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/
	
	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}
	
	function recognizeChar(states, ch) {
	  var nextStates = [];
	
	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];
	
	    nextStates = nextStates.concat(state.match(ch));
	  }
	
	  return nextStates;
	}
	
	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};
	
	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});
	
	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);
	
	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};
	
	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }
	
	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }
	
	  return result;
	}
	
	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;
	
	    currentState = currentState.put(ch);
	  });
	
	  return currentState;
	}
	
	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}
	
	// The main interface
	
	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};
	
	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;
	
	    var isEmpty = true;
	
	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];
	
	      var segments = parse(route.path, names, specificity);
	
	      allSegments = allSegments.concat(segments);
	
	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        isEmpty = false;
	
	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	
	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }
	
	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }
	
	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }
	
	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;
	
	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },
	
	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }
	
	    return result;
	  },
	
	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },
	
	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    var segments = route.segments;
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];
	
	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }
	
	      output += "/";
	      output += segment.generate(params);
	    }
	
	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }
	
	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }
	
	    return output;
	  },
	
	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }
	
	    if (pairs.length === 0) {
	      return '';
	    }
	
	    return "?" + pairs.join("&");
	  },
	
	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },
	
	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;
	
	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }
	
	    path = decodeURI(path);
	
	    // DEBUG GROUP path
	
	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }
	
	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }
	
	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }
	
	    // END DEBUG GROUP
	
	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }
	
	    states = sortSolutions(solutions);
	
	    var state = solutions[0];
	
	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};
	
	RouteRecognizer.prototype.map = map;
	
	RouteRecognizer.VERSION = '0.1.9';
	
	var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */
	
	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}
	
	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */
	
	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}
	
	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */
	
	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}
	
	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */
	
	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}
	
	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */
	
	var resolver = undefined;
	
	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}
	
	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */
	
	function mapParams(path, params, query) {
	  if (params === undefined) params = {};
	
	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}
	
	var hashRE = /#.*$/;
	
	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);
	
	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }
	
	  HTML5History.prototype.start = function start() {
	    var _this = this;
	
	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };
	
	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };
	
	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };
	
	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };
	
	  return HTML5History;
	})();
	
	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);
	
	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }
	
	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      // determine query
	      // note it's possible to have queries in both the actual URL
	      // and the hash fragment itself.
	      var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	      self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };
	
	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };
	
	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };
	
	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };
	
	  return HashHistory;
	})();
	
	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);
	
	    this.onChange = onChange;
	    this.currentPath = '/';
	  }
	
	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };
	
	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };
	
	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };
	
	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };
	
	  return AbstractHistory;
	})();
	
	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */
	
	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}
	
	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}
	
	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}
	
	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}
	
	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */
	
	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }
	
	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');
	
	  view.depth = depth;
	  view.activated = false;
	
	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);
	
	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }
	
	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }
	
	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };
	
	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };
	
	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };
	
	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}
	
	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */
	
	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}
	
	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */
	
	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */
	
	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);
	
	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;
	
	    // start by determine the queues
	
	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;
	
	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }
	
	  /**
	   * Abort current transition and return to previous location.
	   */
	
	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };
	
	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */
	
	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = path.params || this.to.params;
	        path.query = path.query || this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };
	
	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;
	
	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }
	
	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase
	
	          // Update router current route
	          transition.router._onTransitionValidated(transition);
	
	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });
	
	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };
	
	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };
	
	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */
	
	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;
	
	    var transition = this;
	    var nextCalled = false;
	
	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };
	
	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };
	
	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };
	
	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };
	
	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }
	
	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };
	
	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */
	
	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;
	
	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };
	
	  return RouteTransition;
	})();
	
	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}
	
	var internalKeysRE = /^(component|subRoutes)$/;
	
	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */
	
	var Route = function Route(path, router) {
	  var _this = this;
	
	  babelHelpers.classCallCheck(this, Route);
	
	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};
	
	function applyOverride (Vue) {
	
	  var _ = Vue.util;
	
	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };
	
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };
	
	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}
	
	function View (Vue) {
	
	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);
	
	  // with some overrides
	  _.extend(viewDef, {
	
	    _isRouterView: true,
	
	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);
	
	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);
	
	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }
	
	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },
	
	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });
	
	  Vue.elementDirective('router-view', viewDef);
	}
	
	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var queryStringRE = /\?.*$/;
	
	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {
	
	  var _ = Vue.util;
	
	  Vue.directive('link', {
	
	    bind: function bind() {
	      var _this = this;
	
	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // no need to handle click if link expects to be opened
	      // in a new window/tab.
	      /* istanbul ignore if */
	      if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	        return;
	      }
	      // handle click
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;
	
	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };
	
	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },
	
	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },
	
	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      var dest = this.path.replace(queryStringRE, '');
	      path = path.replace(queryStringRE, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });
	
	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}
	
	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};
	
	// late bind during install
	var Vue = undefined;
	
	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */
	
	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);
	
	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }
	
	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];
	
	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();
	
	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];
	
	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;
	
	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;
	
	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;
	
	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }
	
	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */
	
	  // API ===================================================
	
	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */
	
	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };
	
	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */
	
	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };
	
	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };
	
	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };
	
	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };
	
	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };
	
	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */
	
	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };
	
	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */
	
	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };
	
	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */
	
	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };
	
	  /**
	   * Stop listening to route changes.
	   */
	
	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };
	
	  // Internal methods ======================================
	
	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */
	
	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };
	
	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */
	
	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };
	
	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */
	
	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };
	
	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */
	
	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };
	
	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */
	
	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;
	
	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };
	
	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */
	
	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };
	
	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;
	
	    if (this._checkGuard(path)) {
	      return;
	    }
	
	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;
	
	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }
	
	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);
	
	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;
	
	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }
	
	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };
	
	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }
	
	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }
	
	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };
	
	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */
	
	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };
	
	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };
	
	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */
	
	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };
	
	  return Router;
	})();
	
	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}
	
	/* Installation */
	
	Router.installed = false;
	
	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */
	
	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};
	
	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}
	
	module.exports = Router;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	var _defineProperty = __webpack_require__(15);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
	jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0), (function (e, t, n) {
	  function r(n) {
	    var r = t.console;i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()));
	  }function a(t, a, i, o) {
	    if (_defineProperty2.default) try {
	      return (0, _defineProperty2.default)(t, a, { configurable: !0, enumerable: !0, get: function get() {
	          return r(o), i;
	        }, set: function set(e) {
	          r(o), i = e;
	        } }), n;
	    } catch (s) {}e._definePropertyBroken = !0, t[a] = i;
	  }var i = {};e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function () {
	    i = {}, e.migrateWarnings.length = 0;
	  }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");var o = e("<input/>", { size: 1 }).attr("size") && e.attrFn,
	      s = e.attr,
	      u = e.attrHooks.value && e.attrHooks.value.get || function () {
	    return null;
	  },
	      c = e.attrHooks.value && e.attrHooks.value.set || function () {
	    return n;
	  },
	      l = /^(?:input|button)$/i,
	      d = /^[238]$/,
	      p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	      f = /^(?:checked|selected)$/i;a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function (t, a, i, u) {
	    var c = a.toLowerCase(),
	        g = t && t.nodeType;return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = { get: function get(t, r) {
	        var a,
	            i = e.prop(t, r);return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n;
	      }, set: function set(t, n, r) {
	        var a;return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r;
	      } }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i));
	  }, e.attrHooks.value = { get: function get(e, t) {
	      var n = (e.nodeName || "").toLowerCase();return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null);
	    }, set: function set(e, t) {
	      var a = (e.nodeName || "").toLowerCase();return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n);
	    } };var g,
	      h,
	      v = e.fn.init,
	      m = e.parseJSON,
	      y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init = function (t, n, a) {
	    var i;return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments);
	  }, e.fn.init.prototype = e.fn, e.parseJSON = function (e) {
	    return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null);
	  }, e.uaMatch = function (e) {
	    e = e.toLowerCase();var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];return { browser: t[1] || "", version: t[2] || "0" };
	  }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function () {
	    function t(e, n) {
	      return new t.fn.init(e, n);
	    }e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function (r, a) {
	      return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n);
	    }, t.fn.init.prototype = t.fn;var n = t(document);return r("jQuery.sub() is deprecated"), t;
	  }, e.ajaxSetup({ converters: { "text json": e.parseJSON } });var b = e.fn.data;e.fn.data = function (t) {
	    var a,
	        i,
	        o = this[0];return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i);
	  };var j = /\/(java|ecma)script/i,
	      w = e.fn.andSelf || e.fn.addBack;e.fn.andSelf = function () {
	    return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments);
	  }, e.clean || (e.clean = function (t, a, i, o) {
	    a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");var s,
	        u,
	        c,
	        l,
	        d = [];if ((e.merge(d, e.buildFragment(t, a).childNodes), i)) for (c = function (e) {
	      return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n;
	    }, s = 0; null != (u = d[s]); s++) {
	      e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
	    }return d;
	  });var Q = e.event.add,
	      x = e.event.remove,
	      k = e.event.trigger,
	      N = e.fn.toggle,
	      T = e.fn.live,
	      M = e.fn.die,
	      S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
	      C = RegExp("\\b(?:" + S + ")\\b"),
	      H = /(?:^|\s)hover(\.\S+|)\b/,
	      A = function A(t) {
	    return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"));
	  };e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function (e, t, n, a, i) {
	    e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i);
	  }, e.event.remove = function (e, t, n, r, a) {
	    x.call(this, e, A(t) || "", n, r, a);
	  }, e.fn.error = function () {
	    var e = Array.prototype.slice.call(arguments, 0);return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this);
	  }, e.fn.toggle = function (t, n) {
	    if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a = arguments,
	        i = t.guid || e.guid++,
	        o = 0,
	        s = function s(n) {
	      var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1;
	    };for (s.guid = i; a.length > o;) {
	      a[o++].guid = i;
	    }return this.click(s);
	  }, e.fn.live = function (t, n, a) {
	    return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this);
	  }, e.fn.die = function (t, n) {
	    return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this);
	  }, e.event.trigger = function (e, t, n, a) {
	    return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a);
	  }, e.each(S.split("|"), function (t, n) {
	    e.event.special[n] = { setup: function setup() {
	        var t = this;return t !== document && (e.event.add(document, n + "." + e.guid, function () {
	          e.event.trigger(n, null, t, !0);
	        }), e._data(this, n, e.guid++)), !1;
	      }, teardown: function teardown() {
	        return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1;
	      } };
	  });
	})(jQuery, window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(17);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";var _typeof2=__webpack_require__(19);var _typeof3=_interopRequireDefault(_typeof2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};} /*! jQuery UI - v1.11.2 - 2015-01-25
	* http://jqueryui.com
	* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
	* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */(function(e){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e(jQuery);})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return "area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t);}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return "hidden"===e.css(this,"visibility");}).length;}function s(e){for(var t,i;e.length&&e[0]!==document;){if((t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i)))return i;e=e.parent();}return 0;}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover");}).delegate(i,"mouseover",o);}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"));}function r(t,i){e.extend(t,i);for(var s in i){null==i[s]&&(t[s]=i[s]);}return t;}function h(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change");};}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function scrollParent(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"));}).eq(0);return "fixed"!==i&&a.length?a:e(this[0].ownerDocument||document);},uniqueId:(function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e);});};})(),removeUniqueId:function removeUniqueId(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id");});}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return !!e.data(i,t);};}):function(t,i,s){return !!e.data(t,s[3]);},focusable:function focusable(i){return t(i,!isNaN(e.attr(i,"tabindex")));},tabbable:function tabbable(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return (n||s>=0)&&t(i,!n);}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0);}),i;}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px");});},e.fn["outer"+i]=function(t,n){return "number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px");});};}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e));}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=(function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this);};})(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:(function(t){return function(i,s){return "number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t);},i);}):t.apply(this,arguments);};})(e.fn.focus),disableSelection:(function(){var e="onselectstart" in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault();});};})(),enableSelection:function enableSelection(){return this.unbind(".ui-disableSelection");},zIndex:function zIndex(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if((i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s)))return s;n=n.parent();}return 0;}}),e.ui.plugin={add:function add(t,i,s){var n,a=e.ui[t].prototype;for(n in s){a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]]);}},call:function call(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++){e.options[a[n][0]]&&a[n][1].apply(e.element,i);}}};var l=0,u=Array.prototype.slice;e.cleanData=(function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++){try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove");}catch(o) {}}t(i);};})(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return !!e.data(t,n);},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t);},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i(),r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=(function(){var e=function e(){return i.prototype[t].apply(this,arguments);},n=function n(e){return i.prototype[t].apply(this,e);};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t;};})(),void 0):(h[t]=s,void 0);}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto);}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o;},e.widget.extend=function(t){for(var i,s,n=u.call(arguments,1),a=0,o=n.length;o>a;a++){for(i in n[a]){s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);}}return t;},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=u.call(arguments,1),r=this;return n=!a&&o.length?e.widget.extend.apply(null,[n].concat(o)):n,a?this.each(function(){var i,a=e.data(this,s);return "instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'");}):this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this));}),r;};},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function _createWidget(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function remove(e){e.target===i&&this.destroy();}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init();},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function destroy(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus");},_destroy:e.noop,widget:function widget(){return this.element;},option:function option(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if((o={},s=t.split("."),t=s.shift(),s.length)){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++){n[s[a]]=n[s[a]]||{},n=n[s[a]];}if((t=s.pop(),1===arguments.length))return void 0===n[t]?null:n[t];n[t]=i;}else {if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i;}return this._setOptions(o),this;},_setOptions:function _setOptions(e){var t;for(t in e){this._setOption(t,e[t]);}return this;},_setOption:function _setOption(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this;},enable:function enable(){return this._setOptions({disabled:!1});},disable:function disable(){return this._setOptions({disabled:!0});},_on:function _on(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0;}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r);});},_off:function _off(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get());},_delay:function _delay(e,t){function i(){return ("string"==typeof e?s[e]:e).apply(s,arguments);}var s=this;return setTimeout(i,t||0);},_hoverable:function _hoverable(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function mouseenter(t){e(t.currentTarget).addClass("ui-state-hover");},mouseleave:function mouseleave(t){e(t.currentTarget).removeClass("ui-state-hover");}});},_focusable:function _focusable(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function focusin(t){e(t.currentTarget).addClass("ui-state-focus");},focusout:function focusout(t){e(t.currentTarget).removeClass("ui-state-focus");}});},_trigger:function _trigger(t,i,s){var n,a,o=this.options[t];if((s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent))for(n in a){n in i||(i[n]=a[n]);}return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented());}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i();});};}),e.widget;var d=!1;e(document).mouseup(function(){d=!1;}),e.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function _mouseInit(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e);}).bind("click."+this.widgetName,function(i){return !0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0;}),this.started=!1;},_mouseDestroy:function _mouseDestroy(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);},_mouseDown:function _mouseDown(t){if(!d){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0;},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e);},this._mouseUpDelegate=function(e){return i._mouseUp(e);},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),d=!0,!0)):!0;}},_mouseMove:function _mouseMove(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t);}return (t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted);},_mouseUp:function _mouseUp(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),d=!1,!1;},_mouseDistanceMet:function _mouseDistanceMet(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance;},_mouseDelayMet:function _mouseDelayMet(){return this.mouseDelayMet;},_mouseStart:function _mouseStart(){},_mouseDrag:function _mouseDrag(){},_mouseStop:function _mouseStop(){},_mouseCapture:function _mouseCapture(){return !0;}}),(function(){function t(e,t,i){return [parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)];}function i(t,i){return parseInt(e.css(t,i),10)||0;}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()};}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function scrollbarWidth(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i;},getScrollInfo:function getScrollInfo(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return {width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0};},getWithinInfo:function getWithinInfo(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return {element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()};}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]];}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,M=e.extend({},y),C=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?M.left-=d:"center"===n.my[0]&&(M.left-=d/2),"bottom"===n.my[1]?M.top-=c:"center"===n.my[1]&&(M.top-=c/2),M.left+=C[0],M.top+=C[1],a||(M.left=h(M.left),M.top=h(M.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](M,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+C[0],p[1]+C[1]],my:n.my,at:n.at,within:x,elem:u});}),n.using&&(l=function(e){var t=v.left-M.left,i=t+m-d,s=v.top-M.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:M.left,top:M.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h);}),u.offset(e.extend(M,{using:l}));});},e.ui.position={fit:{left:function left(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left);},top:function top(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top);}},flip:{left:function left(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f));},top:function top(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,e.top+p+f+m>u&&(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,e.top+p+f+m>d&&(i>0||d>r(i))&&(e.top+=p+f+m));}},flipfit:{left:function left(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments);},top:function top(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments);}}},(function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s){t.style[o]=s[o];}t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t);})();})(),e.ui.position,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function _create(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit();},_setOption:function _setOption(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName());},_destroy:function _destroy(){return (this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0);},_mouseCapture:function _mouseCapture(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1);},_blockFrames:function _blockFrames(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0];});},_unblockFrames:function _unblockFrames(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks);},_blurActiveElement:function _blurActiveElement(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur();}catch(s) {}},_mouseStart:function _mouseStart(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return "fixed"===e(this).css("position");}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0);},_refreshOffsets:function _refreshOffsets(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top};},_mouseDrag:function _mouseDrag(t,i){if((this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i)){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position;}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1;},_mouseStop:function _mouseStop(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear();}):this._trigger("stop",t)!==!1&&this._clear(),!1;},_mouseUp:function _mouseUp(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t);},cancel:function cancel(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this;},_getHandle:function _getHandle(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0;},_setHandleClassName:function _setHandleClassName(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle");},_removeHandleClassName:function _removeHandleClassName(){this.handleElement.removeClass("ui-draggable-handle");},_createHelper:function _createHelper(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n;},_setPositionRelative:function _setPositionRelative(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative");},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left" in t&&(this.offset.click.left=t.left+this.margins.left),"right" in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top" in t&&(this.offset.click.top=t.top+this.margins.top),"bottom" in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top);},_isRootNode:function _isRootNode(e){return (/(html|body)/i.test(e.tagName)||e===this.document[0]);},_getParentOffset:function _getParentOffset(){var t=this.offsetParent.offset(),i=this.document[0];return "absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function _getRelativeOffset(){if("relative"!==this.cssPosition)return {top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return {top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())};},_cacheMargins:function _cacheMargins(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0);},_convertPositionTo:function _convertPositionTo(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return {top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i};},_generatePosition:function _generatePosition(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)};},_clear:function _clear(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy();},_normalizeRightBottom:function _normalizeRightBottom(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"));},_trigger:function _trigger(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s);},plugins:{},_uiHash:function _uiHash(){return {helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs};}}),e.ui.plugin.add("draggable","connectToSortable",{start:function start(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n));});},stop:function stop(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n));});},drag:function drag(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n;})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0];},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions();}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions();}));});}}),e.ui.plugin.add("draggable","cursor",{start:function start(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor);},stop:function stop(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor);}}),e.ui.plugin.add("draggable","opacity",{start:function start(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity);},stop:function stop(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity);}}),e.ui.plugin.add("draggable","scroll",{start:function start(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset());},drag:function drag(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t);}}),e.ui.plugin.add("draggable","snap",{start:function start(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left});});},drag:function drag(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--){h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p);}}}),e.ui.plugin.add("draggable","stack",{start:function start(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return (parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0);});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t);}),this.css("zIndex",n+o.length));}}),e.ui.plugin.add("draggable","zIndex",{start:function start(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex);},stop:function stop(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex);}}),e.ui.draggable,e.widget("ui.droppable",{version:"1.11.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function _create(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s);},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable");},_addToManager:function _addToManager(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this);},_splice:function _splice(e){for(var t=0;e.length>t;t++){e[t]===this&&e.splice(t,1);}},_destroy:function _destroy(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled");},_setOption:function _setOption(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i);};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i);}this._super(t,i);},_activate:function _activate(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i));},_deactivate:function _deactivate(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i));},_over:function _over(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)));},_out:function _out(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)));},_drop:function _drop(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0;}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1;},ui:function ui(e){return {draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs};}}),e.ui.intersect=(function(){function e(e,t,i){return e>=t&&t+i>e;}return function(t,i,s,n){if(!i.offset)return !1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case "fit":return a>=l&&d>=r&&o>=u&&c>=h;case "intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case "pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case "touch":return (o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return !1;}};})(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function prepareOffsets(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e: for(s=0;a.length>s;s++){if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++){if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e;}}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}));}}},drop:function drop(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)));}),s;},dragStart:function dragStart(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i);});},drag:function drag(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n;}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)));}});},dragStop:function dragStop(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i);}},e.ui.droppable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function _num(e){return parseInt(e,10)||0;},_isNumber:function _isNumber(e){return !isNaN(parseInt(e,10));},_hasScroll:function _hasScroll(t,i){if("hidden"===e(t).css("overflow"))return !1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n);},_create:function _create(){var t,i,s,n,a,o=this,r=this.options;if((this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String))for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++){s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);}this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles){this.handles[i].constructor===String&&(this.handles[i]=this.element.children(this.handles[i]).first().show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length;}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se");}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show());}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide());})),this._mouseInit();},_destroy:function _destroy(){this._mouseDestroy();var t,i=function i(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this;},_mouseCapture:function _mouseCapture(t){var i,s,n=!1;for(i in this.handles){s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);}return !this.options.disabled&&n;},_mouseStart:function _mouseStart(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0;},_mouseDrag:function _mouseDrag(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1;},_mouseStop:function _mouseStop(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1;},_updatePrevProperties:function _updatePrevProperties(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height};},_applyChanges:function _applyChanges(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e;},_updateVirtualBoundaries:function _updateVirtualBoundaries(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a;},_updateCache:function _updateCache(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width);},_updateRatio:function _updateRatio(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e;},_respectSize:function _respectSize(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e;},_getPaddingPlusBorderDimensions:function _getPaddingPlusBorderDimensions(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++){i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;}return {height:i[0]+i[2],width:i[1]+i[3]};},_proportionallyResize:function _proportionallyResize(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++){e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0});}},_renderProxy:function _renderProxy(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element;},_change:{e:function e(_e,t){return {width:this.originalSize.width+t};},w:function w(e,t){var i=this.originalSize,s=this.originalPosition;return {left:s.left+t,width:i.width-t};},n:function n(e,t,i){var s=this.originalSize,n=this.originalPosition;return {top:n.top+i,height:s.height-i};},s:function s(e,t,i){return {height:this.originalSize.height+i};},se:function se(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]));},sw:function sw(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]));},ne:function ne(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]));},nw:function nw(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]));}},_propagate:function _propagate(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui());},plugins:{},ui:function ui(){return {originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition};}}),e.ui.plugin.add("resizable","animate",{stop:function stop(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function step(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t);}});}}),e.ui.plugin.add("resizable","containment",{start:function start(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s));}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}));},resize:function resize(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height);},stop:function stop(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l});}}),e.ui.plugin.add("resizable","alsoResize",{start:function start(){var t=e(this).resizable("instance"),i=t.options,s=function s(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)});});};"object"!=(0,_typeof3.default)(i.alsoResize)||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e);});},resize:function resize(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function h(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null);}),t.css(a);});};"object"!=(0,_typeof3.default)(n.alsoResize)||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t);});},stop:function stop(){e(this).removeData("resizable-alsoresize");}}),e.ui.plugin.add("resizable","ghost",{start:function start(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper);},resize:function resize(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width});},stop:function stop(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0));}}),e.ui.plugin.add("resizable","grid",{resize:function resize(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=u-t.height,i.size.width=p,i.position.left=o.left+a.width-p));}}),e.ui.resizable,e.widget("ui.selectable",e.ui.mouse,{version:"1.11.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function _create(){var t,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")});});},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>");},_destroy:function _destroy(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy();},_mouseStart:function _mouseStart(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}));}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0;}));},_mouseDrag:function _mouseDrag(t){if((this.dragged=!0,!this.options.disabled)){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))));}),!1;}},_mouseStop:function _mouseStop(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element});}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element});}),this._trigger("stop",t),this.helper.remove(),!1;}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function _isOverAxis(e,t,i){return e>=t&&t+i>e;},_isFloating:function _isFloating(e){return (/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display")));},_create:function _create(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0;},_setOption:function _setOption(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName();},_setHandleClassName:function _setHandleClassName(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle");});},_destroy:function _destroy(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--){this.items[e].item.removeData(this.widgetName+"-item");}return this;},_mouseCapture:function _mouseCapture(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0;}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0);}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1);},_mouseStart:function _mouseStart(t,i,s){var n,a,o=this.options;if((this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s))for(n=this.containers.length-1;n>=0;n--){this.containers[n]._trigger("activate",t,this._uiHash(this));}return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0;},_mouseDrag:function _mouseDrag(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-e(document).scrollTop()<o.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-o.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<o.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+o.scrollSpeed)),t.pageX-e(document).scrollLeft()<o.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-o.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<o.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--){if((s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0))){if((this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s)))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break;}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1;},_mouseStop:function _mouseStop(t,i){if(t){if((e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert)){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t);});}else this._clear(t,i);return !1;}},cancel:function cancel(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--){this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0);}}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this;},serialize:function serialize(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]));}),!s.length&&t.key&&s.push(t.key+"="),s.join("&");},toArray:function toArray(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"");}),s;},_intersectsWith:function _intersectsWith(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return "pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2;},_intersectsWithPointer:function _intersectsWithPointer(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1;},_intersectsWithSides:function _intersectsWithSides(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t);},_getDragVerticalDirection:function _getDragVerticalDirection(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up");},_getDragHorizontalDirection:function _getDragHorizontalDirection(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left");},refresh:function refresh(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this;},_connectWith:function _connectWith(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith;},_getItemsAsjQuery:function _getItemsAsjQuery(t){function i(){r.push(this);}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--){for(a=e(l[s]),n=a.length-1;n>=0;n--){o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);}}for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--){h[s][0].each(i);}return e(r);},_removeCurrentsFromItems:function _removeCurrentsFromItems(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++){if(t[i]===e.item[0])return !1;}return !0;});},_refreshItems:function _refreshItems(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--){for(n=e(c[i]),s=n.length-1;s>=0;s--){a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));}}for(i=d.length-1;i>=0;i--){for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++){h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0});}}},refreshPositions:function refreshPositions(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--){s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--){a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();}return this;},_createPlaceholder:function _createPlaceholder(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function element(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return "tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n);}):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n;},update:function update(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)));}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder);},_contactContainers:function _contactContainers(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--){if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i;}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);}if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else {for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--){e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));}if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1;}},_createHelper:function _createHelper(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s;},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left" in t&&(this.offset.click.left=t.left+this.margins.left),"right" in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top" in t&&(this.offset.click.top=t.top+this.margins.top),"bottom" in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top);},_getParentOffset:function _getParentOffset(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return "absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function _getRelativeOffset(){if("relative"===this.cssPosition){var e=this.currentItem.position();return {top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};}return {top:0,left:0};},_cacheMargins:function _cacheMargins(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]);},_convertPositionTo:function _convertPositionTo(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return {top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s};},_generatePosition:function _generatePosition(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return "relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())};},_rearrange:function _rearrange(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s);});},_clear:function _clear(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t));};}this.reverting=!1;var s,n=[];if((!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0])){for(s in this._storedCSS){("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside));}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash());}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash());}),n.push((function(e){return function(t){e._trigger("receive",t,this._uiHash(this));};}).call(this,this.currentContainer)),n.push((function(e){return function(t){e._trigger("update",t,this._uiHash(this));};}).call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--){t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);}if((this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t)){for(s=0;n.length>s;s++){n[s].call(this,e);}this._trigger("stop",e,this._uiHash());}return this.fromOutside=!1,!this.cancelHelperRemoval;},_trigger:function _trigger(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel();},_uiHash:function _uiHash(t){var i=t||this;return {helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null};}}),e.widget("ui.accordion",{version:"1.11.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function _create(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh();},_getCreateEventData:function _getCreateEventData(){return {header:this.active,panel:this.active.length?this.active.next():e()};},_createIcons:function _createIcons(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"));},_destroyIcons:function _destroyIcons(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();},_destroy:function _destroy(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","");},_setOption:function _setOption(e,t){return "active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0);},_keydown:function _keydown(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1];}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault());}},_panelKeyDown:function _panelKeyDown(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus();},refresh:function refresh(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh();},_processPanels:function _processPanels(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)));},_refresh:function _refresh(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i);}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0));}),this.headers.each(function(){t-=e(this).outerHeight(!0);}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()));}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height());}).height(t));},_activate:function _activate(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}));},_findActive:function _findActive(t){return "number"==typeof t?this.headers.eq(t):e();},_setupEvents:function _setupEvents(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler";}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers);},_eventHandler:function _eventHandler(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")));},_toggle:function _toggle(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex");}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"});},_animate:function _animate(e,t,i){var s,n,a,o=this,r=0,h=e.length&&(!t.length||e.index()<t.index()),l=this.options.animate||{},u=h&&l.down||l,d=function d(){o._toggleComplete(i);};return "number"==typeof u&&(a=u),"string"==typeof u&&(n=u),n=n||u.easing||l.easing,a=a||u.duration||l.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function step(e,t){t.now=Math.round(e);}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:d,step:function step(e,i){i.now=Math.round(e),"height"!==i.prop?r+=i.now:"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0);}}),void 0):t.animate(this.hideProps,a,n,d):e.animate(this.showProps,a,n,d);},_toggleComplete:function _toggleComplete(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e);}}),e.widget("ui.menu",{version:"1.11.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function _create(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function mousedownUiMenuItem(e){e.preventDefault();},"click .ui-menu-item":function clickUiMenuItem(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)));},"mouseenter .ui-menu-item":function mouseenterUiMenuItem(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i);}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function focus(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i);},blur:function blur(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t);});},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function click(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1;}});},_destroy:function _destroy(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove();}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");},_keydown:function _keydown(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter;},1e3)):delete this.previousFilter;}o&&t.preventDefault();},_activate:function _activate(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e));},refresh:function refresh(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"));}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider");}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur();},_itemRole:function _itemRole(){return ({menu:"menuitem",listbox:"option"})[this.options.role];},_setOption:function _setOption(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t);},focus:function focus(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close();},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t});},_scrollIntoView:function _scrollIntoView(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r));},blur:function blur(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}));},_startOpening:function _startOpening(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e);},this.delay));},_open:function _open(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i);},collapseAll:function collapseAll(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s;},this.delay);},_close:function _close(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");},_closeOnDocumentClick:function _closeOnDocumentClick(t){return !e(t.target).closest(".ui-menu").length;},_isDivider:function _isDivider(e){return !/[^\-\u2014\u2013\s]/.test(e.text());},collapse:function collapse(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t));},expand:function expand(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t);}));},next:function next(e){this._move("next","first",e);},previous:function previous(e){this._move("prev","last",e);},isFirstItem:function isFirstItem(){return this.active&&!this.active.prevAll(".ui-menu-item").length;},isLastItem:function isLastItem(){return this.active&&!this.active.nextAll(".ui-menu-item").length;},_move:function _move(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s);},nextPage:function nextPage(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n;}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0);},previousPage:function previousPage(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0;}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0);},_hasScroll:function _hasScroll(){return this.element.outerHeight()<this.element.prop("scrollHeight");},select:function select(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i);},_filterMenuItems:function _filterMenuItems(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()));});}}),e.widget("ui.autocomplete",{version:"1.11.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function _create(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function keydown(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n);}},keypress:function keypress(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s);}}},input:function input(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0);},focus:function focus(){this.selectedItem=null,this.previous=this._value();},blur:function blur(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0);}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function mousedown(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur;});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close();});});},menufocus:function menufocus(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent);}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0);},menuselect:function menuselect(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i;})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i;}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});},_destroy:function _destroy(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove();},_setOption:function _setOption(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort();},_appendTo:function _appendTo(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t;},_initSource:function _initSource(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term));}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function success(e){n(e);},error:function error(){n([]);}});}):this.source=this.options.source;},_searchTimeout:function _searchTimeout(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e));},this.options.delay);},search:function search(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0;},_search:function _search(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response());},_response:function _response(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading");},this);},__response:function __response(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close();},close:function close(e){this.cancelSearch=!0,this._close(e);},_close:function _close(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e));},_change:function _change(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem});},_normalize:function _normalize(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return "string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label});});},_suggest:function _suggest(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next();},_resizeMenu:function _resizeMenu(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()));},_renderMenu:function _renderMenu(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i);});},_renderItemData:function _renderItemData(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t);},_renderItem:function _renderItem(t,i){return e("<li>").text(i.label).appendTo(t);},_move:function _move(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0);},widget:function widget(){return this.menu.element;},_value:function _value(){return this.valueMethod.apply(this.element,arguments);},_keyEvent:function _keyEvent(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault());}}),e.extend(e.ui.autocomplete,{escapeRegex:function escapeRegex(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");},filter:function filter(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e);});}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function results(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate.";}}},__response:function __response(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion));}}),e.ui.autocomplete;var c,p="ui-button ui-widget ui-state-default ui-corner-all",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function m(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh");},1);},g=function g(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return !this.form;})),n;};e.widget("ui.button",{version:"1.11.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function _create(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,m),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===c&&e(this).addClass("ui-state-active");}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n);}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation());}),this._on({focus:function focus(){this.buttonElement.addClass("ui-state-focus");},blur:function blur(){this.buttonElement.removeClass("ui-state-focus");}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh();}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0;}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return !1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0];}).removeClass("ui-state-active").attr("aria-pressed","false");}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),c=this,t.document.one("mouseup",function(){c=null;}),void 0);}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0);}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0);}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active");}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click();})),this._setOption("disabled",i.disabled),this._resetButton();},_determineButtonType:function _determineButtonType(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element;},widget:function widget(){return this.buttonElement;},_destroy:function _destroy(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" ui-state-active "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title");},_setOption:function _setOption(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0);},refresh:function refresh(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false");}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"));},_resetButton:function _resetButton(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(f),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "));}}),e.widget("ui.buttonset",{version:"1.11.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function _create(){this.element.addClass("ui-buttonset");},_init:function _init(){this.refresh();},_setOption:function _setOption(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t);},refresh:function refresh(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0];}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end();},_destroy:function _destroy(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0];}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.2"}});var v;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function _widgetDatepicker(){return this.dpDiv;},setDefaults:function setDefaults(e){return r(this._defaults,e||{}),this;},_attachDatepicker:function _attachDatepicker(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a);},_newInst:function _newInst(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return {id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv};},_connectDatepicker:function _connectDatepicker(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t));},_attachments:function _attachments(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1;}));},_autoSize:function _autoSize(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++){e[n].length>i&&(i=e[n].length,s=n);}return s;},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length);}},_inlineDatepicker:function _inlineDatepicker(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"));},_dialogDatepicker:function _dialogDatepicker(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this;},_destroyDatepicker:function _destroyDatepicker(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty());},_enableDatepicker:function _enableDatepicker(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1;}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e;}));},_disableDatepicker:function _disableDatepicker(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0;}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e;}),this._disabledInputs[this._disabledInputs.length]=t);},_isDisabledDatepicker:function _isDisabledDatepicker(e){if(!e)return !1;for(var t=0;this._disabledInputs.length>t;t++){if(this._disabledInputs[t]===e)return !0;}return !1;},_getInst:function _getInst(t){try{return e.data(t,"datepicker");}catch(i) {throw "Missing instance data for this datepicker";}},_optionDatepicker:function _optionDatepicker(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled" in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0);},_changeDatepicker:function _changeDatepicker(e,t,i){this._optionDatepicker(e,t,i);},_refreshDatepicker:function _refreshDatepicker(e){var t=this._getInst(e);t&&this._updateDatepicker(t);},_setDateDatepicker:function _setDateDatepicker(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i));},_getDateDatepicker:function _getDateDatepicker(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null;},_doKeyDown:function _doKeyDown(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if((a._keyEvent=!0,e.datepicker._datepickerShowing))switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1;}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation());},_doKeyPress:function _doKeyPress(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0;},_doKeyUp:function _doKeyUp(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s));}catch(n) {}return !0;},_showDatepicker:function _showDatepicker(t){if((t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t)){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o;}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i));}},_updateDatepicker:function _updateDatepicker(t){this.maxRows=4,v=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null;},0));},_shouldFocusInput:function _shouldFocusInput(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus");},_checkOffset:function _checkOffset(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i;},_findPos:function _findPos(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));){t=t[n?"previousSibling":"nextSibling"];}return i=e(t).offset(),[i.left,i.top];},_hideDatepicker:function _hideDatepicker(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o);},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1);},_tidyDialog:function _tidyDialog(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");},_checkExternalClick:function _checkExternalClick(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker();}},_adjustDate:function _adjustDate(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a));},_gotoToday:function _gotoToday(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date(),n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s);},_selectMonthYear:function _selectMonthYear(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n);},_selectDay:function _selectDay(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)));},_clearDate:function _clearDate(t){var i=e(t);this._selectDate(i,"");},_selectDate:function _selectDate(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=(0,_typeof3.default)(a.input[0])&&a.input.focus(),this._lastInput=null);},_updateAlternate:function _updateAlternate(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n);}));},noWeekends:function noWeekends(e){var t=e.getDay();return [t>0&&6>t,""];},iso8601Week:function iso8601Week(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1;},parseDate:function parseDate(t,i,s){if(null==t||null==i)throw "Invalid arguments";if((i="object"==(typeof i==="undefined"?"undefined":(0,_typeof3.default)(i))?""+i:i+"",""===i))return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:new Date().getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function _(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i;},x=function x(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw "Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10);},w=function w(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return [[t,e]];}).sort(function(e,t){return -(e[1].length-t[1].length);});if((e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0;}),-1!==a))return a+1;throw "Unknown name at position "+h;},k=function k(){if(i.charAt(h)!==t.charAt(n))throw "Unexpected literal at position "+h;h++;};for(n=0;t.length>n;n++){if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case "d":v=x("d");break;case "D":w("D",d,c);break;case "o":y=x("o");break;case "m":g=x("m");break;case "M":g=w("M",p,f);break;case "y":m=x("y");break;case "@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case "!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case "'":_("'")?k():b=!0;break;default:k();}}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw "Extra/unparsed characters found in date: "+o;if((-1===m?m=new Date().getFullYear():100>m&&(m+=new Date().getFullYear()-new Date().getFullYear()%100+(u>=m?0:-100)),y>-1))for(g=1,v=y;;){if((a=this._getDaysInMonth(m,g-1),a>=v))break;g++,v-=a;}if((r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v))throw "Invalid date";return r;},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function formatDate(e,t,i){if(!t)return "";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function h(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i;},l=function l(e,t,i){var s=""+t;if(h(e))for(;i>s.length;){s="0"+s;}return s;},u=function u(e,t,i,s){return h(e)?s[t]:i[t];},d="",c=!1;if(t)for(s=0;e.length>s;s++){if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case "d":d+=l("d",t.getDate(),2);break;case "D":d+=u("D",t.getDay(),n,a);break;case "o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case "m":d+=l("m",t.getMonth()+1,2);break;case "M":d+=u("M",t.getMonth(),o,r);break;case "y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case "@":d+=t.getTime();break;case "!":d+=1e4*t.getTime()+this._ticksTo1970;break;case "'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s);}}return d;},_possibleChars:function _possibleChars(e){var t,i="",s=!1,n=function n(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s;};for(t=0;e.length>t;t++){if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case "d":case "m":case "y":case "@":i+="0123456789";break;case "D":case "M":return null;case "'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t);}}return i;},_get:function _get(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t];},_setDateFromField:function _setDateFromField(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n;}catch(r) {s=t?"":s;}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e);}},_getDefaultDate:function _getDefaultDate(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date()));},_determineDate:function _determineDate(t,i,s){var n=function n(e){var t=new Date();return t.setDate(t.getDate()+e),t;},a=function a(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t));}catch(s) {}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date(),a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case "d":case "D":r+=parseInt(l[1],10);break;case "w":case "W":r+=7*parseInt(l[1],10);break;case "m":case "M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case "y":case "Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));}l=h.exec(i);}return new Date(a,o,r);},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o);},_daylightSavingAdjust:function _daylightSavingAdjust(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null;},_setDate:function _setDate(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date()));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e));},_getDate:function _getDate(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t;},_attachHandlers:function _attachHandlers(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function prev(){e.datepicker._adjustDate(s,-i,"M");},next:function next(){e.datepicker._adjustDate(s,+i,"M");},hide:function hide(){e.datepicker._hideDatepicker();},today:function today(){e.datepicker._gotoToday(s);},selectDay:function selectDay(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1;},selectMonth:function selectMonth(){return e.datepicker._selectMonthYear(s,this,"M"),!1;},selectYear:function selectYear(){return e.datepicker._selectMonthYear(s,this,"Y"),!1;}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")]);});},_generateHTML:function _generateHTML(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,M,C,N,A,P,I,z,H,F,E,O,j,W,L=new Date(),R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),J=this._get(e,"hideIfNoPrevNext"),q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),Q=1!==K[0]||1!==K[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),X=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if((0>Z&&(Z+=12,et--),$))for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),t=X&&X>t?X:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;){Z--,0>Z&&(Z=11,et--);}for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=q?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?G:R,o=q?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;K[0]>w;w++){for(k="",this.maxRows=4,T=0;K[1]>T;T++){if((D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",Q)){if((M+="<div class='ui-datepicker-group",K[1]>1))switch(T){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S="";}M+="'>";}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,X,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",C=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++){N=(x+u)%7,C+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[N]+"'>"+p[N]+"</span></th>";}for(M+=C+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),z=Q?this.maxRows>I?this.maxRows:I:I,this.maxRows=z,H=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;z>F;F++){for(M+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(H)+"</td>":"",x=0;7>x;x++){O=g?g.apply(e.input?e.input[0]:null,[H]):[!0,""],j=H.getMonth()!==Z,W=j&&!y||!O[0]||X&&X>H||$&&H>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(j?" ui-datepicker-other-month":"")+(H.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===H.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!v?"":" "+O[1]+(H.getTime()===G.getTime()?" "+this._currentClass:"")+(H.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(j&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(j&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===R.getTime()?" ui-state-highlight":"")+(H.getTime()===G.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);}M+=E+"</tr>";}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(Q?"</div>"+(K[0]>0&&T===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=M;}_+=k;}return _+=l,e._keyEvent=!1,_;},_generateMonthYearHeader:function _generateMonthYearHeader(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else {for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++){(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");}_+="</select>";}if((y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml))if((e.yearshtml="",a||!v))b+="<span class='ui-datepicker-year'>"+i+"</span>";else {for(d=this._get(e,"yearRange").split(":"),c=new Date().getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t;},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++){e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";}e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null;}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>";},_adjustInstDate:function _adjustInstDate(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e);},_restrictMinMax:function _restrictMinMax(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n;},_notifyChange:function _notifyChange(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e]);},_getNumberOfMonths:function _getNumberOfMonths(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t;},_getMinMaxDate:function _getMinMaxDate(e,t){return this._determineDate(e,this._get(e,t+"Date"),null);},_getDaysInMonth:function _getDaysInMonth(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate();},_getFirstDayOfMonth:function _getFirstDayOfMonth(e,t){return new Date(e,t,1).getDay();},_canAdjustMonth:function _canAdjustMonth(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a);},_isInRange:function _isInRange(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=new Date().getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear());},_getFormatConfig:function _getFormatConfig(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:new Date().getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")};},_formatDate:function _formatDate(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t))?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e));}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return "string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t);}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i));},e.datepicker=new n(),e.datepicker.initialized=!1,e.datepicker.uuid=new Date().getTime(),e.datepicker.version="1.11.2",e.datepicker,e.widget("ui.dialog",{version:"1.11.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function using(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i);}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function _create(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus();},_init:function _init(){this.options.autoOpen&&this.open();},_appendTo:function _appendTo(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0);},_destroy:function _destroy(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element);},widget:function widget(){return this.uiDialog;},disable:e.noop,enable:e.noop,close:function close(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if((this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length))try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur();}catch(n) {}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t);});}},isOpen:function isOpen(){return this._isOpen;},moveToTop:function moveToTop(){this._moveToTop();},_moveToTop:function _moveToTop(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return +e(this).css("z-index");}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s;},open:function open(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus");}),this._makeFocusTarget(),this._trigger("open"),void 0);},_focusTabbable:function _focusTabbable(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus();},_keepFocus:function _keepFocus(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable();}t.preventDefault(),i.call(this),this._delay(i);},_createWrapper:function _createWrapper(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function keydown(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus();}),t.preventDefault()):(this._delay(function(){s.focus();}),t.preventDefault());}},mousedown:function mousedown(e){this._moveToTop(e)&&this._focusTabbable();}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")});},_createTitlebar:function _createTitlebar(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function mousedown(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus();}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function click(e){e.preventDefault(),this.close(e);}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")});},_title:function _title(e){this.options.title||e.html("&#160;"),e.text(this.options.title);},_createButtonPane:function _createButtonPane(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons();},_createButtons:function _createButtons(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments);},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet);}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0);},_makeDraggable:function _makeDraggable(){function t(e){return {position:e.position,offset:e.offset};}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function start(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n));},drag:function drag(e,s){i._trigger("drag",e,t(s));},stop:function stop(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a));}});},_makeResizable:function _makeResizable(){function t(e){return {originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size};}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function start(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n));},resize:function resize(e,s){i._trigger("resize",e,t(s));},stop:function stop(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a));}}).css("position",a);},_trackFocus:function _trackFocus(){this._on(this.widget(),{focusin:function focusin(t){this._makeFocusTarget(),this._focusedElement=e(t.target);}});},_makeFocusTarget:function _makeFocusTarget(){this._untrackInstance(),this._trackingInstances().unshift(this);},_untrackInstance:function _untrackInstance(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1);},_trackingInstances:function _trackingInstances(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e;},_minHeight:function _minHeight(){var e=this.options;return "auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height);},_position:function _position(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide();},_setOptions:function _setOptions(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t);}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n);},_setOption:function _setOption(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));},_size:function _size(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight());},_blockFrames:function _blockFrames(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0];});},_unblockFrames:function _unblockFrames(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks);},_allowInteraction:function _allowInteraction(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length;},_createOverlay:function _createOverlay(){if(this.options.modal){var t=!0;this._delay(function(){t=!1;}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function focusin(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable());}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1);}},_destroyOverlay:function _destroyOverlay(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null;}}}),e.widget("ui.progressbar",{version:"1.11.2",options:{max:100,value:0,change:null,complete:null},min:0,_create:function _create(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue();},_destroy:function _destroy(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove();},value:function value(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0);},_constrainedValue:function _constrainedValue(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e));},_setOptions:function _setOptions(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue();},_setOption:function _setOption(e,t){"max"===e&&(t=Math.max(this.min,t)),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t);},_percentage:function _percentage(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min);},_refreshValue:function _refreshValue(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete");}}),e.widget("ui.selectmenu",{version:"1.11.2",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function _create(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable();},_drawButton:function _drawButton(){var t=this,i=this.element.attr("tabindex");this.label=e("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function click(e){this.button.focus(),e.preventDefault();}}),this.element.hide(),this.button=e("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:i||this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),e("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=e("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){t.menuItems||t._refreshMenu();}),this._hoverable(this.button),this._focusable(this.button);},_drawMenu:function _drawMenu(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function select(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e);},focus:function focus(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"));}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return !1;},this.menuInstance._isDivider=function(){return !1;};},refresh:function refresh(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton();},_refreshMenu:function _refreshMenu(){this.menu.empty();var e,t=this.element.find("option");t.length&&(this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")));},open:function open(e){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e));},_position:function _position(){this.menuWrap.position(e.extend({of:this.button},this.options.position));},close:function close(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e));},widget:function widget(){return this.button;},menuWidget:function menuWidget(){return this.menu;},_renderMenu:function _renderMenu(t,i){var s=this,n="";e.each(i,function(i,a){a.optgroup!==n&&(e("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(t),n=a.optgroup),s._renderItemData(t,a);});},_renderItemData:function _renderItemData(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t);},_renderItem:function _renderItem(t,i){var s=e("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(t);},_setText:function _setText(e,t){t?e.text(t):e.html("&#160;");},_move:function _move(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s);},_getSelectedItem:function _getSelectedItem(){return this.menuItems.eq(this.element[0].selectedIndex);},_toggle:function _toggle(e){this[this.isOpen?"close":"open"](e);},_setSelection:function _setSelection(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus());},_documentClick:{mousedown:function mousedown(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(t));}},_buttonEvents:{mousedown:function mousedown(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange();},click:function click(e){this._setSelection(),this._toggle(e);},keydown:function keydown(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1;}i&&t.preventDefault();}},_selectFocusedItem:function _selectFocusedItem(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e);},_select:function _select(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this._setText(this.buttonText,e.label),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t);},_setAria:function _setAria(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t);},_setOption:function _setOption(e,t){"icons"===e&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button),this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"disabled"===e&&(this.menuInstance.option("disabled",t),this.button.toggleClass("ui-state-disabled",t).attr("aria-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===e&&this._resizeButton();},_appendTo:function _appendTo(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t;},_toggleAttr:function _toggleAttr(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen);},_resizeButton:function _resizeButton(){var e=this.options.width;e||(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e);},_resizeMenu:function _resizeMenu(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1));},_getCreateOptions:function _getCreateOptions(){return {disabled:this.element.prop("disabled")};},_parseOptions:function _parseOptions(t){var i=[];t.each(function(t,s){var n=e(s),a=n.parent("optgroup");i.push({element:n,index:t,value:n.attr("value"),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")});}),this.items=i;},_destroy:function _destroy(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element);}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function _create(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1;},_refresh:function _refresh(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue();},_createHandles:function _createHandles(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++){o.push(a);}this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t);});},_createRange:function _createRange(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null);},_setupEvents:function _setupEvents(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles);},_destroy:function _destroy(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy();},_mouseCapture:function _mouseCapture(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t);}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0));},_mouseStart:function _mouseStart(){return !0;},_mouseDrag:function _mouseDrag(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1;},_mouseStop:function _mouseStop(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1;},_detectOrientation:function _detectOrientation(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal";},_normValueFromMouse:function _normValueFromMouse(e){var t,i,s,n,a;return "horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a);},_start:function _start(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i);},_slide:function _slide(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i));},_stop:function _stop(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i);},_change:function _change(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i);}},value:function value(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value();},values:function values(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1){s[a]=this._trimAlignValue(n[a]),this._change(null,a);}this._refreshValue();},_setOption:function _setOption(t,i){var s,n=0;switch(("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t)){case "orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case "value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case "values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1){this._change(null,s);}this._animateOff=!1;break;case "step":case "min":case "max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case "range":this._animateOff=!0,this._refresh(),this._animateOff=!1;}},_value:function _value(){var e=this.options.value;return e=this._trimAlignValue(e);},_values:function _values(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1){i[s]=this._trimAlignValue(i[s]);}return i;}return [];},_trimAlignValue:function _trimAlignValue(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5));},_calculateNewMax:function _calculateNewMax(){var e=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-e;},_valueMin:function _valueMin(){return this.options.min;},_valueMax:function _valueMax(){return this.max;},_refreshValue:function _refreshValue(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i;}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}));},_handleEvents:{keydown:function keydown(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if((t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1)))return;}switch((a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode)){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a);}this._slide(t,o,n);},keyup:function keyup(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"));}}}),e.widget("ui.spinner",{version:"1.11.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function _create(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});},_getCreateOptions:function _getCreateOptions(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);void 0!==n&&n.length&&(t[s]=n);}),t;},_events:{keydown:function keydown(e){this._start(e)&&this._keydown(e)&&e.preventDefault();},keyup:"_stop",focus:function focus(){this.previous=this.element.val();},blur:function blur(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0);},mousewheel:function mousewheel(e,t){if(t){if(!this.spinning&&!this._start(e))return !1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e);},100),e.preventDefault();}},"mousedown .ui-spinner-button":function mousedownUiSpinnerButton(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s;}));}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this);}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t);},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function mouseenterUiSpinnerButton(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0;},"mouseleave .ui-spinner-button":"_stop"},_draw:function _draw(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable();},_keydown:function _keydown(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0;}return !1;},_uiSpinnerHtml:function _uiSpinnerHtml(){return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";},_buttonHtml:function _buttonHtml(){return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>";},_start:function _start(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1;},_repeat:function _repeat(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i);},e),this._spin(t*this.options.step,i);},_spin:function _spin(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++);},_increment:function _increment(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1;},_precision:function _precision(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e;},_precisionOf:function _precisionOf(e){var t=""+e,i=t.indexOf(".");return -1===i?0:t.length-i-1;},_adjustValue:function _adjustValue(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e;},_stop:function _stop(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e));},_setOption:function _setOption(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0;}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable"));},_setOptions:h(function(e){this._super(e);}),_parse:function _parse(e){return "string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e;},_format:function _format(e){return ""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e;},_refresh:function _refresh(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())});},isValid:function isValid(){var e=this.value();return null===e?!1:e===this._adjustValue(e);},_value:function _value(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh();},_destroy:function _destroy(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element);},stepUp:h(function(e){this._stepUp(e);}),_stepUp:function _stepUp(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop());},stepDown:h(function(e){this._stepDown(e);}),_stepDown:function _stepDown(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop());},pageUp:h(function(e){this._stepUp((e||1)*this.options.page);}),pageDown:h(function(e){this._stepDown((e||1)*this.options.page);}),value:function value(e){return arguments.length?(h(this._value).call(this,e),void 0):this._parse(this.element.val());},widget:function widget(){return this.uiSpinner;}}),e.widget("ui.tabs",{version:"1.11.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:(function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i);}catch(n) {}try{s=decodeURIComponent(s);}catch(n) {}return t.hash.length>1&&i===s;};})(),_create:function _create(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e);}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active);},_initialActive:function _initialActive(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0;}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t;},_getCreateEventData:function _getCreateEventData(){return {tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()};},_tabKeydown:function _tabKeydown(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return;}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s);},this.delay));}},_panelKeydown:function _panelKeydown(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus());},_handlePageNav:function _handlePageNav(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0;},_findNextTab:function _findNextTab(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t;}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);){t=i?t+1:t-1;}return t;},_focusNextTab:function _focusNextTab(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e;},_setOption:function _setOption(e,t){return "active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0);},_sanitizeSelector:function _sanitizeSelector(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):"";},refresh:function refresh(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e);}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh();},_refresh:function _refresh(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0);},_processTabs:function _processTabs(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault();}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur();}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0];}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(o=h.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r);}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)));},_getList:function _getList(){return this.tablist||this.element.find("ol,ul").eq(0);},_createPanel:function _createPanel(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0);},_setupDisabled:function _setupDisabled(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++){t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");}this.options.disabled=t;},_setupEvents:function _setupEvents(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler";}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function click(e){e.preventDefault();}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs);},_setupHeightStyle:function _setupHeightStyle(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0));}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0);}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()));}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height());}).height(i));},_eventHandler:function _eventHandler(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?e():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:r?e():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,u));},_toggle:function _toggle(t,i){function s(){a.running=!1,a._trigger("activate",t,i);}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s());}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n();}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex");}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0});},_activate:function _activate(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}));},_findActive:function _findActive(t){return t===!1?e():this.tabs.eq(t);},_getIndex:function _getIndex(e){return "string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e;},_destroy:function _destroy(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls");}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","");},enable:function enable(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null;}):e.map(this.tabs,function(e,i){return i!==t?i:null;})),this._setupDisabled(i));},disable:function disable(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else {if((t=this._getIndex(t),-1!==e.inArray(t,i)))return;i=e.isArray(i)?e.merge([t],i).sort():[t];}this._setupDisabled(i);}},load:function load(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o};this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){o.html(e),s._trigger("load",i,r);},1);}).complete(function(e,t){setTimeout(function(){"abort"===t&&s.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr;},1);})));},_ajaxSettings:function _ajaxSettings(t,i,s){var n=this;return {url:t.attr("href"),beforeSend:function beforeSend(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s));}};},_getPanelForTab:function _getPanelForTab(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i));}}),e.widget("ui.tooltip",{version:"1.11.2",options:{content:function content(){var t=e(this).attr("title")||"";return e("<a>").text(t).html();},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function _addDescribedBy(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")));},_removeDescribedBy:function _removeDescribedBy(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),n=e.inArray(i,s);-1!==n&&s.splice(n,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby");},_create:function _create(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);},_setOption:function _setOption(t,i){var s=this;return "disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element);}),void 0);},_disable:function _disable(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur");n.target=n.currentTarget=s.element[0],t.close(n,!0);}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).removeAttr("title");});},_enable:function _enable(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"));});},open:function open(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""));}),this._updateContent(s,t));},_updateContent:function _updateContent(e,t){var i,s=this.options.content,n=this,a=t?t.type:null;return "string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){e.data("ui-tooltip-open")&&n._delay(function(){t&&(t.type=a),this._open(t,e,i);});}),i&&this._open(t,e,i),void 0);},_open:function _open(t,i,s){function n(e){u.of=e,o.is(":hidden")||o.position(u);}var a,o,r,h,l,u=e.extend({},this.options.position);if(s){if(a=this._find(i))return a.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),o=a.tooltip,this._addDescribedBy(i,o.attr("id")),o.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),s.clone?(l=s.clone(),l.removeAttr("id").find("[id]").removeAttr("id")):l=s,e("<div>").html(l).appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:n}),n(t)):o.position(e.extend({of:i},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(n(u.of),clearInterval(h));},e.fx.interval)),this._trigger("open",t,{tooltip:o}),r={keyup:function keyup(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0);}}},i[0]!==this.element[0]&&(r.remove=function(){this._removeTooltip(o);}),t&&"mouseover"!==t.type||(r.mouseleave="close"),t&&"focusin"!==t.type||(r.focusout="close"),this._on(!0,i,r);}},close:function close(t){var i,s=this,n=e(t?t.currentTarget:this.element),a=this._find(n);a&&(i=a.tooltip,a.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),a.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this));}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t];}),a.closing=!0,this._trigger("close",t,{tooltip:i}),a.hiding||(a.closing=!1)));},_tooltip:function _tooltip(t){var i=e("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),s=i.uniqueId().attr("id");return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[s]={element:t,tooltip:i};},_find:function _find(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null;},_removeTooltip:function _removeTooltip(e){e.remove(),delete this.tooltips[e.attr("id")];},_destroy:function _destroy(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur"),a=s.element;n.target=n.currentTarget=a[0],t.close(n,!0),e("#"+i).remove(),a.data("ui-tooltip-title")&&(a.attr("title")||a.attr("title",a.data("ui-tooltip-title")),a.removeData("ui-tooltip-title"));}),this.liveRegion.remove();}});var y="ui-effects-",b=e;e.effects={effect:{}},(function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~ ~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e);}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],n=s._rgba=o._rgba,!1):t;}),n.length?("0,0,0,0"===n.join()&&e.extend(n,a.transparent),s):a[i];}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e;}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function parse(e){return [e[1],e[2],e[3],e[4]];}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function parse(e){return [2.55*e[1],2.55*e[2],2.55*e[3],e[4]];}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function parse(e){return [parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)];}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function parse(e){return [parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)];}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function parse(e){return [e[1],e[2]/100,e[3]/100,e[4]];}}],l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n);},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1};}),l.fn=e.extend(l.prototype,{parse:function parse(n,o,r,h){if(n===t)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=e(n).css(o),o=t);var d=this,c=e.type(n),p=this._rgba=[];return o!==t&&(n=[n,o,r,h],c="array"),"string"===c?this.parse(s(n)||a._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(n[t.idx],t);}),this):"object"===c?(n instanceof l?f(u,function(e,t){n[t.cache]&&(d[t.cache]=n[t.cache].slice());}):f(u,function(t,s){var a=s.cache;f(s.props,function(e,t){if(!d[a]&&s.to){if("alpha"===e||null==n[e])return;d[a]=s.to(d._rgba);}d[a][t.idx]=i(n[e],t,!0);}),d[a]&&0>e.inArray(null,d[a].slice(0,3))&&(d[a][3]=1,s.from&&(d._rgba=s.from(d[a])));}),this):t;},is:function is(e){var i=l(e),s=!0,n=this;return f(u,function(e,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t;})),s;}),s;},_space:function _space(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i);}),e.pop();},transition:function transition(e,t){var s=l(e),n=s._space(),a=u[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],u=d[n.type]||{};null!==l&&(null===o?h[a]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[a]=i((l-o)*t+o,n)));}),this[n](h);},blend:function blend(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return (1-s)*n[t]+s*e;}));},toRgbaString:function toRgbaString(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e;});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")";},toHslaString:function toHslaString(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e;});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")";},toHexString:function toHexString(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~ ~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e;}).join("");},toString:function toString(){return 0===this._rgba[3]?"transparent":this.toRgbaString();}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return [null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o];},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return [null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return [Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a];},f(u,function(s,n){var a=n.props,o=n.cache,h=n.to,u=n.from;l.fn[s]=function(s){if((h&&!this[o]&&(this[o]=h(this._rgba)),s===t))return this[o].slice();var n,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(a,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t);}),u?(n=l(u(c)),n[o]=c,n):l(c);},f(a,function(t,i){l.fn[t]||(l.fn[t]=function(n){var a,o=e.type(n),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return "undefined"===o?u:("function"===o&&(n=n.call(this,u),o=e.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=u+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)));});});}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function set(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if((n=l(a||n),!c.rgba&&1!==n._rgba[3])){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;){try{r=e.css(o,"backgroundColor"),o=o.parentNode;}catch(h) {}}n=n.blend(r&&"transparent"!==r?r:"_default");}n=n.toRgbaString();}try{t.style[i]=n;}catch(h) {}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos));};});},l.hook(o),e.cssHooks.borderColor={expand:function expand(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e;}),t;}},a=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"};})(b),(function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;){i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);}else for(i in n){"string"==typeof n[i]&&(a[i]=n[i]);}return a;}function i(t,i){var s,a,o={};for(s in i){a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(o[s]=a));}return o;}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(b.style(e.elem,i,e.end),e.setAttr=!0);};}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e));}),e.effects.animateClass=function(n,a,o,r){var h=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return {el:i,start:t(this)};}),a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t]);});},a(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this;}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function complete(){i.resolve(t);}});return this.el.animate(this.diff,s),i.promise();}),e.when.apply(e,l.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"");});}),h.complete.call(o[0]);});});},e.fn.extend({addClass:(function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments);};})(e.fn.addClass),removeClass:(function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments);};})(e.fn.removeClass),toggleClass:(function(t){return function(i,s,n,a,o){return "boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a);};})(e.fn.toggleClass),switchClass:function switchClass(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a);}});})(),(function(){function t(t,i,s,n){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t;}function i(t){return !t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t))||t.effect?!1:!0:!0;}e.extend(e.effects,{version:"1.11.2",save:function save(e,t){for(var i=0;t.length>i;i++){null!==t[i]&&e.data(y+t[i],e[0].style[t[i]]);}},restore:function restore(e,t){var i,s;for(s=0;t.length>s;s++){null!==t[s]&&(i=e.data(y+t[s]),void 0===i&&(i=""),e.css(t[s],i));}},setMode:function setMode(e,t){return "toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t;},getBaseline:function getBaseline(e,t){var i,s;switch(e[0]){case "top":i=0;break;case "middle":i=.5;break;case "bottom":i=1;break;default:i=e[0]/t.height;}switch(e[1]){case "left":s=0;break;case "center":s=.5;break;case "right":s=1;break;default:s=e[1]/t.width;}return {x:s,y:i};},createWrapper:function createWrapper(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:t.width(),height:t.height()},a=document.activeElement;try{a.id;}catch(o) {a=document.body;}return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto");}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show();},removeWrapper:function removeWrapper(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t;},setTransition:function setTransition(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1]);}),n;}}),e.fn.extend({effect:function effect(){function i(t){function i(){e.isFunction(a)&&a.call(n[0]),e.isFunction(t)&&t();}var n=e(this),a=s.complete,r=s.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),i()):o.call(n[0],s,i);}var s=t.apply(this,arguments),n=s.mode,a=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?n?this[n](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this);}):a===!1?this.each(i):this.queue(a||"fx",i);},show:(function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n);};})(e.fn.show),hide:(function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n);};})(e.fn.hide),toggle:(function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n);};})(e.fn.toggle),cssUnit:function cssUnit(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t]);}),s;}});})(),(function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2);};}),e.extend(t,{Sine:function Sine(e){return 1-Math.cos(e*Math.PI/2);},Circ:function Circ(e){return 1-Math.sqrt(1-e*e);},Elastic:function Elastic(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15);},Back:function Back(e){return e*e*(3*e-2);},Bounce:function Bounce(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;){}return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2);}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e);},e.easing["easeInOut"+t]=function(e){return .5>e?i(2*e)/2:1-i(-2*e+2)/2;};});})(),e.effects,e.effects.effect.blind=function(t,i){var s,n,a,o=e(this),r=/up|down|vertical/,h=/up|left|vertical|horizontal/,l=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(o,t.mode||"hide"),d=t.direction||"up",c=r.test(d),p=c?"height":"width",f=c?"top":"left",m=h.test(d),g={},v="show"===u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(),l):e.effects.save(o,l),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n=s[p](),a=parseFloat(s.css(f))||0,g[p]=v?n:0,m||(o.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?a:n+a),v&&(s.css(p,0),m||s.css(f,a+n)),s.animate(g,{duration:t.duration,easing:t.easing,queue:!1,complete:function complete(){"hide"===u&&o.hide(),e.effects.restore(o,l),e.effects.removeWrapper(o),i();}});},e.effects.effect.bounce=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"effect"),l="hide"===h,u="show"===h,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||l?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=o.queue(),_=b.length;for((u||l)&&r.push("opacity"),e.effects.save(o,r),o.show(),e.effects.createWrapper(o),c||(c=o["top"===v?"outerHeight":"outerWidth"]()/3),u&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,y?2*-c:2*c).animate(a,m,g)),l&&(c/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++){n={},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g).animate(a,m,g),c=l?2*c:c/2;}l&&(n={opacity:0},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g)),o.queue(function(){l&&o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i();}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),o.dequeue();},e.effects.effect.clip=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"hide"),l="show"===h,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(o,r),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[c](),l&&(n.css(c,0),n.css(p,a/2)),f[c]=l?a:0,f[p]=l?0:a/2,n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function complete(){l||o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i();}});},e.effects.effect.drop=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","opacity","height","width"],o=e.effects.setMode(n,t.mode||"hide"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h?"pos":"neg",d={opacity:r?1:0};e.effects.save(n,a),n.show(),e.effects.createWrapper(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===u?-s:s),d[l]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function complete(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i();}});},e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&n();}function n(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i();}var a,o,r,h,l,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(a=0;d>a;a++){for(h=g.top+a*y,u=a-(d-1)/2,o=0;c>o;o++){r=g.left+o*v,l=o-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s);}}},e.effects.effect.fade=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:t.duration,easing:t.easing,complete:i});},e.effects.effect.fold=function(t,i){var s,n,a=e(this),o=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"hide"),h="show"===r,l="hide"===r,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=h!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(a,o),a.show(),s=e.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*n[l?0:1]),h&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=h?n[0]:u,v[f[1]]=h?n[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){l&&a.hide(),e.effects.restore(a,o),e.effects.removeWrapper(a),i();});},e.effects.effect.highlight=function(t,i){var s=e(this),n=["backgroundImage","backgroundColor","opacity"],a=e.effects.setMode(s,t.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),e.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function complete(){"hide"===a&&s.hide(),e.effects.restore(s,n),i();}});},e.effects.effect.size=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=o.css("position"),y=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===t.mode&&"show"===p?(o.from=t.to||b,o.to=t.from||s):(o.from=t.from||("show"===p?b:s),o.to=t.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===m||"both"===m)&&(a.from.y!==a.to.y&&(y=y.concat(d),o.from=e.effects.setTransition(o,d,a.from.y,o.from),o.to=e.effects.setTransition(o,d,a.to.y,o.to)),a.from.x!==a.to.x&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,a.from.x,o.from),o.to=e.effects.setTransition(o,c,a.to.x,o.to))),("content"===m||"both"===m)&&a.from.y!==a.to.y&&(y=y.concat(u).concat(l),o.from=e.effects.setTransition(o,u,a.from.y,o.from),o.to=e.effects.setTransition(o,u,a.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),g&&(n=e.effects.getBaseline(g,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=r.concat(d).concat(c),o.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&e.effects.save(i,l),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=e.effects.setTransition(i,d,a.from.y,i.from),i.to=e.effects.setTransition(i,d,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=e.effects.setTransition(i,c,a.from.x,i.from),i.to=e.effects.setTransition(i,c,a.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l);});})),o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function complete(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),e.effects.restore(o,y),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,i){var s=parseInt(i,10),n=e?o.to.left:o.to.top;return "auto"===i?n+"px":s+n+"px";});})),e.effects.removeWrapper(o),i();}});},e.effects.effect.scale=function(t,i){var s=e(this),n=e.extend(!0,{},t),a=e.effects.setMode(s,t.mode||"effect"),o=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===a?0:100),r=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=h||["middle","center"],n.restore=!0),n.from=t.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n);},e.effects.effect.puff=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"hide"),a="hide"===n,o=parseInt(t.percent,10)||150,r=o/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(t);},e.effects.effect.pulsate=function(t,i){var s,n=e(this),a=e.effects.setMode(n,t.mode||"show"),o="show"===a,r="hide"===a,h=o||"hide"===a,l=2*(t.times||5)+(h?1:0),u=t.duration/l,d=0,c=n.queue(),p=c.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),d=1),s=1;l>s;s++){n.animate({opacity:d},u,t.easing),d=1-d;}n.animate({opacity:d},u,t.easing),n.queue(function(){r&&n.hide(),i();}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,l+1))),n.dequeue();},e.effects.effect.shake=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"effect"),r=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=n.queue(),y=v.length;for(e.effects.save(n,a),n.show(),e.effects.createWrapper(n),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,n.animate(f,d,t.easing),s=1;l>s;s++){n.animate(m,d,t.easing).animate(g,d,t.easing);}n.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i();}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),n.dequeue();},e.effects.effect.slide=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(n,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(n,a),n.show(),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function complete(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i();}});},e.effects.effect.transfer=function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,h=a?o.scrollLeft():0,l=n.offset(),u={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-r,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i();});};});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Symbol = __webpack_require__(20)["default"];
	
	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	__webpack_require__(49);
	module.exports = __webpack_require__(28).Symbol;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(17)
	  , global         = __webpack_require__(23)
	  , has            = __webpack_require__(24)
	  , DESCRIPTORS    = __webpack_require__(25)
	  , $export        = __webpack_require__(27)
	  , redefine       = __webpack_require__(31)
	  , $fails         = __webpack_require__(26)
	  , shared         = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(35)
	  , uid            = __webpack_require__(37)
	  , wks            = __webpack_require__(36)
	  , keyOf          = __webpack_require__(38)
	  , $names         = __webpack_require__(43)
	  , enumKeys       = __webpack_require__(44)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(46)
	  , toIObject      = __webpack_require__(39)
	  , createDesc     = __webpack_require__(33)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(48)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 23 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(26)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(23)
	  , core      = __webpack_require__(28)
	  , ctx       = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 28 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(30);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(17)
	  , createDesc = __webpack_require__(33);
	module.exports = __webpack_require__(25) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(23)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(17).setDesc
	  , has = __webpack_require__(24)
	  , TAG = __webpack_require__(36)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(34)('wks')
	  , uid    = __webpack_require__(37)
	  , Symbol = __webpack_require__(23).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(17)
	  , toIObject = __webpack_require__(39);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(42);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(39)
	  , getNames  = __webpack_require__(17).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(17);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(47);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 49 */
/***/ function(module, exports) {



/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
	__webpack_require__(51)
	__webpack_require__(52)
	__webpack_require__(53)
	__webpack_require__(54)
	__webpack_require__(55)
	__webpack_require__(56)
	__webpack_require__(57)
	__webpack_require__(58)
	__webpack_require__(59)
	__webpack_require__(60)
	__webpack_require__(61)
	__webpack_require__(62)

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: transition.js v3.3.6
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================
	
	  function transitionEnd() {
	    var el = document.createElement('bootstrap')
	
	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }
	
	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }
	
	    return false // explicit for ie8 (  ._.)
	  }
	
	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }
	
	  $(function () {
	    $.support.transition = transitionEnd()
	
	    if (!$.support.transition) return
	
	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: alert.js v3.3.6
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // ALERT CLASS DEFINITION
	  // ======================
	
	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }
	
	  Alert.VERSION = '3.3.6'
	
	  Alert.TRANSITION_DURATION = 150
	
	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    var $parent = $(selector)
	
	    if (e) e.preventDefault()
	
	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }
	
	    $parent.trigger(e = $.Event('close.bs.alert'))
	
	    if (e.isDefaultPrevented()) return
	
	    $parent.removeClass('in')
	
	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }
	
	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }
	
	
	  // ALERT PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')
	
	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }
	
	  var old = $.fn.alert
	
	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert
	
	
	  // ALERT NO CONFLICT
	  // =================
	
	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }
	
	
	  // ALERT DATA-API
	  // ==============
	
	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: button.js v3.3.6
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================
	
	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }
	
	  Button.VERSION  = '3.3.6'
	
	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }
	
	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()
	
	    state += 'Text'
	
	    if (data.resetText == null) $el.data('resetText', $el[val]())
	
	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])
	
	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d)
	      }
	    }, this), 0)
	  }
	
	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')
	
	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked')) changed = false
	        $parent.find('.active').removeClass('active')
	        this.$element.addClass('active')
	      } else if ($input.prop('type') == 'checkbox') {
	        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
	        this.$element.toggleClass('active')
	      }
	      $input.prop('checked', this.$element.hasClass('active'))
	      if (changed) $input.trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	      this.$element.toggleClass('active')
	    }
	  }
	
	
	  // BUTTON PLUGIN DEFINITION
	  // ========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.button', (data = new Button(this, options)))
	
	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }
	
	  var old = $.fn.button
	
	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button
	
	
	  // BUTTON NO CONFLICT
	  // ==================
	
	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }
	
	
	  // BUTTON DATA-API
	  // ===============
	
	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target)
	      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
	      Plugin.call($btn, 'toggle')
	      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: carousel.js v3.3.6
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // CAROUSEL CLASS DEFINITION
	  // =========================
	
	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null
	
	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
	
	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }
	
	  Carousel.VERSION  = '3.3.6'
	
	  Carousel.TRANSITION_DURATION = 600
	
	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }
	
	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }
	
	    e.preventDefault()
	  }
	
	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)
	
	    this.interval && clearInterval(this.interval)
	
	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
	
	    return this
	  }
	
	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }
	
	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }
	
	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
	
	    if (pos > (this.$items.length - 1) || pos < 0) return
	
	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()
	
	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }
	
	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)
	
	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }
	
	    this.interval = clearInterval(this.interval)
	
	    return this
	  }
	
	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }
	
	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }
	
	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this
	
	    if ($next.hasClass('active')) return (this.sliding = false)
	
	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return
	
	    this.sliding = true
	
	    isCycling && this.pause()
	
	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }
	
	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }
	
	    isCycling && this.cycle()
	
	    return this
	  }
	
	
	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide
	
	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }
	
	  var old = $.fn.carousel
	
	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel
	
	
	  // CAROUSEL NO CONFLICT
	  // ====================
	
	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }
	
	
	  // CAROUSEL DATA-API
	  // =================
	
	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false
	
	    Plugin.call($target, options)
	
	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }
	
	    e.preventDefault()
	  }
	
	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
	
	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: collapse.js v3.3.6
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================
	
	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null
	
	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }
	
	    if (this.options.toggle) this.toggle()
	  }
	
	  Collapse.VERSION  = '3.3.6'
	
	  Collapse.TRANSITION_DURATION = 350
	
	  Collapse.DEFAULTS = {
	    toggle: true
	  }
	
	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }
	
	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return
	
	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')
	
	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }
	
	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return
	
	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }
	
	    var dimension = this.dimension()
	
	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)
	
	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)
	
	    this.transitioning = 1
	
	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }
	
	    if (!$.support.transition) return complete.call(this)
	
	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))
	
	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }
	
	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return
	
	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return
	
	    var dimension = this.dimension()
	
	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight
	
	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)
	
	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)
	
	    this.transitioning = 1
	
	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }
	
	    if (!$.support.transition) return complete.call(this)
	
	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }
	
	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }
	
	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }
	
	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')
	
	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }
	
	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
	
	    return $(target)
	  }
	
	
	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
	
	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.collapse
	
	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse
	
	
	  // COLLAPSE NO CONFLICT
	  // ====================
	
	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }
	
	
	  // COLLAPSE DATA-API
	  // =================
	
	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)
	
	    if (!$this.attr('data-target')) e.preventDefault()
	
	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()
	
	    Plugin.call($target, option)
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.6
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // DROPDOWN CLASS DEFINITION
	  // =========================
	
	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }
	
	  Dropdown.VERSION = '3.3.6'
	
	  function getParent($this) {
	    var selector = $this.attr('data-target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    var $parent = selector && $(selector)
	
	    return $parent && $parent.length ? $parent : $this.parent()
	  }
	
	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }
	
	      if (!$parent.hasClass('open')) return
	
	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return
	
	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
	    })
	  }
	
	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)
	
	    if ($this.is('.disabled, :disabled')) return
	
	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	
	    clearMenus()
	
	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $(document.createElement('div'))
	          .addClass('dropdown-backdrop')
	          .insertAfter($(this))
	          .on('click', clearMenus)
	      }
	
	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }
	
	    return false
	  }
	
	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
	
	    var $this = $(this)
	
	    e.preventDefault()
	    e.stopPropagation()
	
	    if ($this.is('.disabled, :disabled')) return
	
	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	
	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }
	
	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('.dropdown-menu' + desc)
	
	    if (!$items.length) return
	
	    var index = $items.index(e.target)
	
	    if (e.which == 38 && index > 0)                 index--         // up
	    if (e.which == 40 && index < $items.length - 1) index++         // down
	    if (!~index)                                    index = 0
	
	    $items.eq(index).trigger('focus')
	  }
	
	
	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')
	
	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }
	
	  var old = $.fn.dropdown
	
	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown
	
	
	  // DROPDOWN NO CONFLICT
	  // ====================
	
	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }
	
	
	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================
	
	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // MODAL CLASS DEFINITION
	  // ======================
	
	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false
	
	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }
	
	  Modal.VERSION  = '3.3.6'
	
	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150
	
	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }
	
	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }
	
	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
	
	    this.$element.trigger(e)
	
	    if (this.isShown || e.isDefaultPrevented()) return
	
	    this.isShown = true
	
	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')
	
	    this.escape()
	    this.resize()
	
	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
	
	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })
	
	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')
	
	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }
	
	      that.$element
	        .show()
	        .scrollTop(0)
	
	      that.adjustDialog()
	
	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }
	
	      that.$element.addClass('in')
	
	      that.enforceFocus()
	
	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
	
	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }
	
	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()
	
	    e = $.Event('hide.bs.modal')
	
	    this.$element.trigger(e)
	
	    if (!this.isShown || e.isDefaultPrevented()) return
	
	    this.isShown = false
	
	    this.escape()
	    this.resize()
	
	    $(document).off('focusin.bs.modal')
	
	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')
	
	    this.$dialog.off('mousedown.dismiss.bs.modal')
	
	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }
	
	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }
	
	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }
	
	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }
	
	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }
	
	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }
	
	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''
	
	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate
	
	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)
	
	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))
	
	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow
	
	      this.$backdrop.addClass('in')
	
	      if (!callback) return
	
	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()
	
	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')
	
	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()
	
	    } else if (callback) {
	      callback()
	    }
	  }
	
	  // these following methods are used to handle overflowing modals
	
	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }
	
	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight
	
	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }
	
	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }
	
	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }
	
	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }
	
	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }
	
	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }
	
	
	  // MODAL PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
	
	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }
	
	  var old = $.fn.modal
	
	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal
	
	
	  // MODAL NO CONFLICT
	  // =================
	
	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }
	
	
	  // MODAL DATA-API
	  // ==============
	
	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
	
	    if ($this.is('a')) e.preventDefault()
	
	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.6
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================
	
	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null
	    this.inState    = null
	
	    this.init('tooltip', element, options)
	  }
	
	  Tooltip.VERSION  = '3.3.6'
	
	  Tooltip.TRANSITION_DURATION = 150
	
	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }
	
	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
	    this.inState   = { click: false, hover: false, focus: false }
	
	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }
	
	    var triggers = this.options.trigger.split(' ')
	
	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]
	
	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
	
	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }
	
	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }
	
	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }
	
	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)
	
	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }
	
	    return options
	  }
	
	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()
	
	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })
	
	    return options
	  }
	
	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)
	
	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }
	
	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
	    }
	
	    if (self.tip().hasClass('in') || self.hoverState == 'in') {
	      self.hoverState = 'in'
	      return
	    }
	
	    clearTimeout(self.timeout)
	
	    self.hoverState = 'in'
	
	    if (!self.options.delay || !self.options.delay.show) return self.show()
	
	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }
	
	  Tooltip.prototype.isInStateTrue = function () {
	    for (var key in this.inState) {
	      if (this.inState[key]) return true
	    }
	
	    return false
	  }
	
	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)
	
	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }
	
	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
	    }
	
	    if (self.isInStateTrue()) return
	
	    clearTimeout(self.timeout)
	
	    self.hoverState = 'out'
	
	    if (!self.options.delay || !self.options.delay.hide) return self.hide()
	
	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }
	
	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)
	
	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)
	
	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this
	
	      var $tip = this.tip()
	
	      var tipId = this.getUID(this.type)
	
	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)
	
	      if (this.options.animation) $tip.addClass('fade')
	
	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement
	
	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
	
	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)
	
	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
	      this.$element.trigger('inserted.bs.' + this.type)
	
	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight
	
	      if (autoPlace) {
	        var orgPlacement = placement
	        var viewportDim = this.getPosition(this.$viewport)
	
	        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	                    placement
	
	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }
	
	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
	
	      this.applyPlacement(calculatedOffset, placement)
	
	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null
	
	        if (prevHoverState == 'out') that.leave(that)
	      }
	
	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }
	
	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight
	
	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)
	
	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0
	
	    offset.top  += marginTop
	    offset.left += marginLeft
	
	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)
	
	    $tip.addClass('in')
	
	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight
	
	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }
	
	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
	
	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top
	
	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
	
	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }
	
	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }
	
	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()
	
	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }
	
	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)
	
	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }
	
	    this.$element.trigger(e)
	
	    if (e.isDefaultPrevented()) return
	
	    $tip.removeClass('in')
	
	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()
	
	    this.hoverState = null
	
	    return this
	  }
	
	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }
	
	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }
	
	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element
	
	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'
	
	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null
	
	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }
	
	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }
	
	  }
	
	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta
	
	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)
	
	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }
	
	    return delta
	  }
	
	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options
	
	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)
	
	    return title
	  }
	
	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }
	
	  Tooltip.prototype.tip = function () {
	    if (!this.$tip) {
	      this.$tip = $(this.options.template)
	      if (this.$tip.length != 1) {
	        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
	      }
	    }
	    return this.$tip
	  }
	
	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }
	
	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }
	
	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }
	
	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }
	
	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }
	
	    if (e) {
	      self.inState.click = !self.inState.click
	      if (self.isInStateTrue()) self.enter(self)
	      else self.leave(self)
	    } else {
	      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	    }
	  }
	
	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	      if (that.$tip) {
	        that.$tip.detach()
	      }
	      that.$tip = null
	      that.$arrow = null
	      that.$viewport = null
	    })
	  }
	
	
	  // TOOLTIP PLUGIN DEFINITION
	  // =========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option
	
	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.tooltip
	
	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip
	
	
	  // TOOLTIP NO CONFLICT
	  // ===================
	
	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: popover.js v3.3.6
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================
	
	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }
	
	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')
	
	  Popover.VERSION  = '3.3.6'
	
	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })
	
	
	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================
	
	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
	
	  Popover.prototype.constructor = Popover
	
	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }
	
	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()
	
	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)
	
	    $tip.removeClass('fade top bottom left right in')
	
	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }
	
	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }
	
	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options
	
	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }
	
	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }
	
	
	  // POPOVER PLUGIN DEFINITION
	  // =========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option
	
	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.popover
	
	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover
	
	
	  // POPOVER NO CONFLICT
	  // ===================
	
	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.6
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // SCROLLSPY CLASS DEFINITION
	  // ==========================
	
	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0
	
	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }
	
	  ScrollSpy.VERSION  = '3.3.6'
	
	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }
	
	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }
	
	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0
	
	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()
	
	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }
	
	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)
	
	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }
	
	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i
	
	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }
	
	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }
	
	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }
	
	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }
	
	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target
	
	    this.clear()
	
	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'
	
	    var active = $(selector)
	      .parents('li')
	      .addClass('active')
	
	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }
	
	    active.trigger('activate.bs.scrollspy')
	  }
	
	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }
	
	
	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.scrollspy
	
	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy
	
	
	  // SCROLLSPY NO CONFLICT
	  // =====================
	
	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }
	
	
	  // SCROLLSPY DATA-API
	  // ==================
	
	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: tab.js v3.3.6
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // TAB CLASS DEFINITION
	  // ====================
	
	  var Tab = function (element) {
	    // jscs:disable requireDollarBeforejQueryAssignment
	    this.element = $(element)
	    // jscs:enable requireDollarBeforejQueryAssignment
	  }
	
	  Tab.VERSION = '3.3.6'
	
	  Tab.TRANSITION_DURATION = 150
	
	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')
	
	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }
	
	    if ($this.parent('li').hasClass('active')) return
	
	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })
	
	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)
	
	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return
	
	    var $target = $(selector)
	
	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }
	
	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)
	
	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)
	
	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)
	
	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }
	
	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }
	
	      callback && callback()
	    }
	
	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()
	
	    $active.removeClass('in')
	  }
	
	
	  // TAB PLUGIN DEFINITION
	  // =====================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')
	
	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.tab
	
	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab
	
	
	  // TAB NO CONFLICT
	  // ===============
	
	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }
	
	
	  // TAB DATA-API
	  // ============
	
	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }
	
	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/* ========================================================================
	 * Bootstrap: affix.js v3.3.6
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	
	
	+function ($) {
	  'use strict';
	
	  // AFFIX CLASS DEFINITION
	  // ======================
	
	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)
	
	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))
	
	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null
	
	    this.checkPosition()
	  }
	
	  Affix.VERSION  = '3.3.6'
	
	  Affix.RESET    = 'affix affix-top affix-bottom'
	
	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }
	
	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()
	
	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false
	
	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }
	
	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height
	
	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'
	
	    return false
	  }
	
	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }
	
	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }
	
	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return
	
	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())
	
	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)
	
	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)
	
	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')
	
	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')
	
	      this.$element.trigger(e)
	
	      if (e.isDefaultPrevented()) return
	
	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null
	
	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }
	
	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }
	
	
	  // AFFIX PLUGIN DEFINITION
	  // =======================
	
	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option
	
	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }
	
	  var old = $.fn.affix
	
	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix
	
	
	  // AFFIX NO CONFLICT
	  // =================
	
	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }
	
	
	  // AFFIX DATA-API
	  // ==============
	
	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()
	
	      data.offset = data.offset || {}
	
	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop
	
	      Plugin.call($spy, data)
	    })
	  })
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	/**
	 * @preserve
	 * Project: Bootstrap Hover Dropdown
	 * Author: Cameron Spear
	 * Version: v2.2.1
	 * Contributors: Mattia Larentis
	 * Dependencies: Bootstrap's Dropdown plugin, jQuery
	 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
	 * License: MIT
	 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
	 */
	!(function (e, n) {
	  var o = e();e.fn.dropdownHover = function (t) {
	    return "ontouchstart" in document ? this : (o = o.add(this.parent()), this.each(function () {
	      function r() {
	        d.parents(".navbar").find(".navbar-toggle").is(":visible") || (n.clearTimeout(a), n.clearTimeout(i), i = n.setTimeout(function () {
	          o.find(":focus").blur(), v.instantlyCloseOthers === !0 && o.removeClass("open"), n.clearTimeout(i), d.attr("aria-expanded", "true"), s.addClass("open"), d.trigger(h);
	        }, v.hoverDelay));
	      }var a,
	          i,
	          d = e(this),
	          s = d.parent(),
	          u = { delay: 500, hoverDelay: 0, instantlyCloseOthers: !0 },
	          l = { delay: e(this).data("delay"), hoverDelay: e(this).data("hover-delay"), instantlyCloseOthers: e(this).data("close-others") },
	          h = "show.bs.dropdown",
	          c = "hide.bs.dropdown",
	          v = e.extend(!0, {}, u, t, l);s.hover(function (e) {
	        return s.hasClass("open") || d.is(e.target) ? void r(e) : !0;
	      }, function () {
	        n.clearTimeout(i), a = n.setTimeout(function () {
	          d.attr("aria-expanded", "false"), s.removeClass("open"), d.trigger(c);
	        }, v.delay);
	      }), d.hover(function (e) {
	        return s.hasClass("open") || s.is(e.target) ? void r(e) : !0;
	      }), s.find(".dropdown-submenu").each(function () {
	        var o,
	            t = e(this);t.hover(function () {
	          n.clearTimeout(o), t.children(".dropdown-menu").show(), t.siblings().children(".dropdown-menu").hide();
	        }, function () {
	          var e = t.children(".dropdown-menu");o = n.setTimeout(function () {
	            e.hide();
	          }, v.delay);
	        });
	      });
	    }));
	  }, e(document).ready(function () {
	    e('[data-hover="dropdown"]').dropdownHover();
	  });
	})(jQuery, window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
	 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	 *
	 * Version: 1.3.8
	 *
	 */
	(function (e) {
	  e.fn.extend({ slimScroll: function slimScroll(f) {
	      var a = e.extend({ width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: .4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: .2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "7px", railBorderRadius: "7px" }, f);this.each(function () {
	        function v(d) {
	          if (r) {
	            d = d || window.event;
	            var c = 0;d.wheelDelta && (c = -d.wheelDelta / 120);d.detail && (c = d.detail / 3);e(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && n(c, !0);d.preventDefault && !k && d.preventDefault();k || (d.returnValue = !1);
	          }
	        }function n(d, e, f) {
	          k = !1;var g = d,
	              h = b.outerHeight() - c.outerHeight();e && (g = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), g = Math.min(Math.max(g, 0), h), g = 0 < d ? Math.ceil(g) : Math.floor(g), c.css({ top: g + "px" }));l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
	          g = l * (b[0].scrollHeight - b.outerHeight());f && (g = d, d = g / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({ top: d + "px" }));b.scrollTop(g);b.trigger("slimscrolling", ~ ~g);w();q();
	        }function x() {
	          u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), 30);c.css({ height: u + "px" });var a = u == b.outerHeight() ? "none" : "block";c.css({ display: a });
	        }function w() {
	          x();clearTimeout(B);l == ~ ~l ? (k = a.allowPageScroll, C != l && b.trigger("slimscroll", 0 == ~ ~l ? "top" : "bottom")) : k = !1;C = l;u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && m.stop(!0, !0).fadeIn("fast"));
	        }function q() {
	          a.alwaysVisible || (B = setTimeout(function () {
	            a.disableFadeOut && r || y || z || (c.fadeOut("slow"), m.fadeOut("slow"));
	          }, 1E3));
	        }var r,
	            y,
	            z,
	            B,
	            A,
	            u,
	            l,
	            C,
	            k = !1,
	            b = e(this);if (b.parent().hasClass(a.wrapperClass)) {
	          var p = b.scrollTop(),
	              c = b.siblings("." + a.barClass),
	              m = b.siblings("." + a.railClass);x();if (e.isPlainObject(f)) {
	            if ("height" in f && "auto" == f.height) {
	              b.parent().css("height", "auto");b.css("height", "auto");var h = b.parent().parent().height();b.parent().css("height", h);b.css("height", h);
	            } else "height" in f && (h = f.height, b.parent().css("height", h), b.css("height", h));if ("scrollTo" in f) p = parseInt(a.scrollTo);else if ("scrollBy" in f) p += parseInt(a.scrollBy);else if ("destroy" in f) {
	              c.remove();m.remove();b.unwrap();return;
	            }n(p, !1, !0);
	          }
	        } else if (!(e.isPlainObject(f) && "destroy" in f)) {
	          a.height = "auto" == a.height ? b.parent().height() : a.height;p = e("<div></div>").addClass(a.wrapperClass).css({ position: "relative", overflow: "hidden", width: a.width, height: a.height });b.css({ overflow: "hidden",
	            width: a.width, height: a.height });var m = e("<div></div>").addClass(a.railClass).css({ width: a.size, height: "100%", position: "absolute", top: 0, display: a.alwaysVisible && a.railVisible ? "block" : "none", "border-radius": a.railBorderRadius, background: a.railColor, opacity: a.railOpacity, zIndex: 90 }),
	              c = e("<div></div>").addClass(a.barClass).css({ background: a.color, width: a.size, position: "absolute", top: 0, opacity: a.opacity, display: a.alwaysVisible ? "block" : "none", "border-radius": a.borderRadius, BorderRadius: a.borderRadius, MozBorderRadius: a.borderRadius,
	            WebkitBorderRadius: a.borderRadius, zIndex: 99 }),
	              h = "right" == a.position ? { right: a.distance } : { left: a.distance };m.css(h);c.css(h);b.wrap(p);b.parent().append(c);b.parent().append(m);a.railDraggable && c.bind("mousedown", function (a) {
	            var b = e(document);z = !0;t = parseFloat(c.css("top"));pageY = a.pageY;b.bind("mousemove.slimscroll", function (a) {
	              currTop = t + a.pageY - pageY;c.css("top", currTop);n(0, c.position().top, !1);
	            });b.bind("mouseup.slimscroll", function (a) {
	              z = !1;q();b.unbind(".slimscroll");
	            });return !1;
	          }).bind("selectstart.slimscroll", function (a) {
	            a.stopPropagation();a.preventDefault();return !1;
	          });m.hover(function () {
	            w();
	          }, function () {
	            q();
	          });c.hover(function () {
	            y = !0;
	          }, function () {
	            y = !1;
	          });b.hover(function () {
	            r = !0;w();q();
	          }, function () {
	            r = !1;q();
	          });b.bind("touchstart", function (a, b) {
	            a.originalEvent.touches.length && (A = a.originalEvent.touches[0].pageY);
	          });b.bind("touchmove", function (b) {
	            k || b.originalEvent.preventDefault();b.originalEvent.touches.length && (n((A - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), A = b.originalEvent.touches[0].pageY);
	          });
	          x();"bottom" === a.start ? (c.css({ top: b.outerHeight() - c.outerHeight() }), n(0, !0)) : "top" !== a.start && (n(e(a.start).position().top, null, !0), a.alwaysVisible || c.hide());window.addEventListener ? (this.addEventListener("DOMMouseScroll", v, !1), this.addEventListener("mousewheel", v, !1)) : document.attachEvent("onmousewheel", v);
	        }
	      });return this;
	    } });e.fn.extend({ slimscroll: e.fn.slimScroll });
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	/*!
	 * jQuery blockUI plugin
	 * Version 2.66.0-2013.10.09
	 * Requires jQuery v1.7 or later
	 *
	 * Examples at: http://malsup.com/jquery/block/
	 * Copyright (c) 2007-2013 M. Alsup
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl.html
	 *
	 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
	 */
	
	!(function () {
	  "use strict";
	  function e(e) {
	    function t(t, n) {
	      var s,
	          h,
	          k = t == window,
	          y = n && void 0 !== n.message ? n.message : void 0;if ((n = e.extend({}, e.blockUI.defaults, n || {}), !n.ignoreIfBlocked || !e(t).data("blockUI.isBlocked"))) {
	        if ((n.overlayCSS = e.extend({}, e.blockUI.defaults.overlayCSS, n.overlayCSS || {}), s = e.extend({}, e.blockUI.defaults.css, n.css || {}), n.onOverlayClick && (n.overlayCSS.cursor = "pointer"), h = e.extend({}, e.blockUI.defaults.themedCSS, n.themedCSS || {}), y = void 0 === y ? n.message : y, k && p && o(window, { fadeOut: 0 }), y && "string" != typeof y && (y.parentNode || y.jquery))) {
	          var m = y.jquery ? y[0] : y,
	              v = {};e(t).data("blockUI.history", v), v.el = m, v.parent = m.parentNode, v.display = m.style.display, v.position = m.style.position, v.parent && v.parent.removeChild(m);
	        }e(t).data("blockUI.onUnblock", n.onUnblock);var g,
	            I,
	            w,
	            U,
	            x = n.baseZ;g = r || n.forceIframe ? e('<iframe class="blockUI" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + n.iframeSrc + '"></iframe>') : e('<div class="blockUI" style="display:none"></div>'), I = n.theme ? e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + x++ + ';display:none"></div>') : e('<div class="blockUI blockOverlay" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), n.theme && k ? (U = '<div class="blockUI ' + n.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:fixed">', n.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : n.theme ? (U = '<div class="blockUI ' + n.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:absolute">', n.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : U = k ? '<div class="blockUI ' + n.blockMsgClass + ' blockPage" style="z-index:' + (x + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + n.blockMsgClass + ' blockElement" style="z-index:' + (x + 10) + ';display:none;position:absolute"></div>', w = e(U), y && (n.theme ? (w.css(h), w.addClass("ui-widget-content")) : w.css(s)), n.theme || I.css(n.overlayCSS), I.css("position", k ? "fixed" : "absolute"), (r || n.forceIframe) && g.css("opacity", 0);var C = [g, I, w],
	            S = k ? e("body") : e(t);e.each(C, function () {
	          this.appendTo(S);
	        }), n.theme && n.draggable && e.fn.draggable && w.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" });var O = f && (!e.support.boxModel || e("object,embed", k ? null : t).length > 0);if (u || O) {
	          if ((k && n.allowBodyStretch && e.support.boxModel && e("html,body").css("height", "100%"), (u || !e.support.boxModel) && !k)) var E = d(t, "borderTopWidth"),
	              T = d(t, "borderLeftWidth"),
	              M = E ? "(0 - " + E + ")" : 0,
	              B = T ? "(0 - " + T + ")" : 0;e.each(C, function (e, t) {
	            var o = t[0].style;if ((o.position = "absolute", 2 > e)) k ? o.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + n.quirksmodeOffsetHack + ') + "px"') : o.setExpression("height", 'this.parentNode.offsetHeight + "px"'), k ? o.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : o.setExpression("width", 'this.parentNode.offsetWidth + "px"'), B && o.setExpression("left", B), M && o.setExpression("top", M);else if (n.centerY) k && o.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), o.marginTop = 0;else if (!n.centerY && k) {
	              var i = n.css && n.css.top ? parseInt(n.css.top, 10) : 0,
	                  s = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + i + ') + "px"';o.setExpression("top", s);
	            }
	          });
	        }if ((y && (n.theme ? w.find(".ui-widget-content").append(y) : w.append(y), (y.jquery || y.nodeType) && e(y).show()), (r || n.forceIframe) && n.showOverlay && g.show(), n.fadeIn)) {
	          var j = n.onBlock ? n.onBlock : c,
	              H = n.showOverlay && !y ? j : c,
	              z = y ? j : c;n.showOverlay && I._fadeIn(n.fadeIn, H), y && w._fadeIn(n.fadeIn, z);
	        } else n.showOverlay && I.show(), y && w.show(), n.onBlock && n.onBlock();if ((i(1, t, n), k ? (p = w[0], b = e(n.focusableElements, p), n.focusInput && setTimeout(l, 20)) : a(w[0], n.centerX, n.centerY), n.timeout)) {
	          var W = setTimeout(function () {
	            k ? e.unblockUI(n) : e(t).unblock(n);
	          }, n.timeout);e(t).data("blockUI.timeout", W);
	        }
	      }
	    }function o(t, o) {
	      var s,
	          l = t == window,
	          a = e(t),
	          d = a.data("blockUI.history"),
	          c = a.data("blockUI.timeout");c && (clearTimeout(c), a.removeData("blockUI.timeout")), o = e.extend({}, e.blockUI.defaults, o || {}), i(0, t, o), null === o.onUnblock && (o.onUnblock = a.data("blockUI.onUnblock"), a.removeData("blockUI.onUnblock"));var r;r = l ? e("body").children().filter(".blockUI").add("body > .blockUI") : a.find(">.blockUI"), o.cursorReset && (r.length > 1 && (r[1].style.cursor = o.cursorReset), r.length > 2 && (r[2].style.cursor = o.cursorReset)), l && (p = b = null), o.fadeOut ? (s = r.length, r.stop().fadeOut(o.fadeOut, function () {
	        0 === --s && n(r, d, o, t);
	      })) : n(r, d, o, t);
	    }function n(t, o, n, i) {
	      var s = e(i);if (!s.data("blockUI.isBlocked")) {
	        t.each(function () {
	          this.parentNode && this.parentNode.removeChild(this);
	        }), o && o.el && (o.el.style.display = o.display, o.el.style.position = o.position, o.parent && o.parent.appendChild(o.el), s.removeData("blockUI.history")), s.data("blockUI.static") && s.css("position", "static"), "function" == typeof n.onUnblock && n.onUnblock(i, n);var l = e(document.body),
	            a = l.width(),
	            d = l[0].style.width;l.width(a - 1).width(a), l[0].style.width = d;
	      }
	    }function i(t, o, n) {
	      var i = o == window,
	          l = e(o);if ((t || (!i || p) && (i || l.data("blockUI.isBlocked"))) && (l.data("blockUI.isBlocked", t), i && n.bindEvents && (!t || n.showOverlay))) {
	        var a = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";t ? e(document).bind(a, n, s) : e(document).unbind(a, s);
	      }
	    }function s(t) {
	      if ("keydown" === t.type && t.keyCode && 9 == t.keyCode && p && t.data.constrainTabKey) {
	        var o = b,
	            n = !t.shiftKey && t.target === o[o.length - 1],
	            i = t.shiftKey && t.target === o[0];if (n || i) return setTimeout(function () {
	          l(i);
	        }, 10), !1;
	      }var s = t.data,
	          a = e(t.target);return a.hasClass("blockOverlay") && s.onOverlayClick && s.onOverlayClick(t), a.parents("div." + s.blockMsgClass).length > 0 ? !0 : 0 === a.parents().children().filter("div.blockUI").length;
	    }function l(e) {
	      if (b) {
	        var t = b[e === !0 ? b.length - 1 : 0];t && t.focus();
	      }
	    }function a(e, t, o) {
	      var n = e.parentNode,
	          i = e.style,
	          s = (n.offsetWidth - e.offsetWidth) / 2 - d(n, "borderLeftWidth"),
	          l = (n.offsetHeight - e.offsetHeight) / 2 - d(n, "borderTopWidth");t && (i.left = s > 0 ? s + "px" : "0"), o && (i.top = l > 0 ? l + "px" : "0");
	    }function d(t, o) {
	      return parseInt(e.css(t, o), 10) || 0;
	    }e.fn._fadeIn = e.fn.fadeIn;var c = e.noop || function () {},
	        r = /MSIE/.test(navigator.userAgent),
	        u = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent),
	        f = (document.documentMode || 0, e.isFunction(document.createElement("div").style.setExpression));e.blockUI = function (e) {
	      t(window, e);
	    }, e.unblockUI = function (e) {
	      o(window, e);
	    }, e.growlUI = function (t, o, n, i) {
	      var s = e('<div class="growlUI"></div>');t && s.append("<h1>" + t + "</h1>"), o && s.append("<h2>" + o + "</h2>"), void 0 === n && (n = 3e3);var l = function l(t) {
	        t = t || {}, e.blockUI({ message: s, fadeIn: "undefined" != typeof t.fadeIn ? t.fadeIn : 700, fadeOut: "undefined" != typeof t.fadeOut ? t.fadeOut : 1e3, timeout: "undefined" != typeof t.timeout ? t.timeout : n, centerY: !1, showOverlay: !1, onUnblock: i, css: e.blockUI.defaults.growlCSS });
	      };l();s.css("opacity");s.mouseover(function () {
	        l({ fadeIn: 0, timeout: 3e4 });var t = e(".blockMsg");t.stop(), t.fadeTo(300, 1);
	      }).mouseout(function () {
	        e(".blockMsg").fadeOut(1e3);
	      });
	    }, e.fn.block = function (o) {
	      if (this[0] === window) return e.blockUI(o), this;var n = e.extend({}, e.blockUI.defaults, o || {});return this.each(function () {
	        var t = e(this);n.ignoreIfBlocked && t.data("blockUI.isBlocked") || t.unblock({ fadeOut: 0 });
	      }), this.each(function () {
	        "static" == e.css(this, "position") && (this.style.position = "relative", e(this).data("blockUI.static", !0)), this.style.zoom = 1, t(this, o);
	      });
	    }, e.fn.unblock = function (t) {
	      return this[0] === window ? (e.unblockUI(t), this) : this.each(function () {
	        o(this, t);
	      });
	    }, e.blockUI.version = 2.66, e.blockUI.defaults = { message: "<h1>Please wait...</h1>", title: null, draggable: !0, theme: !1, css: { padding: 0, margin: 0, width: "30%", top: "40%", left: "35%", textAlign: "center", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" }, themedCSS: { width: "30%", top: "40%", left: "35%" }, overlayCSS: { backgroundColor: "#000", opacity: .6, cursor: "wait" }, cursorReset: "default", growlCSS: { width: "350px", top: "10px", left: "", right: "10px", border: "none", padding: "5px", opacity: .6, cursor: "default", color: "#fff", backgroundColor: "#000", "-webkit-border-radius": "10px", "-moz-border-radius": "10px", "border-radius": "10px" }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: !1, baseZ: 1e3, centerX: !0, centerY: !0, allowBodyStretch: !0, bindEvents: !0, constrainTabKey: !0, fadeIn: 200, fadeOut: 400, timeout: 0, showOverlay: !0, focusInput: !0, focusableElements: ":input:enabled:visible", onBlock: null, onUnblock: null, onOverlayClick: null, quirksmodeOffsetHack: 4, blockMsgClass: "blockMsg", ignoreIfBlocked: !1 };var p = null,
	        b = [];
	  }"function" == "function" && __webpack_require__(66) && __webpack_require__(66).jQuery ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e(jQuery);
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 66 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _stringify = __webpack_require__(68);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*!
	 * jQuery Cookie Plugin v1.3.1
	 * https://github.com/carhartl/jquery-cookie
	 * Plugin file name changed to jquery.cokie.min to prevent blocking by ModSecurity module
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function (a) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    a(jQuery);
	  }
	})(function (e) {
	  var a = /\+/g;function d(g) {
	    return g;
	  }function b(g) {
	    return decodeURIComponent(g.replace(a, " "));
	  }function f(g) {
	    if (g.indexOf('"') === 0) {
	      g = g.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
	    }try {
	      return c.json ? JSON.parse(g) : g;
	    } catch (h) {}
	  }var c = e.cookie = function (p, o, u) {
	    if (o !== undefined) {
	      u = e.extend({}, c.defaults, u);if (typeof u.expires === "number") {
	        var q = u.expires,
	            s = u.expires = new Date();s.setDate(s.getDate() + q);
	      }o = c.json ? (0, _stringify2.default)(o) : String(o);return document.cookie = [c.raw ? p : encodeURIComponent(p), "=", c.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("");
	    }var g = c.raw ? d : b;var r = document.cookie.split("; ");var v = p ? undefined : {};for (var n = 0, k = r.length; n < k; n++) {
	      var m = r[n].split("=");var h = g(m.shift());var j = g(m.join("="));if (p && p === h) {
	        v = f(j);break;
	      }if (!p) {
	        v[h] = f(j);
	      }
	    }return v;
	  };c.defaults = {};e.removeCookie = function (h, g) {
	    if (e.cookie(h) !== undefined) {
	      e.cookie(h, "", e.extend({}, g, { expires: -1 }));return true;
	    }return false;
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(28);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	(function (e, t) {
	  "use strict";
	  function n(e) {
	    var t = Array.prototype.slice.call(arguments, 1);return e.prop ? e.prop.apply(e, t) : e.attr.apply(e, t);
	  }function s(e, t, n) {
	    var s, a;for (s in n) {
	      n.hasOwnProperty(s) && (a = s.replace(/ |$/g, t.eventNamespace), e.bind(a, n[s]));
	    }
	  }function a(e, t, n) {
	    s(e, n, { focus: function focus() {
	        t.addClass(n.focusClass);
	      }, blur: function blur() {
	        t.removeClass(n.focusClass), t.removeClass(n.activeClass);
	      }, mouseenter: function mouseenter() {
	        t.addClass(n.hoverClass);
	      }, mouseleave: function mouseleave() {
	        t.removeClass(n.hoverClass), t.removeClass(n.activeClass);
	      }, "mousedown touchbegin": function mousedownTouchbegin() {
	        e.is(":disabled") || t.addClass(n.activeClass);
	      }, "mouseup touchend": function mouseupTouchend() {
	        t.removeClass(n.activeClass);
	      } });
	  }function i(e, t) {
	    e.removeClass(t.hoverClass + " " + t.focusClass + " " + t.activeClass);
	  }function r(e, t, n) {
	    n ? e.addClass(t) : e.removeClass(t);
	  }function l(e, t, n) {
	    var s = "checked",
	        a = t.is(":" + s);t.prop ? t.prop(s, a) : a ? t.attr(s, s) : t.removeAttr(s), r(e, n.checkedClass, a);
	  }function u(e, t, n) {
	    r(e, n.disabledClass, t.is(":disabled"));
	  }function o(e, t, n) {
	    switch (n) {case "after":
	        return e.after(t), e.next();case "before":
	        return e.before(t), e.prev();case "wrap":
	        return e.wrap(t), e.parent();}return null;
	  }function c(t, s, a) {
	    var i, r, l;return a || (a = {}), a = e.extend({ bind: {}, divClass: null, divWrap: "wrap", spanClass: null, spanHtml: null, spanWrap: "wrap" }, a), i = e("<div />"), r = e("<span />"), s.autoHide && t.is(":hidden") && "none" === t.css("display") && i.hide(), a.divClass && i.addClass(a.divClass), s.wrapperClass && i.addClass(s.wrapperClass), a.spanClass && r.addClass(a.spanClass), l = n(t, "id"), s.useID && l && n(i, "id", s.idPrefix + "-" + l), a.spanHtml && r.html(a.spanHtml), i = o(t, i, a.divWrap), r = o(t, r, a.spanWrap), u(i, t, s), { div: i, span: r };
	  }function d(t, n) {
	    var s;return n.wrapperClass ? (s = e("<span />").addClass(n.wrapperClass), s = o(t, s, "wrap")) : null;
	  }function f() {
	    var t, n, s, a;return a = "rgb(120,2,153)", n = e('<div style="width:0;height:0;color:' + a + '">'), e("body").append(n), s = n.get(0), t = window.getComputedStyle ? window.getComputedStyle(s, "").color : (s.currentStyle || s.style || {}).color, n.remove(), t.replace(/ /g, "") !== a;
	  }function p(t) {
	    return t ? e("<span />").text(t).html() : "";
	  }function m() {
	    return navigator.cpuClass && !navigator.product;
	  }function v() {
	    return window.XMLHttpRequest !== void 0 ? !0 : !1;
	  }function h(e) {
	    var t;return e[0].multiple ? !0 : (t = n(e, "size"), !t || 1 >= t ? !1 : !0);
	  }function C() {
	    return !1;
	  }function w(e, t) {
	    var n = "none";s(e, t, { "selectstart dragstart mousedown": C }), e.css({ MozUserSelect: n, msUserSelect: n, webkitUserSelect: n, userSelect: n });
	  }function b(e, t, n) {
	    var s = e.val();"" === s ? s = n.fileDefaultHtml : (s = s.split(/[\/\\]+/), s = s[s.length - 1]), t.text(s);
	  }function y(e, t, n) {
	    var s, a;for (s = [], e.each(function () {
	      var e;for (e in t) {
	        Object.prototype.hasOwnProperty.call(t, e) && (s.push({ el: this, name: e, old: this.style[e] }), this.style[e] = t[e]);
	      }
	    }), n(); s.length;) {
	      a = s.pop(), a.el.style[a.name] = a.old;
	    }
	  }function g(e, t) {
	    var n;n = e.parents(), n.push(e[0]), n = n.not(":visible"), y(n, { visibility: "hidden", display: "block", position: "absolute" }, t);
	  }function k(e, t) {
	    return function () {
	      e.unwrap().unwrap().unbind(t.eventNamespace);
	    };
	  }var H = !0,
	      x = !1,
	      A = [{ match: function match(e) {
	      return e.is("a, button, :submit, :reset, input[type='button']");
	    }, apply: function apply(e, t) {
	      var r, l, o, d, f;return l = t.submitDefaultHtml, e.is(":reset") && (l = t.resetDefaultHtml), d = e.is("a, button") ? function () {
	        return e.html() || l;
	      } : function () {
	        return p(n(e, "value")) || l;
	      }, o = c(e, t, { divClass: t.buttonClass, spanHtml: d() }), r = o.div, a(e, r, t), f = !1, s(r, t, { "click touchend": function clickTouchend() {
	          var t, s, a, i;f || e.is(":disabled") || (f = !0, e[0].dispatchEvent ? (t = document.createEvent("MouseEvents"), t.initEvent("click", !0, !0), s = e[0].dispatchEvent(t), e.is("a") && s && (a = n(e, "target"), i = n(e, "href"), a && "_self" !== a ? window.open(i, a) : document.location.href = i)) : e.click(), f = !1);
	        } }), w(r, t), { remove: function remove() {
	          return r.after(e), r.remove(), e.unbind(t.eventNamespace), e;
	        }, update: function update() {
	          i(r, t), u(r, e, t), e.detach(), o.span.html(d()).append(e);
	        } };
	    } }, { match: function match(e) {
	      return e.is(":checkbox");
	    }, apply: function apply(e, t) {
	      var n, r, o;return n = c(e, t, { divClass: t.checkboxClass }), r = n.div, o = n.span, a(e, r, t), s(e, t, { "click touchend": function clickTouchend() {
	          l(o, e, t);
	        } }), l(o, e, t), { remove: k(e, t), update: function update() {
	          i(r, t), o.removeClass(t.checkedClass), l(o, e, t), u(r, e, t);
	        } };
	    } }, { match: function match(e) {
	      return e.is(":file");
	    }, apply: function apply(t, r) {
	      function l() {
	        b(t, p, r);
	      }var d, f, p, v;return d = c(t, r, { divClass: r.fileClass, spanClass: r.fileButtonClass, spanHtml: r.fileButtonHtml, spanWrap: "after" }), f = d.div, v = d.span, p = e("<span />").html(r.fileDefaultHtml), p.addClass(r.filenameClass), p = o(t, p, "after"), n(t, "size") || n(t, "size", f.width() / 10), a(t, f, r), l(), m() ? s(t, r, { click: function click() {
	          t.trigger("change"), setTimeout(l, 0);
	        } }) : s(t, r, { change: l }), w(p, r), w(v, r), { remove: function remove() {
	          return p.remove(), v.remove(), t.unwrap().unbind(r.eventNamespace);
	        }, update: function update() {
	          i(f, r), b(t, p, r), u(f, t, r);
	        } };
	    } }, { match: function match(e) {
	      if (e.is("input")) {
	        var t = (" " + n(e, "type") + " ").toLowerCase(),
	            s = " color date datetime datetime-local email month number password search tel text time url week ";return s.indexOf(t) >= 0;
	      }return !1;
	    }, apply: function apply(e, t) {
	      var s, i;return s = n(e, "type"), e.addClass(t.inputClass), i = d(e, t), a(e, e, t), t.inputAddTypeAsClass && e.addClass(s), { remove: function remove() {
	          e.removeClass(t.inputClass), t.inputAddTypeAsClass && e.removeClass(s), i && e.unwrap();
	        }, update: C };
	    } }, { match: function match(e) {
	      return e.is(":radio");
	    }, apply: function apply(t, r) {
	      var o, d, f;return o = c(t, r, { divClass: r.radioClass }), d = o.div, f = o.span, a(t, d, r), s(t, r, { "click touchend": function clickTouchend() {
	          e.uniform.update(e(':radio[name="' + n(t, "name") + '"]'));
	        } }), l(f, t, r), { remove: k(t, r), update: function update() {
	          i(d, r), l(f, t, r), u(d, t, r);
	        } };
	    } }, { match: function match(e) {
	      return e.is("select") && !h(e) ? !0 : !1;
	    }, apply: function apply(t, n) {
	      var r, l, o, d;return n.selectAutoWidth && g(t, function () {
	        d = t.width();
	      }), r = c(t, n, { divClass: n.selectClass, spanHtml: (t.find(":selected:first") || t.find("option:first")).html(), spanWrap: "before" }), l = r.div, o = r.span, n.selectAutoWidth ? g(t, function () {
	        y(e([o[0], l[0]]), { display: "block" }, function () {
	          var e;e = o.outerWidth() - o.width(), l.width(d + e), o.width(d);
	        });
	      }) : l.addClass("fixedWidth"), a(t, l, n), s(t, n, { change: function change() {
	          o.html(t.find(":selected").html()), l.removeClass(n.activeClass);
	        }, "click touchend": function clickTouchend() {
	          var e = t.find(":selected").html();o.html() !== e && t.trigger("change");
	        }, keyup: function keyup() {
	          o.html(t.find(":selected").html());
	        } }), w(o, n), { remove: function remove() {
	          return o.remove(), t.unwrap().unbind(n.eventNamespace), t;
	        }, update: function update() {
	          n.selectAutoWidth ? (e.uniform.restore(t), t.uniform(n)) : (i(l, n), o.html(t.find(":selected").html()), u(l, t, n));
	        } };
	    } }, { match: function match(e) {
	      return e.is("select") && h(e) ? !0 : !1;
	    }, apply: function apply(e, t) {
	      var n;return e.addClass(t.selectMultiClass), n = d(e, t), a(e, e, t), { remove: function remove() {
	          e.removeClass(t.selectMultiClass), n && e.unwrap();
	        }, update: C };
	    } }, { match: function match(e) {
	      return e.is("textarea");
	    }, apply: function apply(e, t) {
	      var n;return e.addClass(t.textareaClass), n = d(e, t), a(e, e, t), { remove: function remove() {
	          e.removeClass(t.textareaClass), n && e.unwrap();
	        }, update: C };
	    } }];m() && !v() && (H = !1), e.uniform = { defaults: { activeClass: "active", autoHide: !0, buttonClass: "button", checkboxClass: "checker", checkedClass: "checked", disabledClass: "disabled", eventNamespace: ".uniform", fileButtonClass: "action", fileButtonHtml: "Choose File", fileClass: "uploader", fileDefaultHtml: "No file selected", filenameClass: "filename", focusClass: "focus", hoverClass: "hover", idPrefix: "uniform", inputAddTypeAsClass: !0, inputClass: "uniform-input", radioClass: "radio", resetDefaultHtml: "Reset", resetSelector: !1, selectAutoWidth: !0, selectClass: "selector", selectMultiClass: "uniform-multiselect", submitDefaultHtml: "Submit", textareaClass: "uniform", useID: !0, wrapperClass: null }, elements: [] }, e.fn.uniform = function (t) {
	    var n = this;return t = e.extend({}, e.uniform.defaults, t), x || (x = !0, f() && (H = !1)), H ? (t.resetSelector && e(t.resetSelector).mouseup(function () {
	      window.setTimeout(function () {
	        e.uniform.update(n);
	      }, 10);
	    }), this.each(function () {
	      var n,
	          s,
	          a,
	          i = e(this);if (i.data("uniformed")) return e.uniform.update(i), void 0;for (n = 0; A.length > n; n += 1) {
	        if ((s = A[n], s.match(i, t))) return a = s.apply(i, t), i.data("uniformed", a), e.uniform.elements.push(i.get(0)), void 0;
	      }
	    })) : this;
	  }, e.uniform.restore = e.fn.uniform.restore = function (n) {
	    n === t && (n = e.uniform.elements), e(n).each(function () {
	      var t,
	          n,
	          s = e(this);n = s.data("uniformed"), n && (n.remove(), t = e.inArray(this, e.uniform.elements), t >= 0 && e.uniform.elements.splice(t, 1), s.removeData("uniformed"));
	    });
	  }, e.uniform.update = e.fn.uniform.update = function (n) {
	    n === t && (n = e.uniform.elements), e(n).each(function () {
	      var t,
	          n = e(this);t = n.data("uniformed"), t && t.update(n, t.options);
	    });
	  };
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {"use strict";
	
	/* ========================================================================
	 * bootstrap-switch - v3.3.2
	 * http://www.bootstrap-switch.org
	 * ========================================================================
	 * Copyright 2012-2013 Mattia Larentis
	 *
	 * ========================================================================
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================================
	 */
	
	(function () {
	  var t = [].slice;!(function (e, i) {
	    "use strict";
	    var n;return n = (function () {
	      function t(t, i) {
	        null == i && (i = {}), this.$element = e(t), this.options = e.extend({}, e.fn.bootstrapSwitch.defaults, { state: this.$element.is(":checked"), size: this.$element.data("size"), animate: this.$element.data("animate"), disabled: this.$element.is(":disabled"), readonly: this.$element.is("[readonly]"), indeterminate: this.$element.data("indeterminate"), inverse: this.$element.data("inverse"), radioAllOff: this.$element.data("radio-all-off"), onColor: this.$element.data("on-color"), offColor: this.$element.data("off-color"), onText: this.$element.data("on-text"), offText: this.$element.data("off-text"), labelText: this.$element.data("label-text"), handleWidth: this.$element.data("handle-width"), labelWidth: this.$element.data("label-width"), baseClass: this.$element.data("base-class"), wrapperClass: this.$element.data("wrapper-class") }, i), this.$wrapper = e("<div>", { "class": (function (t) {
	            return function () {
	              var e;return e = ["" + t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)), e.push(t.options.state ? "" + t.options.baseClass + "-on" : "" + t.options.baseClass + "-off"), null != t.options.size && e.push("" + t.options.baseClass + "-" + t.options.size), t.options.disabled && e.push("" + t.options.baseClass + "-disabled"), t.options.readonly && e.push("" + t.options.baseClass + "-readonly"), t.options.indeterminate && e.push("" + t.options.baseClass + "-indeterminate"), t.options.inverse && e.push("" + t.options.baseClass + "-inverse"), t.$element.attr("id") && e.push("" + t.options.baseClass + "-id-" + t.$element.attr("id")), e.join(" ");
	            };
	          })(this)() }), this.$container = e("<div>", { "class": "" + this.options.baseClass + "-container" }), this.$on = e("<span>", { html: this.options.onText, "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor }), this.$off = e("<span>", { html: this.options.offText, "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor }), this.$label = e("<span>", { html: this.options.labelText, "class": "" + this.options.baseClass + "-label" }), this.$element.on("init.bootstrapSwitch", (function (e) {
	          return function () {
	            return e.options.onInit.apply(t, arguments);
	          };
	        })(this)), this.$element.on("switchChange.bootstrapSwitch", (function (e) {
	          return function () {
	            return e.options.onSwitchChange.apply(t, arguments);
	          };
	        })(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop("indeterminate", !0), this._init(), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler(), this._externalLabelHandler(), this.$element.trigger("init.bootstrapSwitch");
	      }return t.prototype._constructor = t, t.prototype.state = function (t, e) {
	        return "undefined" == typeof t ? this.options.state : this.options.disabled || this.options.readonly ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (this.options.indeterminate && this.indeterminate(!1), t = !!t, this.$element.prop("checked", t).trigger("change.bootstrapSwitch", e), this.$element);
	      }, t.prototype.toggleState = function (t) {
	        return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", t);
	      }, t.prototype.size = function (t) {
	        return "undefined" == typeof t ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), t && this.$wrapper.addClass("" + this.options.baseClass + "-" + t), this._width(), this._containerPosition(), this.options.size = t, this.$element);
	      }, t.prototype.animate = function (t) {
	        return "undefined" == typeof t ? this.options.animate : (t = !!t, t === this.options.animate ? this.$element : this.toggleAnimate());
	      }, t.prototype.toggleAnimate = function () {
	        return this.options.animate = !this.options.animate, this.$wrapper.toggleClass("" + this.options.baseClass + "-animate"), this.$element;
	      }, t.prototype.disabled = function (t) {
	        return "undefined" == typeof t ? this.options.disabled : (t = !!t, t === this.options.disabled ? this.$element : this.toggleDisabled());
	      }, t.prototype.toggleDisabled = function () {
	        return this.options.disabled = !this.options.disabled, this.$element.prop("disabled", this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), this.$element;
	      }, t.prototype.readonly = function (t) {
	        return "undefined" == typeof t ? this.options.readonly : (t = !!t, t === this.options.readonly ? this.$element : this.toggleReadonly());
	      }, t.prototype.toggleReadonly = function () {
	        return this.options.readonly = !this.options.readonly, this.$element.prop("readonly", this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), this.$element;
	      }, t.prototype.indeterminate = function (t) {
	        return "undefined" == typeof t ? this.options.indeterminate : (t = !!t, t === this.options.indeterminate ? this.$element : this.toggleIndeterminate());
	      }, t.prototype.toggleIndeterminate = function () {
	        return this.options.indeterminate = !this.options.indeterminate, this.$element.prop("indeterminate", this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), this._containerPosition(), this.$element;
	      }, t.prototype.inverse = function (t) {
	        return "undefined" == typeof t ? this.options.inverse : (t = !!t, t === this.options.inverse ? this.$element : this.toggleInverse());
	      }, t.prototype.toggleInverse = function () {
	        var t, e;return this.$wrapper.toggleClass("" + this.options.baseClass + "-inverse"), e = this.$on.clone(!0), t = this.$off.clone(!0), this.$on.replaceWith(t), this.$off.replaceWith(e), this.$on = t, this.$off = e, this.options.inverse = !this.options.inverse, this.$element;
	      }, t.prototype.onColor = function (t) {
	        var e;return e = this.options.onColor, "undefined" == typeof t ? e : (null != e && this.$on.removeClass("" + this.options.baseClass + "-" + e), this.$on.addClass("" + this.options.baseClass + "-" + t), this.options.onColor = t, this.$element);
	      }, t.prototype.offColor = function (t) {
	        var e;return e = this.options.offColor, "undefined" == typeof t ? e : (null != e && this.$off.removeClass("" + this.options.baseClass + "-" + e), this.$off.addClass("" + this.options.baseClass + "-" + t), this.options.offColor = t, this.$element);
	      }, t.prototype.onText = function (t) {
	        return "undefined" == typeof t ? this.options.onText : (this.$on.html(t), this._width(), this._containerPosition(), this.options.onText = t, this.$element);
	      }, t.prototype.offText = function (t) {
	        return "undefined" == typeof t ? this.options.offText : (this.$off.html(t), this._width(), this._containerPosition(), this.options.offText = t, this.$element);
	      }, t.prototype.labelText = function (t) {
	        return "undefined" == typeof t ? this.options.labelText : (this.$label.html(t), this._width(), this.options.labelText = t, this.$element);
	      }, t.prototype.handleWidth = function (t) {
	        return "undefined" == typeof t ? this.options.handleWidth : (this.options.handleWidth = t, this._width(), this._containerPosition(), this.$element);
	      }, t.prototype.labelWidth = function (t) {
	        return "undefined" == typeof t ? this.options.labelWidth : (this.options.labelWidth = t, this._width(), this._containerPosition(), this.$element);
	      }, t.prototype.baseClass = function () {
	        return this.options.baseClass;
	      }, t.prototype.wrapperClass = function (t) {
	        return "undefined" == typeof t ? this.options.wrapperClass : (t || (t = e.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), this.$wrapper.addClass(this._getClasses(t).join(" ")), this.options.wrapperClass = t, this.$element);
	      }, t.prototype.radioAllOff = function (t) {
	        return "undefined" == typeof t ? this.options.radioAllOff : (t = !!t, t === this.options.radioAllOff ? this.$element : (this.options.radioAllOff = t, this.$element));
	      }, t.prototype.onInit = function (t) {
	        return "undefined" == typeof t ? this.options.onInit : (t || (t = e.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = t, this.$element);
	      }, t.prototype.onSwitchChange = function (t) {
	        return "undefined" == typeof t ? this.options.onSwitchChange : (t || (t = e.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = t, this.$element);
	      }, t.prototype.destroy = function () {
	        var t;return t = this.$element.closest("form"), t.length && t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element;
	      }, t.prototype._width = function () {
	        var t, e;return t = this.$on.add(this.$off), t.add(this.$label).css("width", ""), e = "auto" === this.options.handleWidth ? Math.max(this.$on.width(), this.$off.width()) : this.options.handleWidth, t.width(e), this.$label.width((function (t) {
	          return function (i, n) {
	            return "auto" !== t.options.labelWidth ? t.options.labelWidth : e > n ? e : n;
	          };
	        })(this)), this._handleWidth = this.$on.outerWidth(), this._labelWidth = this.$label.outerWidth(), this.$container.width(2 * this._handleWidth + this._labelWidth), this.$wrapper.width(this._handleWidth + this._labelWidth);
	      }, t.prototype._containerPosition = function (t, e) {
	        return null == t && (t = this.options.state), this.$container.css("margin-left", (function (e) {
	          return function () {
	            var i;return i = [0, "-" + e._handleWidth + "px"], e.options.indeterminate ? "-" + e._handleWidth / 2 + "px" : t ? e.options.inverse ? i[1] : i[0] : e.options.inverse ? i[0] : i[1];
	          };
	        })(this)), e ? setTimeout(function () {
	          return e();
	        }, 50) : void 0;
	      }, t.prototype._init = function () {
	        var t, e;return t = (function (t) {
	          return function () {
	            return t._width(), t._containerPosition(null, function () {
	              return t.options.animate ? t.$wrapper.addClass("" + t.options.baseClass + "-animate") : void 0;
	            });
	          };
	        })(this), this.$wrapper.is(":visible") ? t() : e = i.setInterval((function (n) {
	          return function () {
	            return n.$wrapper.is(":visible") ? (t(), i.clearInterval(e)) : void 0;
	          };
	        })(this), 50);
	      }, t.prototype._elementHandlers = function () {
	        return this.$element.on({ "change.bootstrapSwitch": (function (t) {
	            return function (i, n) {
	              var o;return i.preventDefault(), i.stopImmediatePropagation(), o = t.$element.is(":checked"), t._containerPosition(o), o !== t.options.state ? (t.options.state = o, t.$wrapper.toggleClass("" + t.options.baseClass + "-off").toggleClass("" + t.options.baseClass + "-on"), n ? void 0 : (t.$element.is(":radio") && e("[name='" + t.$element.attr("name") + "']").not(t.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), t.$element.trigger("switchChange.bootstrapSwitch", [o]))) : void 0;
	            };
	          })(this), "focus.bootstrapSwitch": (function (t) {
	            return function (e) {
	              return e.preventDefault(), t.$wrapper.addClass("" + t.options.baseClass + "-focused");
	            };
	          })(this), "blur.bootstrapSwitch": (function (t) {
	            return function (e) {
	              return e.preventDefault(), t.$wrapper.removeClass("" + t.options.baseClass + "-focused");
	            };
	          })(this), "keydown.bootstrapSwitch": (function (t) {
	            return function (e) {
	              if (e.which && !t.options.disabled && !t.options.readonly) switch (e.which) {case 37:
	                  return e.preventDefault(), e.stopImmediatePropagation(), t.state(!1);case 39:
	                  return e.preventDefault(), e.stopImmediatePropagation(), t.state(!0);}
	            };
	          })(this) });
	      }, t.prototype._handleHandlers = function () {
	        return this.$on.on("click.bootstrapSwitch", (function (t) {
	          return function (e) {
	            return e.preventDefault(), e.stopPropagation(), t.state(!1), t.$element.trigger("focus.bootstrapSwitch");
	          };
	        })(this)), this.$off.on("click.bootstrapSwitch", (function (t) {
	          return function (e) {
	            return e.preventDefault(), e.stopPropagation(), t.state(!0), t.$element.trigger("focus.bootstrapSwitch");
	          };
	        })(this));
	      }, t.prototype._labelHandlers = function () {
	        return this.$label.on({ "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (function (t) {
	            return function (e) {
	              return t._dragStart || t.options.disabled || t.options.readonly ? void 0 : (e.preventDefault(), e.stopPropagation(), t._dragStart = (e.pageX || e.originalEvent.touches[0].pageX) - parseInt(t.$container.css("margin-left"), 10), t.options.animate && t.$wrapper.removeClass("" + t.options.baseClass + "-animate"), t.$element.trigger("focus.bootstrapSwitch"));
	            };
	          })(this), "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (function (t) {
	            return function (e) {
	              var i;if (null != t._dragStart && (e.preventDefault(), i = (e.pageX || e.originalEvent.touches[0].pageX) - t._dragStart, !(i < -t._handleWidth || i > 0))) return t._dragEnd = i, t.$container.css("margin-left", "" + t._dragEnd + "px");
	            };
	          })(this), "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (function (t) {
	            return function (e) {
	              var i;if (t._dragStart) return e.preventDefault(), t.options.animate && t.$wrapper.addClass("" + t.options.baseClass + "-animate"), t._dragEnd ? (i = t._dragEnd > -(t._handleWidth / 2), t._dragEnd = !1, t.state(t.options.inverse ? !i : i)) : t.state(!t.options.state), t._dragStart = !1;
	            };
	          })(this), "mouseleave.bootstrapSwitch": (function (t) {
	            return function () {
	              return t.$label.trigger("mouseup.bootstrapSwitch");
	            };
	          })(this) });
	      }, t.prototype._externalLabelHandler = function () {
	        var t;return t = this.$element.closest("label"), t.on("click", (function (e) {
	          return function (i) {
	            return i.preventDefault(), i.stopImmediatePropagation(), i.target === t[0] ? e.toggleState() : void 0;
	          };
	        })(this));
	      }, t.prototype._formHandler = function () {
	        var t;return t = this.$element.closest("form"), t.data("bootstrap-switch") ? void 0 : t.on("reset.bootstrapSwitch", function () {
	          return i.setTimeout(function () {
	            return t.find("input").filter(function () {
	              return e(this).data("bootstrap-switch");
	            }).each(function () {
	              return e(this).bootstrapSwitch("state", this.checked);
	            });
	          }, 1);
	        }).data("bootstrap-switch", !0);
	      }, t.prototype._getClasses = function (t) {
	        var i, n, o, s;if (!e.isArray(t)) return ["" + this.options.baseClass + "-" + t];for (n = [], o = 0, s = t.length; s > o; o++) {
	          i = t[o], n.push("" + this.options.baseClass + "-" + i);
	        }return n;
	      }, t;
	    })(), e.fn.bootstrapSwitch = function () {
	      var i, o, s;return o = arguments[0], i = 2 <= arguments.length ? t.call(arguments, 1) : [], s = this, this.each(function () {
	        var t, a;return t = e(this), a = t.data("bootstrap-switch"), a || t.data("bootstrap-switch", a = new n(this, o)), "string" == typeof o ? s = a[o].apply(a, i) : void 0;
	      }), s;
	    }, e.fn.bootstrapSwitch.Constructor = n, e.fn.bootstrapSwitch.defaults = { state: !0, size: null, animate: !0, disabled: !1, readonly: !1, indeterminate: !1, inverse: !1, radioAllOff: !1, onColor: "primary", offColor: "default", onText: "ON", offText: "OFF", labelText: "&nbsp;", handleWidth: "auto", labelWidth: "auto", baseClass: "bootstrap-switch", wrapperClass: "wrapper", onInit: function onInit() {}, onSwitchChange: function onSwitchChange() {} };
	  })(__webpack_provided_window_dot_jQuery, window);
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, jQuery) {'use strict';
	
	/**
	Core script to handle the entire theme and core functions
	**/
	var Metronic = (function () {
	
	    // IE mode
	    var _isRTL = false;
	    var _isIE = false;
	    var _isIE2 = false;
	    var isIE10 = false;
	
	    var resizeHandlers = [];
	
	    var assetsPath = '../../assets/';
	
	    var globalImgPath = 'global/img/';
	
	    var globalPluginsPath = 'global/plugins/';
	
	    var globalCssPath = 'global/css/';
	
	    // theme layout color set
	
	    var brandColors = {
	        'blue': '#89C4F4',
	        'red': '#F3565D',
	        'green': '#1bbc9b',
	        'purple': '#9b59b6',
	        'grey': '#95a5a6',
	        'yellow': '#F8CB00'
	    };
	
	    // initializes main settings
	    var handleInit = function handleInit() {
	
	        if ($('body').css('direction') === 'rtl') {
	            _isRTL = true;
	        }
	
	        _isIE = !!navigator.userAgent.match(/MSIE 8.0/);
	        _isIE2 = !!navigator.userAgent.match(/MSIE 9.0/);
	        isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
	
	        if (isIE10) {
	            $('html').addClass('ie10'); // detect IE10 version
	        }
	
	        if (isIE10 || _isIE2 || _isIE) {
	            $('html').addClass('ie'); // detect IE10 version
	        }
	    };
	
	    // runs callback functions set by Metronic.addResponsiveHandler().
	    var _runResizeHandlers = function _runResizeHandlers() {
	        // reinitialize other subscribed elements
	        for (var i = 0; i < resizeHandlers.length; i++) {
	            var each = resizeHandlers[i];
	            each.call();
	        }
	    };
	
	    // handle the layout reinitialization on window resize
	    var handleOnResize = function handleOnResize() {
	        var resize;
	        if (_isIE) {
	            var currheight;
	            $(window).resize(function () {
	                if (currheight == document.documentElement.clientHeight) {
	                    return; //quite event since only body resized not window.
	                }
	                if (resize) {
	                    clearTimeout(resize);
	                }
	                resize = setTimeout(function () {
	                    _runResizeHandlers();
	                }, 50); // wait 50ms until window resize finishes.               
	                currheight = document.documentElement.clientHeight; // store last body client height
	            });
	        } else {
	                $(window).resize(function () {
	                    if (resize) {
	                        clearTimeout(resize);
	                    }
	                    resize = setTimeout(function () {
	                        _runResizeHandlers();
	                    }, 50); // wait 50ms until window resize finishes.
	                });
	            }
	    };
	
	    // Handles portlet tools & actions
	    var handlePortletTools = function handlePortletTools() {
	        // handle portlet remove
	        $('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function (e) {
	            e.preventDefault();
	            var portlet = $(this).closest(".portlet");
	
	            if ($('body').hasClass('page-portlet-fullscreen')) {
	                $('body').removeClass('page-portlet-fullscreen');
	            }
	
	            portlet.find('.portlet-title .fullscreen').tooltip('destroy');
	            portlet.find('.portlet-title > .tools > .reload').tooltip('destroy');
	            portlet.find('.portlet-title > .tools > .remove').tooltip('destroy');
	            portlet.find('.portlet-title > .tools > .config').tooltip('destroy');
	            portlet.find('.portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip('destroy');
	
	            portlet.remove();
	        });
	
	        // handle portlet fullscreen
	        $('body').on('click', '.portlet > .portlet-title .fullscreen', function (e) {
	            e.preventDefault();
	            var portlet = $(this).closest(".portlet");
	            if (portlet.hasClass('portlet-fullscreen')) {
	                $(this).removeClass('on');
	                portlet.removeClass('portlet-fullscreen');
	                $('body').removeClass('page-portlet-fullscreen');
	                portlet.children('.portlet-body').css('height', 'auto');
	            } else {
	                var height = Metronic.getViewPort().height - portlet.children('.portlet-title').outerHeight() - parseInt(portlet.children('.portlet-body').css('padding-top')) - parseInt(portlet.children('.portlet-body').css('padding-bottom'));
	
	                $(this).addClass('on');
	                portlet.addClass('portlet-fullscreen');
	                $('body').addClass('page-portlet-fullscreen');
	                portlet.children('.portlet-body').css('height', height);
	            }
	        });
	
	        $('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function (e) {
	            e.preventDefault();
	            var el = $(this).closest(".portlet").children(".portlet-body");
	            var url = $(this).attr("data-url");
	            var _error = $(this).attr("data-error-display");
	            if (url) {
	                Metronic.blockUI({
	                    target: el,
	                    animate: true,
	                    overlayColor: 'none'
	                });
	                $.ajax({
	                    type: "GET",
	                    cache: false,
	                    url: url,
	                    dataType: "html",
	                    success: function success(res) {
	                        Metronic.unblockUI(el);
	                        el.html(res);
	                    },
	                    error: function error(xhr, ajaxOptions, thrownError) {
	                        Metronic.unblockUI(el);
	                        var msg = 'Error on reloading the content. Please check your connection and try again.';
	                        if (_error == "toastr" && toastr) {
	                            toastr.error(msg);
	                        } else if (_error == "notific8" && $.notific8) {
	                            $.notific8('zindex', 11500);
	                            $.notific8(msg, {
	                                theme: 'ruby',
	                                life: 3000
	                            });
	                        } else {
	                            alert(msg);
	                        }
	                    }
	                });
	            } else {
	                // for demo purpose
	                Metronic.blockUI({
	                    target: el,
	                    animate: true,
	                    overlayColor: 'none'
	                });
	                window.setTimeout(function () {
	                    Metronic.unblockUI(el);
	                }, 1000);
	            }
	        });
	
	        // load ajax data on page init
	        $('.portlet .portlet-title a.reload[data-load="true"]').click();
	
	        $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function (e) {
	            e.preventDefault();
	            var el = $(this).closest(".portlet").children(".portlet-body");
	            if ($(this).hasClass("collapse")) {
	                $(this).removeClass("collapse").addClass("expand");
	                el.slideUp(200);
	            } else {
	                $(this).removeClass("expand").addClass("collapse");
	                el.slideDown(200);
	            }
	        });
	    };
	
	    // Handles custom checkboxes & radios using jQuery Uniform plugin
	    var handleUniform = function handleUniform() {
	        if (!$().uniform) {
	            return;
	        }
	        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
	        if (test.size() > 0) {
	            test.each(function () {
	                if ($(this).parents(".checker").size() === 0) {
	                    $(this).show();
	                    $(this).uniform();
	                }
	            });
	        }
	    };
	
	    // Handlesmaterial design checkboxes
	    var handleMaterialDesign = function handleMaterialDesign() {
	
	        // Material design ckeckbox and radio effects
	        $('body').on('click', '.md-checkbox > label, .md-radio > label', function () {
	            var the = $(this);
	            // find the first span which is our circle/bubble
	            var el = $(this).children('span:first-child');
	
	            // add the bubble class (we do this so it doesnt show on page load)
	            el.addClass('inc');
	
	            // clone it
	            var newone = el.clone(true);
	
	            // add the cloned version before our original
	            el.before(newone);
	
	            // remove the original so that it is ready to run on next click
	            $("." + el.attr("class") + ":last", the).remove();
	        });
	
	        if ($('body').hasClass('page-md')) {
	            // Material design click effect
	            // credit where credit's due http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design      
	            var element, circle, d, x, y;
	            $('body').on('click', 'a.btn, button.btn, input.btn, label.btn', function (e) {
	                element = $(this);
	
	                if (element.find(".md-click-circle").length == 0) {
	                    element.prepend("<span class='md-click-circle'></span>");
	                }
	
	                circle = element.find(".md-click-circle");
	                circle.removeClass("md-click-animate");
	
	                if (!circle.height() && !circle.width()) {
	                    d = Math.max(element.outerWidth(), element.outerHeight());
	                    circle.css({ height: d, width: d });
	                }
	
	                x = e.pageX - element.offset().left - circle.width() / 2;
	                y = e.pageY - element.offset().top - circle.height() / 2;
	
	                circle.css({ top: y + 'px', left: x + 'px' }).addClass("md-click-animate");
	
	                setTimeout(function () {
	                    circle.remove();
	                }, 1000);
	            });
	        }
	
	        // Floating labels
	        var handleInput = function handleInput(el) {
	            if (el.val() != "") {
	                el.addClass('edited');
	            } else {
	                el.removeClass('edited');
	            }
	        };
	
	        $('body').on('keydown', '.form-md-floating-label .form-control', function (e) {
	            handleInput($(this));
	        });
	        $('body').on('blur', '.form-md-floating-label .form-control', function (e) {
	            handleInput($(this));
	        });
	
	        $('.form-md-floating-label .form-control').each(function () {
	            if ($(this).val().length > 0) {
	                $(this).addClass('edited');
	            }
	        });
	    };
	
	    // Handles custom checkboxes & radios using jQuery iCheck plugin
	    var handleiCheck = function handleiCheck() {
	        if (!$().iCheck) {
	            return;
	        }
	
	        $('.icheck').each(function () {
	            var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
	            var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';
	
	            if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
	                $(this).iCheck({
	                    checkboxClass: checkboxClass,
	                    radioClass: radioClass,
	                    insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
	                });
	            } else {
	                $(this).iCheck({
	                    checkboxClass: checkboxClass,
	                    radioClass: radioClass
	                });
	            }
	        });
	    };
	
	    // Handles Bootstrap switches
	    var handleBootstrapSwitch = function handleBootstrapSwitch() {
	        if (!$().bootstrapSwitch) {
	            return;
	        }
	        $('.make-switch').bootstrapSwitch();
	    };
	
	    // Handles Bootstrap confirmations
	    var handleBootstrapConfirmation = function handleBootstrapConfirmation() {
	        if (!$().confirmation) {
	            return;
	        }
	        $('[data-toggle=confirmation]').confirmation({ container: 'body', btnOkClass: 'btn btn-sm btn-success', btnCancelClass: 'btn btn-sm btn-danger' });
	    };
	
	    // Handles Bootstrap Accordions.
	    var handleAccordions = function handleAccordions() {
	        $('body').on('shown.bs.collapse', '.accordion.scrollable', function (e) {
	            Metronic.scrollTo($(e.target));
	        });
	    };
	
	    // Handles Bootstrap Tabs.
	    var handleTabs = function handleTabs() {
	        //activate tab if tab id provided in the URL
	        if (location.hash) {
	            var tabid = encodeURI(location.hash.substr(1));
	            $('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function () {
	                var tabid = $(this).attr("id");
	                $('a[href="#' + tabid + '"]').click();
	            });
	            $('a[href="#' + tabid + '"]').click();
	        }
	
	        if ($().tabdrop) {
	            $('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop({
	                text: '<i class="fa fa-ellipsis-v"></i>&nbsp<i class="fa fa-angle-down"></i>'
	            });
	        }
	    };
	
	    // Handles Bootstrap Modals.
	    var handleModals = function handleModals() {
	        // fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class.
	        $('body').on('hide.bs.modal', function () {
	            if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') === false) {
	                $('html').addClass('modal-open');
	            } else if ($('.modal:visible').size() <= 1) {
	                $('html').removeClass('modal-open');
	            }
	        });
	
	        // fix page scrollbars issue
	        $('body').on('show.bs.modal', '.modal', function () {
	            if ($(this).hasClass("modal-scroll")) {
	                $('body').addClass("modal-open-noscroll");
	            }
	        });
	
	        // fix page scrollbars issue
	        $('body').on('hide.bs.modal', '.modal', function () {
	            $('body').removeClass("modal-open-noscroll");
	        });
	
	        // remove ajax content and remove cache on modal closed
	        $('body').on('hidden.bs.modal', '.modal:not(.modal-cached)', function () {
	            $(this).removeData('bs.modal');
	        });
	    };
	
	    // Handles Bootstrap Tooltips.
	    var handleTooltips = function handleTooltips() {
	        // global tooltips
	        $('.tooltips').tooltip();
	
	        // portlet tooltips
	        $('.portlet > .portlet-title .fullscreen').tooltip({
	            container: 'body',
	            title: 'Fullscreen'
	        });
	        $('.portlet > .portlet-title > .tools > .reload').tooltip({
	            container: 'body',
	            title: 'Reload'
	        });
	        $('.portlet > .portlet-title > .tools > .remove').tooltip({
	            container: 'body',
	            title: 'Remove'
	        });
	        $('.portlet > .portlet-title > .tools > .config').tooltip({
	            container: 'body',
	            title: 'Settings'
	        });
	        $('.portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip({
	            container: 'body',
	            title: 'Collapse/Expand'
	        });
	    };
	
	    // Handles Bootstrap Dropdowns
	    var handleDropdowns = function handleDropdowns() {
	        /*
	          Hold dropdown on click  
	        */
	        $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
	            e.stopPropagation();
	        });
	    };
	
	    var handleAlerts = function handleAlerts() {
	        $('body').on('click', '[data-close="alert"]', function (e) {
	            $(this).parent('.alert').hide();
	            $(this).closest('.note').hide();
	            e.preventDefault();
	        });
	
	        $('body').on('click', '[data-close="note"]', function (e) {
	            $(this).closest('.note').hide();
	            e.preventDefault();
	        });
	
	        $('body').on('click', '[data-remove="note"]', function (e) {
	            $(this).closest('.note').remove();
	            e.preventDefault();
	        });
	    };
	
	    // Handle Hower Dropdowns
	    var handleDropdownHover = function handleDropdownHover() {
	        $('[data-hover="dropdown"]').not('.hover-initialized').each(function () {
	            $(this).dropdownHover();
	            $(this).addClass('hover-initialized');
	        });
	    };
	
	    // Handle textarea autosize
	    var handleTextareaAutosize = function handleTextareaAutosize() {
	        if (typeof autosize == "function") {
	            autosize(document.querySelector('textarea.autosizeme'));
	        }
	    };
	
	    // Handles Bootstrap Popovers
	
	    // last popep popover
	    var lastPopedPopover;
	
	    var handlePopovers = function handlePopovers() {
	        $('.popovers').popover();
	
	        // close last displayed popover
	
	        $(document).on('click.bs.popover.data-api', function (e) {
	            if (lastPopedPopover) {
	                lastPopedPopover.popover('hide');
	            }
	        });
	    };
	
	    // Handles scrollable contents using jQuery SlimScroll plugin.
	    var handleScrollers = function handleScrollers() {
	        Metronic.initSlimScroll('.scroller');
	    };
	
	    // Handles Image Preview using jQuery Fancybox plugin
	    var handleFancybox = function handleFancybox() {
	        if (!jQuery.fancybox) {
	            return;
	        }
	
	        if ($(".fancybox-button").size() > 0) {
	            $(".fancybox-button").fancybox({
	                groupAttr: 'data-rel',
	                prevEffect: 'none',
	                nextEffect: 'none',
	                closeBtn: true,
	                helpers: {
	                    title: {
	                        type: 'inside'
	                    }
	                }
	            });
	        }
	    };
	
	    // Fix input placeholder issue for IE8 and IE9
	    var handleFixInputPlaceholderForIE = function handleFixInputPlaceholderForIE() {
	        //fix html5 placeholder attribute for ie7 & ie8
	        if (_isIE || _isIE2) {
	            // ie8 & ie9
	            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
	            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
	                var input = $(this);
	
	                if (input.val() === '' && input.attr("placeholder") !== '') {
	                    input.addClass("placeholder").val(input.attr('placeholder'));
	                }
	
	                input.focus(function () {
	                    if (input.val() == input.attr('placeholder')) {
	                        input.val('');
	                    }
	                });
	
	                input.blur(function () {
	                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
	                        input.val(input.attr('placeholder'));
	                    }
	                });
	            });
	        }
	    };
	
	    // Handle Select2 Dropdowns
	    var handleSelect2 = function handleSelect2() {
	        if ($().select2) {
	            $('.select2me').select2({
	                placeholder: "Select",
	                allowClear: true
	            });
	        }
	    };
	
	    // handle group element heights
	    var handleHeight = function handleHeight() {
	        $('[data-auto-height]').each(function () {
	            var parent = $(this);
	            var items = $('[data-height]', parent);
	            var height = 0;
	            var mode = parent.attr('data-mode');
	            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);
	
	            items.each(function () {
	                if ($(this).attr('data-height') == "height") {
	                    $(this).css('height', '');
	                } else {
	                    $(this).css('min-height', '');
	                }
	
	                var height_ = mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true);
	                if (height_ > height) {
	                    height = height_;
	                }
	            });
	
	            height = height + offset;
	
	            items.each(function () {
	                if ($(this).attr('data-height') == "height") {
	                    $(this).css('height', height);
	                } else {
	                    $(this).css('min-height', height);
	                }
	            });
	        });
	    };
	
	    //* END:CORE HANDLERS *//
	
	    return {
	
	        //main function to initiate the theme
	        init: function init() {
	            //IMPORTANT!!!: Do not modify the core handlers call order.
	
	            //Core handlers
	            handleInit(); // initialize core variables
	            handleOnResize(); // set and handle responsive   
	
	            //UI Component handlers    
	            handleMaterialDesign(); // handle material design      
	            handleUniform(); // hanfle custom radio & checkboxes
	            handleiCheck(); // handles custom icheck radio and checkboxes
	            handleBootstrapSwitch(); // handle bootstrap switch plugin
	            handleScrollers(); // handles slim scrolling contents
	            handleFancybox(); // handle fancy box
	            handleSelect2(); // handle custom Select2 dropdowns
	            handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
	            handleAlerts(); //handle closabled alerts
	            handleDropdowns(); // handle dropdowns
	            handleTabs(); // handle tabs
	            handleTooltips(); // handle bootstrap tooltips
	            handlePopovers(); // handles bootstrap popovers
	            handleAccordions(); //handles accordions
	            handleModals(); // handle modals
	            handleBootstrapConfirmation(); // handle bootstrap confirmations
	            handleTextareaAutosize(); // handle autosize textareas
	
	            //Handle group element heights
	            handleHeight();
	            this.addResizeHandler(handleHeight); // handle auto calculating height on window resize
	
	            // Hacks
	            handleFixInputPlaceholderForIE(); //IE8 & IE9 input placeholder issue fix
	        },
	
	        //main function to initiate core javascript after ajax complete
	        initAjax: function initAjax() {
	            handleUniform(); // handles custom radio & checkboxes    
	            handleiCheck(); // handles custom icheck radio and checkboxes
	            handleBootstrapSwitch(); // handle bootstrap switch plugin
	            handleDropdownHover(); // handles dropdown hover      
	            handleScrollers(); // handles slim scrolling contents
	            handleSelect2(); // handle custom Select2 dropdowns
	            handleFancybox(); // handle fancy box
	            handleDropdowns(); // handle dropdowns
	            handleTooltips(); // handle bootstrap tooltips
	            handlePopovers(); // handles bootstrap popovers
	            handleAccordions(); //handles accordions
	            handleBootstrapConfirmation(); // handle bootstrap confirmations
	        },
	
	        //init main components
	        initComponents: function initComponents() {
	            this.initAjax();
	        },
	
	        //public function to remember last opened popover that needs to be closed on click
	        setLastPopedPopover: function setLastPopedPopover(el) {
	            lastPopedPopover = el;
	        },
	
	        //public function to add callback a function which will be called on window resize
	        addResizeHandler: function addResizeHandler(func) {
	            resizeHandlers.push(func);
	        },
	
	        //public functon to call _runresizeHandlers
	        runResizeHandlers: function runResizeHandlers() {
	            _runResizeHandlers();
	        },
	
	        // wrMetronicer function to scroll(focus) to an element
	        scrollTo: function scrollTo(el, offeset) {
	            var pos = el && el.size() > 0 ? el.offset().top : 0;
	
	            if (el) {
	                if ($('body').hasClass('page-header-fixed')) {
	                    pos = pos - $('.page-header').height();
	                } else if ($('body').hasClass('page-header-top-fixed')) {
	                    pos = pos - $('.page-header-top').height();
	                } else if ($('body').hasClass('page-header-menu-fixed')) {
	                    pos = pos - $('.page-header-menu').height();
	                }
	                pos = pos + (offeset ? offeset : -1 * el.height());
	            }
	
	            $('html,body').animate({
	                scrollTop: pos
	            }, 'slow');
	        },
	
	        initSlimScroll: function initSlimScroll(el) {
	            $(el).each(function () {
	                if ($(this).attr("data-initialized")) {
	                    return; // exit
	                }
	
	                var height;
	
	                if ($(this).attr("data-height")) {
	                    height = $(this).attr("data-height");
	                } else {
	                    height = $(this).css('height');
	                }
	
	                $(this).slimScroll({
	                    allowPageScroll: true, // allow page scroll when the element scroll is ended
	                    size: '7px',
	                    color: $(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb',
	                    wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv',
	                    railColor: $(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea',
	                    position: _isRTL ? 'left' : 'right',
	                    height: height,
	                    alwaysVisible: $(this).attr("data-always-visible") == "1" ? true : false,
	                    railVisible: $(this).attr("data-rail-visible") == "1" ? true : false,
	                    disableFadeOut: true
	                });
	
	                $(this).attr("data-initialized", "1");
	            });
	        },
	
	        destroySlimScroll: function destroySlimScroll(el) {
	            $(el).each(function () {
	                if ($(this).attr("data-initialized") === "1") {
	                    // destroy existing instance before updating the height
	                    $(this).removeAttr("data-initialized");
	                    $(this).removeAttr("style");
	
	                    var attrList = {};
	
	                    // store the custom attribures so later we will reassign.
	                    if ($(this).attr("data-handle-color")) {
	                        attrList["data-handle-color"] = $(this).attr("data-handle-color");
	                    }
	                    if ($(this).attr("data-wrapper-class")) {
	                        attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
	                    }
	                    if ($(this).attr("data-rail-color")) {
	                        attrList["data-rail-color"] = $(this).attr("data-rail-color");
	                    }
	                    if ($(this).attr("data-always-visible")) {
	                        attrList["data-always-visible"] = $(this).attr("data-always-visible");
	                    }
	                    if ($(this).attr("data-rail-visible")) {
	                        attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
	                    }
	
	                    $(this).slimScroll({
	                        wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv',
	                        destroy: true
	                    });
	
	                    var the = $(this);
	
	                    // reassign custom attributes
	                    $.each(attrList, function (key, value) {
	                        the.attr(key, value);
	                    });
	                }
	            });
	        },
	
	        // function to scroll to the top
	        scrollTop: function scrollTop() {
	            Metronic.scrollTo();
	        },
	
	        // wrMetronicer function to  block element(indicate loading)
	        blockUI: function blockUI(options) {
	            options = $.extend(true, {}, options);
	            var html = '';
	            if (options.animate) {
	                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
	            } else if (options.iconOnly) {
	                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>';
	            } else if (options.textOnly) {
	                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp&nbsp' + (options.message ? options.message : 'LOADING...') + '</span></div>';
	            } else {
	                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp&nbsp' + (options.message ? options.message : 'LOADING...') + '</span></div>';
	            }
	
	            if (options.target) {
	                // element blocking
	                var el = $(options.target);
	                if (el.height() <= $(window).height()) {
	                    options.cenrerY = true;
	                }
	                el.block({
	                    message: html,
	                    baseZ: options.zIndex ? options.zIndex : 1000,
	                    centerY: options.cenrerY !== undefined ? options.cenrerY : false,
	                    css: {
	                        top: '10%',
	                        border: '0',
	                        padding: '0',
	                        backgroundColor: 'none'
	                    },
	                    overlayCSS: {
	                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
	                        opacity: options.boxed ? 0.05 : 0.1,
	                        cursor: 'wait'
	                    }
	                });
	            } else {
	                // page blocking
	                $.blockUI({
	                    message: html,
	                    baseZ: options.zIndex ? options.zIndex : 1000,
	                    css: {
	                        border: '0',
	                        padding: '0',
	                        backgroundColor: 'none'
	                    },
	                    overlayCSS: {
	                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
	                        opacity: options.boxed ? 0.05 : 0.1,
	                        cursor: 'wait'
	                    }
	                });
	            }
	        },
	
	        // wrMetronicer function to  un-block element(finish loading)
	        unblockUI: function unblockUI(target) {
	            if (target) {
	                $(target).unblock({
	                    onUnblock: function onUnblock() {
	                        $(target).css('position', '');
	                        $(target).css('zoom', '');
	                    }
	                });
	            } else {
	                $.unblockUI();
	            }
	        },
	
	        startPageLoading: function startPageLoading(options) {
	            if (options && options.animate) {
	                $('.page-spinner-bar').remove();
	                $('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
	            } else {
	                $('.page-loading').remove();
	                $('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp&nbsp<span>' + (options && options.message ? options.message : 'Loading...') + '</span></div>');
	            }
	        },
	
	        stopPageLoading: function stopPageLoading() {
	            $('.page-loading, .page-spinner-bar').remove();
	        },
	
	        alert: function alert(options) {
	
	            options = $.extend(true, {
	                container: "", // alerts parent container(by default placed after the page breadcrumbs)
	                place: "append", // "append" or "prepend" in container
	                type: 'success', // alert's type
	                message: "", // alert's message
	                close: true, // make alert closable
	                reset: true, // close all previouse alerts first
	                focus: true, // auto scroll to the alert after shown
	                closeInSeconds: 0, // auto close after defined seconds
	                icon: "" // put icon before the message
	            }, options);
	
	            var id = Metronic.getUniqueID("Metronic_alert");
	
	            var html = '<div id="' + id + '" class="Metronic-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';
	
	            if (options.reset) {
	                $('.Metronic-alerts').remove();
	            }
	
	            if (!options.container) {
	                if ($('body').hasClass("page-container-bg-solid")) {
	                    $('.page-title').after(html);
	                } else {
	                    if ($('.page-bar').size() > 0) {
	                        $('.page-bar').after(html);
	                    } else {
	                        $('.page-breadcrumb').after(html);
	                    }
	                }
	            } else {
	                if (options.place == "append") {
	                    $(options.container).append(html);
	                } else {
	                    $(options.container).prepend(html);
	                }
	            }
	
	            if (options.focus) {
	                Metronic.scrollTo($('#' + id));
	            }
	
	            if (options.closeInSeconds > 0) {
	                setTimeout(function () {
	                    $('#' + id).remove();
	                }, options.closeInSeconds * 1000);
	            }
	
	            return id;
	        },
	
	        // initializes uniform elements
	        initUniform: function initUniform(els) {
	            if (els) {
	                $(els).each(function () {
	                    if ($(this).parents(".checker").size() === 0) {
	                        $(this).show();
	                        $(this).uniform();
	                    }
	                });
	            } else {
	                handleUniform();
	            }
	        },
	
	        //wrMetronicer function to update/sync jquery uniform checkbox & radios
	        updateUniform: function updateUniform(els) {
	            $.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
	        },
	
	        //public function to initialize the fancybox plugin
	        initFancybox: function initFancybox() {
	            handleFancybox();
	        },
	
	        //public helper function to get actual input value(used in IE9 and IE8 due to placeholder attribute not supported)
	        getActualVal: function getActualVal(el) {
	            el = $(el);
	            if (el.val() === el.attr("placeholder")) {
	                return "";
	            }
	            return el.val();
	        },
	
	        //public function to get a paremeter by name from URL
	        getURLParameter: function getURLParameter(paramName) {
	            var searchString = window.location.search.substring(1),
	                i,
	                val,
	                params = searchString.split("&");
	
	            for (i = 0; i < params.length; i++) {
	                val = params[i].split("=");
	                if (val[0] == paramName) {
	                    return unescape(val[1]);
	                }
	            }
	            return null;
	        },
	
	        // check for device touch support
	        isTouchDevice: function isTouchDevice() {
	            try {
	                document.createEvent("TouchEvent");
	                return true;
	            } catch (e) {
	                return false;
	            }
	        },
	
	        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
	        getViewPort: function getViewPort() {
	            var e = window,
	                a = 'inner';
	            if (!('innerWidth' in window)) {
	                a = 'client';
	                e = document.documentElement || document.body;
	            }
	
	            return {
	                width: e[a + 'Width'],
	                height: e[a + 'Height']
	            };
	        },
	
	        getUniqueID: function getUniqueID(prefix) {
	            return 'prefix_' + Math.floor(Math.random() * new Date().getTime());
	        },
	
	        // check IE8 mode
	        isIE8: function isIE8() {
	            return _isIE;
	        },
	
	        // check IE9 mode
	        isIE9: function isIE9() {
	            return _isIE2;
	        },
	
	        //check RTL mode
	        isRTL: function isRTL() {
	            return _isRTL;
	        },
	
	        // check IE8 mode
	        isAngularJsApp: function isAngularJsApp() {
	            return typeof angular == 'undefined' ? false : true;
	        },
	
	        getAssetsPath: function getAssetsPath() {
	            return assetsPath;
	        },
	
	        setAssetsPath: function setAssetsPath(path) {
	            assetsPath = path;
	        },
	
	        setGlobalImgPath: function setGlobalImgPath(path) {
	            globalImgPath = path;
	        },
	
	        getGlobalImgPath: function getGlobalImgPath() {
	            return assetsPath + globalImgPath;
	        },
	
	        setGlobalPluginsPath: function setGlobalPluginsPath(path) {
	            globalPluginsPath = path;
	        },
	
	        getGlobalPluginsPath: function getGlobalPluginsPath() {
	            return assetsPath + globalPluginsPath;
	        },
	
	        getGlobalCssPath: function getGlobalCssPath() {
	            return assetsPath + globalCssPath;
	        },
	
	        // get layout color code by color name
	        getBrandColor: function getBrandColor(name) {
	            if (brandColors[name]) {
	                return brandColors[name];
	            } else {
	                return '';
	            }
	        },
	
	        getResponsiveBreakpoint: function getResponsiveBreakpoint(size) {
	            // bootstrap responsive breakpoints
	            var sizes = {
	                'xs': 480, // extra small
	                'sm': 768, // small
	                'md': 992, // medium
	                'lg': 1200 // large
	            };
	
	            return sizes[size] ? sizes[size] : 0;
	        }
	    };
	})(Metronic);
	module.exports = Metronic;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(7)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	Core script to handle the entire theme and core functions
	**/
	var Metronic = __webpack_require__(72);
	var Layout = (function () {
	
	    var layoutImgPath = 'admin/layout2/img/';
	
	    var layoutCssPath = 'admin/layout2/css/';
	
	    var resBreakpointMd = Metronic.getResponsiveBreakpoint('md');
	
	    //* BEGIN:CORE HANDLERS *//
	    // this function handles responsive layout on screen size resize or mobile device rotate.
	
	    // Set proper height for sidebar and content. The content and sidebar height must be synced always.
	    var handleSidebarAndContentHeight = function handleSidebarAndContentHeight() {
	        var content = $('.page-content');
	        var sidebar = $('.page-sidebar');
	        var body = $('body');
	        var height;
	
	        if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
	            var available_height = Metronic.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
	            if (content.height() < available_height) {
	                content.attr('style', 'min-height:' + available_height + 'px');
	            }
	        } else {
	            if (body.hasClass('page-sidebar-fixed')) {
	                height = _calculateFixedSidebarViewportHeight();
	                if (body.hasClass('page-footer-fixed') === false) {
	                    height = height - $('.page-footer').outerHeight();
	                }
	            } else {
	                var headerHeight = $('.page-header').outerHeight();
	                var footerHeight = $('.page-footer').outerHeight();
	
	                if (Metronic.getViewPort().width < resBreakpointMd) {
	                    height = Metronic.getViewPort().height - headerHeight - footerHeight;
	                } else {
	                    height = sidebar.outerHeight() + 10;
	                }
	
	                if (height + headerHeight + footerHeight <= Metronic.getViewPort().height) {
	                    height = Metronic.getViewPort().height - headerHeight - footerHeight;
	                }
	            }
	            content.attr('style', 'min-height:' + height + 'px');
	        }
	    };
	
	    // Handle sidebar menu links
	    var handleSidebarMenuActiveLink = function handleSidebarMenuActiveLink(mode, el) {
	        var url = location.hash.toLowerCase();
	
	        var menu = $('.page-sidebar-menu');
	
	        if (mode === 'click' || mode === 'set') {
	            el = $(el);
	        } else if (mode === 'match') {
	            menu.find("li > a").each(function () {
	                var path = $(this).attr("href").toLowerCase();
	                // url match condition        
	                if (path.length > 1 && url.substr(1, path.length - 1) == path.substr(1)) {
	                    el = $(this);
	                    return;
	                }
	            });
	        }
	
	        if (!el || el.size() == 0) {
	            return;
	        }
	
	        if (el.attr('href').toLowerCase() === 'javascript:;' || el.attr('href').toLowerCase() === '#') {
	            return;
	        }
	
	        var slideSpeed = parseInt(menu.data("slide-speed"));
	        var keepExpand = menu.data("keep-expanded");
	
	        // disable active states
	        menu.find('li.active').removeClass('active');
	        menu.find('li > a > .selected').remove();
	
	        if (menu.hasClass('page-sidebar-menu-hover-submenu') === false) {
	            menu.find('li.open').each(function () {
	                if ($(this).children('.sub-menu').size() === 0) {
	                    $(this).removeClass('open');
	                    $(this).find('> a > .arrow.open').removeClass('open');
	                }
	            });
	        } else {
	            menu.find('li.open').removeClass('open');
	        }
	
	        el.parents('li').each(function () {
	            $(this).addClass('active');
	            $(this).find('> a > span.arrow').addClass('open');
	
	            if ($(this).parent('ul.page-sidebar-menu').size() === 1) {
	                $(this).find('> a').append('<span class="selected"></span>');
	            }
	
	            if ($(this).children('ul.sub-menu').size() === 1) {
	                $(this).addClass('open');
	            }
	        });
	
	        if (mode === 'click') {
	            if (Metronic.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass("in")) {
	                // close the menu on mobile view while laoding a page
	                $('.page-header .responsive-toggler').click();
	            }
	        }
	    };
	
	    // Handle sidebar menu
	    var handleSidebarMenu = function handleSidebarMenu() {
	        $('.page-sidebar').on('click', 'li > a', function (e) {
	
	            if (Metronic.getViewPort().width >= resBreakpointMd && $(this).parents('.page-sidebar-menu-hover-submenu').size() === 1) {
	                // exit of hover sidebar menu
	                return;
	            }
	
	            if ($(this).next().hasClass('sub-menu') === false) {
	                if (Metronic.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass("in")) {
	                    // close the menu on mobile view while laoding a page
	                    $('.page-header .responsive-toggler').click();
	                }
	                return;
	            }
	
	            if ($(this).next().hasClass('sub-menu always-open')) {
	                return;
	            }
	
	            var parent = $(this).parent().parent();
	            var the = $(this);
	            var menu = $('.page-sidebar-menu');
	            var sub = $(this).next();
	
	            var autoScroll = menu.data("auto-scroll");
	            var slideSpeed = parseInt(menu.data("slide-speed"));
	            var keepExpand = menu.data("keep-expanded");
	
	            if (keepExpand !== true) {
	                parent.children('li.open').children('a').children('.arrow').removeClass('open');
	                parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(slideSpeed);
	                parent.children('li.open').removeClass('open');
	            }
	
	            var slideOffeset = -200;
	
	            if (sub.is(":visible")) {
	                $('.arrow', $(this)).removeClass("open");
	                $(this).parent().removeClass("open");
	                sub.slideUp(slideSpeed, function () {
	                    if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
	                        if ($('body').hasClass('page-sidebar-fixed')) {
	                            menu.slimScroll({
	                                'scrollTo': the.position().top
	                            });
	                        } else {
	                            Metronic.scrollTo(the, slideOffeset);
	                        }
	                    }
	                    handleSidebarAndContentHeight();
	                });
	            } else {
	                $('.arrow', $(this)).addClass("open");
	                $(this).parent().addClass("open");
	                sub.slideDown(slideSpeed, function () {
	                    if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
	                        if ($('body').hasClass('page-sidebar-fixed')) {
	                            menu.slimScroll({
	                                'scrollTo': the.position().top
	                            });
	                        } else {
	                            Metronic.scrollTo(the, slideOffeset);
	                        }
	                    }
	                    handleSidebarAndContentHeight();
	                });
	            }
	
	            e.preventDefault();
	        });
	
	        // handle ajax links within sidebar menu
	        $('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
	            e.preventDefault();
	            Metronic.scrollTop();
	
	            var url = $(this).attr("href");
	            var menuContainer = $('.page-sidebar ul');
	            var pageContent = $('.page-content');
	            var pageContentBody = $('.page-content .page-content-body');
	
	            menuContainer.children('li.active').removeClass('active');
	            menuContainer.children('arrow.open').removeClass('open');
	
	            $(this).parents('li').each(function () {
	                $(this).addClass('active');
	                $(this).children('a > span.arrow').addClass('open');
	            });
	            $(this).parents('li').addClass('active');
	
	            if (Metronic.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass("in")) {
	                // close the menu on mobile view while laoding a page
	                $('.page-header .responsive-toggler').click();
	            }
	
	            Metronic.startPageLoading();
	
	            var the = $(this);
	
	            $.ajax({
	                type: "GET",
	                cache: false,
	                url: url,
	                dataType: "html",
	                success: function success(res) {
	
	                    if (the.parents('li.open').size() === 0) {
	                        $('.page-sidebar-menu > li.open > a').click();
	                    }
	
	                    Metronic.stopPageLoading();
	                    pageContentBody.html(res);
	                    Layout.fixContentHeight(); // fix content height
	                    Metronic.initAjax(); // initialize core stuff
	                },
	                error: function error(xhr, ajaxOptions, thrownError) {
	                    Metronic.stopPageLoading();
	                    pageContentBody.html('<h4>Could not load the requested content.</h4>');
	                }
	            });
	        });
	
	        // handle ajax link within main content
	        $('.page-content').on('click', '.ajaxify', function (e) {
	            e.preventDefault();
	            Metronic.scrollTop();
	
	            var url = $(this).attr("href");
	            var pageContent = $('.page-content');
	            var pageContentBody = $('.page-content .page-content-body');
	
	            Metronic.startPageLoading();
	
	            if (Metronic.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass("in")) {
	                // close the menu on mobile view while laoding a page
	                $('.page-header .responsive-toggler').click();
	            }
	
	            $.ajax({
	                type: "GET",
	                cache: false,
	                url: url,
	                dataType: "html",
	                success: function success(res) {
	                    Metronic.stopPageLoading();
	                    pageContentBody.html(res);
	                    Layout.fixContentHeight(); // fix content height
	                    Metronic.initAjax(); // initialize core stuff
	                },
	                error: function error(xhr, ajaxOptions, thrownError) {
	                    pageContentBody.html('<h4>Could not load the requested content.</h4>');
	                    Metronic.stopPageLoading();
	                }
	            });
	        });
	
	        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
	        $(document).on('click', '.page-header-fixed-mobile .page-header .responsive-toggler', function () {
	            Metronic.scrollTop();
	        });
	    };
	
	    // Helper function to calculate sidebar height for fixed sidebar layout.
	    var _calculateFixedSidebarViewportHeight = function _calculateFixedSidebarViewportHeight() {
	        var sidebarHeight = Metronic.getViewPort().height - $('.page-header').outerHeight();
	        if ($('body').hasClass("page-footer-fixed")) {
	            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
	        }
	
	        return sidebarHeight;
	    };
	
	    // Handles fixed sidebar
	    var handleFixedSidebar = function handleFixedSidebar() {
	        var menu = $('.page-sidebar-menu');
	
	        Metronic.destroySlimScroll(menu);
	
	        if ($('.page-sidebar-fixed').size() === 0) {
	            handleSidebarAndContentHeight();
	            return;
	        }
	
	        if (Metronic.getViewPort().width >= resBreakpointMd) {
	            menu.attr("data-height", _calculateFixedSidebarViewportHeight());
	            Metronic.initSlimScroll(menu);
	            handleSidebarAndContentHeight();
	        }
	    };
	
	    // Handles sidebar toggler to close/hide the sidebar.
	    var handleFixedSidebarHoverEffect = function handleFixedSidebarHoverEffect() {
	        var body = $('body');
	        if (body.hasClass('page-sidebar-fixed')) {
	            $('.page-sidebar').on('mouseenter', function () {
	                if (body.hasClass('page-sidebar-closed')) {
	                    $(this).find('.page-sidebar-menu').removeClass('page-sidebar-menu-closed');
	                }
	            }).on('mouseleave', function () {
	                if (body.hasClass('page-sidebar-closed')) {
	                    $(this).find('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
	                }
	            });
	        }
	    };
	
	    // Hanles sidebar toggler
	    var handleSidebarToggler = function handleSidebarToggler() {
	        var body = $('body');
	        if ($.cookie && $.cookie('sidebar_closed') === '1' && Metronic.getViewPort().width >= resBreakpointMd) {
	            $('body').addClass('page-sidebar-closed');
	            $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
	        }
	
	        // handle sidebar show/hide
	        $('body').on('click', '.sidebar-toggler', function (e) {
	            var sidebar = $('.page-sidebar');
	            var sidebarMenu = $('.page-sidebar-menu');
	            $(".sidebar-search", sidebar).removeClass("open");
	
	            if (body.hasClass("page-sidebar-closed")) {
	                body.removeClass("page-sidebar-closed");
	                sidebarMenu.removeClass("page-sidebar-menu-closed");
	                if ($.cookie) {
	                    $.cookie('sidebar_closed', '0');
	                }
	            } else {
	                body.addClass("page-sidebar-closed");
	                sidebarMenu.addClass("page-sidebar-menu-closed");
	                if (body.hasClass("page-sidebar-fixed")) {
	                    sidebarMenu.trigger("mouseleave");
	                }
	                if ($.cookie) {
	                    $.cookie('sidebar_closed', '1');
	                }
	            }
	
	            $(window).trigger('resize');
	        });
	
	        handleFixedSidebarHoverEffect();
	
	        // handle the search bar close
	        $('.page-sidebar').on('click', '.sidebar-search .remove', function (e) {
	            e.preventDefault();
	            $('.sidebar-search').removeClass("open");
	        });
	
	        // handle the search query submit on enter press
	        $('.page-sidebar .sidebar-search').on('keypress', 'input.form-control', function (e) {
	            if (e.which == 13) {
	                $('.sidebar-search').submit();
	                return false; //<---- Add this line
	            }
	        });
	
	        // handle the search submit(for sidebar search and responsive mode of the header search)
	        $('.sidebar-search .submit').on('click', function (e) {
	            e.preventDefault();
	            if ($('body').hasClass("page-sidebar-closed")) {
	                if ($('.sidebar-search').hasClass('open') === false) {
	                    if ($('.page-sidebar-fixed').size() === 1) {
	                        $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
	                    }
	                    $('.sidebar-search').addClass("open");
	                } else {
	                    $('.sidebar-search').submit();
	                }
	            } else {
	                $('.sidebar-search').submit();
	            }
	        });
	
	        // handle close on body click
	        if ($('.sidebar-search').size() !== 0) {
	            $('.sidebar-search .input-group').on('click', function (e) {
	                e.stopPropagation();
	            });
	
	            $('body').on('click', function () {
	                if ($('.sidebar-search').hasClass('open')) {
	                    $('.sidebar-search').removeClass("open");
	                }
	            });
	        }
	    };
	
	    // Handles the horizontal menu
	    var handleHeader = function handleHeader() {
	        // handle search box expand/collapse       
	        $('.page-header').on('click', '.search-form', function (e) {
	            $(this).addClass("open");
	            $(this).find('.form-control').focus();
	
	            $('.page-header .search-form .form-control').on('blur', function (e) {
	                $(this).closest('.search-form').removeClass("open");
	                $(this).unbind("blur");
	            });
	        });
	
	        // handle hor menu search form on enter press
	        $('.page-header').on('keypress', '.hor-menu .search-form .form-control', function (e) {
	            if (e.which == 13) {
	                $(this).closest('.search-form').submit();
	                return false;
	            }
	        });
	
	        // handle header search button click
	        $('.page-header').on('mousedown', '.search-form.open .submit', function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            $(this).closest('.search-form').submit();
	        });
	    };
	
	    // Handles Bootstrap Tabs.
	    var handleTabs = function handleTabs() {
	        // fix content height on tab click
	        $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
	            handleSidebarAndContentHeight();
	        });
	    };
	
	    // Handles the go to top button at the footer
	    var handleGoTop = function handleGoTop() {
	        var offset = 300;
	        var duration = 500;
	
	        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
	            // ios supported
	            $(window).bind("touchend touchcancel touchleave", function (e) {
	                if ($(this).scrollTop() > offset) {
	                    $('.scroll-to-top').fadeIn(duration);
	                } else {
	                    $('.scroll-to-top').fadeOut(duration);
	                }
	            });
	        } else {
	            // general
	            $(window).scroll(function () {
	                if ($(this).scrollTop() > offset) {
	                    $('.scroll-to-top').fadeIn(duration);
	                } else {
	                    $('.scroll-to-top').fadeOut(duration);
	                }
	            });
	        }
	
	        $('.scroll-to-top').click(function (e) {
	            e.preventDefault();
	            $('html, body').animate({
	                scrollTop: 0
	            }, duration);
	            return false;
	        });
	    };
	
	    // Hanlde 100% height elements(block, portlet, etc)
	    var handle100HeightContent = function handle100HeightContent() {
	
	        var target = $('.full-height-content');
	        var height;
	
	        if (!target.hasClass('portlet')) {
	            return;
	        }
	
	        height = Metronic.getViewPort().height - $('.page-header').outerHeight(true) - $('.page-footer').outerHeight(true) - $('.page-title').outerHeight(true) - $('.page-bar').outerHeight(true);
	
	        if ($('body').hasClass('page-header-fixed')) {
	            height = height - $('.page-header').outerHeight(true);
	        }
	
	        var portletBody = target.find('.portlet-body');
	
	        if (Metronic.getViewPort().width < resBreakpointMd) {
	            Metronic.destroySlimScroll(portletBody.find('.full-height-content-body')); // destroy slimscroll
	            return;
	        }
	
	        if (target.find('.portlet-title')) {
	            height = height - target.find('.portlet-title').outerHeight(true);
	        }
	
	        height = height - parseInt(portletBody.css("padding-top"));
	        height = height - parseInt(portletBody.css("padding-bottom"));
	
	        if (target.hasClass("full-height-content-scrollable")) {
	            portletBody.find('.full-height-content-body').css('height', height);
	            Metronic.initSlimScroll(portletBody.find('.full-height-content-body'));
	        } else {
	            portletBody.css('min-height', height);
	        }
	    };
	
	    //* END:CORE HANDLERS *//
	
	    return {
	
	        // Main init methods to initialize the layout
	        // IMPORTANT!!!: Do not modify the core handlers call order.
	
	        initHeader: function initHeader() {
	            handleHeader(); // handles horizontal menu  
	        },
	
	        setSidebarMenuActiveLink: function setSidebarMenuActiveLink(mode, el) {
	            handleSidebarMenuActiveLink(mode, el);
	        },
	
	        initSidebar: function initSidebar() {
	            //layout handlers
	            handleFixedSidebar(); // handles fixed sidebar menu
	            handleSidebarMenu(); // handles main menu
	            handleSidebarToggler(); // handles sidebar hide/show
	
	            if (Metronic.isAngularJsApp()) {
	                handleSidebarMenuActiveLink('match'); // init sidebar active links
	            }
	
	            Metronic.addResizeHandler(handleFixedSidebar); // reinitialize fixed sidebar on window resize
	        },
	
	        initContent: function initContent() {
	            handle100HeightContent(); // handles 100% height elements(block, portlet, etc)
	            handleTabs(); // handle bootstrah tabs
	
	            Metronic.addResizeHandler(handleSidebarAndContentHeight); // recalculate sidebar & content height on window resize
	            Metronic.addResizeHandler(handle100HeightContent); // reinitialize content height on window resize
	        },
	
	        initFooter: function initFooter() {
	            handleGoTop(); //handles scroll to top functionality in the footer
	        },
	
	        init: function init() {
	            this.initHeader();
	            this.initSidebar();
	            this.initContent();
	            this.initFooter();
	        },
	
	        //public function to fix the sidebar and content height accordingly
	        fixContentHeight: function fixContentHeight() {
	            handleSidebarAndContentHeight();
	        },
	
	        initFixedSidebarHoverEffect: function initFixedSidebarHoverEffect() {
	            handleFixedSidebarHoverEffect();
	        },
	
	        initFixedSidebar: function initFixedSidebar() {
	            handleFixedSidebar();
	        },
	
	        getLayoutImgPath: function getLayoutImgPath() {
	            return Metronic.getAssetsPath() + layoutImgPath;
	        },
	
	        getLayoutCssPath: function getLayoutCssPath() {
	            return Metronic.getAssetsPath() + layoutCssPath;
	        }
	    };
	})(Layout);
	module.exports = Layout;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(75)
	__vue_template__ = __webpack_require__(76)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	// <div>
	//     <!-- BEGIN HEADER -->
	//     <div class="page-header navbar navbar-fixed-top">
	//         <!-- BEGIN HEADER INNER -->
	//         <div class="page-header-inner">
	//             <!-- BEGIN LOGO -->
	//             <div class="page-logo">
	//                 <a v-link="{ path: '/' }">
	//                     <img src="../lib/assets/admin/layout2/img/logo-default.png" alt="logo" class="logo-default"/>
	//                 </a>
	
	//                 <div class="menu-toggler sidebar-toggler">
	//                     <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
	//                 </div>
	//             </div>
	//             <!-- END LOGO -->
	//             <!-- BEGIN RESPONSIVE MENU TOGGLER -->
	//             <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
	//                data-target=".navbar-collapse">
	//             </a>
	//             <!-- END RESPONSIVE MENU TOGGLER -->
	//             <!-- BEGIN PAGE ACTIONS -->
	//             <!-- DOC: Remove "hide" class to enable the page header actions -->
	//             <div class="page-actions">
	//                 <div class="btn-group hide">
	//                     <button type="button" class="btn btn-circle red-pink dropdown-toggle" data-toggle="dropdown">
	//                         <i class="fa fa-bar-chart"></i>&nbsp;<span class="hidden-sm hidden-xs">New&nbsp;</span>&nbsp;<i
	//                             class="fa fa-angle-down"></i>
	//                     </button>
	//                     <ul class="dropdown-menu" role="menu">
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-user"></i> New User </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-present"></i> New Event <span class="badge badge-success">4</span>
	//                             </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-basket"></i> New order </a>
	//                         </li>
	//                         <li class="divider">
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-flag"></i> Pending Orders <span class="badge badge-danger">4</span>
	//                             </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-users"></i> Pending Users <span class="badge badge-warning">12</span>
	//                             </a>
	//                         </li>
	//                     </ul>
	//                 </div>
	//                 <div class="btn-group hide">
	//                     <button type="button" class="btn btn-circle green-haze dropdown-toggle" data-toggle="dropdown">
	//                         <i class="fa fa-plus"></i>&nbsp;<span class="hidden-sm hidden-xs">New&nbsp;</span>&nbsp;<i
	//                             class="fa fa-angle-down"></i>
	//                     </button>
	//                     <ul class="dropdown-menu" role="menu">
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-docs"></i> New Post </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-tag"></i> New Comment </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-share"></i> Share </a>
	//                         </li>
	//                         <li class="divider">
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-flag"></i> Comments <span class="badge badge-success">4</span>
	//                             </a>
	//                         </li>
	//                         <li>
	//                             <a href="javascript:;">
	//                                 <i class="fa fa-users"></i> Feedbacks <span class="badge badge-danger">2</span>
	//                             </a>
	//                         </li>
	//                     </ul>
	//                 </div>
	//             </div>
	//             <!-- END PAGE ACTIONS -->
	//             <!-- BEGIN PAGE TOP -->
	//             <div class="page-top">
	//                 <!-- BEGIN HEADER SEARCH BOX -->
	//                 <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
	//                 <h2 style="width: 300px; float: left;color: #044C96;margin-left: 10px;">
	//                     <strong><i class="fa fa-users"></i>管理系统</strong>
	//                 </h2>
	//                 <!-- END HEADER SEARCH BOX -->
	//                 <!-- BEGIN TOP NAVIGATION MENU -->
	//                 <div class="top-menu">
	//                     <ul class="nav navbar-nav pull-right">
	//                         <!-- BEGIN NOTIFICATION DROPDOWN -->
	//                         <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
	//                         <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
	//                             <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	//                                data-close-others="true">
	//                                 <i class="fa fa-bell-o"></i>
	// 						<span class="badge badge-default">
	// 						7 </span>
	//                             </a>
	//                             <ul class="dropdown-menu">
	//                                 <li class="external">
	//                                     <h3><span class="bold">12 pending</span> notifications</h3>
	//                                     <a href="extra_profile.html">view all</a>
	//                                 </li>
	//                                 <li>
	//                                     <ul class="dropdown-menu-list scroller" style="height: 250px;"
	//                                         data-handle-color="#637283">
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">just now</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-success">
	// 										<i class="fa fa-plus"></i>
	// 										</span>
	// 										New user registered. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">3 mins</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-danger">
	// 										<i class="fa fa-bolt"></i>
	// 										</span>
	// 										Server #12 overloaded. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">10 mins</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-warning">
	// 										<i class="fa fa-bell-o"></i>
	// 										</span>
	// 										Server #2 not responding. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">14 hrs</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-info">
	// 										<i class="fa fa-bullhorn"></i>
	// 										</span>
	// 										Application error. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">2 days</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-danger">
	// 										<i class="fa fa-bolt"></i>
	// 										</span>
	// 										Database overloaded 68%. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">3 days</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-danger">
	// 										<i class="fa fa-bolt"></i>
	// 										</span>
	// 										A user IP blocked. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">4 days</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-warning">
	// 										<i class="fa fa-bell-o"></i>
	// 										</span>
	// 										Storage Server #4 not responding dfdfdfd. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">5 days</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-info">
	// 										<i class="fa fa-bullhorn"></i>
	// 										</span>
	// 										System Error. </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	//                                                 <span class="time">9 days</span>
	// 										<span class="details">
	// 										<span class="label label-sm label-icon label-danger">
	// 										<i class="fa fa-bolt"></i>
	// 										</span>
	// 										Storage server failed. </span>
	//                                             </a>
	//                                         </li>
	//                                     </ul>
	//                                 </li>
	//                             </ul>
	//                         </li>
	//                         <!-- END NOTIFICATION DROPDOWN -->
	//                         <!-- BEGIN INBOX DROPDOWN -->
	//                         <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
	//                         <li class="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
	//                             <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	//                                data-close-others="true">
	//                                 <i class="fa fa-envelope-o"></i>
	// 						<span class="badge badge-default">
	// 						4 </span>
	//                             </a>
	//                             <ul class="dropdown-menu">
	//                                 <li class="external">
	//                                     <h3>You have <span class="bold">7 New</span> Messages</h3>
	//                                     <a href="page_inbox.html">view all</a>
	//                                 </li>
	//                                 <li>
	//                                     <ul class="dropdown-menu-list scroller" style="height: 275px;"
	//                                         data-handle-color="#637283">
	//                                         <li>
	//                                             <a href="inbox.html?a=view">
	// 										<span class="photo">
	// 										<img src="../lib/assets/admin/layout2/img/avatar2.jpg" class="img-circle" alt="">
	// 										</span>
	// 										<span class="subject">
	// 										<span class="from">
	// 										Lisa Wong </span>
	// 										<span class="time">Just Now </span>
	// 										</span>
	// 										<span class="message">
	// 										Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="inbox.html?a=view">
	// 										<span class="photo">
	// 										<img src="../lib/assets/admin/layout2/img/avatar3.jpg" class="img-circle" alt="">
	// 										</span>
	// 										<span class="subject">
	// 										<span class="from">
	// 										Richard Doe </span>
	// 										<span class="time">16 mins </span>
	// 										</span>
	// 										<span class="message">
	// 										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="inbox.html?a=view">
	// 										<span class="photo">
	// 										<img src="../lib/assets/admin/layout2/img/avatar1.jpg" class="img-circle" alt="">
	// 										</span>
	// 										<span class="subject">
	// 										<span class="from">
	// 										Bob Nilson </span>
	// 										<span class="time">2 hrs </span>
	// 										</span>
	// 										<span class="message">
	// 										Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="inbox.html?a=view">
	// 										<span class="photo">
	// 										<img src="../lib/assets/admin/layout2/img/avatar2.jpg" class="img-circle" alt="">
	// 										</span>
	// 										<span class="subject">
	// 										<span class="from">
	// 										Lisa Wong </span>
	// 										<span class="time">40 mins </span>
	// 										</span>
	// 										<span class="message">
	// 										Vivamus sed auctor 40% nibh congue nibh... </span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="inbox.html?a=view">
	// 										<span class="photo">
	// 										<img src="../lib/assets/admin/layout2/img/avatar3.jpg" class="img-circle" alt="">
	// 										</span>
	// 										<span class="subject">
	// 										<span class="from">
	// 										Richard Doe </span>
	// 										<span class="time">46 mins </span>
	// 										</span>
	// 										<span class="message">
	// 										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
	//                                             </a>
	//                                         </li>
	//                                     </ul>
	//                                 </li>
	//                             </ul>
	//                         </li>
	//                         <!-- END INBOX DROPDOWN -->
	//                         <!-- BEGIN TODO DROPDOWN -->
	//                         <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
	//                         <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
	//                             <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	//                                data-close-others="true">
	//                                 <i class="fa fa-calendar"></i>
	// 						<span class="badge badge-default">
	// 						3 </span>
	//                             </a>
	//                             <ul class="dropdown-menu extended tasks">
	//                                 <li class="external">
	//                                     <h3>You have <span class="bold">12 pending</span> tasks</h3>
	//                                     <a href="page_todo.html">view all</a>
	//                                 </li>
	//                                 <li>
	//                                     <ul class="dropdown-menu-list scroller" style="height: 275px;"
	//                                         data-handle-color="#637283">
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">New release v1.2 </span>
	// 										<span class="percent">30%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 40%;" class="progress-bar progress-bar-success"
	//                                               aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">40% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">Application deployment</span>
	// 										<span class="percent">65%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 65%;" class="progress-bar progress-bar-danger"
	//                                               aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">65% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">Mobile app release</span>
	// 										<span class="percent">98%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 98%;" class="progress-bar progress-bar-success"
	//                                               aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">98% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">Database migration</span>
	// 										<span class="percent">10%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 10%;" class="progress-bar progress-bar-warning"
	//                                               aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">10% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">Web server upgrade</span>
	// 										<span class="percent">58%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 58%;" class="progress-bar progress-bar-info"
	//                                               aria-valuenow="58" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">58% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">Mobile development</span>
	// 										<span class="percent">85%</span>
	// 										</span>
	// 										<span class="progress">
	// 										<span style="width: 85%;" class="progress-bar progress-bar-success"
	//                                               aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">85% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                         <li>
	//                                             <a href="javascript:;">
	// 										<span class="task">
	// 										<span class="desc">New UI release</span>
	// 										<span class="percent">38%</span>
	// 										</span>
	// 										<span class="progress progress-striped">
	// 										<span style="width: 38%;" class="progress-bar progress-bar-important"
	//                                               aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"><span
	//                                                 class="sr-only">38% Complete</span></span>
	// 										</span>
	//                                             </a>
	//                                         </li>
	//                                     </ul>
	//                                 </li>
	//                             </ul>
	//                         </li>
	//                         <!-- END TODO DROPDOWN -->
	//                         <!-- BEGIN USER LOGIN DROPDOWN -->
	//                         <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
	//                         <li class="dropdown dropdown-user">
	//                             <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	//                                data-close-others="true">
	//                                 <img alt="" class="img-circle" src="../lib/assets/admin/layout2/img/avatar3_small.jpg"/>
	// 						<span class="username username-hide-on-mobile">
	// 						Nick </span>
	//                                 <i class="fa fa-angle-down"></i>
	//                             </a>
	//                             <ul class="dropdown-menu dropdown-menu-default">
	//                                 <li>
	//                                     <a href="extra_profile.html">
	//                                         <i class="fa fa-user"></i> My Profile </a>
	//                                 </li>
	//                                 <li>
	//                                     <a href="page_calendar.html">
	//                                         <i class="fa fa-calendar"></i> My Calendar </a>
	//                                 </li>
	//                                 <li>
	//                                     <a href="inbox.html">
	//                                         <i class="fa fa-envelope-o"></i> My Inbox <span class="badge badge-danger">
	// 								3 </span>
	//                                     </a>
	//                                 </li>
	//                                 <li>
	//                                     <a href="page_todo.html">
	//                                         <i class="fa fa-tasks"></i> My Tasks <span class="badge badge-success">
	// 								7 </span>
	//                                     </a>
	//                                 </li>
	//                                 <li class="divider">
	//                                 </li>
	//                                 <li>
	//                                     <a href="extra_lock.html">
	//                                         <i class="fa fa-lock"></i> Lock Screen </a>
	//                                 </li>
	//                                 <li>
	//                                     <a href="login.html">
	//                                         <i class="fa fa-sign-out"></i> Log Out </a>
	//                                 </li>
	//                             </ul>
	//                         </li>
	//                         <!-- END USER LOGIN DROPDOWN -->
	//                     </ul>
	//                 </div>
	//                 <!-- END TOP NAVIGATION MENU -->
	//             </div>
	//             <!-- END PAGE TOP -->
	//         </div>
	//         <!-- END HEADER INNER -->
	//     </div>
	//     <!-- END HEADER -->
	//     <div class="clearfix">
	//     </div>
	//     <!--<div class="container">-->
	//     <!-- BEGIN CONTAINER -->
	//     <div class="page-container">
	//         <!-- BEGIN SIDEBAR -->
	//         <div class="page-sidebar-wrapper">
	//             <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
	//             <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
	//             <div class="page-sidebar navbar-collapse collapse">
	//                 <!-- BEGIN SIDEBAR MENU -->
	//                 <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
	//                 <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
	//                 <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
	//                 <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
	//                 <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
	//                 <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
	//                 <ul class="page-sidebar-menu  page-sidebar-menu-compact " data-auto-scroll="true"
	//                     data-slide-speed="200">
	//                     <li  v-for="(i,item) in array" :class="item.class">
	//                         <a v-link="{ path: $route.path }">
	//                             <i :class="item.iclass"></i>
	//                             <span class="title">{{item.name}}</span>
	//                             <span v-show="item.class==='active'" class="selected"></span>
	//                             <span class="arrow "></span>
	//                         </a>
	//                         <ul class="sub-menu">
	//                             <li v-for="(j,ic) in item.children" v-on:click="act(i,j)" :class="ic.class">
	//                                 <a  v-link="{path: ic.href}">
	//                                     <i :class="ic.iclass"></i>
	//                                     <span class="badge badge-danger">{{ic.span}}</span>{{ic.name}}</a>
	//                             </li>
	//                         </ul>
	//                     </li>
	
	//                 </ul>
	//                 <!-- END SIDEBAR MENU -->
	//             </div>
	//         </div>
	//         <!-- END SIDEBAR -->
	//         <!-- BEGIN CONTENT -->
	//         <div class="page-content-wrapper">
	//             <div class="page-content" id = "tableTest">
	//                 <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
	//                 <div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	//                      aria-hidden="true">
	//                     <div class="modal-dialog">
	//                         <div class="modal-content">
	//                             <div class="modal-header">
	//                                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	//                                 <h4 class="modal-title">Modal title</h4>
	//                             </div>
	//                             <div class="modal-body">
	//                                 Widget settings form goes here
	//                             </div>
	//                             <div class="modal-footer">
	//                                 <button type="button" class="btn blue">Save changes</button>
	//                                 <button type="button" class="btn default" data-dismiss="modal">Close</button>
	//                             </div>
	//                         </div>
	//                         <!-- /.modal-content -->
	//                     </div>
	//                     <!-- /.modal-dialog -->
	//                 </div>
	//                 <!-- /.modal -->
	//                 <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
	//                 <!-- BEGIN PAGE HEADER-->
	//                 <div class="page-bar">
	//                     <ul class="page-breadcrumb">
	//                         <li>
	//                             <i class="fa fa-home"></i>
	//                             <a v-link="{ path: '/' }">系统首页</a>
	//                             <i class="fa fa-angle-right"></i>
	//                         </li>
	//                         <li>
	//                             <a v-link="{ path: $route.path }">{{breadcrumb.pnod}}</a>
	//                             <i class="fa fa-angle-right"></i>
	//                         </li>
	//                         <li>
	//                             <a v-link="{ path:  $route.path }">{{breadcrumb.snod}}</a>
	//                         </li>
	//                     </ul>
	//                     <div class="page-toolbar">
	//                         <div class="btn-group pull-right">
	//                             <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle"
	//                                     data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
	//                                 Actions <i class="fa fa-angle-down"></i>
	//                             </button>
	//                             <ul class="dropdown-menu pull-right" role="menu">
	//                                 <li>
	//                                     <a v-link="{ path: $route.path }">Action</a>
	//                                 </li>
	//                                 <li>
	//                                     <a v-link="{ path: $route.path }">Another action</a>
	//                                 </li>
	//                                 <li>
	//                                     <a v-link="{ path: $route.path }">Something else here</a>
	//                                 </li>
	//                                 <li class="divider">
	//                                 </li>
	//                                 <li>
	//                                     <a v-link="{ path: $route.path }">Separated link</a>
	//                                 </li>
	//                             </ul>
	//                         </div>
	//                     </div>
	//                 </div>
	//                 <!-- END PAGE HEADER-->
	//                 <!--  body -->
	//                 <div class="row">
	//                     <!-- vue路由主页面-->
	//                     <router-view></router-view>
	//                     <!-- vue路由主页面-->
	//                 </div>
	//                 <!-- / body -->
	//             </div>
	//         </div>
	//         <!-- END CONTENT -->
	//     </div>
	//     <!-- END CONTAINER -->
	//     <!-- BEGIN FOOTER -->
	//     <div class="page-footer">
	//         <div class="page-footer-inner">
	//             2015 &copy; Administration by qio. <a
	//                 v-link="{ path: $route.path }" target="_blank">Good luck!</a>
	//         </div>
	//         <div class="scroll-to-top">
	//             <i class="fa fa-arrow-up"></i>
	//         </div>
	//     </div>
	//     <!-- END FOOTER -->
	// </div>
	// </template>
	// <script >
	var Metronic = __webpack_require__(72);
	var Layout = __webpack_require__(73);
	var pdata = [{
	    name: '系统管理',
	    id: '1',
	    iclass: 'fa fa-cogs',
	    class: "",
	    children: [{
	        name: '用户管理',
	        id: '2',
	        span: 0,
	        iclass: "fa fa-users",
	        class: "",
	        href: "/bar"
	    }, {
	        name: '客户管理',
	        id: '3',
	        iclass: "fa fa-building-o",
	        class: "",
	        href: "/foo"
	    }]
	}, {
	    name: '业务管理',
	    id: '4',
	    iclass: 'fa fa-bar-chart',
	    class: "",
	    children: [{
	        name: '信息管理',
	        id: '5',
	        iclass: "fa fa-commenting-o",
	        class: "",
	        href: "/tree"
	    }, {
	        name: '任务管理',
	        id: '6',
	        span: 2,
	        iclass: "fa fa-tasks",
	        class: "",
	        href: "/index3"
	    }]
	}];
	exports.default = {
	    data: function data() {
	        return {
	            array: pdata,
	            toggle: false,
	            breadcrumb: {
	                pnod: pdata[0].name,
	                snod: pdata[0].children[0].name
	            }
	        };
	    },
	    ready: function ready() {
	        jQuery(document).ready(function () {
	            Metronic.init(); // init metronic core components
	            Layout.init(); // init current layout
	        });
	    },
	    methods: {
	        act: function act(i, j) {
	            for (var t = 0; t < this.array.length; t++) {
	                this.array[t].class = "";
	                for (var s = 0; s < this.array[t].children.length; s++) {
	                    this.array[t].children[s].class = "";
	                }
	            }
	            this.breadcrumb.pnod = this.array[i].name;
	            this.breadcrumb.snod = this.array[i].children[j].name;
	            this.array[i].class = "active";
	            this.array[i].children[j].class = "active";
	        }
	    }
	};
	// </script>

	// <!--<style>-->
	//     <!--.ms-controller{-->
	//         <!--visibility: hidden;-->
	//     <!--}-->
	// <!--</style>-->
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\n    <!-- BEGIN HEADER -->\n    <div class=\"page-header navbar navbar-fixed-top\">\n        <!-- BEGIN HEADER INNER -->\n        <div class=\"page-header-inner\">\n            <!-- BEGIN LOGO -->\n            <div class=\"page-logo\">\n                <a v-link=\"{ path: '/' }\">\n                    <img src=\"" + __webpack_require__(77) + "\" alt=\"logo\" class=\"logo-default\"/>\n                </a>\n\n                <div class=\"menu-toggler sidebar-toggler\">\n                    <!-- DOC: Remove the above \"hide\" to enable the sidebar toggler button on header -->\n                </div>\n            </div>\n            <!-- END LOGO -->\n            <!-- BEGIN RESPONSIVE MENU TOGGLER -->\n            <a href=\"javascript:;\" class=\"menu-toggler responsive-toggler\" data-toggle=\"collapse\"\n               data-target=\".navbar-collapse\">\n            </a>\n            <!-- END RESPONSIVE MENU TOGGLER -->\n            <!-- BEGIN PAGE ACTIONS -->\n            <!-- DOC: Remove \"hide\" class to enable the page header actions -->\n            <div class=\"page-actions\">\n                <div class=\"btn-group hide\">\n                    <button type=\"button\" class=\"btn btn-circle red-pink dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-bar-chart\"></i>&nbsp;<span class=\"hidden-sm hidden-xs\">New&nbsp;</span>&nbsp;<i\n                            class=\"fa fa-angle-down\"></i>\n                    </button>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-user\"></i> New User </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-present\"></i> New Event <span class=\"badge badge-success\">4</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-basket\"></i> New order </a>\n                        </li>\n                        <li class=\"divider\">\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-flag\"></i> Pending Orders <span class=\"badge badge-danger\">4</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-users\"></i> Pending Users <span class=\"badge badge-warning\">12</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"btn-group hide\">\n                    <button type=\"button\" class=\"btn btn-circle green-haze dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-plus\"></i>&nbsp;<span class=\"hidden-sm hidden-xs\">New&nbsp;</span>&nbsp;<i\n                            class=\"fa fa-angle-down\"></i>\n                    </button>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-docs\"></i> New Post </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-tag\"></i> New Comment </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-share\"></i> Share </a>\n                        </li>\n                        <li class=\"divider\">\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-flag\"></i> Comments <span class=\"badge badge-success\">4</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:;\">\n                                <i class=\"fa fa-users\"></i> Feedbacks <span class=\"badge badge-danger\">2</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <!-- END PAGE ACTIONS -->\n            <!-- BEGIN PAGE TOP -->\n            <div class=\"page-top\">\n                <!-- BEGIN HEADER SEARCH BOX -->\n                <!-- DOC: Apply \"search-form-expanded\" right after the \"search-form\" class to have half expanded search box -->\n                <h2 style=\"width: 300px; float: left;color: #044C96;margin-left: 10px;\">\n                    <strong><i class=\"fa fa-users\"></i>管理系统</strong>\n                </h2>\n                <!-- END HEADER SEARCH BOX -->\n                <!-- BEGIN TOP NAVIGATION MENU -->\n                <div class=\"top-menu\">\n                    <ul class=\"nav navbar-nav pull-right\">\n                        <!-- BEGIN NOTIFICATION DROPDOWN -->\n                        <!-- DOC: Apply \"dropdown-dark\" class after below \"dropdown-extended\" to change the dropdown styte -->\n                        <li class=\"dropdown dropdown-extended dropdown-notification\" id=\"header_notification_bar\">\n                            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\"\n                               data-close-others=\"true\">\n                                <i class=\"fa fa-bell-o\"></i>\n\t\t\t\t\t\t<span class=\"badge badge-default\">\n\t\t\t\t\t\t7 </span>\n                            </a>\n                            <ul class=\"dropdown-menu\">\n                                <li class=\"external\">\n                                    <h3><span class=\"bold\">12 pending</span> notifications</h3>\n                                    <a href=\"extra_profile.html\">view all</a>\n                                </li>\n                                <li>\n                                    <ul class=\"dropdown-menu-list scroller\" style=\"height: 250px;\"\n                                        data-handle-color=\"#637283\">\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">just now</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-success\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-plus\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tNew user registered. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">3 mins</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-danger\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bolt\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tServer #12 overloaded. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">10 mins</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-warning\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bell-o\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tServer #2 not responding. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">14 hrs</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-info\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bullhorn\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tApplication error. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">2 days</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-danger\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bolt\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tDatabase overloaded 68%. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">3 days</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-danger\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bolt\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tA user IP blocked. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">4 days</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-warning\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bell-o\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tStorage Server #4 not responding dfdfdfd. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">5 days</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-info\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bullhorn\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tSystem Error. </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n                                                <span class=\"time\">9 days</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"details\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"label label-sm label-icon label-danger\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-bolt\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\tStorage server failed. </span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </ul>\n                        </li>\n                        <!-- END NOTIFICATION DROPDOWN -->\n                        <!-- BEGIN INBOX DROPDOWN -->\n                        <!-- DOC: Apply \"dropdown-dark\" class after below \"dropdown-extended\" to change the dropdown styte -->\n                        <li class=\"dropdown dropdown-extended dropdown-inbox\" id=\"header_inbox_bar\">\n                            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\"\n                               data-close-others=\"true\">\n                                <i class=\"fa fa-envelope-o\"></i>\n\t\t\t\t\t\t<span class=\"badge badge-default\">\n\t\t\t\t\t\t4 </span>\n                            </a>\n                            <ul class=\"dropdown-menu\">\n                                <li class=\"external\">\n                                    <h3>You have <span class=\"bold\">7 New</span> Messages</h3>\n                                    <a href=\"page_inbox.html\">view all</a>\n                                </li>\n                                <li>\n                                    <ul class=\"dropdown-menu-list scroller\" style=\"height: 275px;\"\n                                        data-handle-color=\"#637283\">\n                                        <li>\n                                            <a href=\"inbox.html?a=view\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"photo\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(78) + "\" class=\"img-circle\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"subject\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"from\">\n\t\t\t\t\t\t\t\t\t\tLisa Wong </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"time\">Just Now </span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"message\">\n\t\t\t\t\t\t\t\t\t\tVivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"inbox.html?a=view\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"photo\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(79) + "\" class=\"img-circle\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"subject\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"from\">\n\t\t\t\t\t\t\t\t\t\tRichard Doe </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"time\">16 mins </span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"message\">\n\t\t\t\t\t\t\t\t\t\tVivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"inbox.html?a=view\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"photo\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(80) + "\" class=\"img-circle\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"subject\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"from\">\n\t\t\t\t\t\t\t\t\t\tBob Nilson </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"time\">2 hrs </span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"message\">\n\t\t\t\t\t\t\t\t\t\tVivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"inbox.html?a=view\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"photo\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(78) + "\" class=\"img-circle\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"subject\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"from\">\n\t\t\t\t\t\t\t\t\t\tLisa Wong </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"time\">40 mins </span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"message\">\n\t\t\t\t\t\t\t\t\t\tVivamus sed auctor 40% nibh congue nibh... </span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"inbox.html?a=view\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"photo\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(79) + "\" class=\"img-circle\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"subject\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"from\">\n\t\t\t\t\t\t\t\t\t\tRichard Doe </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"time\">46 mins </span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"message\">\n\t\t\t\t\t\t\t\t\t\tVivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </ul>\n                        </li>\n                        <!-- END INBOX DROPDOWN -->\n                        <!-- BEGIN TODO DROPDOWN -->\n                        <!-- DOC: Apply \"dropdown-dark\" class after below \"dropdown-extended\" to change the dropdown styte -->\n                        <li class=\"dropdown dropdown-extended dropdown-tasks\" id=\"header_task_bar\">\n                            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\"\n                               data-close-others=\"true\">\n                                <i class=\"fa fa-calendar\"></i>\n\t\t\t\t\t\t<span class=\"badge badge-default\">\n\t\t\t\t\t\t3 </span>\n                            </a>\n                            <ul class=\"dropdown-menu extended tasks\">\n                                <li class=\"external\">\n                                    <h3>You have <span class=\"bold\">12 pending</span> tasks</h3>\n                                    <a href=\"page_todo.html\">view all</a>\n                                </li>\n                                <li>\n                                    <ul class=\"dropdown-menu-list scroller\" style=\"height: 275px;\"\n                                        data-handle-color=\"#637283\">\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">New release v1.2 </span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">30%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 40%;\" class=\"progress-bar progress-bar-success\"\n                                              aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">40% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">Application deployment</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">65%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 65%;\" class=\"progress-bar progress-bar-danger\"\n                                              aria-valuenow=\"65\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">65% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">Mobile app release</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">98%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 98%;\" class=\"progress-bar progress-bar-success\"\n                                              aria-valuenow=\"98\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">98% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">Database migration</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">10%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 10%;\" class=\"progress-bar progress-bar-warning\"\n                                              aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">10% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">Web server upgrade</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">58%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 58%;\" class=\"progress-bar progress-bar-info\"\n                                              aria-valuenow=\"58\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">58% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">Mobile development</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">85%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 85%;\" class=\"progress-bar progress-bar-success\"\n                                              aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">85% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"task\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"desc\">New UI release</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"percent\">38%</span>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"progress progress-striped\">\n\t\t\t\t\t\t\t\t\t\t<span style=\"width: 38%;\" class=\"progress-bar progress-bar-important\"\n                                              aria-valuenow=\"18\" aria-valuemin=\"0\" aria-valuemax=\"100\"><span\n                                                class=\"sr-only\">38% Complete</span></span>\n\t\t\t\t\t\t\t\t\t\t</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </ul>\n                        </li>\n                        <!-- END TODO DROPDOWN -->\n                        <!-- BEGIN USER LOGIN DROPDOWN -->\n                        <!-- DOC: Apply \"dropdown-dark\" class after below \"dropdown-extended\" to change the dropdown styte -->\n                        <li class=\"dropdown dropdown-user\">\n                            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\"\n                               data-close-others=\"true\">\n                                <img alt=\"\" class=\"img-circle\" src=\"" + __webpack_require__(81) + "\"/>\n\t\t\t\t\t\t<span class=\"username username-hide-on-mobile\">\n\t\t\t\t\t\tNick </span>\n                                <i class=\"fa fa-angle-down\"></i>\n                            </a>\n                            <ul class=\"dropdown-menu dropdown-menu-default\">\n                                <li>\n                                    <a href=\"extra_profile.html\">\n                                        <i class=\"fa fa-user\"></i> My Profile </a>\n                                </li>\n                                <li>\n                                    <a href=\"page_calendar.html\">\n                                        <i class=\"fa fa-calendar\"></i> My Calendar </a>\n                                </li>\n                                <li>\n                                    <a href=\"inbox.html\">\n                                        <i class=\"fa fa-envelope-o\"></i> My Inbox <span class=\"badge badge-danger\">\n\t\t\t\t\t\t\t\t3 </span>\n                                    </a>\n                                </li>\n                                <li>\n                                    <a href=\"page_todo.html\">\n                                        <i class=\"fa fa-tasks\"></i> My Tasks <span class=\"badge badge-success\">\n\t\t\t\t\t\t\t\t7 </span>\n                                    </a>\n                                </li>\n                                <li class=\"divider\">\n                                </li>\n                                <li>\n                                    <a href=\"extra_lock.html\">\n                                        <i class=\"fa fa-lock\"></i> Lock Screen </a>\n                                </li>\n                                <li>\n                                    <a href=\"login.html\">\n                                        <i class=\"fa fa-sign-out\"></i> Log Out </a>\n                                </li>\n                            </ul>\n                        </li>\n                        <!-- END USER LOGIN DROPDOWN -->\n                    </ul>\n                </div>\n                <!-- END TOP NAVIGATION MENU -->\n            </div>\n            <!-- END PAGE TOP -->\n        </div>\n        <!-- END HEADER INNER -->\n    </div>\n    <!-- END HEADER -->\n    <div class=\"clearfix\">\n    </div>\n    <!--<div class=\"container\">-->\n    <!-- BEGIN CONTAINER -->\n    <div class=\"page-container\">\n        <!-- BEGIN SIDEBAR -->\n        <div class=\"page-sidebar-wrapper\">\n            <!-- DOC: Set data-auto-scroll=\"false\" to disable the sidebar from auto scrolling/focusing -->\n            <!-- DOC: Change data-auto-speed=\"200\" to adjust the sub menu slide up/down speed -->\n            <div class=\"page-sidebar navbar-collapse collapse\">\n                <!-- BEGIN SIDEBAR MENU -->\n                <!-- DOC: Apply \"page-sidebar-menu-light\" class right after \"page-sidebar-menu\" to enable light sidebar menu style(without borders) -->\n                <!-- DOC: Apply \"page-sidebar-menu-hover-submenu\" class right after \"page-sidebar-menu\" to enable hoverable(hover vs accordion) sub menu mode -->\n                <!-- DOC: Apply \"page-sidebar-menu-closed\" class right after \"page-sidebar-menu\" to collapse(\"page-sidebar-closed\" class must be applied to the body element) the sidebar sub menu mode -->\n                <!-- DOC: Set data-auto-scroll=\"false\" to disable the sidebar from auto scrolling/focusing -->\n                <!-- DOC: Set data-keep-expand=\"true\" to keep the submenues expanded -->\n                <!-- DOC: Set data-auto-speed=\"200\" to adjust the sub menu slide up/down speed -->\n                <ul class=\"page-sidebar-menu  page-sidebar-menu-compact \" data-auto-scroll=\"true\"\n                    data-slide-speed=\"200\">\n                    <li  v-for=\"(i,item) in array\" :class=\"item.class\">\n                        <a v-link=\"{ path: $route.path }\">\n                            <i :class=\"item.iclass\"></i>\n                            <span class=\"title\">{{item.name}}</span>\n                            <span v-show=\"item.class==='active'\" class=\"selected\"></span>\n                            <span class=\"arrow \"></span>\n                        </a>\n                        <ul class=\"sub-menu\">\n                            <li v-for=\"(j,ic) in item.children\" v-on:click=\"act(i,j)\" :class=\"ic.class\">\n                                <a  v-link=\"{path: ic.href}\">\n                                    <i :class=\"ic.iclass\"></i>\n                                    <span class=\"badge badge-danger\">{{ic.span}}</span>{{ic.name}}</a>\n                            </li>\n                        </ul>\n                    </li>\n\n                </ul>\n                <!-- END SIDEBAR MENU -->\n            </div>\n        </div>\n        <!-- END SIDEBAR -->\n        <!-- BEGIN CONTENT -->\n        <div class=\"page-content-wrapper\">\n            <div class=\"page-content\" id = \"tableTest\">\n                <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->\n                <div class=\"modal fade\" id=\"portlet-config\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\n                     aria-hidden=\"true\">\n                    <div class=\"modal-dialog\">\n                        <div class=\"modal-content\">\n                            <div class=\"modal-header\">\n                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n                                <h4 class=\"modal-title\">Modal title</h4>\n                            </div>\n                            <div class=\"modal-body\">\n                                Widget settings form goes here\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"button\" class=\"btn blue\">Save changes</button>\n                                <button type=\"button\" class=\"btn default\" data-dismiss=\"modal\">Close</button>\n                            </div>\n                        </div>\n                        <!-- /.modal-content -->\n                    </div>\n                    <!-- /.modal-dialog -->\n                </div>\n                <!-- /.modal -->\n                <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->\n                <!-- BEGIN PAGE HEADER-->\n                <div class=\"page-bar\">\n                    <ul class=\"page-breadcrumb\">\n                        <li>\n                            <i class=\"fa fa-home\"></i>\n                            <a v-link=\"{ path: '/' }\">系统首页</a>\n                            <i class=\"fa fa-angle-right\"></i>\n                        </li>\n                        <li>\n                            <a v-link=\"{ path: $route.path }\">{{breadcrumb.pnod}}</a>\n                            <i class=\"fa fa-angle-right\"></i>\n                        </li>\n                        <li>\n                            <a v-link=\"{ path:  $route.path }\">{{breadcrumb.snod}}</a>\n                        </li>\n                    </ul>\n                    <div class=\"page-toolbar\">\n                        <div class=\"btn-group pull-right\">\n                            <button type=\"button\" class=\"btn btn-fit-height grey-salt dropdown-toggle\"\n                                    data-toggle=\"dropdown\" data-hover=\"dropdown\" data-delay=\"1000\" data-close-others=\"true\">\n                                Actions <i class=\"fa fa-angle-down\"></i>\n                            </button>\n                            <ul class=\"dropdown-menu pull-right\" role=\"menu\">\n                                <li>\n                                    <a v-link=\"{ path: $route.path }\">Action</a>\n                                </li>\n                                <li>\n                                    <a v-link=\"{ path: $route.path }\">Another action</a>\n                                </li>\n                                <li>\n                                    <a v-link=\"{ path: $route.path }\">Something else here</a>\n                                </li>\n                                <li class=\"divider\">\n                                </li>\n                                <li>\n                                    <a v-link=\"{ path: $route.path }\">Separated link</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <!-- END PAGE HEADER-->\n                <!--  body -->\n                <div class=\"row\">\n                    <!-- vue路由主页面-->\n                    <router-view></router-view>\n                    <!-- vue路由主页面-->\n                </div>\n                <!-- / body -->\n            </div>\n        </div>\n        <!-- END CONTENT -->\n    </div>\n    <!-- END CONTAINER -->\n    <!-- BEGIN FOOTER -->\n    <div class=\"page-footer\">\n        <div class=\"page-footer-inner\">\n            2015 &copy; Administration by qio. <a\n                v-link=\"{ path: $route.path }\" target=\"_blank\">Good luck!</a>\n        </div>\n        <div class=\"scroll-to-top\">\n            <i class=\"fa fa-arrow-up\"></i>\n        </div>\n    </div>\n    <!-- END FOOTER -->\n</div>";

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAOCAYAAACmXKuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkxJREFUeNrMWIuNgzAMzbEBN0JuhHQEOkI6AjcCjAAjlBHaEdoRygjHCGWD9oj0IrlpviBULFmqEic8P39qYI/HQ0z6hKrfzKF/sKmM9Ts5b1NhPMOnd3LvyWPTeHBy7NMzl0lLh30Fm5tjX2K/sfh99+BoDG407lztZ+xVJLNLMSlnbhkn/XJoD6Vr3zjnWqeyM2zaSatJbxZbiXVhnBsmPU568vigzpRsuSie/sBZTTDUuF9hfyF+8BAvsb8FaeGESVQOchXOPYKq5RdnpHbckTzVQmwKwwW/FYaO7HVIhtokvke0CgfxV7YdGUh2aangeOsJ2EDsbPt8IfkV7ugQSBfuN+JtWS/J/pZFwtmzx6YD6dJBSu8JTAqGNmSYGWXSWTJeAtC4IZKFkQwcGmqHo6VSqNTgoZnZ22MwvBHP0E64kRFFIIt00J4WFSuQfkRWXgmu3CzlmcTrO8sZ2GMxWInXE4gmviQlGnLINdEslZsRTInM3K9UTTX8adYs2cyydibtRkZk+9qix8Idyag2MZNTsnIgLVcmtNhYDE7iO/IPLTY0zfQgXFgmjwEaclpEtoOaTECxxMdicBI/guwqYkr4xAw/ogXmlkrNAy9BBc53Ec/qEKgiAV8MBifx9IItkc7IqGabt0Nzup6x24Qg94lvsyEMXFedj/g2MjM+kfUDCOFGUA7k7VEYk1BD/Ep5Fk9MDIqBTocl1tRnizyL6HOxo9TToXIl8vUnAvN/4Aetkk5DHJ8NDonPOc+oeorhSDDowKshYfwXYAD0uOUqFBeE3gAAAABJRU5ErkJggg=="

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgALQAtAwERAAIRAQMRAf/EAKAAAAICAQUAAAAAAAAAAAAAAAgJBgoHAQMEBQsBAAMBAAMBAQAAAAAAAAAAAAYHCAUBAgMECRAAAQQCAQIFAgQFBQAAAAAAAgEDBAUGBxESCAAhExQVIgkxFhcYQVFhMgqBQmIjGREAAQMCBAQDBAgFBQEAAAAAARECAwQFACESBjFBExRRYSJxkTIHobFCIzMVFhfwgcFSctHhQ1MkGP/aAAwDAQACEQMRAD8AR9gOys2w7RuWXuFZL6ciHmldCDIa2igUb7zSQWTVkorEbkTSUK8ERKaoHV/u8TtPY7dd6ymbd6YCRsZcI3SGTQSoUFUKtPggVOWKDbfLnb6aaaimCl4aXtja3UnIgDiCPbz54w1e902xNjx8Z0xXYbkWxtwZ6NTgWt6jGGQZynKbW9vHDkw57dbFiFJqXpbypFZABQTIzccQBNfH0WvYkFmuE96jnjjtTpnTThwJDGhgawR5n7woNTipOQa1SMd6zeAuFGy2ugkfdHtYyIscAXvUmRz0AAjAzACAZlzkBwbHeV2Ud9fZP2xaazTuJ2lXt47LuTxPH9QYTmVzY1WrJlnVTbwmJTkduFSFaTEjPNuHHJ5FMTRHDFeV1Nq2vZ79yVVwpLRTwXWsbqkqXMYaiZCB94QrmhACGl2SBWg4zNw1d4hsbAy4Okip3NaYow5sTMimglNZGY1EeYJGA00p9xbvA0PBaoNVdxuysbxcHimM4ZKvPzDhivyiadleri+QM2dR0SXBQnEFoVUiVeU582TVWS0VEXQkgj6a8ANOfjkmfnxwt4LrWdXrOkLpPE5/Wpw2btt+6PH3NlC4ln8Mde7V2yT+PW91iljYwcCyvKrJqNCi5QeN2NlMqsfvFaio05EaBI5uEhMknWjaT1vz5f1tnqKvcNunkntL2Avp3IkQARzmoFeHH49SoM+C4eGyty0NzhgtFaxrK9j/AEPT4ueleXkPHDdvzbkg4j+Qf3O4+sZ172qWw4/lCZSNOxXeyKsciexVknCnSEEC9wkdEQy6F58pA/K7V+qPz7t5++0aen1ndt/kI0QZcQDpJQkKBh/dm7o97od24b8SN4EqqqiqOKKmWK0l5hN3pzRW38JqNi4Bn1bQ7OpLgL/Xt5ByHFZYScealuS4L7zLbhy65l5Y74F/a62XHVxz4sXam4qDeDqDds1BXW6vnpHRdKsidDUNa2QhHRqQGvc3Wwopa4cFTE3XG21tFQVFphljmpRU9QdNzXBUQ8MwQMiF5Ljufso2UTBN/Z/357MrMTuL6uGw1B2x0ey1yTHqzMsmbZgubWtdfZXAx+0x+uzDX2DS4kZlJKiyTt66PIkBkJ1v2vdbbNFQ08b3xxjrzloXQqiIuAIJGpXJwGlpPJcrYVkN+vk0hkEbn/8Anh4K5M5AF8WgDLMq4D7WHI/5AG88Ny7smvsHtHyq9lBk2ss2hY3MTrkQoqz2m5oC8AmyMhuot3OeC5MOoh5RfCz+Wd8qq7eUQLH6HMkDz9kKzU3zzQe/BvvXbTqPZVVWNLTTtcwNdzckgaU5cz7sUbkyiZFlskjjnR9KCPVz+PR0qn9OE8/4ceKeLtS4nRsZjDTzxMoeZT/cpJhyn4c2vkwbSBIjuE29HksmJMvsOAQm26w60BCqcKi/1Txn10LZoSyQB0T2lrgeBBCEEeBBK417bUOhnDmEtlDg4HwIzHuIxbfZ7/8Aah/avstjlNjFtiM9SRGckbruXW9VTcWyBmTcy8mRha1vMn86gNRY8JVSYcVt5xBVBU0g+TZtF+70Wz+2YNu9rKz4hm/rw/d9NdWhsWZk4K4Bc0xXJrqsbWG4AW9kaMzka89YDQAG+GslfDIcTgBd5diXcz2i9j2awN04fXYXY5KGIbEairkNU9Mq6G2mt469GsISOty2LyFYTAbfiti4rYqpdSiKqju2b81tm/MS9Om21LNPHBMYFdE9oe5rHPDmEhDG5rSWuKLwQE4R81lqrdbXMe6IkNLiWuBDTkCFy9Q1cl9uWLN3bSXa9oH7efa5T5zrOntte6I0Xrm/h3NrUnPopu5ti45Czu7uJkFhEKa7aZPfPzrB55HBUOgS+lPoH9xbrjuF2rHVFNJMyF742jUdL5VIYwtBaCwJ6gV9IDUzwxdqbTubaekpLNVNhrKtge4NQPbAAC9wcQUcV9KIVJdyzT933aC2J3N9tG1+5ak21IrrPNajMBzPC7EauVQZ0zXWALVBCGZXuza44D1Qo1hQXY4I2aJ0qKpxjbB3HBaLsypvEEc08lYw9RSyWIv4loCAtR3qYRkAgRMMffO2a660T9oWWSWCKnoXtbG1rXxSjTr0yqC4PVvpe1yhxJK4pnSkL2cWUadDgmsZ0CRUNt1pDTocHj6S6k8/5L4shv4haOBCjEOuCRAnJzShxyaiYRy5QqXmsJhQTlf7hJOvj+XCH46VDdMY83HHNM/VK7yaCP6/XhyUXcEr/wAPrzGI9zbOufvnxbV1tStu1nw8J38nZjsPHrOa0ofNLMtMf+UjRiEvaoEN8STrUfE2SWub/wCoImGKMUJ2rLWCQ6tbiJ4actaPh0teQ532lexMlw4juMO+VAg0t7ttWaPVnq0ulFQR4IGsAPPMcsPN+4TYUu+dfNanprPYkjHsPwjXxDsvft7lLNlAwosOnZGch+JlkKuZqaiLYRR9xK/7FdlF0+pwgoiU+Q9TPtqx1d9lkpp3T1ro201CyF7XTCYR6Guic4l7Q46I8gGDUnHBDuO3MqagMj0BiGSUj0hjdJJcVQHgNROerI4lWHZIe4vto9pWdYHmVVU5PN1LTYhsFGLuQb432sEm4XJq72lekS8emjHj0yKcZ6J7j03h4NAJFU73i+k27uGttVZAyVj6x8v2mvSQ6mkEcWoQh5FUOHD8mbxBWWlrqyn60PQY2NwDfQ5o0OAdpLgdQJIUfVgV9t73taftum4hkWcwcgtm3rFJciNWs0VbHggIjFZYr25ksB6QFERBNEXp56RRePAnabb3d+YaSJ8dIXAhpcXlTx9SDj7MvPDXMkdnZPcajS0NiKOOWefHM8B55nFTjMpFTLyPKArXgRmZPlTIsZOVUX0cV/1W14QOl/gvp/5J5efi47W2pbQU5nB1NYAT5cM/Zj83tyS0E16reyIEckznNb4KdSjyOaDwOIjVuC1JF5URRcjPAvn58+iRov8AoTXjRnaXR6eYI+tP64wqUgS6jwLSPo/2wTuN5rJHtA3LrtfUWve7vO2fPxT6eG5MXTfdnVmqLz1cvRpYp5JxwHn58eF3XWln7pWu+5df9L3Sm/l31oePcV9+COO4Ndtaa0n7F7hmHsfTTg+/QPdh5/3vMt7itPZDi3bJtA8Qxy4z2swjINh0etby6vMLp8Sw+rYTANNYxe38aFdZHDx1XPmsksiZaizbKyhxmRUYLpOinyi+U+3NgUAZTAVNyjllmMzmtaetOokkLWo1r3AaGopawHP1HGtu3d9bfA2KIGCglRugIrw06syAFaCQvAE8sskV6n2xsfX2b3EPDs5ynHceu5jbt7j9XdS41HckPQ0b8yp9Qq96UjSiiPK36vCcdXHl4YW67Jabvb2uuFNDLUMB0PcwF7fY7iB5KmPTYW4LzYb5rtlVNDTveC9jXHQ8cCS34V80Xzxnjd2c29rAYaKdOnhIZji1EF43SnTJKhHZYBsSUVcfkKgoKJ58/h4A9sWmmhqFaxrXAnNE0gZk/wAhhz7+3NXVFAGOle6JwGSrqJyAThmeWF55TRysfyCyiWCcWEdfSlCh89E9z6nxRUVOkWeelOPDroqhlRSM6X4R4f4jhiU7jTyU9wldKfvlz/yPH3cMbVREk20qBXQhQpsxwmGUJUBFJxhxR6iVREU/Hlf4J44nc2Jjnv8AgGf0jHpStfO9rGfiH/Q4ZhW9pWw4H25cy30eqL97GMs7j9aZ3GzxXXEkV2i9fYhtjXE69Ck9H3h0d1mezY8kpyh6QxYAuovpkpeFLNumll+Z1PaO6YJYLRUU/Ty0OrJ5qWfRq/vZHT6A1fjeWpqRGSza0zNhS3sNd0ZLrFMf7u0jimhEvimqVzvDp+vgMNI/yUPd/vswkrb5BMi/TmIKtOJzTpiAuqlC9WSFVH1s3rdZ6z21aQWlRhAccFeUJNl930KruPg6/p8eHPyREz46sDN/7VKPt/xOmdXhx5eaqvlpxXPoQriJ/wB6/ZMZAjyrUrWxGJQk4jIq4FgL02H0QyXpRSRSMeeUFVRUUiuRkAGTDTJ6tRTnlpyOf0Y+eyAF5zeKtRo0hfepGX8DBb6BCu/UDGndqSHkdCsviwWC5EBaOTsRauQOKNZHauTUlQqoJKkbbjMOQZS0ZBQEVU0Brl0OhKLX4t6h+10tQ16QiEpxBcPSufLDIg/M9VObvw9XSB4dRDo1HwXgjT6kwCWdfI/mS++c5S4W2n/IoiqQjL9y57pGyNBM0QfIFJB5Hz/HlPDMoOn20fQ/C0BPYmX8DCauPV7iTuPxtbl9q5/RwxriKVq5HjqWZKFWt9TpZmgC4o1fvIvyJem44024CRPU6kIhFR55VE8dKzX0H6fj0FPbmnD+gx70OjrN/t1BfYmfP249g6Qvbr8LTko62+O/QPJOlkDxj9GFwP08VU0kyfTTHUaSjQUYVGlhrBV1VRBREWJh+zv7gOLOl+skbrH3vZ9+jumA4+nvtHUUtaupC8dfQMN5v6s/Jnj7z8l7lmf/AC6NEnL/AKdPEKiJnpx//9k="

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgALQAtAwERAAIRAQMRAf/EAJkAAAIDAQEAAAAAAAAAAAAAAAcJBggKBQIBAAIDAQEBAAAAAAAAAAAAAAYHAwUIBAIBEAABBAECBQMCBAYDAAAAAAACAQMEBQYRBwASExQIISIVMTJBUSMJcYFDYyQWNCUXEQABAwIDBQQIBQUBAAAAAAABEQIDAAQhEgUxQVETBmFxIhSBkaHBMlIVB/CxQmIj0XKSJBYz/9oADAMBAAIRAxEAPwB+9xLg0OS47ikq/mpZ5SbrVc78F3MFs2wMxalyWnUSMTyNlyqqaapoqpxXOwKbQmOBQd9K05QQ1cTVA/3BvN2D4hUDeJ4xIiZNvRk0AnqOv/19+wh41UuH2qZPYQWzX5WQslenDhrytvPCquEjYEi1l/e+WAZGnNdvOAaOJXb2D18CT9OaD9YnLpcwtWEKG/E8n9ITZ2n1cRi43fPcXcDKMiz3Iba6yi8ya0k3WQZJdpNftbCymPKTzjroxuqbjY/pi22issggi2iCg6w2uo2wAZLIzm/3BT27aZbtBumx/wCtA9ts3DBhQD0Cu/44+T+/fjTndVY4Fmt9h8WNMF6bSz2reRiVk0Lwm4xcY664MexgTmQUZAkHVD0IVEkReOu4dHJAXx5Xu3IQV91VUulRyu5V0wtBwVCCO47a3Q+LO92NeSnjzh2+9QNbTxbpp2oyurPIIvQxTNqt8YVzQuypYxXBZN425EMnRA3oUlk1TUl4ggdbysEjWNQ4bgh3jbQFqFnPYXL4JHO8JwO4g7D+N61YFcSvkmiS1b2pNG8K/IxumrQK2puJ/kaKA846lpomqfnxNyoV+Ar7PzqvzTbcwT8dlJNzn9zbdTFMz+Ijv1Fx8dIVqLLmY1VnLDqroXSfARIB0+qjyr68ebWW6nh5jyGnu21JLaQRvTE9vChpgR5Z5i+dEXcDdKkcdpqzaukegm3HWrrp0Kj79olihDcRxBSwtTRxVPXnHX01ROAHrO6ldA+GFwdOC1pT9KjNjwwx7qe32v0wWsUd1cNLYHtfKxxGD0fkwO/xDL3imdtPbCwq6zwLCMfwqkv6Ns5T+OO47FqLOXEYc9LWI5Lhj8tEKR6kYmZof36KvCfube5EAmUOJO1VPrrR1pcsdNyvEAgwAQeylf8An3t1hGR4i/CWjp37IzdmM2zMaGkwJYMdSQnXQUdXQV5NB9F/JOLTpyfUIL9rmOk5QTindwrl6nZp1xo72TCMTISMACE3r21Vj9pvf6dtnL8idhcrxqbn+E2D9RcT8cftXatupyTHJhQWbSLJVuSRHaVM7t5Ajohdu1r9iaPO3mdDK1zWgiWMPTgRg73Vj7q23hezmKgbIWdpacRs9PrrQOfnBXFXMWRbRWvOzSS6hqGl9H7f4aScJt+OR9t1EkKsRtETTXl1XXju57/lGfZtoLWJUXw9xSkzXGAY/fXC2z1S608bnOpPRpGq6LqiqvS0ReI43SxtyglO41wO1y0ccWk+lv8AWmzeMVdt61g+N2zUqM7klHiVvhs2HFkgMmmx+yyt67NbCA2ITYsmxnVhE3IJU6rPsH7OFV1bzIbi7e5Q2V0RBQj9ABRRj8KGtX/bO5s9X6a0nkFpMTLhjwoLg7nucA4AnLg4EA4bwq0J5GHeOO3F5ne9lJWUdDawKnJ4kPI26soGNTpdJCfftHUcYhqEyZDPlbkSn9UIiMBIj6mgaLnVNRZHZTOdJbM8LFHaMG71pxu0/T9Lc+5jYI5XDNKd+AwLiN3AL7qRXgOAxc12+tt35u51tb5nbbkXVBYVFpYv5Sy83Ku40ihi1USf1SxxW408EiOQ3WweaQeohKhJwwn6iYbuLSYoI2RtY0hwBacAhVCju1Rt30s5tI5ujXGvzTSPeS8FrnBzcSSAAQS1AiEHYig0ZPBO12n2vkb+5lnV7W1MzPt0JcelO4fYad+Ix6XchL6QK2r7EUbSabPvJRM2l09B4NYBc3bs0bUijaGAjfvJ/Ks89ZSWljJbW0si3ckPNez5MxRgO5S0E8QvaKZWnkZ40fCE5/6VhPNzh/jfMRuonqeoKzpz866ap6aaIvE/kr1dpXu9/Gg3ztnlTBOG/wBVHcMBiKoeyKBlryDyKqufgiCiKqF/Lgw8uRjlwpKc0nDMh9NT5jbeTtZDDJH8fdqbbdCurQcnvtm33mMVD1tDoZKMryq0wMywnkmqCbguCSenIqqT7hRC4vo7EhP4Q8dvic0+pBWyvsBbXWm9JTatMCsl4/KDtDRGwtPEB5zEL3jbVYPITHY9RtLb4rcuzdwIluE1KuNHpqerbx8G2iMYHw8LFbiBd17bhkrKu9F9eZOo4ajzcBtg5tu7kyxua9jgjg8N7ihBHqIStIMlZqdh5jzDGNLEcySF0rSd/iY9jwV4hwNKe2M2QQbHFtu6x+dEz26yOTuTl7dJHlRq3bfDoMSZHxyPN76TKiuZWBPtKqCANq8oogCiInBrplhca1q8b2Ai2DMuYoXEYZn4ABPl44UkuvOrrHpHpa4Y9zJJy8OEfia1zyuWLaXYjF2ODQTglWryHxmxaqo6/HYdQ1IZp65qGxOnAw7PkmyiI5LmutsttuyZTxE44oiIqZLoicOKw0iG1gZbsarWjadpO8ntJxrEeudX6lreqz6tdvDZ53rlaoY0bGsYpJDWtAaMScMcaAqeN8HU/wDronU71pOn0m+XTR0dOXl009f48X305nIVBtoT+vS+byZn8NvaMK2LbbYbt1X3zFBBoMYhd/TznKyTDgDLky+5huMRDG0mJInAI6qpfqoqkqrr6acC5fmOUnE1quy0LRtPTydtCxw35QXf5OU+2pnv5tVC8itpaqXToFblUSs7uiWWqMKrntGzxqc83/xXmrCIotOoujEppFX2EXA11FoY1y1bLAQ3UYVMbjvX4mO7HJ6D6aPulOoG6BdvhvGl+kToJWja1PhkaN7m7x+puG1Kyy+XkrfLaSpsUkZXE+DdsZuOWUW2iMw8lxqQBCzYC4kprt2+k19yqXoGqoiiuvC3t42zXPltQhLbxmBB/bxHb7abWoW9xp+muv8AR52yaXK1Wu24OwwO9N64hCuIqEbGZBS4HhEeNEktvZ9kzbGR5W6428txKW2OQ/XR5k19oDmPR44dQmhX2G6SoKIuiNrpxrLSMCTK17x3J8rfQPaaxf8Ac211TWdRkuIA+awh8LEOZSAskmXcpKAp8LRXZyXd951lxVkKrwIQON9RBIeVfVVFfcKiv1T8ODljmjfSaOnSuOAoNpuXI7gj7tdeqJ8/P6a8hl+f147PMDJlxSuP6OOfmQZvZWr7b75laXa3u0BM1FmF2aMqhA9ToC9utqWgLGcKFy86No6gnroq+vAONjeNa+qy2FlfJleciyzFPAzlQjjPuSRbOLmQA4OURqeK1Ed7+pkKTRyX33oxszgMG2nRMzD21c5T4ffv/HGvrkQfNWfP93QtuF8mtvEzRrb0aJMOsAlnl8jMToyylWiWpkPtwIzeFBuaCkwlMzZkTRRgFXHRI2hbGb7J9eZkFvzOT4lP8iYpuw/aiqNqBKIGfWv+VkyeZ+kc4on/AJZ08Sb/AO7cvatJZvf9lLI8q5UfZfW/tksuwU5MwWe7XqGikkR0wWP0uiLXKyjX0JT4sm/DgqIKDIuTlGb214zQbAaiD1HbN3I+oios5jt5fw/TaRwLVBkSdG1HVWiNeuhpog9NVJL7S/PZTt8umGbav7duHHdwpe9W/wDPc4ZCPqC48sBE358QF4b+OFCrW/8Ail9jWvej/Vc5+X3f2dft4t/5l3KlAn+lzdpydwTb37a//9k="

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgALQAtAwERAAIRAQMRAf/EAGwAAAICAwEAAAAAAAAAAAAAAAgJBgoDBQsHAQEAAAAAAAAAAAAAAAAAAAAAEAAABQMDAgUDBAMAAAAAAAABAgMEBREGBxITCAAhMUEUFQlRIhZhcTIK8HIzEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC6ICdR+tR7D286d/AfHoK4HzzfJVyu4UPMVYk43Wq4auMwWtITJchW/CLXDfRZZhOni/x22Eliv4qIKlspGdqnjnblVN4UqJ0BCpwpzZQ+QH5Ccm3S3msu5D5Gxtww8sqdq+VkbrhY2135VFlUTJR25FNmLpoIiY5mgM9PfyoAA1/44f7EucsKXXDxHOa7bvynhxeTc2U/eNo6BcTlmthKVaMvFmoSMCeuaRavjHB6mvJqlcMtSSJCKIp6wvYY6yRYmXrDtTJ2Mroh72sC+oRncFqXTAOyPYqXinhREiyKqYiJFUlSmRWROBVW66Z0lClOQxQAhBIYEyB3+5qocRqOsBIRIpSh5UEDjX9ughQjQOwUD6+fbx79AIV45Rwa9ylfhpW9cVEuLBUBEs76eS01AGmcdR0y3WuUydxLO1dy2Wi5CkcUWMkU2io9w6AYs3XdgHlBgvI1uWdP4ay6zlLcnhap2zNQ02rMSyUO6dQrEHEYZVZqjJTCSCai5Tbeg33CIVDoOYFfMWtHSstAyUgo5ftX8o2fsDsRYeikmLkSKsEGapCOERjFjnQ0GA1TkEO9AEA6D39YzJLO8/jGa2IiykEJDC+cMl2lIvXjg7hKXC7DRORWT1omc2lim3TuY7Y6BAKQFEBUAKqm6Cyv+U24NERm471hW5kgT3FKAJkygYgrbexuCcgABdVew9BpRABCnl5UDw/yvQJI5F2Rw4b8jM/xuVrqalyHyqj7Ixk6xy7cyqUjKQFnItVZJxZxY1kcvuNxyvp119JzKEO0ASiQVFdQQHEPGnjjxdt4GNmTV0XNMMfUR9ujMPJlsvEWy9kVpFOPeepk5JtKM26qpipuRAgESAEiFTKAkEFH50+LLhtM39mPmTfTySiMZpS97ZCzR77JtUrUxhEHjXMm4u20kkWLc0nKyk6RMGsUcxlFQWOVA/qDIgIOk+ADjM/45fG7jx5MMHUVLchrwuvkiSIflUJJQ9n5BTiWONI+TSVKVRGSXx9b0e+WIImEh3wl1CID0D3/AG5j7bvejS3PQbtdsf8At6fXrrqpXV59Bqz6a9yDq71pQADsI669tXh26BIfMfGjK3+Uc1kR9lFXHzacseNkkpd1fETZ0hAIqJDFzSVloktOTn5pWXdR+t2kL1JruAmAlAQARBew5vasRJAQF4T2SRjxUjGFwXLJ+63I/YGcrrgpPyKMbHNnqiiqp6bSJBEunVUe4hE7m+P3LXyJZW46YwuO6HMZxnhsmsMtcpLHC63MTFTFgWQAOYq3I2AbKCM5P3fKu0o8VCk0sUx9ScwCgQBC243fRKkBbns8CwgmCp3ESyjWQ0ax0dCIA1ZNGSZCppIs27dEiaSYFAqaZQKHgHQeh6S+2VoGn20QEPuruemAQ7/x00r26DClaE47ANDYpS+IKLKCklpN4H1GTDWUod/tqNPr0C4flmsF3H8RC3D7UykFY/LONI6fnm8c3fv7Qs665Ze0XEwxklm4u2DdK5pyMVdHTEhNtMNdSgPQJKwJhlZtJuEb1brrSxRBRNy9H7EypCIFTYM0SItUG5/5V0iI1Hv0DeeFGI7oks/tZ6KdKMbOtW07nJcJiCYiD4Lgjjw0HHmTTEqbhX3UoPUwOWhSsjiAgalQaEvjW44aNgGaJEZckUvMLOXDIwlPpeUOiYGq4lXOY1RASp7ggPQYtu79z0e6ptaNj2725hu7ejRtadv1W5pD/avenQEmemkdXh5/t+vlToAR5QL5bGLnFL1jMZF4yEgp8MoNX04cyDixSRT33hS6ZB/bxJdmu5YgIsSQrZdZB8KIAZUwFEQWzNpYQ/KbGGyn1/DDCwRMkncUVDFkE2IgX0KU8s1mTAs5Tb0qoCaYnDTuEKevQMLss93Exgijw/b206lPyRua/ZLIjwrG4N4qIlQRQhEWMjDezKojrIqSQ3EyFORNM6plDlA57TUu1WAjjXyzt5jdIIELLI2pJSUpAGcF+0y0e5l4qHkCJL01bSiRhSrp3FKaxCQDt7pa7e7tn0107u3qT16Qpq29WnV5Vp+nQf/Z"

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAHQAdAwERAAIRAQMRAf/EAIoAAQEAAwEAAAAAAAAAAAAAAAkKBAUHCAEAAwEAAAAAAAAAAAAAAAAABgcIBRAAAQQBBAEEAQQDAAAAAAAAAwECBAUGERITBwgAIRQVIlFhIwkWFycRAAEDAQUEBwYHAQAAAAAAAAERAgMEACExEgVBURQGYXGBkSITB/DBMjMVFqGx0VJygiQj/9oADAMBAAIRAxEAPwBi+yvJjqPr7Fu3cwZnmK3gOv8ADLHJcfoImbPZkGR29bBlypVFMgHhvJEfIkjGILmIr1R6+3tr6xZKqJrHSNcCACQF9sbLqmpJqiqZTZXDO8NXrN57LTZd6+EHn15z2hvIrN7vF6mPkFbXGxqLdZpJqqypxiSqy6qgoaEdbLNV11eGQriKgkdJIqke4j3K5V3J6hadQzvZUiaRwchIAQfxBIu6O+1KaV6W1Munx8I+GJrmAgOLszidryGm892wXWzfAzsvv/8Ar88n8H6D8k8xNO6Y7Yt4eKlaDIZWTYziVrdP+DjeT0zZwo56F8C5eJk8TVEJ8EhNzFcMbm7unczabrf+ihzeW254e1CNxxKjYeuwhzlyFX6JB/sDOITM10blDgMWm4X7R0i1VSj0qGX6CmumvkkiuxxJdH88ThXQqpriSfvPgoORHMs1n5bljCcum5NPRCse5mbs7sUsoEkyZlem7ai4++07eM9D4nlXathI7Fs7AOH5dJt4N8a/WVEq4ILKLLYGXMO9RDECJNURfyexrlajVcmuqYupyVcekSx0zSJWtuQFcQuzcq23+TdU0Oq5tooq14MEkxacxAapY4MUrd48qX4pZIu5J0Pq5ltl8TtifS4X1j1PJhWGAHgRAYrZ2NbjxUxcFrYEhPfAsCyq/nZ/IrnI/amxHJvRbya+ofRRQA55/jCqAqZUwXauK2tajpjQ6ezUZpiggJLSiYfEuO5qYdtgC7Lbkvd1h0Zlva+cYjc/5fmfWeXXl5ilaSoj4zj5ZFhb5FVyxDfJbFkV8CnOJxFOVxeNdzWuXarF0CChp5p6XToJGoTGjipc44uW65L8AllL6gVOo/TI6zVamIt4Z0ygI1rQgYxLySXEMF95OAsqDe1/FFag3/WMd1bbxifFSxPzbnhlrqsfj927WaJ7ey6/v6NuGrUTyxkwwtMvGUSfN8XX7rMd194UWmYSylvpGPV0FiT1dAUzbYk6xjwjTYNRKaoGVrRSZI28y7ybQo5dNfRJWwmaklgpykz4ntaTgHFpAXoW2XyxyRX0et0mp6y6NlFBUxyPYxxe9zWPDiAgDRhvNi28vMnxzD8Vz7C88NaYxmNmybQ3J7aktLYFj8PnCOJWwTOdTBthkVijezgOrU/J7mekNSafUQ1BbE1rZg9JI3AAscDebwqdIxF4tdJ1iGno3urA6SjezNBI0uyuaRchYQD/ABct9yLbyz1B1L1/jGDwrTI66urLefTwQYtUNasqTQ4gyA1kR9rKO9WTsqyTlfLsTI3a1xUENUa12rq5T0CKCE185z1cri5U+EEYAbFCdQTptDXq96g1+uamdEoC6LR6UZHNB+Y9jiQScSGFUvQuUpcE0LMM6mS8OTYL3sIhdeAHFq0U1OPTTTYrn6/p6YHDQcOieKyN4rUOJzr/AM09r7VoYEuVcBXRmBTJlTF1QcssxaxM3ZCOr2DO8KHdWSaRJKWTuNCAGr1YhXIjXB9/9rupfbG1gjpwsVf91ZMFSF1z9hEM97r+B/txKKxGMwK98UiYN94v1ZZ0oEa01cT4yBmmgaNJxC2uQT1s6R9ap/NEfH5XZ7yoanhzgAgn9uYi7oSxvpH3V9o1nAk/R8wy5gFzr4vJzHemfLdmRL1sGUVOxHRJa3DpgoSOm7GMG49gslSk2/XFkEjq0Lfbi2sWKo9ddPxX0W6fxmccN8vavw9u3DcpshOY/tjyT9SIFcnhyAGTuUAjfnI77cmYuf6yE2C+R9pDRH8pNEFxzkVUFw7FGptFVN/suia6e6Eyzbmp1n9LLBKLzMX5U3N/LMn442//2Q=="

/***/ },
/* 82 */
/***/ function(module, exports) {

	var Vue // late bind
	var map = Object.create(null)
	var shimmed = false
	var isBrowserify = false
	
	/**
	 * Determine compatibility and apply patch.
	 *
	 * @param {Function} vue
	 * @param {Boolean} browserify
	 */
	
	exports.install = function (vue, browserify) {
	  if (shimmed) return
	  shimmed = true
	
	  Vue = vue
	  isBrowserify = browserify
	
	  exports.compatible = !!Vue.internalDirectives
	  if (!exports.compatible) {
	    console.warn(
	      '[HMR] vue-loader hot reload is only compatible with ' +
	      'Vue.js 1.0.0+.'
	    )
	    return
	  }
	
	  // patch view directive
	  patchView(Vue.internalDirectives.component)
	  console.log('[HMR] Vue component hot reload shim applied.')
	  // shim router-view if present
	  var routerView = Vue.elementDirective('router-view')
	  if (routerView) {
	    patchView(routerView)
	    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
	  }
	}
	
	/**
	 * Shim the view directive (component or router-view).
	 *
	 * @param {Object} View
	 */
	
	function patchView (View) {
	  var unbuild = View.unbuild
	  View.unbuild = function (defer) {
	    if (!this.hotUpdating) {
	      var prevComponent = this.childVM && this.childVM.constructor
	      removeView(prevComponent, this)
	      // defer = true means we are transitioning to a new
	      // Component. Register this new component to the list.
	      if (defer) {
	        addView(this.Component, this)
	      }
	    }
	    // call original
	    return unbuild.call(this, defer)
	  }
	}
	
	/**
	 * Add a component view to a Component's hot list
	 *
	 * @param {Function} Component
	 * @param {Directive} view - view directive instance
	 */
	
	function addView (Component, view) {
	  var id = Component && Component.options.hotID
	  if (id) {
	    if (!map[id]) {
	      map[id] = {
	        Component: Component,
	        views: [],
	        instances: []
	      }
	    }
	    map[id].views.push(view)
	  }
	}
	
	/**
	 * Remove a component view from a Component's hot list
	 *
	 * @param {Function} Component
	 * @param {Directive} view - view directive instance
	 */
	
	function removeView (Component, view) {
	  var id = Component && Component.options.hotID
	  if (id) {
	    map[id].views.$remove(view)
	  }
	}
	
	/**
	 * Create a record for a hot module, which keeps track of its construcotr,
	 * instnaces and views (component directives or router-views).
	 *
	 * @param {String} id
	 * @param {Object} options
	 */
	
	exports.createRecord = function (id, options) {
	  if (typeof options === 'function') {
	    options = options.options
	  }
	  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
	    makeOptionsHot(id, options)
	    map[id] = {
	      Component: null,
	      views: [],
	      instances: []
	    }
	  }
	}
	
	/**
	 * Make a Component options object hot.
	 *
	 * @param {String} id
	 * @param {Object} options
	 */
	
	function makeOptionsHot (id, options) {
	  options.hotID = id
	  injectHook(options, 'created', function () {
	    var record = map[id]
	    if (!record.Component) {
	      record.Component = this.constructor
	    }
	    record.instances.push(this)
	  })
	  injectHook(options, 'beforeDestroy', function () {
	    map[id].instances.$remove(this)
	  })
	}
	
	/**
	 * Inject a hook to a hot reloadable component so that
	 * we can keep track of it.
	 *
	 * @param {Object} options
	 * @param {String} name
	 * @param {Function} hook
	 */
	
	function injectHook (options, name, hook) {
	  var existing = options[name]
	  options[name] = existing
	    ? Array.isArray(existing)
	      ? existing.concat(hook)
	      : [existing, hook]
	    : [hook]
	}
	
	/**
	 * Update a hot component.
	 *
	 * @param {String} id
	 * @param {Object|null} newOptions
	 * @param {String|null} newTemplate
	 */
	
	exports.update = function (id, newOptions, newTemplate) {
	  var record = map[id]
	  // force full-reload if an instance of the component is active but is not
	  // managed by a view
	  if (!record || (record.instances.length && !record.views.length)) {
	    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
	    if (!isBrowserify) {
	      window.location.reload()
	    } else {
	      // browserify-hmr somehow sends incomplete bundle if we reload here
	      return
	    }
	  }
	  if (!isBrowserify) {
	    // browserify-hmr already logs this
	    console.log('[HMR] Updating component: ' + format(id))
	  }
	  var Component = record.Component
	  // update constructor
	  if (newOptions) {
	    // in case the user exports a constructor
	    Component = record.Component = typeof newOptions === 'function'
	      ? newOptions
	      : Vue.extend(newOptions)
	    makeOptionsHot(id, Component.options)
	  }
	  if (newTemplate) {
	    Component.options.template = newTemplate
	  }
	  // handle recursive lookup
	  if (Component.options.name) {
	    Component.options.components[Component.options.name] = Component
	  }
	  // reset constructor cached linker
	  Component.linker = null
	  // reload all views
	  record.views.forEach(function (view) {
	    updateView(view, Component)
	  })
	}
	
	/**
	 * Update a component view instance
	 *
	 * @param {Directive} view
	 * @param {Function} Component
	 */
	
	function updateView (view, Component) {
	  if (!view._bound) {
	    return
	  }
	  view.Component = Component
	  view.hotUpdating = true
	  // disable transitions
	  view.vm._isCompiled = false
	  // save state
	  var state = view.childVM.$data
	  // remount, make sure to disable keep-alive
	  var keepAlive = view.keepAlive
	  view.keepAlive = false
	  view.mountComponent()
	  view.keepAlive = keepAlive
	  // restore state
	  view.childVM.$data = state
	  // re-eanble transitions
	  view.vm._isCompiled = true
	  view.hotUpdating = false
	}
	
	function format (id) {
	  return id.match(/[^\/]+\.vue$/)[0]
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(84)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\views\\bar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-md-12\">\n        <p>This is bar!</p>\n    </div>";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(86)
	__vue_template__ = __webpack_require__(99)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\views\\foo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	
	//     <div class="col-md-12">
	
	//         <data-table
	
	//                 :srefresh="srefresh"
	
	//                 :tdata="tData"
	
	//                 :dob="dob"
	
	//                 :ttest="test1">
	
	//         </data-table>
	
	//     </div>
	
	// </template>
	
	// <script>
	var dataTable = __webpack_require__(87);
	var sData = [{
	    "id": 0,
	    "name": "格式 0",
	    "price": "$0"
	}, {
	    "id": 1,
	    "name": "是发是 1",
	    "price": "$1"
	}, {
	    "id": 2,
	    "name": "佛萨佛 2",
	    "price": "$2"
	}, {
	    "id": 3,
	    "name": "恶恶人都是 3",
	    "price": "$3"
	}, {
	    "id": 4,
	    "name": "士大夫 4",
	    "price": "$4"
	}, {
	    "id": 5,
	    "name": "Item 5",
	    "price": "$5"
	}, {
	    "id": 6,
	    "name": "士大夫 6",
	    "price": "$6"
	}, {
	    "id": 7,
	    "name": "Item 7",
	    "price": "$7"
	}, {
	    "id": 8,
	    "name": "Item 8",
	    "price": "$8"
	}, {
	    "id": 9,
	    "name": "Item 9",
	    "price": "$9"
	}, {
	    "id": 10,
	    "name": "Item 10",
	    "price": "$10"
	}, {
	    "id": 11,
	    "name": "Item 11",
	    "price": "$11"
	}, {
	    "id": 12,
	    "name": "Item 12",
	    "price": "$12"
	}, {
	    "id": 13,
	    "name": "Item 13",
	    "price": "$13"
	}, {
	    "id": 14,
	    "name": "Item 14",
	    "price": "$14"
	}, {
	    "id": 15,
	    "name": "Item 15",
	    "price": "$15"
	}, {
	    "id": 16,
	    "name": "Item 16",
	    "price": "$16"
	}, {
	    "id": 17,
	    "name": "Item 17",
	    "price": "$17"
	}, {
	    "id": 18,
	    "name": "Item 18",
	    "price": "$18"
	}, {
	    "id": 19,
	    "name": "Item 19",
	    "price": "$19"
	}, {
	    "id": 20,
	    "name": "Item 20",
	    "price": "$20"
	}];
	exports.default = {
	    data: function data() {
	        return {
	            srefresh: false,
	            tData: sData,
	            test1: 2,
	            dob: {
	                adata: [{
	                    "id": 18,
	                    "name": "Item 18",
	                    "price": "$18"
	                }, {
	                    "id": 19,
	                    "name": "Item 19",
	                    "price": "$19"
	                }]
	            }
	        };
	    },
	    components: {
	        dataTable: dataTable
	    }
	};
	// </script>

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(88)
	__vue_script__ = __webpack_require__(92)
	__vue_template__ = __webpack_require__(98)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\components\\DataTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(89);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(91)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(89, function() {
				var newContent = __webpack_require__(89);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(90)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 90 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	
	//     <div>
	
	//         <div id="toolbar">
	
	//             <select class="form-control">
	
	//                 <option value="">导出本页</option>
	
	//                 <option value="all">导出全部</option>
	
	//                 <option value="selected">导出选择数据</option>
	
	//             </select>
	
	//         </div>
	
	//         <table id="table"
	
	//                data-toolbar="#toolbar"
	
	//                data-toggle="table"
	
	//                data-click-to-select="true"
	
	//                data-search="true"
	
	//                :data-show-refresh="srefresh"
	
	//                data-show-toggle="true"
	
	//                data-show-columns="true"
	
	//                data-show-export="true"
	
	//                data-minimum-count-columns="2"
	
	//                data-show-pagination-switch="true"
	
	//                data-pagination="true"
	
	//                data-id-field="id"
	
	//                data-page-list="[10, 25, 50, 100, ALL]"
	
	//                data-show-footer="false">
	
	//             <thead>
	
	//             <tr>
	
	//                 <th data-field="state" data-checkbox="true"></th>
	
	//                 <th data-field="id">编码</th>
	
	//                 <th data-field="name">名称</th>
	
	//                 <th data-field="price">价格</th>
	
	//             </tr>
	
	//             </thead>
	
	//         </table>
	
	//     </div>
	
	// </template>
	
	// <script>
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	//    require("bootstrap-table/src/extensions/editable/bootstrap-table-editable.js")
	//    require("../../lib/bootstrap-editable.js")
	__webpack_require__(97);
	
	exports.default = {
	    props: {
	        srefresh: Boolean,
	        tdata: Array,
	        ttest: Number,
	        dob: Object
	
	    },
	    ready: function ready() {
	        var $table = $('#table');
	        $('#table').bootstrapTable({
	            data: this.tdata
	        });
	        $(function () {
	            $('#toolbar').find('select').change(function () {
	                $table.bootstrapTable('refreshOptions', {
	                    exportDataType: $(this).val()
	                });
	            });
	        });
	    }
	};
	// sometimes footer render error.

	// </script>

	// <style>

	// </style>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 93 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @author zhixin wen <wenzhixin2010@gmail.com>
	 * version: 1.8.1
	 * https://github.com/wenzhixin/bootstrap-table/
	 */
	
	!function ($) {
	    'use strict';
	
	    // TOOLS DEFINITION
	    // ======================
	
	    var cellHeight = 37, // update css if changed
	        cachedWidth = null,
	        arrowAsc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ' +
	        '0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBd' +
	        'qEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVo' +
	        'AADeemwtPcZI2wAAAABJRU5ErkJggg==',
	        arrowBoth = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X' +
	        'QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azio' +
	        'NZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4eut' +
	        's6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC',
	        arrowDesc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWj' +
	        'YBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJ' +
	        'zcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII= ';
	
	    // it only does '%s', and return '' when arguments are undefined
	    var sprintf = function (str) {
	        var args = arguments,
	            flag = true,
	            i = 1;
	
	        str = str.replace(/%s/g, function () {
	            var arg = args[i++];
	
	            if (typeof arg === 'undefined') {
	                flag = false;
	                return '';
	            }
	            return arg;
	        });
	        return flag ? str : '';
	    };
	
	    var getPropertyFromOther = function (list, from, to, value) {
	        var result = '';
	        $.each(list, function (i, item) {
	            if (item[from] === value) {
	                result = item[to];
	                return false;
	            }
	            return true;
	        });
	        return result;
	    };
	
	    var getFieldIndex = function (columns, field) {
	        var index = -1;
	
	        $.each(columns, function (i, column) {
	            if (column.field === field) {
	                index = i;
	                return false;
	            }
	            return true;
	        });
	        return index;
	    };
	
	    var getScrollBarWidth = function () {
	        if (cachedWidth === null) {
	            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
	                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
	                w1, w2;
	
	            outer.append(inner);
	            $('body').append(outer);
	
	            w1 = inner[0].offsetWidth;
	            outer.css('overflow', 'scroll');
	            w2 = inner[0].offsetWidth;
	
	            if (w1 === w2) {
	                w2 = outer[0].clientWidth;
	            }
	
	            outer.remove();
	            cachedWidth = w1 - w2;
	        }
	        return cachedWidth;
	    };
	
	    var calculateObjectValue = function (self, name, args, defaultValue) {
	        var func = name;
	
	        if (typeof name === 'string') {
	            // support obj.func1.func2
	            var names = name.split('.');
	
	            if (names.length > 1) {
	                func = window;
	                $.each(names, function (i, f) {
	                    func = func[f];
	                });
	            } else {
	                func = window[name];
	            }
	        }
	        if (typeof func === 'object') {
	            return func;
	        }
	        if (typeof func === 'function') {
	            return func.apply(self, args);
	        }
	        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
	            return sprintf.apply(this, [name].concat(args));
	        }
	        return defaultValue;
	    };
	
	    var escapeHTML = function (text) {
	        if (typeof text === 'string') {
	            return text
	                .replace(/&/g, "&amp;")
	                .replace(/</g, "&lt;")
	                .replace(/>/g, "&gt;")
	                .replace(/"/g, "&quot;")
	                .replace(/'/g, "&#039;");
	        }
	        return text;
	    };
	
	    var getRealHeight = function ($el) {
	        var height = 0;
	        $el.children().each(function () {
	            if (height < $(this).outerHeight(true)) {
	                height = $(this).outerHeight(true);
	            }
	        });
	        return height;
	    };
	
	    var getRealDataAttr = function (dataAttr) {
	        for (var attr in dataAttr) {
	            var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();
	            if (auxAttr !== attr) {
	                dataAttr[auxAttr] = dataAttr[attr];
	                delete dataAttr[attr];
	            }
	        }
	
	        return dataAttr;
	    };
	
	    // BOOTSTRAP TABLE CLASS DEFINITION
	    // ======================
	
	    var BootstrapTable = function (el, options) {
	        this.options = options;
	        this.$el = $(el);
	        this.$el_ = this.$el.clone();
	        this.timeoutId_ = 0;
	        this.timeoutFooter_ = 0;
	
	        this.init();
	    };
	
	    BootstrapTable.DEFAULTS = {
	        classes: 'table table-hover',
	        height: undefined,
	        undefinedText: '-',
	        sortName: undefined,
	        sortOrder: 'asc',
	        striped: false,
	        columns: [],
	        data: [],
	        method: 'get',
	        url: undefined,
	        ajax: undefined,
	        cache: true,
	        contentType: 'application/json',
	        dataType: 'json',
	        ajaxOptions: {},
	        queryParams: function (params) {
	            return params;
	        },
	        queryParamsType: 'limit', // undefined
	        responseHandler: function (res) {
	            return res;
	        },
	        pagination: false,
	        sidePagination: 'client', // client or server
	        totalRows: 0, // server side need to set
	        pageNumber: 1,
	        pageSize: 10,
	        pageList: [10, 25, 50, 100],
	        paginationHAlign: 'right', //right, left
	        paginationVAlign: 'bottom', //bottom, top, both
	        paginationDetailHAlign: 'left', //right, left
	        paginationFirstText: '&laquo;',
	        paginationPreText: '&lsaquo;',
	        paginationNextText: '&rsaquo;',
	        paginationLastText: '&raquo;',
	        search: false,
	        searchAlign: 'right',
	        selectItemName: 'btSelectItem',
	        showHeader: true,
	        showFooter: false,
	        showColumns: false,
	        showPaginationSwitch: false,
	        showRefresh: false,
	        showToggle: false,
	        buttonsAlign: 'right',
	        smartDisplay: true,
	        minimumCountColumns: 1,
	        idField: undefined,
	        uniqueId: undefined,
	        cardView: false,
	        detailView: false,
	        detailFormatter: function (index, row) {
	            return '';
	        },
	        trimOnSearch: true,
	        clickToSelect: false,
	        singleSelect: false,
	        toolbar: undefined,
	        toolbarAlign: 'left',
	        checkboxHeader: true,
	        sortable: true,
	        maintainSelected: false,
	        searchTimeOut: 500,
	        searchText: '',
	        iconSize: undefined,
	        iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
	        icons: {
	            paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
	            paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
	            refresh: 'glyphicon-refresh icon-refresh',
	            toggle: 'glyphicon-list-alt icon-list-alt',
	            columns: 'glyphicon-th icon-th'
	        },
	
	        rowStyle: function (row, index) {
	            return {};
	        },
	
	        rowAttributes: function (row, index) {
	            return {};
	        },
	
	        onAll: function (name, args) {
	            return false;
	        },
	        onClickCell: function (field, value, row, $element) {
	            return false;
	        },
	        onDblClickCell: function (field, value, row, $element) {
	            return false;
	        },
	        onClickRow: function (item, $element) {
	            return false;
	        },
	        onDblClickRow: function (item, $element) {
	            return false;
	        },
	        onSort: function (name, order) {
	            return false;
	        },
	        onCheck: function (row) {
	            return false;
	        },
	        onUncheck: function (row) {
	            return false;
	        },
	        onCheckAll: function (rows) {
	            return false;
	        },
	        onUncheckAll: function (rows) {
	            return false;
	        },
	        onCheckSome: function(rows){
	            return false;
	        },
	        onUncheckSome: function(rows){
	            return false;
	        },
	        onLoadSuccess: function (data) {
	            return false;
	        },
	        onLoadError: function (status) {
	            return false;
	        },
	        onColumnSwitch: function (field, checked) {
	            return false;
	        },
	        onPageChange: function (number, size) {
	            return false;
	        },
	        onSearch: function (text) {
	            return false;
	        },
	        onToggle: function (cardView) {
	            return false;
	        },
	        onPreBody: function (data) {
	            return false;
	        },
	        onPostBody: function () {
	            return false;
	        },
	        onPostHeader: function () {
	            return false;
	        },
	        onExpandRow: function (index, row, $detail) {
	            return false;
	        },
	        onCollapseRow: function (index, row) {
	            return false;
	        }
	    };
	
	    BootstrapTable.LOCALES = [];
	
	    BootstrapTable.LOCALES['en-US'] = {
	        formatLoadingMessage: function () {
	            return 'Loading, please wait...';
	        },
	        formatRecordsPerPage: function (pageNumber) {
	            return sprintf('%s records per page', pageNumber);
	        },
	        formatShowingRows: function (pageFrom, pageTo, totalRows) {
	            return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
	        },
	        formatSearch: function () {
	            return 'Search';
	        },
	        formatNoMatches: function () {
	            return 'No matching records found';
	        },
	        formatPaginationSwitch: function () {
	            return 'Hide/Show pagination';
	        },
	        formatRefresh: function () {
	            return 'Refresh';
	        },
	        formatToggle: function () {
	            return 'Toggle';
	        },
	        formatColumns: function () {
	            return 'Columns';
	        },
	        formatAllRows: function () {
	            return 'All';
	        }
	    };
	
	    $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);
	
	    BootstrapTable.COLUMN_DEFAULTS = {
	        radio: false,
	        checkbox: false,
	        checkboxEnabled: true,
	        field: undefined,
	        title: undefined,
	        'class': undefined,
	        align: undefined, // left, right, center
	        halign: undefined, // left, right, center
	        falign: undefined, // left, right, center
	        valign: undefined, // top, middle, bottom
	        width: undefined,
	        sortable: false,
	        order: 'asc', // asc, desc
	        visible: true,
	        switchable: true,
	        clickToSelect: true,
	        formatter: undefined,
	        footerFormatter: undefined,
	        events: undefined,
	        sorter: undefined,
	        sortName: undefined,
	        cellStyle: undefined,
	        searchable: true,
	        cardVisible: true
	    };
	
	    BootstrapTable.EVENTS = {
	        'all.bs.table': 'onAll',
	        'click-cell.bs.table': 'onClickCell',
	        'dbl-click-cell.bs.table': 'onDblClickCell',
	        'click-row.bs.table': 'onClickRow',
	        'dbl-click-row.bs.table': 'onDblClickRow',
	        'sort.bs.table': 'onSort',
	        'check.bs.table': 'onCheck',
	        'uncheck.bs.table': 'onUncheck',
	        'check-all.bs.table': 'onCheckAll',
	        'uncheck-all.bs.table': 'onUncheckAll',
	        'check-some.bs.table': 'onCheckSome',
	        'uncheck-some.bs.table': 'onUncheckSome',
	        'load-success.bs.table': 'onLoadSuccess',
	        'load-error.bs.table': 'onLoadError',
	        'column-switch.bs.table': 'onColumnSwitch',
	        'page-change.bs.table': 'onPageChange',
	        'search.bs.table': 'onSearch',
	        'toggle.bs.table': 'onToggle',
	        'pre-body.bs.table': 'onPreBody',
	        'post-body.bs.table': 'onPostBody',
	        'post-header.bs.table': 'onPostHeader',
	        'expand-row.bs.table': 'onExpandRow',
	        'collapse-row.bs.table': 'onCollapseRow'
	    };
	
	    BootstrapTable.prototype.init = function () {
	        this.initContainer();
	        this.initTable();
	        this.initHeader();
	        this.initData();
	        this.initFooter();
	        this.initToolbar();
	        this.initPagination();
	        this.initBody();
	        this.initServer();
	    };
	
	    BootstrapTable.prototype.initContainer = function () {
	        this.$container = $([
	            '<div class="bootstrap-table">',
	            '<div class="fixed-table-toolbar"></div>',
	            this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
	                '<div class="fixed-table-pagination" style="clear: both;"></div>' :
	                '',
	            '<div class="fixed-table-container">',
	            '<div class="fixed-table-header"><table></table></div>',
	            '<div class="fixed-table-body">',
	            '<div class="fixed-table-loading">',
	            this.options.formatLoadingMessage(),
	            '</div>',
	            '</div>',
	            '<div class="fixed-table-footer"><table><tr></tr></table></div>',
	            this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ?
	                '<div class="fixed-table-pagination"></div>' :
	                '',
	            '</div>',
	            '</div>'].join(''));
	
	        this.$container.insertAfter(this.$el);
	        this.$tableContainer = this.$container.find('.fixed-table-container');
	        this.$tableHeader = this.$container.find('.fixed-table-header');
	        this.$tableBody = this.$container.find('.fixed-table-body');
	        this.$tableLoading = this.$container.find('.fixed-table-loading');
	        this.$tableFooter = this.$container.find('.fixed-table-footer');
	        this.$toolbar = this.$container.find('.fixed-table-toolbar');
	        this.$pagination = this.$container.find('.fixed-table-pagination');
	
	        this.$tableBody.append(this.$el);
	        this.$container.after('<div class="clearfix"></div>');
	
	        this.$el.addClass(this.options.classes);
	        if (this.options.striped) {
	            this.$el.addClass('table-striped');
	        }
	        if ($.inArray('table-no-bordered', this.options.classes.split(' ')) !== -1) {
	            this.$tableContainer.addClass('table-no-bordered');
	        }
	    };
	
	    BootstrapTable.prototype.initTable = function () {
	        var that = this,
	            columns = [],
	            data = [];
	
	        this.$header = this.$el.find('thead');
	        if (!this.$header.length) {
	            this.$header = $('<thead></thead>').appendTo(this.$el);
	        }
	        if (!this.$header.find('tr').length) {
	            this.$header.append('<tr></tr>');
	        }
	        this.$header.find('th').each(function () {
	            var column = $.extend({}, {
	                title: $(this).html(),
	                'class': $(this).attr('class')
	            }, $(this).data());
	
	            columns.push(column);
	        });
	        this.options.columns = $.extend(true, [], columns, this.options.columns);
	        $.each(this.options.columns, function (i, column) {
	            that.options.columns[i] = $.extend({}, BootstrapTable.COLUMN_DEFAULTS,
	                {field: i}, column); // when field is undefined, use index instead
	        });
	
	        // if options.data is setting, do not process tbody data
	        if (this.options.data.length) {
	            return;
	        }
	
	        this.$el.find('tbody tr').each(function () {
	            var row = {};
	
	            // save tr's id, class and data-* attributes
	            row._id = $(this).attr('id');
	            row._class = $(this).attr('class');
	            row._data = getRealDataAttr($(this).data());
	
	            $(this).find('td').each(function (i) {
	                var field = that.options.columns[i].field;
	
	                row[field] = $(this).html();
	                // save td's id, class and data-* attributes
	                row['_' + field + '_id'] = $(this).attr('id');
	                row['_' + field + '_class'] = $(this).attr('class');
	                row['_' + field + '_rowspan'] = $(this).attr('rowspan');
	                row['_' + field + '_data'] = getRealDataAttr($(this).data());
	            });
	            data.push(row);
	        });
	        this.options.data = data;
	    };
	
	    BootstrapTable.prototype.initHeader = function () {
	        var that = this,
	            visibleColumns = [],
	            html = [],
	            timeoutId = 0;
	
	        this.header = {
	            fields: [],
	            styles: [],
	            classes: [],
	            formatters: [],
	            events: [],
	            sorters: [],
	            sortNames: [],
	            cellStyles: [],
	            clickToSelects: [],
	            searchables: []
	        };
	
	        if (!this.options.cardView && this.options.detailView) {
	            html.push('<th class="detail"><div class="fht-cell"></div></th>');
	            visibleColumns.push({});
	        }
	
	        $.each(this.options.columns, function (i, column) {
	            var text = '',
	                halign = '', // header align style
	                align = '', // body align style
	                style = '',
	                class_ = sprintf(' class="%s"', column['class']),
	                order = that.options.sortOrder || column.order,
	                unitWidth = 'px',
	                width = column.width;
	
	            if (!column.visible) {
	                // Fix #229. Default Sort order is wrong
	                // if data-visible="false" is set on the field referenced by data-sort-name.
	                if (column.field === that.options.sortName) {
	                    that.header.fields.push(column.field);
	                }
	                return;
	            }
	
	            if (that.options.cardView && (!column.cardVisible)) {
	                return;
	            }
	
	            if (column.width !== undefined && (!that.options.cardView)) {
	                if (typeof column.width === 'string') {
	                    if (column.width.indexOf('%') !== -1) {
	                        unitWidth = '%';
	                    }
	                }
	            }
	            if (column.width && typeof column.width === 'string') {
	                width = column.width.replace('%', '').replace('px', '');
	            }
	
	            halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
	            align = sprintf('text-align: %s; ', column.align);
	            style = sprintf('vertical-align: %s; ', column.valign);
	            style += sprintf('width: %s%s; ', column.checkbox || column.radio ? 36 : width, unitWidth);
	
	            visibleColumns.push(column);
	            that.header.fields.push(column.field);
	            that.header.styles.push(align + style);
	            that.header.classes.push(class_);
	            that.header.formatters.push(column.formatter);
	            that.header.events.push(column.events);
	            that.header.sorters.push(column.sorter);
	            that.header.sortNames.push(column.sortName);
	            that.header.cellStyles.push(column.cellStyle);
	            that.header.clickToSelects.push(column.clickToSelect);
	            that.header.searchables.push(column.searchable);
	
	            html.push('<th',
	                column.checkbox || column.radio ?
	                    sprintf(' class="bs-checkbox %s"', column['class'] || '') :
	                    class_,
	                sprintf(' style="%s"', halign + style),
	                '>');
	
	            html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ?
	                'sortable' : ''));
	
	            text = column.title;
	
	            if (column.checkbox) {
	                if (!that.options.singleSelect && that.options.checkboxHeader) {
	                    text = '<input name="btSelectAll" type="checkbox" />';
	                }
	                that.header.stateField = column.field;
	            }
	            if (column.radio) {
	                text = '';
	                that.header.stateField = column.field;
	                that.options.singleSelect = true;
	            }
	
	            html.push(text);
	            html.push('</div>');
	            html.push('<div class="fht-cell"></div>');
	            html.push('</div>');
	            html.push('</th>');
	        });
	
	        this.$header.find('tr').html(html.join(''));
	        this.$header.find('th').each(function (i) {
	            $(this).data(visibleColumns[i]);
	        });
	        this.$container.off('click', '.th-inner').on('click', '.th-inner', function (event) {
	            if (that.options.sortable && $(this).parent().data().sortable) {
	                that.onSort(event);
	            }
	        });
	
	        if (!this.options.showHeader || this.options.cardView) {
	            this.$header.hide();
	            this.$tableHeader.hide();
	            this.$tableLoading.css('top', 0);
	        } else {
	            this.$header.show();
	            this.$tableHeader.show();
	            this.$tableLoading.css('top', cellHeight + 'px');
	            // Assign the correct sortable arrow
	            this.getCaretHtml();
	        }
	
	        this.$selectAll = this.$header.find('[name="btSelectAll"]');
	        this.$container.off('click', '[name="btSelectAll"]')
	            .on('click', '[name="btSelectAll"]', function () {
	                var checked = $(this).prop('checked');
	                that[checked ? 'checkAll' : 'uncheckAll']();
	            });
	    };
	
	    BootstrapTable.prototype.initFooter = function () {
	        if (!this.options.showFooter || this.options.cardView) {
	            this.$tableFooter.hide();
	        } else {
	            this.$tableFooter.show();
	        }
	    };
	
	    /**
	     * @param data
	     * @param type: append / prepend
	     */
	    BootstrapTable.prototype.initData = function (data, type) {
	        if (type === 'append') {
	            this.data = this.data.concat(data);
	        } else if (type === 'prepend') {
	            this.data = [].concat(data).concat(this.data);
	        } else {
	            this.data = data || this.options.data;
	        }
	
	        // Fix #839 Records deleted when adding new row on filtered table
	        if (type === 'append') {
	            this.options.data = this.options.data.concat(data);
	        } else if (type === 'prepend') {
	            this.options.data = [].concat(data).concat(this.options.data);
	        } else {
	            this.options.data = this.data;
	        }
	
	        if (this.options.sidePagination === 'server') {
	            return;
	        }
	        this.initSort();
	    };
	
	    BootstrapTable.prototype.initSort = function () {
	        var that = this,
	            name = this.options.sortName,
	            order = this.options.sortOrder === 'desc' ? -1 : 1,
	            index = $.inArray(this.options.sortName, this.header.fields);
	
	        if (index !== -1) {
	            this.data.sort(function (a, b) {
	                if (that.header.sortNames[index]) {
	                    name = that.header.sortNames[index];
	                }
	                var aa = a[name],
	                    bb = b[name],
	                    value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);
	
	                if (value !== undefined) {
	                    return order * value;
	                }
	
	                // Fix #161: undefined or null string sort bug.
	                if (aa === undefined || aa === null) {
	                    aa = '';
	                }
	                if (bb === undefined || bb === null) {
	                    bb = '';
	                }
	
	                // IF both values are numeric, do a numeric comparison
	                if ($.isNumeric(aa) && $.isNumeric(bb)) {
	                    // Convert numerical values form string to float.
	                    aa = parseFloat(aa);
	                    bb = parseFloat(bb);
	                    if (aa < bb) {
	                        return order * -1;
	                    }
	                    return order;
	                }
	
	                if (aa === bb) {
	                    return 0;
	                }
	
	                // If value is not a string, convert to string
	                if (typeof aa !== 'string') {
	                    aa = aa.toString();
	                }
	
	                if (aa.localeCompare(bb) === -1) {
	                    return order * -1;
	                }
	
	                return order;
	            });
	        }
	    };
	
	    BootstrapTable.prototype.onSort = function (event) {
	        var $this = $(event.currentTarget).parent(),
	            $this_ = this.$header.find('th').eq($this.index());
	
	        this.$header.add(this.$header_).find('span.order').remove();
	
	        if (this.options.sortName === $this.data('field')) {
	            this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
	        } else {
	            this.options.sortName = $this.data('field');
	            this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
	        }
	        this.trigger('sort', this.options.sortName, this.options.sortOrder);
	
	        $this.add($this_).data('order', this.options.sortOrder);
	
	        // Assign the correct sortable arrow
	        this.getCaretHtml();
	
	        if (this.options.sidePagination === 'server') {
	            this.initServer();
	            return;
	        }
	
	        this.initSort();
	        this.initBody();
	    };
	
	    BootstrapTable.prototype.initToolbar = function () {
	        var that = this,
	            html = [],
	            timeoutId = 0,
	            $keepOpen,
	            $search,
	            switchableCount = 0;
	
	        this.$toolbar.html('');
	
	        if (typeof this.options.toolbar === 'string') {
	            $(sprintf('<div class="bars pull-%s"></div>', this.options.toolbarAlign))
	                .appendTo(this.$toolbar)
	                .append($(this.options.toolbar));
	        }
	
	        // showColumns, showToggle, showRefresh
	        html = [sprintf('<div class="columns columns-%s btn-group pull-%s">',
	            this.options.buttonsAlign, this.options.buttonsAlign)];
	
	        if (typeof this.options.icons === 'string') {
	            this.options.icons = calculateObjectValue(null, this.options.icons);
	        }
	
	        if (this.options.showPaginationSwitch) {
	            html.push(sprintf('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',
	                this.options.formatPaginationSwitch()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown),
	                '</button>');
	        }
	
	        if (this.options.showRefresh) {
	            html.push(sprintf('<button class="btn btn-default' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="refresh" title="%s">',
	                this.options.formatRefresh()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh),
	                '</button>');
	        }
	
	        if (this.options.showToggle) {
	            html.push(sprintf('<button class="btn btn-default' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="toggle" title="%s">',
	                this.options.formatToggle()),
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle),
	                '</button>');
	        }
	
	        if (this.options.showColumns) {
	            html.push(sprintf('<div class="keep-open btn-group" title="%s">',
	                this.options.formatColumns()),
	                '<button type="button" class="btn btn-default' + (this.options.iconSize == undefined ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">',
	                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns),
	                ' <span class="caret"></span>',
	                '</button>',
	                '<ul class="dropdown-menu" role="menu">');
	
	            $.each(this.options.columns, function (i, column) {
	                if (column.radio || column.checkbox) {
	                    return;
	                }
	
	                if (that.options.cardView && (!column.cardVisible)) {
	                    return;
	                }
	
	                var checked = column.visible ? ' checked="checked"' : '';
	
	                if (column.switchable) {
	                    html.push(sprintf('<li>' +
	                        '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' +
	                        '</li>', column.field, i, checked, column.title));
	                    switchableCount++;
	                }
	            });
	            html.push('</ul>',
	                '</div>');
	        }
	
	        html.push('</div>');
	
	        // Fix #188: this.showToolbar is for extentions
	        if (this.showToolbar || html.length > 2) {
	            this.$toolbar.append(html.join(''));
	        }
	
	        if (this.options.showPaginationSwitch) {
	            this.$toolbar.find('button[name="paginationSwitch"]')
	                .off('click').on('click', $.proxy(this.togglePagination, this));
	        }
	
	        if (this.options.showRefresh) {
	            this.$toolbar.find('button[name="refresh"]')
	                .off('click').on('click', $.proxy(this.refresh, this));
	        }
	
	        if (this.options.showToggle) {
	            this.$toolbar.find('button[name="toggle"]')
	                .off('click').on('click', function () {
	                    that.toggleView();
	                });
	        }
	
	        if (this.options.showColumns) {
	            $keepOpen = this.$toolbar.find('.keep-open');
	
	            if (switchableCount <= this.options.minimumCountColumns) {
	                $keepOpen.find('input').prop('disabled', true);
	            }
	
	            $keepOpen.find('li').off('click').on('click', function (event) {
	                event.stopImmediatePropagation();
	            });
	            $keepOpen.find('input').off('click').on('click', function () {
	                var $this = $(this);
	
	                that.toggleColumn(getFieldIndex(that.options.columns, $(this).data('field')), $this.prop('checked'), false);
	                that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
	            });
	        }
	
	        if (this.options.search) {
	            html = [];
	            html.push(
	                '<div class="pull-' + this.options.searchAlign + ' search">',
	                sprintf('<input class="form-control' + (this.options.iconSize === undefined ? '' : ' input-' + this.options.iconSize) + '" type="text" placeholder="%s">',
	                    this.options.formatSearch()),
	                '</div>');
	
	            this.$toolbar.append(html.join(''));
	            $search = this.$toolbar.find('.search input');
	            $search.off('keyup drop').on('keyup drop', function (event) {
	                clearTimeout(timeoutId); // doesn't matter if it's 0
	                timeoutId = setTimeout(function () {
	                    that.onSearch(event);
	                }, that.options.searchTimeOut);
	            });
	
	            if (this.options.searchText !== '') {
	                $search.val(this.options.searchText);
	                clearTimeout(timeoutId); // doesn't matter if it's 0
	                timeoutId = setTimeout(function () {
	                    $search.trigger('keyup');
	                }, that.options.searchTimeOut);
	            }
	        }
	    };
	
	    BootstrapTable.prototype.onSearch = function (event) {
	        var text = $.trim($(event.currentTarget).val());
	
	        // trim search input
	        if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
	            $(event.currentTarget).val(text);
	        }
	
	        if (text === this.searchText) {
	            return;
	        }
	        this.searchText = text;
	
	        this.options.pageNumber = 1;
	        this.initSearch();
	        this.updatePagination();
	        this.trigger('search', text);
	    };
	
	    BootstrapTable.prototype.initSearch = function () {
	        var that = this;
	
	        if (this.options.sidePagination !== 'server') {
	            var s = this.searchText && this.searchText.toLowerCase();
	            var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
	
	            // Check filter
	            this.data = f ? $.grep(this.options.data, function (item, i) {
	                for (var key in f) {
	                    if (item[key] !== f[key]) {
	                        return false;
	                    }
	                }
	                return true;
	            }) : this.options.data;
	
	            this.data = s ? $.grep(this.data, function (item, i) {
	                for (var key in item) {
	                    key = $.isNumeric(key) ? parseInt(key, 10) : key;
	                    var value = item[key],
	                        column = that.options.columns[getFieldIndex(that.options.columns, key)],
	                        j = $.inArray(key, that.header.fields);
	
	                    // Fix #142: search use formated data
	                    value = calculateObjectValue(column,
	                        that.header.formatters[j],
	                        [value, item, i], value);
	
	                    var index = $.inArray(key, that.header.fields);
	                    if (index !== -1 && that.header.searchables[index] &&
	                        (typeof value === 'string' ||
	                            typeof value === 'number') &&
	                        (value + '').toLowerCase().indexOf(s) !== -1) {
	                        return true;
	                    }
	                }
	                return false;
	            }) : this.data;
	        }
	    };
	
	    BootstrapTable.prototype.initPagination = function () {
	        if (!this.options.pagination) {
	            this.$pagination.hide();
	            return;
	        } else {
	            this.$pagination.show();
	        }
	
	        var that = this,
	            html = [],
	            $allSelected = false,
	            i, from, to,
	            $pageList,
	            $first, $pre,
	            $next, $last,
	            $number,
	            data = this.getData();
	
	        if (this.options.sidePagination !== 'server') {
	            this.options.totalRows = data.length;
	        }
	
	        this.totalPages = 0;
	        if (this.options.totalRows) {
	            if (this.options.pageSize === this.options.formatAllRows()) {
	                this.options.pageSize = this.options.totalRows;
	                $allSelected = true;
	            } else if (this.options.pageSize === this.options.totalRows) {
	                // Fix #667 Table with pagination, multiple pages and a search that matches to one page throws exception
	                var pageLst = typeof this.options.pageList === 'string' ?
	                    this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').toLowerCase().split(',') :
	                    this.options.pageList;
	                if (pageLst.indexOf(this.options.formatAllRows().toLowerCase()) > -1) {
	                    $allSelected = true;
	                }
	            }
	
	            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;
	
	            this.options.totalPages = this.totalPages;
	        }
	        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
	            this.options.pageNumber = this.totalPages;
	        }
	
	        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
	        this.pageTo = this.options.pageNumber * this.options.pageSize;
	        if (this.pageTo > this.options.totalRows) {
	            this.pageTo = this.options.totalRows;
	        }
	
	        html.push(
	            '<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">',
	            '<span class="pagination-info">',
	            this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows),
	            '</span>');
	
	        html.push('<span class="page-list">');
	
	        var pageNumber = [
	                sprintf('<span class="btn-group %s">', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
	                    'dropdown' : 'dropup'),
	                '<button type="button" class="btn btn-default ' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">',
	                '<span class="page-size">',
	                $allSelected ? this.options.formatAllRows() : this.options.pageSize,
	                '</span>',
	                ' <span class="caret"></span>',
	                '</button>',
	                '<ul class="dropdown-menu" role="menu">'],
	            pageList = this.options.pageList;
	
	        if (typeof this.options.pageList === 'string') {
	            var list = this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').split(',');
	
	            pageList = [];
	            $.each(list, function (i, value) {
	                pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() ?
	                    that.options.formatAllRows() : +value);
	            });
	        }
	
	        $.each(pageList, function (i, page) {
	            if (!that.options.smartDisplay || i === 0 || pageList[i - 1] <= that.options.totalRows) {
	                var active;
	                if ($allSelected) {
	                    active = page === that.options.formatAllRows() ? ' class="active"' : '';
	                } else {
	                    active = page === that.options.pageSize ? ' class="active"' : '';
	                }
	                pageNumber.push(sprintf('<li%s><a href="javascript:void(0)">%s</a></li>', active, page));
	            }
	        });
	        pageNumber.push('</ul></span>');
	
	        html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
	        html.push('</span>');
	
	        html.push('</div>',
	            '<div class="pull-' + this.options.paginationHAlign + ' pagination">',
	            '<ul class="pagination' + (this.options.iconSize === undefined ? '' : ' pagination-' + this.options.iconSize) + '">',
	            '<li class="page-first"><a href="javascript:void(0)">' + this.options.paginationFirstText + '</a></li>',
	            '<li class="page-pre"><a href="javascript:void(0)">' + this.options.paginationPreText + '</a></li>');
	
	        if (this.totalPages < 5) {
	            from = 1;
	            to = this.totalPages;
	        } else {
	            from = this.options.pageNumber - 2;
	            to = from + 4;
	            if (from < 1) {
	                from = 1;
	                to = 5;
	            }
	            if (to > this.totalPages) {
	                to = this.totalPages;
	                from = to - 4;
	            }
	        }
	        for (i = from; i <= to; i++) {
	            html.push('<li class="page-number' + (i === this.options.pageNumber ? ' active' : '') + '">',
	                '<a href="javascript:void(0)">', i, '</a>',
	                '</li>');
	        }
	
	        html.push(
	            '<li class="page-next"><a href="javascript:void(0)">' + this.options.paginationNextText + '</a></li>',
	            '<li class="page-last"><a href="javascript:void(0)">' + this.options.paginationLastText + '</a></li>',
	            '</ul>',
	            '</div>');
	
	        this.$pagination.html(html.join(''));
	
	        $pageList = this.$pagination.find('.page-list a');
	        $first = this.$pagination.find('.page-first');
	        $pre = this.$pagination.find('.page-pre');
	        $next = this.$pagination.find('.page-next');
	        $last = this.$pagination.find('.page-last');
	        $number = this.$pagination.find('.page-number');
	
	        if (this.options.pageNumber <= 1) {
	            $first.addClass('disabled');
	            $pre.addClass('disabled');
	        }
	        if (this.options.pageNumber >= this.totalPages) {
	            $next.addClass('disabled');
	            $last.addClass('disabled');
	        }
	        if (this.options.smartDisplay) {
	            if (this.totalPages <= 1) {
	                this.$pagination.find('div.pagination').hide();
	            }
	            if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
	                this.$pagination.find('span.page-list').hide();
	            }
	
	            // when data is empty, hide the pagination
	            this.$pagination[this.getData().length ? 'show' : 'hide']();
	        }
	        if ($allSelected) {
	            this.options.pageSize = this.options.formatAllRows();
	        }
	        $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
	        $first.off('click').on('click', $.proxy(this.onPageFirst, this));
	        $pre.off('click').on('click', $.proxy(this.onPagePre, this));
	        $next.off('click').on('click', $.proxy(this.onPageNext, this));
	        $last.off('click').on('click', $.proxy(this.onPageLast, this));
	        $number.off('click').on('click', $.proxy(this.onPageNumber, this));
	    };
	
	    BootstrapTable.prototype.updatePagination = function (event) {
	        // Fix #171: IE disabled button can be clicked bug.
	        if (event && $(event.currentTarget).hasClass('disabled')) {
	            return;
	        }
	
	        if (!this.options.maintainSelected) {
	            this.resetRows();
	        }
	
	        this.initPagination();
	        if (this.options.sidePagination === 'server') {
	            this.initServer();
	        } else {
	            this.initBody();
	        }
	
	        this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
	    };
	
	    BootstrapTable.prototype.onPageListChange = function (event) {
	        var $this = $(event.currentTarget);
	
	        $this.parent().addClass('active').siblings().removeClass('active');
	        this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ?
	            this.options.formatAllRows() : +$this.text();
	        this.$toolbar.find('.page-size').text(this.options.pageSize);
	
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.onPageFirst = function (event) {
	        this.options.pageNumber = 1;
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.onPagePre = function (event) {
	        this.options.pageNumber--;
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.onPageNext = function (event) {
	        this.options.pageNumber++;
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.onPageLast = function (event) {
	        this.options.pageNumber = this.totalPages;
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.onPageNumber = function (event) {
	        if (this.options.pageNumber === +$(event.currentTarget).text()) {
	            return;
	        }
	        this.options.pageNumber = +$(event.currentTarget).text();
	        this.updatePagination(event);
	    };
	
	    BootstrapTable.prototype.initBody = function (fixedScroll) {
	        var that = this,
	            html = [],
	            data = this.getData();
	
	        this.trigger('pre-body', data);
	
	        this.$body = this.$el.find('tbody');
	        if (!this.$body.length) {
	            this.$body = $('<tbody></tbody>').appendTo(this.$el);
	        }
	
	        //Fix #389 Bootstrap-table-flatJSON is not working
	
	        if (!this.options.pagination || this.options.sidePagination === 'server') {
	            this.pageFrom = 1;
	            this.pageTo = data.length;
	        }
	
	        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
	            var key,
	                item = data[i],
	                style = {},
	                csses = [],
	                data_ = '',
	                attributes = {},
	                htmlAttributes = [];
	
	            style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);
	
	            if (style && style.css) {
	                for (key in style.css) {
	                    csses.push(key + ': ' + style.css[key]);
	                }
	            }
	
	            attributes = calculateObjectValue(this.options,
	                this.options.rowAttributes, [item, i], attributes);
	
	            if (attributes) {
	                for (key in attributes) {
	                    htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
	                }
	            }
	
	            if (item._data && !$.isEmptyObject(item._data)) {
	                $.each(item._data, function (k, v) {
	                    // ignore data-index
	                    if (k === 'index') {
	                        return;
	                    }
	                    data_ += sprintf(' data-%s="%s"', k, v);
	                });
	            }
	
	            html.push('<tr',
	                sprintf(' %s', htmlAttributes.join(' ')),
	                sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
	                sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
	                sprintf(' data-index="%s"', i),
	                sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
	                sprintf('%s', data_),
	                '>'
	            );
	
	            if (this.options.cardView) {
	                html.push(sprintf('<td colspan="%s">', this.header.fields.length));
	            }
	
	            if (!this.options.cardView && this.options.detailView) {
	                html.push('<td>',
	                    '<a class="detail-icon" href="javascript:">',
	                    '<i class="glyphicon glyphicon-plus icon-plus"></i>',
	                    '</a>',
	                    '</td>');
	            }
	
	            $.each(this.header.fields, function (j, field) {
	                var text = '',
	                    value = item[field],
	                    type = '',
	                    cellStyle = {},
	                    id_ = '',
	                    class_ = that.header.classes[j],
	                    data_ = '',
	                    rowspan_ = '',
	                    column = that.options.columns[getFieldIndex(that.options.columns, field)];
	
	                style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));
	
	                value = calculateObjectValue(column,
	                    that.header.formatters[j], [value, item, i], value);
	
	                // handle td's id and class
	                if (item['_' + field + '_id']) {
	                    id_ = sprintf(' id="%s"', item['_' + field + '_id']);
	                }
	                if (item['_' + field + '_class']) {
	                    class_ = sprintf(' class="%s"', item['_' + field + '_class']);
	                }
	                if (item['_' + field + '_rowspan']) {
	                    rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
	                }
	                cellStyle = calculateObjectValue(that.header,
	                    that.header.cellStyles[j], [value, item, i], cellStyle);
	                if (cellStyle.classes) {
	                    class_ = sprintf(' class="%s"', cellStyle.classes);
	                }
	                if (cellStyle.css) {
	                    var csses_ = [];
	                    for (var key in cellStyle.css) {
	                        csses_.push(key + ': ' + cellStyle.css[key]);
	                    }
	                    style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
	                }
	
	                if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
	                    $.each(item['_' + field + '_data'], function (k, v) {
	                        // ignore data-index
	                        if (k === 'index') {
	                            return;
	                        }
	                        data_ += sprintf(' data-%s="%s"', k, v);
	                    });
	                }
	
	                if (column.checkbox || column.radio) {
	                    type = column.checkbox ? 'checkbox' : type;
	                    type = column.radio ? 'radio' : type;
	
	                    text = [that.options.cardView ?
	                        '<div class="card-view">' : '<td class="bs-checkbox">',
	                        '<input' +
	                            sprintf(' data-index="%s"', i) +
	                            sprintf(' name="%s"', that.options.selectItemName) +
	                            sprintf(' type="%s"', type) +
	                            sprintf(' value="%s"', item[that.options.idField]) +
	                            sprintf(' checked="%s"', value === true ||
	                                (value && value.checked) ? 'checked' : undefined) +
	                            sprintf(' disabled="%s"', !column.checkboxEnabled ||
	                                (value && value.disabled) ? 'disabled' : undefined) +
	                            ' />',
	                        that.options.cardView ? '</div>' : '</td>'].join('');
	
	                    item[that.header.stateField] = value === true || (value && value.checked);
	                } else {
	                    value = typeof value === 'undefined' || value === null ?
	                        that.options.undefinedText : value;
	
	                    text = that.options.cardView ?
	                        ['<div class="card-view">',
	                            that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style,
	                                getPropertyFromOther(that.options.columns, 'field', 'title', field)) : '',
	                            sprintf('<span class="value">%s</span>', value),
	                            '</div>'].join('') :
	                        [sprintf('<td%s %s %s %s %s>', id_, class_, style, data_, rowspan_),
	                            value,
	                            '</td>'].join('');
	
	                    // Hide empty data on Card view when smartDisplay is set to true.
	                    if (that.options.cardView && that.options.smartDisplay && value === '') {
	                        text = '';
	                    }
	                }
	
	                html.push(text);
	            });
	
	            if (this.options.cardView) {
	                html.push('</td>');
	            }
	
	            html.push('</tr>');
	        }
	
	        // show no records
	        if (!html.length) {
	            html.push('<tr class="no-records-found">',
	                sprintf('<td colspan="%s">%s</td>',
	                    this.$header.find('th').length, this.options.formatNoMatches()),
	                '</tr>');
	        }
	
	        this.$body.html(html.join(''));
	
	        if (!fixedScroll) {
	            this.scrollTo(0);
	        }
	
	        // click to select by column
	        this.$body.find('> tr > td').off('click').on('click', function () {
	            var $td = $(this),
	                $tr = $td.parent(),
	                item = that.data[$tr.data('index')],
	                cellIndex = $td[0].cellIndex,
	                $headerCell = that.$header.find('th:eq(' + cellIndex + ')'),
	                field = $headerCell.data('field'),
	                value = item[field];
	            that.trigger('click-cell', field, value, item, $td);
	            that.trigger('click-row', item, $tr);
	            // if click to select - then trigger the checkbox/radio click
	            if (that.options.clickToSelect) {
	                if (that.header.clickToSelects[$tr.children().index($(this))]) {
	                    $tr.find(sprintf('[name="%s"]',
	                        that.options.selectItemName))[0].click(); // #144: .trigger('click') bug
	                }
	            }
	        });
	        this.$body.find('> tr > td').off('dblclick').on('dblclick', function () {
	            var $td = $(this),
	                $tr = $td.parent(),
	                item = that.data[$tr.data('index')],
	                cellIndex = $td[0].cellIndex,
	                $headerCell = that.$header.find('th:eq(' + cellIndex + ')'),
	                field = $headerCell.data('field'),
	                value = item[field];
	            that.trigger('dbl-click-cell', field, value, item, $td);
	            that.trigger('dbl-click-row', item, $tr);
	        });
	
	        this.$body.find('> tr > td > .detail-icon').off('click').on('click', function () {
	            var $this = $(this),
	                $tr = $this.parent().parent(),
	                index = $tr.data('index'),
	                row = that.options.data[index];
	
	            // remove and update
	            if ($tr.next().is('tr.detail-view')) {
	                $this.find('i').attr('class', 'glyphicon glyphicon-plus icon-plus');
	                $tr.next().remove();
	                that.trigger('collapse-row', index, row);
	            } else {
	                $this.find('i').attr('class', 'glyphicon glyphicon-minus icon-minus');
	                $tr.after(sprintf('<tr class="detail-view"><td colspan="%s">%s</td></tr>',
	                    $tr.find('td').length, calculateObjectValue(that.options,
	                        that.options.detailFormatter, [index, row], '')));
	                that.trigger('expand-row', index, row, $tr.next().find('td'));
	            }
	            that.resetView();
	        });
	
	        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
	        this.$selectItem.off('click').on('click', function (event) {
	            event.stopImmediatePropagation();
	
	            var checked = $(this).prop('checked'),
	                row = that.data[$(this).data('index')];
	
	            row[that.header.stateField] = checked;
	
	            if (that.options.singleSelect) {
	                that.$selectItem.not(this).each(function () {
	                    that.data[$(this).data('index')][that.header.stateField] = false;
	                });
	                that.$selectItem.filter(':checked').not(this).prop('checked', false);
	            }
	
	            that.updateSelected();
	            that.trigger(checked ? 'check' : 'uncheck', row);
	        });
	
	        $.each(this.header.events, function (i, events) {
	            if (!events) {
	                return;
	            }
	            // fix bug, if events is defined with namespace
	            if (typeof events === 'string') {
	                events = calculateObjectValue(null, events);
	            }
	            if (!that.options.cardView && that.options.detailView) {
	                i += 1;
	            }
	            for (var key in events) {
	                that.$body.find('tr').each(function () {
	                    var $tr = $(this),
	                        $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(i),
	                        index = key.indexOf(' '),
	                        name = key.substring(0, index),
	                        el = key.substring(index + 1),
	                        func = events[key];
	
	                    $td.find(el).off(name).on(name, function (e) {
	                        var index = $tr.data('index'),
	                            row = that.data[index],
	                            value = row[that.header.fields[i]];
	
	                        func.apply(this, [e, value, row, index]);
	                    });
	                });
	            }
	        });
	
	        this.updateSelected();
	        this.resetView();
	
	        this.trigger('post-body');
	    };
	
	    BootstrapTable.prototype.initServer = function (silent, query) {
	        var that = this,
	            data = {},
	            params = {
	                pageSize: this.options.pageSize === this.options.formatAllRows() ?
	                    this.options.totalRows : this.options.pageSize,
	                pageNumber: this.options.pageNumber,
	                searchText: this.searchText,
	                sortName: this.options.sortName,
	                sortOrder: this.options.sortOrder
	            },
	            request;
	
	        if (!this.options.url && !this.options.ajax) {
	            return;
	        }
	
	        if (this.options.queryParamsType === 'limit') {
	            params = {
	                search: params.searchText,
	                sort: params.sortName,
	                order: params.sortOrder
	            };
	            if (this.options.pagination) {
	                params.limit = this.options.pageSize === this.options.formatAllRows() ?
	                    this.options.totalRows : this.options.pageSize;
	                params.offset = this.options.pageSize === this.options.formatAllRows() ?
	                    0 : this.options.pageSize * (this.options.pageNumber - 1);
	            }
	        }
	
	        if (!($.isEmptyObject(this.filterColumnsPartial))) {
	            params['filter'] = JSON.stringify(this.filterColumnsPartial, null);
	        }
	
	        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);
	
	        $.extend(data, query || {});
	
	        // false to stop request
	        if (data === false) {
	            return;
	        }
	
	        if (!silent) {
	            this.$tableLoading.show();
	        }
	        request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
	            type: this.options.method,
	            url: this.options.url,
	            data: this.options.contentType === 'application/json' && this.options.method === 'post' ?
	                JSON.stringify(data) : data,
	            cache: this.options.cache,
	            contentType: this.options.contentType,
	            dataType: this.options.dataType,
	            success: function (res) {
	                res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);
	
	                that.load(res);
	                that.trigger('load-success', res);
	            },
	            error: function (res) {
	                that.trigger('load-error', res.status);
	            },
	            complete: function () {
	                if (!silent) {
	                    that.$tableLoading.hide();
	                }
	            }
	        });
	
	        if (this.options.ajax) {
	            calculateObjectValue(this, this.options.ajax, [request], null);
	        } else {
	            $.ajax(request);
	        }
	    };
	
	    BootstrapTable.prototype.getCaretHtml = function () {
	        var that = this;
	
	        $.each(this.$header.find('th'), function (i, th) {
	            if ($(th).data('field') === that.options.sortName) {
	                $(th).find('.sortable').css('background-image', 'url(' + (that.options.sortOrder === 'desc' ? arrowDesc : arrowAsc) + ')');
	            } else {
	                $(th).find('.sortable').css('background-image', 'url(' + arrowBoth +')');
	            }
	        });
	    };
	
	    BootstrapTable.prototype.updateSelected = function () {
	        var checkAll = this.$selectItem.filter(':enabled').length ===
	            this.$selectItem.filter(':enabled').filter(':checked').length;
	
	        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);
	
	        this.$selectItem.each(function () {
	            $(this).parents('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
	        });
	    };
	
	    BootstrapTable.prototype.updateRows = function () {
	        var that = this;
	
	        this.$selectItem.each(function () {
	            that.data[$(this).data('index')][that.header.stateField] = $(this).prop('checked');
	        });
	    };
	
	    BootstrapTable.prototype.resetRows = function () {
	        var that = this;
	
	        $.each(this.data, function (i, row) {
	            that.$selectAll.prop('checked', false);
	            that.$selectItem.prop('checked', false);
	            row[that.header.stateField] = false;
	        });
	    };
	
	    BootstrapTable.prototype.trigger = function (name) {
	        var args = Array.prototype.slice.call(arguments, 1);
	
	        name += '.bs.table';
	        this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
	        this.$el.trigger($.Event(name), args);
	
	        this.options.onAll(name, args);
	        this.$el.trigger($.Event('all.bs.table'), [name, args]);
	    };
	
	    BootstrapTable.prototype.resetHeader = function () {
	        // fix #61: the hidden table reset header bug.
	        // fix bug: get $el.css('width') error sometime (height = 500)
	        clearTimeout(this.timeoutId_);
	        this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
	    };
	
	    BootstrapTable.prototype.fitHeader = function () {
	        var that = this,
	            fixedBody,
	            scrollWidth;
	
	        if (that.$el.is(':hidden')) {
	            that.timeoutFooter_ = setTimeout($.proxy(that.fitHeader, that), 100);
	            return;
	        }
	        fixedBody = this.$tableBody.get(0);
	
	        scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
	            fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.height() ?
	            getScrollBarWidth() : 0;
	
	        this.$el.css('margin-top', -this.$header.height());
	        this.$header_ = this.$header.clone(true, true);
	        this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
	        this.$tableHeader.css({
	            'margin-right': scrollWidth
	        }).find('table').css('width', this.$el.css('width'))
	            .html('').attr('class', this.$el.attr('class'))
	            .append(this.$header_);
	
	        // fix bug: $.data() is not working as expected after $.append()
	        this.$header.find('th').each(function (i) {
	            that.$header_.find('th').eq(i).data($(this).data());
	        });
	
	        this.$body.find('tr:first-child:not(.no-records-found) > *').each(function (i) {
	            that.$header_.find('div.fht-cell').eq(i).width($(this).innerWidth());
	        });
	        // horizontal scroll event
	        // TODO: it's probably better improving the layout than binding to scroll event
	        this.$tableBody.off('scroll').on('scroll', function () {
	            that.$tableHeader.scrollLeft($(this).scrollLeft());
	        });
	        that.trigger('post-header');
	    };
	
	    BootstrapTable.prototype.resetFooter = function () {
	        var that = this,
	            data = that.getData(),
	            html = [];
	
	        if (!this.options.showFooter || this.options.cardView) { //do nothing
	            return;
	        }
	
	        if (!this.options.cardView && this.options.detailView) {
	            html.push('<td></td>');
	        }
	
	        $.each(this.options.columns, function (i, column) {
	            var falign = '', // footer align style
	                style = '',
	                class_ = sprintf(' class="%s"', column['class']);
	
	            if (!column.visible) {
	                return;
	            }
	
	            if (that.options.cardView && (!column.cardVisible)) {
	                return;
	            }
	
	            falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
	            style = sprintf('vertical-align: %s; ', column.valign);
	
	            html.push('<td', class_, sprintf(' style="%s"', falign + style), '>');
	
	            html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');
	            html.push('</td>');
	        });
	
	        this.$tableFooter.find('tr').html(html.join(''));
	        clearTimeout(this.timeoutFooter_);
	        this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this),
	            this.$el.is(':hidden') ? 100 : 0);
	    };
	
	    BootstrapTable.prototype.fitFooter = function () {
	        var that = this,
	            $footerTd,
	            elWidth,
	            scrollWidth;
	
	        clearTimeout(this.timeoutFooter_);
	        if (this.$el.is(':hidden')) {
	            this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
	            return;
	        }
	
	        elWidth = this.$el.css('width');
	        scrollWidth = elWidth > this.$tableBody.width() ? getScrollBarWidth() : 0;
	
	        this.$tableFooter.css({
	            'margin-right': scrollWidth
	        }).find('table').css('width', elWidth)
	            .attr('class', this.$el.attr('class'));
	
	        $footerTd = this.$tableFooter.find('td');
	
	        this.$tableBody.find('tbody tr:first-child:not(.no-records-found) > td').each(function (i) {
	            $footerTd.eq(i).outerWidth($(this).outerWidth());
	        });
	    };
	
	    BootstrapTable.prototype.toggleColumn = function (index, checked, needUpdate) {
	        if (index === -1) {
	            return;
	        }
	        this.options.columns[index].visible = checked;
	        this.initHeader();
	        this.initSearch();
	        this.initPagination();
	        this.initBody();
	
	        if (this.options.showColumns) {
	            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);
	
	            if (needUpdate) {
	                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
	            }
	
	            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
	                $items.filter(':checked').prop('disabled', true);
	            }
	        }
	    };
	
	    BootstrapTable.prototype.toggleRow = function (index, isIdField, visible) {
	        if (index === -1) {
	            return;
	        }
	
	        $(this.$body[0]).children().filter(sprintf(isIdField ? '[data-uniqueid="%s"]' : '[data-index="%s"]', index))
	            [visible ? 'show' : 'hide']();
	    };
	
	    // PUBLIC FUNCTION DEFINITION
	    // =======================
	
	    BootstrapTable.prototype.resetView = function (params) {
	        var padding = 0;
	
	        if (params && params.height) {
	            this.options.height = params.height;
	        }
	
	        this.$selectAll.prop('checked', this.$selectItem.length > 0 &&
	            this.$selectItem.length === this.$selectItem.filter(':checked').length);
	
	        if (this.options.height) {
	            var toolbarHeight = getRealHeight(this.$toolbar),
	                paginationHeight = getRealHeight(this.$pagination),
	                height = this.options.height - toolbarHeight - paginationHeight;
	
	            this.$tableContainer.css('height', height + 'px');
	        }
	
	        if (this.options.cardView) {
	            // remove the element css
	            this.$el.css('margin-top', '0');
	            this.$tableContainer.css('padding-bottom', '0');
	            return;
	        }
	
	        if (this.options.showHeader && this.options.height) {
	            this.$tableHeader.show();
	            this.resetHeader();
	            padding += cellHeight;
	        } else {
	            this.$tableHeader.hide();
	            this.trigger('post-header');
	        }
	
	        if (this.options.showFooter) {
	            this.resetFooter();
	            if (this.options.height) {
	                padding += cellHeight;
	            }
	        }
	
	        // Assign the correct sortable arrow
	        this.getCaretHtml();
	        this.$tableContainer.css('padding-bottom', padding + 'px');
	    };
	
	    BootstrapTable.prototype.getData = function (useCurrentPage) {
	        return (this.searchText
	            || !$.isEmptyObject(this.filterColumns)
	            || !$.isEmptyObject(this.filterColumnsPartial)) ?
	            (useCurrentPage ? this.data.slice(this.pageFrom -1, this.pageTo)
	                : this.data) :
	            (useCurrentPage ? this.options.data.slice(this.pageFrom - 1, this.pageTo)
	                : this.options.data);
	    };
	
	    BootstrapTable.prototype.load = function (data) {
	        var fixedScroll = false;
	
	        // #431: support pagination
	        if (this.options.sidePagination === 'server') {
	            this.options.totalRows = data.total;
	            fixedScroll = data.fixedScroll;
	            data = data.rows;
	        } else if (!$.isArray(data)) { // support fixedScroll
	            fixedScroll = data.fixedScroll;
	            data = data.data;
	        }
	
	        this.initData(data);
	        this.initSearch();
	        this.initPagination();
	        this.initBody(fixedScroll);
	    };
	
	    BootstrapTable.prototype.append = function (data) {
	        this.initData(data, 'append');
	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.prepend = function (data) {
	        this.initData(data, 'prepend');
	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.remove = function (params) {
	        var len = this.options.data.length,
	            i, row;
	
	        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
	            return;
	        }
	
	        for (i = len - 1; i >= 0; i--) {
	            row = this.options.data[i];
	
	            if (!row.hasOwnProperty(params.field)) {
	                continue;
	            }
	            if ($.inArray(row[params.field], params.values) !== -1) {
	                this.options.data.splice(i, 1);
	            }
	        }
	
	        if (len === this.options.data.length) {
	            return;
	        }
	
	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.removeAll = function () {
	        if (this.options.data.length > 0) {
	            this.options.data.splice(0, this.options.data.length);
	            this.initSearch();
	            this.initPagination();
	            this.initBody(true);
	        }
	    };
	
	    BootstrapTable.prototype.removeByUniqueId = function (id) {
	        var uniqueId = this.options.uniqueId,
	            len = this.options.data.length,
	            i, row;
	
	        for (i = len - 1; i >= 0; i--) {
	            row = this.options.data[i];
	
	            if (!row.hasOwnProperty(uniqueId)) {
	                continue;
	            }
	
	            if (typeof row[uniqueId] === 'string') {
	                id = id.toString();
	            } else if (typeof row[uniqueId] === 'number') {
	                if ((Number(row[uniqueId]) === row[uniqueId]) && (row[uniqueId] % 1 === 0)) {
	                    id = parseInt(id);
	                } else if ((row[uniqueId] === Number(row[uniqueId])) && (row[uniqueId] !== 0)) {
	                    id = parseFloat(id);
	                }
	            }
	
	            if (row[uniqueId] === id) {
	                this.options.data.splice(i, 1);
	            }
	        }
	
	        if (len === this.options.data.length) {
	            return;
	        }
	
	        this.initSearch();
	        this.initPagination();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.insertRow = function (params) {
	        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
	            return;
	        }
	        this.data.splice(params.index, 0, params.row);
	        this.initSearch();
	        this.initPagination();
	        this.initSort();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.updateRow = function (params) {
	        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
	            return;
	        }
	        $.extend(this.data[params.index], params.row);
	        this.initSort();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.showRow = function (params) {
	        if (!params.hasOwnProperty('index')) {
	            return;
	        }
	
	        this.toggleRow(params.index, params.isIdField === undefined ? false : true, true);
	    };
	
	    BootstrapTable.prototype.hideRow = function (params) {
	        if (!params.hasOwnProperty('index')) {
	            return;
	        }
	
	        this.toggleRow(params.index, params.isIdField === undefined ? false : true, false);
	    };
	
	    BootstrapTable.prototype.getRowsHidden = function (show) {
	        var rows = $(this.$body[0]).children().filter(':hidden'),
	            i = 0;
	        if (show) {
	            for (; i < rows.length; i++) {
	                $(rows[i]).show();
	            }
	        }
	        return rows;
	    };
	
	    BootstrapTable.prototype.mergeCells = function (options) {
	        var row = options.index,
	            col = $.inArray(options.field, this.header.fields),
	            rowspan = options.rowspan || 1,
	            colspan = options.colspan || 1,
	            i, j,
	            $tr = this.$body.find('tr'),
	            $td = $tr.eq(row).find('td').eq(col);
	
	        if (!this.options.cardView && this.options.detailView) {
	            col += 1;
	        }
	        $td = $tr.eq(row).find('td').eq(col);
	
	        if (row < 0 || col < 0 || row >= this.data.length) {
	            return;
	        }
	
	        for (i = row; i < row + rowspan; i++) {
	            for (j = col; j < col + colspan; j++) {
	                $tr.eq(i).find('td').eq(j).hide();
	            }
	        }
	
	        $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
	    };
	
	    BootstrapTable.prototype.updateCell = function (params) {
	        if (!params.hasOwnProperty('rowIndex') || !params.hasOwnProperty('fieldName') || !params.hasOwnProperty('fieldValue')) {
	            return;
	        }
	        this.data[params.rowIndex][params.fieldName] = params.fieldValue;
	        this.initSort();
	        this.initBody(true);
	    };
	
	    BootstrapTable.prototype.getOptions = function () {
	        return this.options;
	    };
	
	    BootstrapTable.prototype.getSelections = function () {
	        var that = this;
	
	        return $.grep(this.data, function (row) {
	            return row[that.header.stateField];
	        });
	    };
	
	    BootstrapTable.prototype.getAllSelections = function () {
	        var that = this;
	
	        return $.grep(this.options.data, function (row) {
	            return row[that.header.stateField];
	        });
	    };
	
	    BootstrapTable.prototype.checkAll = function () {
	        this.checkAll_(true);
	    };
	
	    BootstrapTable.prototype.uncheckAll = function () {
	        this.checkAll_(false);
	    };
	
	    BootstrapTable.prototype.checkAll_ = function (checked) {
	        var rows;
	        if (!checked) {
	            rows = this.getSelections();
	        }
	        this.$selectItem.filter(':enabled').prop('checked', checked);
	        this.updateRows();
	        this.updateSelected();
	        if (checked) {
	            rows = this.getSelections();
	        }
	        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
	    };
	
	    BootstrapTable.prototype.check = function (index) {
	        this.check_(true, index);
	    };
	
	    BootstrapTable.prototype.uncheck = function (index) {
	        this.check_(false, index);
	    };
	
	    BootstrapTable.prototype.check_ = function (checked, index) {
	        this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
	        this.data[index][this.header.stateField] = checked;
	        this.updateSelected();
	        this.trigger(checked ? 'check' : 'uncheck', this.data[index]);
	    };
	
	    BootstrapTable.prototype.checkBy = function (obj) {
	        this.checkBy_(true, obj);
	    };
	
	    BootstrapTable.prototype.uncheckBy = function (obj) {
	        this.checkBy_(false, obj);
	    };
	
	    BootstrapTable.prototype.checkBy_ = function (checked, obj) {
	        if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
	            return;
	        }
	
	        var that = this,
	            rows = [];
	        $.each(this.options.data, function (index, row) {
	            if (!row.hasOwnProperty(obj.field)) {
	                return false;
	            }
	            if ($.inArray(row[obj.field], obj.values) !== -1) {
	                that.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
	                row[that.header.stateField] = checked;
	                rows.push(row);
	                that.trigger(checked ? 'check' : 'uncheck', row);
	            }
	        });
	        this.updateSelected();
	        this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
	    };
	
	    BootstrapTable.prototype.destroy = function () {
	        this.$el.insertBefore(this.$container);
	        $(this.options.toolbar).insertBefore(this.$el);
	        this.$container.next().remove();
	        this.$container.remove();
	        this.$el.html(this.$el_.html())
	            .css('margin-top', '0')
	            .attr('class', this.$el_.attr('class') || ''); // reset the class
	    };
	
	    BootstrapTable.prototype.showLoading = function () {
	        this.$tableLoading.show();
	    };
	
	    BootstrapTable.prototype.hideLoading = function () {
	        this.$tableLoading.hide();
	    };
	
	    BootstrapTable.prototype.togglePagination = function () {
	        this.options.pagination = !this.options.pagination;
	        var button = this.$toolbar.find('button[name="paginationSwitch"] i');
	        if (this.options.pagination) {
	            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
	        } else {
	            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
	        }
	        this.updatePagination();
	    };
	
	    BootstrapTable.prototype.refresh = function (params) {
	        if (params && params.url) {
	            this.options.url = params.url;
	            this.options.pageNumber = 1;
	        }
	        this.initServer(params && params.silent, params && params.query);
	    };
	
	    BootstrapTable.prototype.resetWidth = function () {
	        if (this.options.showHeader && this.options.height) {
	            this.fitHeader();
	        }
	        if (this.options.showFooter) {
	            this.fitFooter();
	        }
	    };
	
	    BootstrapTable.prototype.showColumn = function (field) {
	        this.toggleColumn(getFieldIndex(this.options.columns, field), true, true);
	    };
	
	    BootstrapTable.prototype.hideColumn = function (field) {
	        this.toggleColumn(getFieldIndex(this.options.columns, field), false, true);
	    };
	
	    BootstrapTable.prototype.filterBy = function (columns) {
	        this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
	        this.options.pageNumber = 1;
	        this.initSearch();
	        this.updatePagination();
	    };
	
	    BootstrapTable.prototype.scrollTo = function (value) {
	        if (typeof value === 'string') {
	            value = value === 'bottom' ? this.$tableBody[0].scrollHeight : 0;
	        }
	        if (typeof value === 'number') {
	            this.$tableBody.scrollTop(value);
	        }
	        if (typeof value === 'undefined') {
	            return this.$tableBody.scrollTop();
	        }
	    };
	
	    BootstrapTable.prototype.getScrollPosition = function () {
	        return this.scrollTo();
	    }
	
	    BootstrapTable.prototype.selectPage = function (page) {
	        if (page > 0 && page <= this.options.totalPages) {
	            this.options.pageNumber = page;
	            this.updatePagination();
	        }
	    };
	
	    BootstrapTable.prototype.prevPage = function () {
	        if (this.options.pageNumber > 1) {
	            this.options.pageNumber--;
	            this.updatePagination();
	        }
	    };
	
	    BootstrapTable.prototype.nextPage = function () {
	        if (this.options.pageNumber < this.options.totalPages) {
	            this.options.pageNumber++;
	            this.updatePagination();
	        }
	    };
	
	    BootstrapTable.prototype.toggleView = function () {
	        this.options.cardView = !this.options.cardView;
	        this.initHeader();
	        // Fixed remove toolbar when click cardView button.
	        //that.initToolbar();
	        this.initBody();
	        this.trigger('toggle', this.options.cardView);
	    };
	
	    // BOOTSTRAP TABLE PLUGIN DEFINITION
	    // =======================
	
	    var allowedMethods = [
	        'getOptions',
	        'getSelections', 'getAllSelections', 'getData',
	        'load', 'append', 'prepend', 'remove', 'removeAll',
	        'insertRow', 'updateRow', 'updateCell', 'removeByUniqueId',
	        'showRow', 'hideRow', 'getRowsHidden',
	        'mergeCells',
	        'checkAll', 'uncheckAll',
	        'check', 'uncheck',
	        'checkBy', 'uncheckBy',
	        'refresh',
	        'resetView',
	        'resetWidth',
	        'destroy',
	        'showLoading', 'hideLoading',
	        'showColumn', 'hideColumn',
	        'filterBy',
	        'scrollTo',
	        'getScrollPosition',
	        'selectPage', 'prevPage', 'nextPage',
	        'togglePagination',
	        'toggleView'
	    ];
	
	    $.fn.bootstrapTable = function (option) {
	        var value,
	            args = Array.prototype.slice.call(arguments, 1);
	
	        this.each(function () {
	            var $this = $(this),
	                data = $this.data('bootstrap.table'),
	                options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(),
	                    typeof option === 'object' && option);
	
	            if (typeof option === 'string') {
	                if ($.inArray(option, allowedMethods) < 0) {
	                    throw new Error("Unknown method: " + option);
	                }
	
	                if (!data) {
	                    return;
	                }
	
	                value = data[option].apply(data, args);
	
	                if (option === 'destroy') {
	                    $this.removeData('bootstrap.table');
	                }
	            }
	
	            if (!data) {
	                $this.data('bootstrap.table', (data = new BootstrapTable(this, options)));
	            }
	        });
	
	        return typeof value === 'undefined' ? this : value;
	    };
	
	    $.fn.bootstrapTable.Constructor = BootstrapTable;
	    $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
	    $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
	    $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
	    $.fn.bootstrapTable.methods = allowedMethods;
	
	    // BOOTSTRAP TABLE INIT
	    // =======================
	
	    $(function () {
	        $('[data-toggle="table"]').bootstrapTable();
	    });
	
	}(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * Bootstrap Table Chinese translation
	 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
	 */
	(function ($) {
	    'use strict';
	
	    $.fn.bootstrapTable.locales['zh-CN'] = {
	        formatLoadingMessage: function () {
	            return '正在努力地加载数据中，请稍候……';
	        },
	        formatRecordsPerPage: function (pageNumber) {
	            return '每页显示 ' + pageNumber + ' 条记录';
	        },
	        formatShowingRows: function (pageFrom, pageTo, totalRows) {
	            return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
	        },
	        formatSearch: function () {
	            return '搜索';
	        },
	        formatNoMatches: function () {
	            return '没有找到匹配的记录';
	        },
	        formatPaginationSwitch: function () {
	            return '隐藏/显示分页';
	        },
	        formatRefresh: function () {
	            return '刷新';
	        },
	        formatToggle: function () {
	            return '切换';
	        },
	        formatColumns: function () {
	            return '列';
	        }
	    };
	
	    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
	
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @author zhixin wen <wenzhixin2010@gmail.com>
	 * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
	 */
	
	(function ($) {
	    'use strict';
	
	    var TYPE_NAME = {
	        json: 'JSON',
	        xml: 'XML',
	        png: 'PNG',
	        csv: 'CSV',
	        txt: 'TXT',
	        sql: 'SQL',
	        doc: 'MS-Word',
	        excel: 'Ms-Excel',
	        powerpoint: 'Ms-Powerpoint',
	        pdf: 'PDF'
	    };
	
	    $.extend($.fn.bootstrapTable.defaults, {
	        showExport: false,
	        exportDataType: 'basic', // basic, all, selected
	        // 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf'
	        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel'],
	        exportOptions: {}
	    });
	
	    var BootstrapTable = $.fn.bootstrapTable.Constructor,
	        _initToolbar = BootstrapTable.prototype.initToolbar;
	
	    BootstrapTable.prototype.initToolbar = function () {
	        this.showToolbar = this.options.showExport;
	
	        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));
	
	        if (this.options.showExport) {
	            var that = this,
	                $btnGroup = this.$toolbar.find('>.btn-group'),
	                $export = $btnGroup.find('div.export');
	
	            if (!$export.length) {
	                $export = $([
	                    '<div class="export btn-group">',
	                        '<button class="btn btn-default dropdown-toggle" ' +
	                            'data-toggle="dropdown" type="button">',
	                            '<i class="glyphicon glyphicon-export icon-share"></i> ',
	                            '<span class="caret"></span>',
	                        '</button>',
	                        '<ul class="dropdown-menu" role="menu">',
	                        '</ul>',
	                    '</div>'].join('')).appendTo($btnGroup);
	
	                var $menu = $export.find('.dropdown-menu'),
	                    exportTypes = this.options.exportTypes;
	
	                if (typeof this.options.exportTypes === 'string') {
	                    var types = this.options.exportTypes.slice(1, -1).replace(/ /g, '').split(',');
	
	                    exportTypes = [];
	                    $.each(types, function (i, value) {
	                        exportTypes.push(value.slice(1, -1));
	                    });
	                }
	                $.each(exportTypes, function (i, type) {
	                    if (TYPE_NAME.hasOwnProperty(type)) {
	                        $menu.append(['<li data-type="' + type + '">',
	                                '<a href="javascript:void(0)">',
	                                    TYPE_NAME[type],
	                                '</a>',
	                            '</li>'].join(''));
	                    }
	                });
	
	                $menu.find('li').click(function () {
	                    var type = $(this).data('type'),
	                        doExport = function () {
	                            that.$el.tableExport($.extend({}, that.options.exportOptions, {
	                                type: type,
	                                escape: false
	                            }));
	                        };
	
	                    if (that.options.exportDataType === 'all' && that.options.pagination) {
	                        that.togglePagination();
	                        doExport();
	                        that.togglePagination();
	                    } else if (that.options.exportDataType === 'selected') {
	                        var data = that.getData(),
	                            selectedData = that.getAllSelections();
	
	                        that.load(selectedData);
	                        doExport();
	                        that.load(data);
	                    } else {
	                        doExport();
	                    }
	                });
	            }
	        }
	    };
	})(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';
	
	var _stringify = __webpack_require__(68);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 tableExport.jquery.plugin
	
	 Copyright (c) 2015 hhurz, https://github.com/hhurz/tableExport.jquery.plugin
	
	 Original work Copyright (c) 2014 Giri Raj, https://github.com/kayalshri/
	 Licensed under the MIT License, http://opensource.org/licenses/mit-license
	 */
	
	(function ($) {
	    $.fn.extend({
	        tableExport: function tableExport(options) {
	            var defaults = {
	                consoleLog: false,
	                csvEnclosure: '"',
	                csvSeparator: ',',
	                csvUseBOM: true,
	                displayTableName: false,
	                escape: false,
	                excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right'],
	                fileName: 'tableExport',
	                htmlContent: false,
	                ignoreColumn: [],
	                ignoreRow: [],
	                jspdf: { orientation: 'p',
	                    unit: 'pt',
	                    format: 'a4', // jspdf page format or 'bestfit' for autmatic paper format selection
	                    margins: { left: 20, right: 10, top: 10, bottom: 10 },
	                    autotable: { styles: { cellPadding: 2,
	                            rowHeight: 12,
	                            fontSize: 8,
	                            fillColor: 255, // color value or 'inherit' to use css background-color from html table
	                            textColor: 50, // color value or 'inherit' to use css color from html table
	                            fontStyle: 'normal', // normal, bold, italic, bolditalic or 'inherit' to use css font-weight and fonst-style from html table
	                            overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
	                            halign: 'left', // left, center, right
	                            valign: 'middle' // top, middle, bottom
	                        },
	                        headerStyles: { fillColor: [52, 73, 94],
	                            textColor: 255,
	                            fontStyle: 'bold',
	                            halign: 'center'
	                        },
	                        alternateRowStyles: { fillColor: 245
	                        },
	                        tableExport: { onAfterAutotable: null,
	                            onBeforeAutotable: null,
	                            onTable: null
	                        }
	                    }
	                },
	                numbers: { html: { decimalMark: '.',
	                        thousandsSeparator: ','
	                    },
	                    output: { decimalMark: '.',
	                        thousandsSeparator: ','
	                    }
	                },
	                onCellData: null,
	                onCellHtmlData: null,
	                outputMode: 'file', // 'file', 'string' or 'base64'
	                tbodySelector: 'tr',
	                theadSelector: 'tr',
	                tableName: 'myTableName',
	                type: 'csv', // 'csv', 'txt', 'sql', 'json', 'xml', 'excel', 'doc', 'png' or 'pdf'
	                worksheetName: 'xlsWorksheetName'
	            };
	
	            var FONT_ROW_RATIO = 1.15;
	            var el = this;
	            var DownloadEvt = null;
	            var $hrows = [];
	            var $rows = [];
	            var rowIndex = 0;
	            var rowspans = [];
	            var trData = '';
	
	            $.extend(true, defaults, options);
	
	            if (defaults.type == 'csv' || defaults.type == 'txt') {
	                var CollectCsvData = function CollectCsvData(tgroup, tselector, rowselector, length) {
	
	                    $rows = $(el).find(tgroup).first().find(tselector);
	                    $rows.each(function () {
	                        trData = "";
	                        ForEachVisibleCell(this, rowselector, rowIndex, length + $rows.length, function (cell, row, col) {
	                            trData += csvString(cell, row, col) + defaults.csvSeparator;
	                        });
	                        trData = $.trim(trData).substring(0, trData.length - 1);
	                        if (trData.length > 0) {
	
	                            if (csvData.length > 0) csvData += "\n";
	
	                            csvData += trData;
	                        }
	                        rowIndex++;
	                    });
	
	                    return $rows.length;
	                };
	
	                var csvData = "";
	                var rowlength = 0;
	                rowIndex = 0;
	
	                rowlength += CollectCsvData('thead', defaults.theadSelector, 'th,td', rowlength);
	                rowlength += CollectCsvData('tbody', defaults.tbodySelector, 'td', rowlength);
	                CollectCsvData('tfoot', defaults.tbodySelector, 'td', rowlength);
	
	                csvData += "\n";
	
	                //output
	                if (defaults.consoleLog === true) console.log(csvData);
	
	                if (defaults.outputMode === 'string') return csvData;
	
	                if (defaults.outputMode === 'base64') return base64encode(csvData);
	
	                try {
	                    var blob = new Blob([csvData], { type: "text/" + (defaults.type == 'csv' ? 'csv' : 'plain') + ";charset=utf-8" });
	                    saveAs(blob, defaults.fileName + '.' + defaults.type, defaults.type != 'csv' || defaults.csvUseBOM === false);
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.' + defaults.type, 'data:text/' + (defaults.type == 'csv' ? 'csv' : 'plain') + ';charset=utf-8,' + encodeURIComponent(csvData));
	                }
	            } else if (defaults.type == 'sql') {
	
	                // Header
	                rowIndex = 0;
	                var tdData = "INSERT INTO `" + defaults.tableName + "` (";
	                $hrows = $(el).find('thead').first().find(defaults.theadSelector);
	                $hrows.each(function () {
	                    ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
	                        tdData += "'" + parseString(cell, row, col) + "',";
	                    });
	                    rowIndex++;
	                    tdData = $.trim(tdData);
	                    tdData = $.trim(tdData).substring(0, tdData.length - 1);
	                });
	                tdData += ") VALUES ";
	                // Row vs Column
	                $rows = $(el).find('tbody').first().find(defaults.tbodySelector);
	                $rows.each(function () {
	                    trData = "";
	                    ForEachVisibleCell(this, 'td', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
	                        trData += "'" + parseString(cell, row, col) + "',";
	                    });
	                    if (trData.length > 3) {
	                        tdData += "(" + trData;
	                        tdData = $.trim(tdData).substring(0, tdData.length - 1);
	                        tdData += "),";
	                    }
	                    rowIndex++;
	                });
	
	                tdData = $.trim(tdData).substring(0, tdData.length - 1);
	                tdData += ";";
	
	                //output
	                if (defaults.consoleLog === true) console.log(tdData);
	
	                if (defaults.outputMode == 'string') return tdData;
	
	                if (defaults.outputMode == 'base64') return base64encode(tdData);
	
	                try {
	                    var blob = new Blob([tdData], { type: "text/plain;charset=utf-8" });
	                    saveAs(blob, defaults.fileName + '.sql');
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.sql', 'data:application/sql;charset=utf-8,' + encodeURIComponent(tdData));
	                }
	            } else if (defaults.type == 'json') {
	
	                var jsonHeaderArray = [];
	                $hrows = $(el).find('thead').first().find(defaults.theadSelector);
	                $hrows.each(function () {
	                    var jsonArrayTd = [];
	
	                    ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
	                        jsonArrayTd.push(parseString(cell, row, col));
	                    });
	                    jsonHeaderArray.push(jsonArrayTd);
	                });
	
	                var jsonArray = [];
	                $rows = $(el).find('tbody').first().find(defaults.tbodySelector);
	                $rows.each(function () {
	                    var jsonArrayTd = [];
	
	                    ForEachVisibleCell(this, 'td', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
	                        jsonArrayTd.push(parseString(cell, row, col));
	                    });
	
	                    if (jsonArrayTd.length > 0 && (jsonArrayTd.length != 1 || jsonArrayTd[0] != "")) jsonArray.push(jsonArrayTd);
	
	                    rowIndex++;
	                });
	
	                var jsonExportArray = [];
	                jsonExportArray.push({ header: jsonHeaderArray, data: jsonArray });
	
	                var sdata = (0, _stringify2.default)(jsonExportArray);
	
	                if (defaults.consoleLog === true) console.log(sdata);
	
	                if (defaults.outputMode == 'string') return sdata;
	
	                var base64data = base64encode(sdata);
	
	                if (defaults.outputMode == 'base64') return base64data;
	
	                try {
	                    var blob = new Blob([sdata], { type: "application/json;charset=utf-8" });
	                    saveAs(blob, defaults.fileName + '.json');
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.json', 'data:application/json;charset=utf-8;base64,' + base64data);
	                }
	            } else if (defaults.type === 'xml') {
	
	                rowIndex = 0;
	                var xml = '<?xml version="1.0" encoding="utf-8"?>';
	                xml += '<tabledata><fields>';
	
	                // Header
	                $hrows = $(el).find('thead').first().find(defaults.theadSelector);
	                $hrows.each(function () {
	
	                    ForEachVisibleCell(this, 'th,td', rowIndex, $rows.length, function (cell, row, col) {
	                        xml += "<field>" + parseString(cell, row, col) + "</field>";
	                    });
	                    rowIndex++;
	                });
	                xml += '</fields><data>';
	
	                // Row Vs Column
	                var rowCount = 1;
	                $rows = $(el).find('tbody').first().find(defaults.tbodySelector);
	                $rows.each(function () {
	                    var colCount = 1;
	                    trData = "";
	                    ForEachVisibleCell(this, 'td', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
	                        trData += "<column-" + colCount + ">" + parseString(cell, row, col) + "</column-" + colCount + ">";
	                        colCount++;
	                    });
	                    if (trData.length > 0 && trData != "<column-1></column-1>") {
	                        xml += '<row id="' + rowCount + '">' + trData + '</row>';
	                        rowCount++;
	                    }
	
	                    rowIndex++;
	                });
	                xml += '</data></tabledata>';
	
	                //output
	                if (defaults.consoleLog === true) console.log(xml);
	
	                if (defaults.outputMode == 'string') return xml;
	
	                var base64data = base64encode(xml);
	
	                if (defaults.outputMode == 'base64') return base64data;
	
	                try {
	                    var blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
	                    saveAs(blob, defaults.fileName + '.xml');
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.xml', 'data:application/xml;charset=utf-8;base64,' + base64data);
	                }
	            } else if (defaults.type == 'excel' || defaults.type == 'xls' || defaults.type == 'word' || defaults.type == 'doc') {
	
	                var MSDocType = defaults.type == 'excel' || defaults.type == 'xls' ? 'excel' : 'word';
	                var MSDocExt = MSDocType == 'excel' ? 'xls' : 'doc';
	                var MSDocSchema = MSDocExt == 'xls' ? 'xmlns:x="urn:schemas-microsoft-com:office:excel"' : 'xmlns:w="urn:schemas-microsoft-com:office:word"';
	
	                rowIndex = 0;
	                var docData = '<table><thead>';
	                // Header
	                $hrows = $(el).find('thead').first().find(defaults.theadSelector);
	                $hrows.each(function () {
	                    trData = "";
	                    ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
	                        if (cell != null) {
	                            trData += '<th style="';
	                            for (var styles in defaults.excelstyles) {
	                                if (defaults.excelstyles.hasOwnProperty(styles)) {
	                                    trData += defaults.excelstyles[styles] + ': ' + $(cell).css(defaults.excelstyles[styles]) + ';';
	                                }
	                            }
	                            if ($(cell).is("[colspan]")) trData += '" colspan="' + $(cell).attr('colspan');
	                            if ($(cell).is("[rowspan]")) trData += '" rowspan="' + $(cell).attr('rowspan');
	                            trData += '">' + parseString(cell, row, col) + '</th>';
	                        }
	                    });
	                    if (trData.length > 0) docData += '<tr>' + trData + '</tr>';
	                    rowIndex++;
	                });
	
	                docData += '</thead><tbody>';
	
	                // Row Vs Column
	                $rows = $(el).find('tbody').first().find(defaults.tbodySelector);
	                $rows.each(function () {
	                    trData = "";
	                    ForEachVisibleCell(this, 'td', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
	                        if (cell != null) {
	                            trData += '<td style="';
	                            for (var styles in defaults.excelstyles) {
	                                if (defaults.excelstyles.hasOwnProperty(styles)) {
	                                    trData += defaults.excelstyles[styles] + ': ' + $(cell).css(defaults.excelstyles[styles]) + ';';
	                                }
	                            }
	                            if ($(cell).is("[colspan]")) trData += '" colspan="' + $(cell).attr('colspan');
	                            if ($(cell).is("[rowspan]")) trData += '" rowspan="' + $(cell).attr('rowspan');
	                            trData += '">' + parseString(cell, row, col) + '</td>';
	                        }
	                    });
	                    if (trData.length > 0) docData += '<tr>' + trData + '</tr>';
	                    rowIndex++;
	                });
	
	                if (defaults.displayTableName) docData += '<tr><td></td></tr><tr><td></td></tr><tr><td>' + parseString($('<p>' + defaults.tableName + '</p>')) + '</td></tr>';
	
	                docData += '</tbody></table>';
	
	                if (defaults.consoleLog === true) console.log(docData);
	
	                var docFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + MSDocSchema + ' xmlns="http://www.w3.org/TR/REC-html40">';
	                docFile += '<meta http-equiv="content-type" content="application/vnd.ms-' + MSDocType + '; charset=UTF-8">';
	                docFile += "<head>";
	                if (MSDocType === 'excel') {
	                    docFile += "<!--[if gte mso 9]>";
	                    docFile += "<xml>";
	                    docFile += "<x:ExcelWorkbook>";
	                    docFile += "<x:ExcelWorksheets>";
	                    docFile += "<x:ExcelWorksheet>";
	                    docFile += "<x:Name>";
	                    docFile += defaults.worksheetName;
	                    docFile += "</x:Name>";
	                    docFile += "<x:WorksheetOptions>";
	                    docFile += "<x:DisplayGridlines/>";
	                    docFile += "</x:WorksheetOptions>";
	                    docFile += "</x:ExcelWorksheet>";
	                    docFile += "</x:ExcelWorksheets>";
	                    docFile += "</x:ExcelWorkbook>";
	                    docFile += "</xml>";
	                    docFile += "<![endif]-->";
	                }
	                docFile += "</head>";
	                docFile += "<body>";
	                docFile += docData;
	                docFile += "</body>";
	                docFile += "</html>";
	
	                if (defaults.outputMode == 'string') return docFile;
	
	                var base64data = base64encode(docFile);
	
	                if (defaults.outputMode === 'base64') return base64data;
	
	                try {
	                    var blob = new Blob([docFile], { type: 'application/vnd.ms-' + defaults.type });
	                    saveAs(blob, defaults.fileName + '.' + MSDocExt);
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.' + MSDocExt, 'data:application/vnd.ms-' + MSDocType + ';base64,' + base64data);
	                }
	            } else if (defaults.type == 'png') {
	                html2canvas($(el)[0], {
	                    allowTaint: true,
	                    background: '#fff',
	                    onrendered: function onrendered(canvas) {
	
	                        var image = canvas.toDataURL();
	                        image = image.substring(22); // remove data stuff
	
	                        var byteString = atob(image);
	                        var buffer = new ArrayBuffer(byteString.length);
	                        var intArray = new Uint8Array(buffer);
	
	                        for (var i = 0; i < byteString.length; i++) {
	                            intArray[i] = byteString.charCodeAt(i);
	                        }try {
	                            var blob = new Blob([buffer], { type: "image/png" });
	                            saveAs(blob, defaults.fileName + '.png');
	                        } catch (e) {
	                            downloadFile(defaults.fileName + '.png', 'data:image/png;base64,' + image);
	                        }
	                    }
	                });
	            } else if (defaults.type == 'pdf') {
	                if (defaults.jspdf.autotable === false) {
	                    var addHtmlOptions = {
	                        dim: {
	                            w: getPropertyUnitValue($(el).first().get(0), 'width', 'mm'),
	                            h: getPropertyUnitValue($(el).first().get(0), 'height', 'mm')
	                        },
	                        pagesplit: false
	                    };
	
	                    var doc = new jsPDF(defaults.jspdf.orientation, defaults.jspdf.unit, defaults.jspdf.format);
	                    doc.addHTML($(el).first(), defaults.jspdf.margins.left, defaults.jspdf.margins.top, addHtmlOptions, function () {
	                        jsPdfOutput(doc);
	                    });
	                    //delete doc;
	                } else {
	                        // pdf output using jsPDF AutoTable plugin
	                        // https://github.com/simonbengtsson/jsPDF-AutoTable
	
	                        var teOptions = defaults.jspdf.autotable.tableExport;
	
	                        // When setting jspdf.format to 'bestfit' tableExport tries to choose
	                        // the minimum required paper format and orientation in which the table
	                        // (or tables in multitable mode) completely fits without column adjustment
	                        if (typeof defaults.jspdf.format === 'string' && defaults.jspdf.format.toLowerCase() === 'bestfit') {
	                            var pageFormats = {
	                                'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94],
	                                'a2': [1190.55, 1683.78], 'a3': [841.89, 1190.55],
	                                'a4': [595.28, 841.89]
	                            };
	                            var rk = '',
	                                ro = '';
	                            var mw = 0;
	
	                            $(el).filter(':visible').each(function () {
	                                if ($(this).css('display') != 'none') {
	                                    var w = getPropertyUnitValue($(this).get(0), 'width', 'pt');
	
	                                    if (w > mw) {
	                                        if (w > pageFormats['a0'][0]) {
	                                            rk = 'a0';
	                                            ro = 'l';
	                                        }
	                                        for (var key in pageFormats) {
	                                            if (pageFormats.hasOwnProperty(key)) {
	                                                if (pageFormats[key][1] > w) {
	                                                    rk = key;
	                                                    ro = 'l';
	                                                    if (pageFormats[key][0] > w) ro = 'p';
	                                                }
	                                            }
	                                        }
	                                        mw = w;
	                                    }
	                                }
	                            });
	                            defaults.jspdf.format = rk == '' ? 'a4' : rk;
	                            defaults.jspdf.orientation = ro == '' ? 'w' : ro;
	                        }
	
	                        // The jsPDF doc object is stored in defaults.jspdf.autotable.tableExport,
	                        // thus it can be accessed from any callback function
	                        teOptions.doc = new jsPDF(defaults.jspdf.orientation, defaults.jspdf.unit, defaults.jspdf.format);
	
	                        $(el).filter(function () {
	                            return $(this).data("tableexport-display") != 'none' && ($(this).is(':visible') || $(this).data("tableexport-display") == 'always');
	                        }).each(function () {
	                            var colKey;
	                            var rowIndex = 0;
	
	                            teOptions.columns = [];
	                            teOptions.rows = [];
	                            teOptions.rowoptions = {};
	
	                            // onTable: optional callback function for every matching table that can be used
	                            // to modify the tableExport options or to skip the output of a particular table
	                            // if the table selector targets multiple tables
	                            if (typeof teOptions.onTable === 'function') if (teOptions.onTable($(this), defaults) === false) return true; // continue to next iteration step (table)
	
	                            // each table works with an own copy of AutoTable options
	                            defaults.jspdf.autotable.tableExport = null; // avoid deep recursion error
	                            var atOptions = $.extend(true, {}, defaults.jspdf.autotable);
	                            defaults.jspdf.autotable.tableExport = teOptions;
	
	                            atOptions.margin = {};
	                            $.extend(true, atOptions.margin, defaults.jspdf.margins);
	                            atOptions.tableExport = teOptions;
	
	                            // Fix jsPDF Autotable's row height calculation
	                            if (typeof atOptions.beforePageContent !== 'function') {
	                                atOptions.beforePageContent = function (data) {
	                                    if (data.pageCount == 1) {
	                                        var all = data.table.rows.concat(data.table.headerRow);
	                                        all.forEach(function (row) {
	                                            if (row.height > 0) {
	                                                row.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
	                                                data.table.height += (2 - FONT_ROW_RATIO) / 2 * row.styles.fontSize;
	                                            }
	                                        });
	                                    }
	                                };
	                            }
	
	                            if (typeof atOptions.createdHeaderCell !== 'function') {
	                                // apply some original css styles to pdf header cells
	                                atOptions.createdHeaderCell = function (cell, data) {
	
	                                    if (typeof teOptions.columns[data.column.dataKey] != 'undefined') {
	                                        var col = teOptions.columns[data.column.dataKey];
	                                        cell.styles.halign = col.style.align;
	                                        if (atOptions.styles.fillColor === 'inherit') cell.styles.fillColor = col.style.bcolor;
	                                        if (atOptions.styles.textColor === 'inherit') cell.styles.textColor = col.style.color;
	                                        if (atOptions.styles.fontStyle === 'inherit') cell.styles.fontStyle = col.style.fstyle;
	                                    }
	                                };
	                            }
	
	                            if (typeof atOptions.createdCell !== 'function') {
	                                // apply some original css styles to pdf table cells
	                                atOptions.createdCell = function (cell, data) {
	                                    var rowopt = teOptions.rowoptions[data.row.index + ":" + data.column.dataKey];
	
	                                    if (typeof rowopt != 'undefined' && typeof rowopt.style != 'undefined') {
	                                        cell.styles.halign = rowopt.style.align;
	                                        if (atOptions.styles.fillColor === 'inherit') cell.styles.fillColor = rowopt.style.bcolor;
	                                        if (atOptions.styles.textColor === 'inherit') cell.styles.textColor = rowopt.style.color;
	                                        if (atOptions.styles.fontStyle === 'inherit') cell.styles.fontStyle = rowopt.style.fstyle;
	                                    }
	                                };
	                            }
	
	                            if (typeof atOptions.drawHeaderCell !== 'function') {
	                                atOptions.drawHeaderCell = function (cell, data) {
	                                    var colopt = teOptions.columns[data.column.dataKey];
	
	                                    if (colopt.style.hasOwnProperty("hidden") != true || colopt.style.hidden !== true) return prepareAutoTableText(cell, data, colopt);else return false; // cell is hidden
	                                };
	                            }
	
	                            if (typeof atOptions.drawCell !== 'function') {
	                                atOptions.drawCell = function (cell, data) {
	                                    var rowopt = teOptions.rowoptions[data.row.index + ":" + data.column.dataKey];
	                                    return prepareAutoTableText(cell, data, rowopt);
	                                };
	                            }
	
	                            // collect header and data rows
	                            $hrows = $(this).find('thead').find(defaults.theadSelector);
	                            $hrows.each(function () {
	                                colKey = 0;
	
	                                ForEachVisibleCell(this, 'th,td', rowIndex, $hrows.length, function (cell, row, col) {
	                                    var obj = getCellStyles(cell);
	                                    obj.title = parseString(cell, row, col);
	                                    obj.key = colKey++;
	                                    teOptions.columns.push(obj);
	                                });
	                                rowIndex++;
	                            });
	
	                            var rowCount = 0;
	                            $rows = $(this).find('tbody').find(defaults.tbodySelector);
	                            $rows.each(function () {
	                                var rowData = [];
	                                colKey = 0;
	
	                                ForEachVisibleCell(this, 'td', rowIndex, $hrows.length + $rows.length, function (cell, row, col) {
	                                    if (typeof teOptions.columns[colKey] === 'undefined') {
	                                        // jsPDF-Autotable needs columns. Thus define hidden ones for tables without thead
	                                        var obj = {
	                                            title: '',
	                                            key: colKey,
	                                            style: {
	                                                hidden: true
	                                            }
	                                        };
	                                        teOptions.columns.push(obj);
	                                    }
	                                    if (cell !== null) {
	                                        teOptions.rowoptions[rowCount + ":" + colKey++] = getCellStyles(cell);
	                                    } else {
	                                        var obj = $.extend(true, {}, teOptions.rowoptions[rowCount + ":" + (colKey - 1)]);
	                                        obj.colspan = -1;
	                                        teOptions.rowoptions[rowCount + ":" + colKey++] = obj;
	                                    }
	
	                                    rowData.push(parseString(cell, row, col));
	                                });
	                                if (rowData.length) {
	                                    teOptions.rows.push(rowData);
	                                    rowCount++;
	                                }
	                                rowIndex++;
	                            });
	
	                            // onBeforeAutotable: optional callback function before calling
	                            // jsPDF AutoTable that can be used to modify the AutoTable options
	                            if (typeof teOptions.onBeforeAutotable === 'function') teOptions.onBeforeAutotable($(this), teOptions.columns, teOptions.rows, atOptions);
	
	                            teOptions.doc.autoTable(teOptions.columns, teOptions.rows, atOptions);
	
	                            // onAfterAutotable: optional callback function after returning
	                            // from jsPDF AutoTable that can be used to modify the AutoTable options
	                            if (typeof teOptions.onAfterAutotable === 'function') teOptions.onAfterAutotable($(this), atOptions);
	
	                            // set the start position for the next table (in case there is one)
	                            defaults.jspdf.autotable.startY = teOptions.doc.autoTableEndPosY() + atOptions.margin.top;
	                        });
	
	                        jsPdfOutput(teOptions.doc);
	
	                        teOptions.columns.length = 0;
	                        teOptions.rows.length = 0;
	                        delete teOptions.doc;
	                        teOptions.doc = null;
	                    }
	            }
	
	            function ForEachVisibleCell(tableRow, selector, rowIndex, rowCount, cellcallback) {
	                if ($.inArray(rowIndex, defaults.ignoreRow) == -1 && $.inArray(rowIndex - rowCount, defaults.ignoreRow) == -1) {
	
	                    var $row = $(tableRow).filter(function () {
	                        return $(this).data("tableexport-display") != 'none' && ($(this).is(':visible') || $(this).data("tableexport-display") == 'always' || $(this).closest('table').data("tableexport-display") == 'always');
	                    }).find(selector);
	
	                    var rowColspan = 0;
	
	                    $row.each(function (colIndex) {
	                        if ($(this).data("tableexport-display") == 'always' || $(this).css('display') != 'none' && $(this).css('visibility') != 'hidden' && $(this).data("tableexport-display") != 'none') {
	                            if ($.inArray(colIndex, defaults.ignoreColumn) == -1 && $.inArray(colIndex - $row.length, defaults.ignoreColumn) == -1) {
	                                if (typeof cellcallback === "function") {
	                                    var c,
	                                        Colspan = 0;
	                                    var r,
	                                        Rowspan = 0;
	
	                                    // handle rowspans from previous rows
	                                    if (typeof rowspans[rowIndex] != 'undefined' && rowspans[rowIndex].length > 0) {
	                                        for (c = 0; c <= colIndex; c++) {
	                                            if (typeof rowspans[rowIndex][c] != 'undefined') {
	                                                cellcallback(null, rowIndex, c);
	                                                delete rowspans[rowIndex][c];
	                                                colIndex++;
	                                            }
	                                        }
	                                    }
	
	                                    if ($(this).is("[colspan]")) {
	                                        Colspan = parseInt($(this).attr('colspan'));
	                                        rowColspan += Colspan > 0 ? Colspan - 1 : 0;
	                                    }
	
	                                    if ($(this).is("[rowspan]")) Rowspan = parseInt($(this).attr('rowspan'));
	
	                                    // output content of current cell
	                                    cellcallback(this, rowIndex, colIndex);
	
	                                    // handle colspan of current cell
	                                    for (c = 0; c < Colspan - 1; c++) {
	                                        cellcallback(null, rowIndex, colIndex + c);
	                                    } // store rowspan for following rows
	                                    if (Rowspan) {
	                                        for (r = 1; r < Rowspan; r++) {
	                                            if (typeof rowspans[rowIndex + r] == 'undefined') rowspans[rowIndex + r] = [];
	
	                                            rowspans[rowIndex + r][colIndex + rowColspan] = "";
	
	                                            for (c = 1; c < Colspan; c++) {
	                                                rowspans[rowIndex + r][colIndex + rowColspan - c] = "";
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    });
	                }
	            }
	
	            function jsPdfOutput(doc) {
	                if (defaults.consoleLog === true) console.log(doc.output());
	
	                if (defaults.outputMode == 'string') return doc.output();
	
	                if (defaults.outputMode == 'base64') return base64encode(doc.output());
	
	                try {
	                    var blob = doc.output('blob');
	                    saveAs(blob, defaults.fileName + '.pdf');
	                } catch (e) {
	                    downloadFile(defaults.fileName + '.pdf', 'data:application/pdf;base64,' + base64encode(doc.output()));
	                }
	            }
	
	            function prepareAutoTableText(cell, data, cellopt) {
	                var cs = 0;
	                if (typeof cellopt != 'undefined') cs = cellopt.colspan;
	
	                if (cs >= 0) {
	                    // colspan handling
	                    var cellWidth = cell.width;
	                    var textPosX = cell.textPos.x;
	                    var i = data.table.columns.indexOf(data.column);
	
	                    for (var c = 1; c < cs; c++) {
	                        var column = data.table.columns[i + c];
	                        cellWidth += column.width;
	                    }
	
	                    if (cs > 1) {
	                        if (cell.styles.halign === 'right') textPosX = cell.textPos.x + cellWidth - cell.width;else if (cell.styles.halign === 'center') textPosX = cell.textPos.x + (cellWidth - cell.width) / 2;
	                    }
	
	                    cell.width = cellWidth;
	                    cell.textPos.x = textPosX;
	
	                    if (typeof cellopt != 'undefined' && cellopt.rowspan > 1) {
	                        if (cell.styles.valign === 'middle') cell.textPos.y = cell.textPos.y + cell.height * (cellopt.rowspan - 1) / 2;else if (cell.styles.valign === 'bottom') cell.textPos.y += (cellopt.rowspan - 1) * cell.height;
	
	                        cell.height = cell.height * cellopt.rowspan;
	                    }
	
	                    // fix jsPDF's calculation of text position
	                    if (cell.styles.valign === 'middle' || cell.styles.valign === 'bottom') {
	                        var splittedText = typeof cell.text === 'string' ? cell.text.split(/\r\n|\r|\n/g) : cell.text;
	                        var lineCount = splittedText.length || 1;
	                        if (lineCount > 2) cell.textPos.y -= (2 - FONT_ROW_RATIO) / 2 * data.row.styles.fontSize * (lineCount - 2) / 3;
	                    }
	                    return true;
	                } else return false; // cell is hidden (colspan = -1), don't draw it
	            }
	
	            function escapeRegExp(string) {
	                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	            }
	
	            function replaceAll(string, find, replace) {
	                return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	            }
	
	            // Takes a string and encapsulates it (by default in double-quotes) if it
	            // contains the csv field separator, spaces, or linebreaks.
	            function csvString(cell, rowIndex, colIndex) {
	                var result = '';
	
	                if (cell != null) {
	                    var dataString = parseString(cell, rowIndex, colIndex);
	
	                    var csvValue = dataString === null || dataString == '' ? '' : dataString.toString();
	
	                    if (dataString instanceof Date) result = defaults.csvEnclosure + dataString.toLocaleString() + defaults.csvEnclosure;else {
	                        result = replaceAll(csvValue, defaults.csvEnclosure, defaults.csvEnclosure + defaults.csvEnclosure);
	
	                        if (result.indexOf(defaults.csvSeparator) >= 0 || /[\r\n ]/g.test(result)) result = defaults.csvEnclosure + result + defaults.csvEnclosure;
	                    }
	                }
	
	                return result;
	            }
	
	            function parseNumber(value) {
	                value = value || "0";
	                value = replaceAll(value, defaults.numbers.html.decimalMark, '.');
	                value = replaceAll(value, defaults.numbers.html.thousandsSeparator, '');
	
	                return typeof value === "number" || jQuery.isNumeric(value) !== false ? value : false;
	            }
	
	            function parseString(cell, rowIndex, colIndex) {
	                var result = '';
	
	                if (cell != null) {
	                    var $cell = $(cell);
	                    var htmlData = $cell.html();
	
	                    if (typeof defaults.onCellHtmlData === 'function') htmlData = defaults.onCellHtmlData($cell, rowIndex, colIndex, htmlData);
	
	                    if (defaults.htmlContent === true) {
	                        result = $.trim(htmlData);
	                    } else {
	                        var text = htmlData.replace(/\n/g, '\u2028').replace(/<br\s*[\/]?>/gi, '⁠');
	                        var obj = $('<div/>').html(text).contents();
	                        text = '';
	                        $.each(obj.text().split('\u2028'), function (i, v) {
	                            if (i > 0) text += " ";
	                            text += $.trim(v);
	                        });
	
	                        $.each(text.split('⁠'), function (i, v) {
	                            if (i > 0) result += "\n";
	                            result += $.trim(v).replace(/\u00AD/g, ""); // remove soft hyphens
	                        });
	
	                        if (defaults.numbers.html.decimalMark != defaults.numbers.output.decimalMark || defaults.numbers.html.thousandsSeparator != defaults.numbers.output.thousandsSeparator) {
	                            var number = parseNumber(result);
	
	                            if (number !== false) {
	                                var frac = ("" + number).split('.');
	                                if (frac.length == 1) frac[1] = "";
	                                var mod = frac[0].length > 3 ? frac[0].length % 3 : 0;
	
	                                result = (number < 0 ? "-" : "") + (defaults.numbers.output.thousandsSeparator ? (mod ? frac[0].substr(0, mod) + defaults.numbers.output.thousandsSeparator : "") + frac[0].substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + defaults.numbers.output.thousandsSeparator) : frac[0]) + (frac[1].length ? defaults.numbers.output.decimalMark + frac[1] : "");
	                            }
	                        }
	                    }
	
	                    if (defaults.escape === true) {
	                        result = escape(result);
	                    }
	
	                    if (typeof defaults.onCellData === 'function') {
	                        result = defaults.onCellData($cell, rowIndex, colIndex, result);
	                    }
	                }
	
	                return result;
	            }
	
	            function hyphenate(a, b, c) {
	                return b + "-" + c.toLowerCase();
	            }
	
	            function rgb2array(rgb_string, default_result) {
	                var re = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
	                var bits = re.exec(rgb_string);
	                var result = default_result;
	                if (bits) result = [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
	                return result;
	            }
	
	            function getCellStyles(cell) {
	                var a = getStyle(cell, 'text-align');
	                var fw = getStyle(cell, 'font-weight');
	                var fs = getStyle(cell, 'font-style');
	                var f = '';
	                if (a == 'start') a = getStyle(cell, 'direction') == 'rtl' ? 'right' : 'left';
	                if (fw >= 700) f = 'bold';
	                if (fs == 'italic') f += fs;
	                if (f == '') f = 'normal';
	                return {
	                    style: {
	                        align: a,
	                        bcolor: rgb2array(getStyle(cell, 'background-color'), [255, 255, 255]),
	                        color: rgb2array(getStyle(cell, 'color'), [0, 0, 0]),
	                        fstyle: f
	                    },
	                    colspan: parseInt($(cell).attr('colspan')) || 0,
	                    rowspan: parseInt($(cell).attr('rowspan')) || 0
	                };
	            }
	
	            // get computed style property
	            function getStyle(target, prop) {
	                try {
	                    if (window.getComputedStyle) {
	                        // gecko and webkit
	                        prop = prop.replace(/([a-z])([A-Z])/, hyphenate); // requires hyphenated, not camel
	                        return window.getComputedStyle(target, null).getPropertyValue(prop);
	                    }
	                    if (target.currentStyle) {
	                        // ie
	                        return target.currentStyle[prop];
	                    }
	                    return target.style[prop];
	                } catch (e) {}
	                return "";
	            }
	
	            function getPropertyUnitValue(target, prop, unit) {
	                var baseline = 100; // any number serves
	
	                var value = getStyle(target, prop); // get the computed style value
	
	                var numeric = value.match(/\d+/); // get the numeric component
	                if (numeric !== null) {
	                    numeric = numeric[0]; // get the string
	
	                    var temp = document.createElement("div"); // create temporary element
	                    temp.style.overflow = "hidden"; // in case baseline is set too low
	                    temp.style.visibility = "hidden"; // no need to show it
	
	                    target.parentElement.appendChild(temp); // insert it into the parent for em, ex and %
	
	                    temp.style.width = baseline + unit;
	                    var factor = baseline / temp.offsetWidth;
	
	                    target.parentElement.removeChild(temp); // clean up
	
	                    return numeric * factor;
	                }
	                return 0;
	            }
	
	            function downloadFile(filename, data) {
	                var DownloadLink = document.createElement('a');
	
	                if (DownloadLink) {
	                    DownloadLink.style.display = 'none';
	                    DownloadLink.download = filename;
	                    DownloadLink.href = data;
	
	                    document.body.appendChild(DownloadLink);
	
	                    if (document.createEvent) {
	                        if (DownloadEvt == null) DownloadEvt = document.createEvent('MouseEvents');
	
	                        DownloadEvt.initEvent('click', true, false);
	                        DownloadLink.dispatchEvent(DownloadEvt);
	                    } else if (document.createEventObject) DownloadLink.fireEvent('onclick');else if (typeof DownloadLink.onclick == 'function') DownloadLink.onclick();
	
	                    document.body.removeChild(DownloadLink);
	                }
	            }
	
	            function utf8Encode(string) {
	                string = string.replace(/\x0d\x0a/g, "\x0a");
	                var utftext = "";
	                for (var n = 0; n < string.length; n++) {
	                    var c = string.charCodeAt(n);
	                    if (c < 128) {
	                        utftext += String.fromCharCode(c);
	                    } else if (c > 127 && c < 2048) {
	                        utftext += String.fromCharCode(c >> 6 | 192);
	                        utftext += String.fromCharCode(c & 63 | 128);
	                    } else {
	                        utftext += String.fromCharCode(c >> 12 | 224);
	                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
	                        utftext += String.fromCharCode(c & 63 | 128);
	                    }
	                }
	                return utftext;
	            }
	
	            function base64encode(input) {
	                var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	                var output = "";
	                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	                var i = 0;
	                input = utf8Encode(input);
	                while (i < input.length) {
	                    chr1 = input.charCodeAt(i++);
	                    chr2 = input.charCodeAt(i++);
	                    chr3 = input.charCodeAt(i++);
	                    enc1 = chr1 >> 2;
	                    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	                    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	                    enc4 = chr3 & 63;
	                    if (isNaN(chr2)) {
	                        enc3 = enc4 = 64;
	                    } else if (isNaN(chr3)) {
	                        enc4 = 64;
	                    }
	                    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	                }
	                return output;
	            }
	
	            return this;
	        }
	    });
	})(jQuery);
	/**
	 * Created by Administrator on 2015/12/18.
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n        <div id=\"toolbar\">\r\n            <select class=\"form-control\">\r\n                <option value=\"\">导出本页</option>\r\n                <option value=\"all\">导出全部</option>\r\n                <option value=\"selected\">导出选择数据</option>\r\n            </select>\r\n        </div>\r\n        <table id=\"table\"\r\n               data-toolbar=\"#toolbar\"\r\n               data-toggle=\"table\"\r\n               data-click-to-select=\"true\"\r\n               data-search=\"true\"\r\n               :data-show-refresh=\"srefresh\"\r\n               data-show-toggle=\"true\"\r\n               data-show-columns=\"true\"\r\n               data-show-export=\"true\"\r\n               data-minimum-count-columns=\"2\"\r\n               data-show-pagination-switch=\"true\"\r\n               data-pagination=\"true\"\r\n               data-id-field=\"id\"\r\n               data-page-list=\"[10, 25, 50, 100, ALL]\"\r\n               data-show-footer=\"false\">\r\n            <thead>\r\n            <tr>\r\n                <th data-field=\"state\" data-checkbox=\"true\"></th>\r\n                <th data-field=\"id\">编码</th>\r\n                <th data-field=\"name\">名称</th>\r\n                <th data-field=\"price\">价格</th>\r\n            </tr>\r\n            </thead>\r\n        </table>\r\n\r\n    </div>";

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-md-12\">\r\n        <data-table\r\n                :srefresh=\"srefresh\"\r\n                :tdata=\"tData\"\r\n                :dob=\"dob\"\r\n                :ttest=\"test1\">\r\n        </data-table>\r\n    </div>";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(101)
	__vue_template__ = __webpack_require__(109)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\views\\tree_demo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="col-md-12">
	//         <ztree
	//                 :setting="setting"
	//                 :znodes="znodes">
	//         </ztree>
	//     </div>
	
	// </template>
	
	// <script>
	var ztree = __webpack_require__(102);
	var setting = {
	    check: {
	        enable: true
	    },
	    data: {
	        simpleData: {
	            enable: true
	        }
	    }
	};
	var znodes = [{ id: 1, pId: 0, name: "父节点1 - 展开", open: true }, { id: 11, pId: 1, name: "父节点11 - 折叠" }, { id: 111, pId: 11, name: "叶子节点111" }, { id: 112, pId: 11, name: "叶子节点112" }, { id: 113, pId: 11, name: "叶子节点113" }, { id: 114, pId: 11, name: "叶子节点114" }, { id: 12, pId: 1, name: "父节点12 - 折叠" }, { id: 121, pId: 12, name: "叶子节点121" }, { id: 122, pId: 12, name: "叶子节点122" }, { id: 123, pId: 12, name: "叶子节点123" }, { id: 124, pId: 12, name: "叶子节点124" }, { id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true }, { id: 14, pId: 1, name: "叶子节点14 - 没有子节点" }, { id: 15, pId: 1, name: "叶子父节点15 - 没有子节点" }, { id: 2, pId: 0, name: "父节点2 - 折叠" }, { id: 21, pId: 2, name: "父节点21 - 展开", open: true }, { id: 211, pId: 21, name: "叶子节点211" }, { id: 212, pId: 21, name: "叶子节点212" }, { id: 213, pId: 21, name: "叶子节点213" }, { id: 214, pId: 21, name: "叶子节点214" }, { id: 22, pId: 2, name: "父节点22 - 折叠" }, { id: 221, pId: 22, name: "叶子节点221" }, { id: 222, pId: 22, name: "叶子节点222" }, { id: 223, pId: 22, name: "叶子节点223" }, { id: 224, pId: 22, name: "叶子节点224" }, { id: 23, pId: 2, name: "父节点23 - 折叠" }, { id: 231, pId: 23, name: "叶子节点231" }, { id: 232, pId: 23, name: "叶子节点232" }, { id: 233, pId: 23, name: "叶子节点233" }, { id: 234, pId: 23, name: "叶子节点234" }, { id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true }];
	exports.default = {
	    data: function data() {
	        return {
	            setting: setting,
	            znodes: znodes
	        };
	    },
	    components: {
	        ztree: ztree
	    }
	};
	// </script>

	// <!--<style lang="less">-->

	//     <!--.list-view {-->
	//         <!--li {-->
	//             <!--margin-bottom: 1rem;-->

	//             <!--a {-->
	//                 <!--font-size: 1.2rem;-->
	//             <!--}-->
	//         <!--}-->
	//     <!--}-->

	//     <!--@media(max-width: 600px) {-->
	//         <!--.publish-date {-->
	//             <!--display: none;-->
	//         <!--}-->
	//     <!--}-->

	// <!--</style>-->

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(103)
	__vue_script__ = __webpack_require__(105)
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(82)
	  hotAPI.install(__webpack_require__(11), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\newwork\\wqt\\src\\components\\ztree.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(104);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(91)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(104, function() {
				var newContent = __webpack_require__(104);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(90)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 105 */
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

/***/ },
/* 106 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {
	/*
	 * JQuery zTree core v3.5.18
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2015-08-26
	 */
	(function($){
		var settings = {}, roots = {}, caches = {},
		//default consts of core
		_consts = {
			className: {
				BUTTON: "button",
				LEVEL: "level",
				ICO_LOADING: "ico_loading",
				SWITCH: "switch"
			},
			event: {
				NODECREATED: "ztree_nodeCreated",
				CLICK: "ztree_click",
				EXPAND: "ztree_expand",
				COLLAPSE: "ztree_collapse",
				ASYNC_SUCCESS: "ztree_async_success",
				ASYNC_ERROR: "ztree_async_error",
				REMOVE: "ztree_remove",
				SELECTED: "ztree_selected",
				UNSELECTED: "ztree_unselected"
			},
			id: {
				A: "_a",
				ICON: "_ico",
				SPAN: "_span",
				SWITCH: "_switch",
				UL: "_ul"
			},
			line: {
				ROOT: "root",
				ROOTS: "roots",
				CENTER: "center",
				BOTTOM: "bottom",
				NOLINE: "noline",
				LINE: "line"
			},
			folder: {
				OPEN: "open",
				CLOSE: "close",
				DOCU: "docu"
			},
			node: {
				CURSELECTED: "curSelectedNode"
			}
		},
		//default setting of core
		_setting = {
			treeId: "",
			treeObj: null,
			view: {
				addDiyDom: null,
				autoCancelSelected: true,
				dblClickExpand: true,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: false,
				selectedMulti: true,
				showIcon: true,
				showLine: true,
				showTitle: true,
				txtSelectedEnable: false
			},
			data: {
				key: {
					children: "children",
					name: "name",
					title: "",
					url: "url",
					icon: "icon"
				},
				simpleData: {
					enable: false,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				},
				keep: {
					parent: false,
					leaf: false
				}
			},
			async: {
				enable: false,
				contentType: "application/x-www-form-urlencoded",
				type: "post",
				dataType: "text",
				url: "",
				autoParam: [],
				otherParam: [],
				dataFilter: null
			},
			callback: {
				beforeAsync:null,
				beforeClick:null,
				beforeDblClick:null,
				beforeRightClick:null,
				beforeMouseDown:null,
				beforeMouseUp:null,
				beforeExpand:null,
				beforeCollapse:null,
				beforeRemove:null,
	
				onAsyncError:null,
				onAsyncSuccess:null,
				onNodeCreated:null,
				onClick:null,
				onDblClick:null,
				onRightClick:null,
				onMouseDown:null,
				onMouseUp:null,
				onExpand:null,
				onCollapse:null,
				onRemove:null
			}
		},
		//default root of core
		//zTree use root to save full data
		_initRoot = function (setting) {
			var r = data.getRoot(setting);
			if (!r) {
				r = {};
				data.setRoot(setting, r);
			}
			r[setting.data.key.children] = [];
			r.expandTriggerFlag = false;
			r.curSelectedList = [];
			r.noSelection = true;
			r.createdNodes = [];
			r.zId = 0;
			r._ver = (new Date()).getTime();
		},
		//default cache of core
		_initCache = function(setting) {
			var c = data.getCache(setting);
			if (!c) {
				c = {};
				data.setCache(setting, c);
			}
			c.nodes = [];
			c.doms = [];
		},
		//default bindEvent of core
		_bindEvent = function(setting) {
			var o = setting.treeObj,
			c = consts.event;
			o.bind(c.NODECREATED, function (event, treeId, node) {
				tools.apply(setting.callback.onNodeCreated, [event, treeId, node]);
			});
	
			o.bind(c.CLICK, function (event, srcEvent, treeId, node, clickFlag) {
				tools.apply(setting.callback.onClick, [srcEvent, treeId, node, clickFlag]);
			});
	
			o.bind(c.EXPAND, function (event, treeId, node) {
				tools.apply(setting.callback.onExpand, [event, treeId, node]);
			});
	
			o.bind(c.COLLAPSE, function (event, treeId, node) {
				tools.apply(setting.callback.onCollapse, [event, treeId, node]);
			});
	
			o.bind(c.ASYNC_SUCCESS, function (event, treeId, node, msg) {
				tools.apply(setting.callback.onAsyncSuccess, [event, treeId, node, msg]);
			});
	
			o.bind(c.ASYNC_ERROR, function (event, treeId, node, XMLHttpRequest, textStatus, errorThrown) {
				tools.apply(setting.callback.onAsyncError, [event, treeId, node, XMLHttpRequest, textStatus, errorThrown]);
			});
	
			o.bind(c.REMOVE, function (event, treeId, treeNode) {
				tools.apply(setting.callback.onRemove, [event, treeId, treeNode]);
			});
	
			o.bind(c.SELECTED, function (event, treeId, node) {
				tools.apply(setting.callback.onSelected, [treeId, node]);
			});
			o.bind(c.UNSELECTED, function (event, treeId, node) {
				tools.apply(setting.callback.onUnSelected, [treeId, node]);
			});
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj,
			c = consts.event;
			o.unbind(c.NODECREATED)
			.unbind(c.CLICK)
			.unbind(c.EXPAND)
			.unbind(c.COLLAPSE)
			.unbind(c.ASYNC_SUCCESS)
			.unbind(c.ASYNC_ERROR)
			.unbind(c.REMOVE)
			.unbind(c.SELECTED)
			.unbind(c.UNSELECTED);
		},
		//default event proxy of core
		_eventProxy = function(event) {
			var target = event.target,
			setting = data.getSetting(event.data.treeId),
			tId = "", node = null,
			nodeEventType = "", treeEventType = "",
			nodeEventCallback = null, treeEventCallback = null,
			tmp = null;
	
			if (tools.eqs(event.type, "mousedown")) {
				treeEventType = "mousedown";
			} else if (tools.eqs(event.type, "mouseup")) {
				treeEventType = "mouseup";
			} else if (tools.eqs(event.type, "contextmenu")) {
				treeEventType = "contextmenu";
			} else if (tools.eqs(event.type, "click")) {
				if (tools.eqs(target.tagName, "span") && target.getAttribute("treeNode"+ consts.id.SWITCH) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "switchNode";
				} else {
					tmp = tools.getMDom(setting, target, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
					if (tmp) {
						tId = tools.getNodeMainDom(tmp).id;
						nodeEventType = "clickNode";
					}
				}
			} else if (tools.eqs(event.type, "dblclick")) {
				treeEventType = "dblclick";
				tmp = tools.getMDom(setting, target, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "switchNode";
				}
			}
			if (treeEventType.length > 0 && tId.length == 0) {
				tmp = tools.getMDom(setting, target, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
				if (tmp) {tId = tools.getNodeMainDom(tmp).id;}
			}
			// event to node
			if (tId.length>0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
					case "switchNode" :
						if (!node.isParent) {
							nodeEventType = "";
						} else if (tools.eqs(event.type, "click")
							|| (tools.eqs(event.type, "dblclick") && tools.apply(setting.view.dblClickExpand, [setting.treeId, node], setting.view.dblClickExpand))) {
							nodeEventCallback = handler.onSwitchNode;
						} else {
							nodeEventType = "";
						}
						break;
					case "clickNode" :
						nodeEventCallback = handler.onClickNode;
						break;
				}
			}
			// event to zTree
			switch (treeEventType) {
				case "mousedown" :
					treeEventCallback = handler.onZTreeMousedown;
					break;
				case "mouseup" :
					treeEventCallback = handler.onZTreeMouseup;
					break;
				case "dblclick" :
					treeEventCallback = handler.onZTreeDblclick;
					break;
				case "contextmenu" :
					treeEventCallback = handler.onZTreeContextmenu;
					break;
			}
			var proxyResult = {
				stop: false,
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		//default init node of core
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			var r = data.getRoot(setting),
			childKey = setting.data.key.children;
			n.level = level;
			n.tId = setting.treeId + "_" + (++r.zId);
			n.parentTId = parentNode ? parentNode.tId : null;
			n.open = (typeof n.open == "string") ? tools.eqs(n.open, "true") : !!n.open;
			if (n[childKey] && n[childKey].length > 0) {
				n.isParent = true;
				n.zAsync = true;
			} else {
				n.isParent = (typeof n.isParent == "string") ? tools.eqs(n.isParent, "true") : !!n.isParent;
				n.open = (n.isParent && !setting.async.enable) ? n.open : false;
				n.zAsync = !n.isParent;
			}
			n.isFirstNode = isFirstNode;
			n.isLastNode = isLastNode;
			n.getParentNode = function() {return data.getNodeCache(setting, n.parentTId);};
			n.getPreNode = function() {return data.getPreNode(setting, n);};
			n.getNextNode = function() {return data.getNextNode(setting, n);};
			n.isAjaxing = false;
			data.fixPIdKeyValue(setting, n);
		},
		_init = {
			bind: [_bindEvent],
			unbind: [_unbindEvent],
			caches: [_initCache],
			nodes: [_initNode],
			proxys: [_eventProxy],
			roots: [_initRoot],
			beforeA: [],
			afterA: [],
			innerBeforeA: [],
			innerAfterA: [],
			zTreeTools: []
		},
		//method of operate data
		data = {
			addNodeCache: function(setting, node) {
				data.getCache(setting).nodes[data.getNodeCacheId(node.tId)] = node;
			},
			getNodeCacheId: function(tId) {
				return tId.substring(tId.lastIndexOf("_")+1);
			},
			addAfterA: function(afterA) {
				_init.afterA.push(afterA);
			},
			addBeforeA: function(beforeA) {
				_init.beforeA.push(beforeA);
			},
			addInnerAfterA: function(innerAfterA) {
				_init.innerAfterA.push(innerAfterA);
			},
			addInnerBeforeA: function(innerBeforeA) {
				_init.innerBeforeA.push(innerBeforeA);
			},
			addInitBind: function(bindEvent) {
				_init.bind.push(bindEvent);
			},
			addInitUnBind: function(unbindEvent) {
				_init.unbind.push(unbindEvent);
			},
			addInitCache: function(initCache) {
				_init.caches.push(initCache);
			},
			addInitNode: function(initNode) {
				_init.nodes.push(initNode);
			},
			addInitProxy: function(initProxy, isFirst) {
				if (!!isFirst) {
					_init.proxys.splice(0,0,initProxy);
				} else {
					_init.proxys.push(initProxy);
				}
			},
			addInitRoot: function(initRoot) {
				_init.roots.push(initRoot);
			},
			addNodesData: function(setting, parentNode, nodes) {
				var childKey = setting.data.key.children;
				if (!parentNode[childKey]) parentNode[childKey] = [];
				if (parentNode[childKey].length > 0) {
					parentNode[childKey][parentNode[childKey].length - 1].isLastNode = false;
					view.setNodeLineIcos(setting, parentNode[childKey][parentNode[childKey].length - 1]);
				}
				parentNode.isParent = true;
				parentNode[childKey] = parentNode[childKey].concat(nodes);
			},
			addSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				if (!data.isSelectedNode(setting, node)) {
					root.curSelectedList.push(node);
				}
			},
			addCreatedNode: function(setting, node) {
				if (!!setting.callback.onNodeCreated || !!setting.view.addDiyDom) {
					var root = data.getRoot(setting);
					root.createdNodes.push(node);
				}
			},
			addZTreeTools: function(zTreeTools) {
				_init.zTreeTools.push(zTreeTools);
			},
			exSetting: function(s) {
				$.extend(true, _setting, s);
			},
			fixPIdKeyValue: function(setting, node) {
				if (setting.data.simpleData.enable) {
					node[setting.data.simpleData.pIdKey] = node.parentTId ? node.getParentNode()[setting.data.simpleData.idKey] : setting.data.simpleData.rootPId;
				}
			},
			getAfterA: function(setting, node, array) {
				for (var i=0, j=_init.afterA.length; i<j; i++) {
					_init.afterA[i].apply(this, arguments);
				}
			},
			getBeforeA: function(setting, node, array) {
				for (var i=0, j=_init.beforeA.length; i<j; i++) {
					_init.beforeA[i].apply(this, arguments);
				}
			},
			getInnerAfterA: function(setting, node, array) {
				for (var i=0, j=_init.innerAfterA.length; i<j; i++) {
					_init.innerAfterA[i].apply(this, arguments);
				}
			},
			getInnerBeforeA: function(setting, node, array) {
				for (var i=0, j=_init.innerBeforeA.length; i<j; i++) {
					_init.innerBeforeA[i].apply(this, arguments);
				}
			},
			getCache: function(setting) {
				return caches[setting.treeId];
			},
			getNextNode: function(setting, node) {
				if (!node) return null;
				var childKey = setting.data.key.children,
				p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
				for (var i=0, l=p[childKey].length-1; i<=l; i++) {
					if (p[childKey][i] === node) {
						return (i==l ? null : p[childKey][i+1]);
					}
				}
				return null;
			},
			getNodeByParam: function(setting, nodes, key, value) {
				if (!nodes || !key) return null;
				var childKey = setting.data.key.children;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i][key] == value) {
						return nodes[i];
					}
					var tmp = data.getNodeByParam(setting, nodes[i][childKey], key, value);
					if (tmp) return tmp;
				}
				return null;
			},
			getNodeCache: function(setting, tId) {
				if (!tId) return null;
				var n = caches[setting.treeId].nodes[data.getNodeCacheId(tId)];
				return n ? n : null;
			},
			getNodeName: function(setting, node) {
				var nameKey = setting.data.key.name;
				return "" + node[nameKey];
			},
			getNodeTitle: function(setting, node) {
				var t = setting.data.key.title === "" ? setting.data.key.name : setting.data.key.title;
				return "" + node[t];
			},
			getNodes: function(setting) {
				return data.getRoot(setting)[setting.data.key.children];
			},
			getNodesByParam: function(setting, nodes, key, value) {
				if (!nodes || !key) return [];
				var childKey = setting.data.key.children,
				result = [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i][key] == value) {
						result.push(nodes[i]);
					}
					result = result.concat(data.getNodesByParam(setting, nodes[i][childKey], key, value));
				}
				return result;
			},
			getNodesByParamFuzzy: function(setting, nodes, key, value) {
				if (!nodes || !key) return [];
				var childKey = setting.data.key.children,
				result = [];
				value = value.toLowerCase();
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (typeof nodes[i][key] == "string" && nodes[i][key].toLowerCase().indexOf(value)>-1) {
						result.push(nodes[i]);
					}
					result = result.concat(data.getNodesByParamFuzzy(setting, nodes[i][childKey], key, value));
				}
				return result;
			},
			getNodesByFilter: function(setting, nodes, filter, isSingle, invokeParam) {
				if (!nodes) return (isSingle ? null : []);
				var childKey = setting.data.key.children,
				result = isSingle ? null : [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (tools.apply(filter, [nodes[i], invokeParam], false)) {
						if (isSingle) {return nodes[i];}
						result.push(nodes[i]);
					}
					var tmpResult = data.getNodesByFilter(setting, nodes[i][childKey], filter, isSingle, invokeParam);
					if (isSingle && !!tmpResult) {return tmpResult;}
					result = isSingle ? tmpResult : result.concat(tmpResult);
				}
				return result;
			},
			getPreNode: function(setting, node) {
				if (!node) return null;
				var childKey = setting.data.key.children,
				p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
				for (var i=0, l=p[childKey].length; i<l; i++) {
					if (p[childKey][i] === node) {
						return (i==0 ? null : p[childKey][i-1]);
					}
				}
				return null;
			},
			getRoot: function(setting) {
				return setting ? roots[setting.treeId] : null;
			},
			getRoots: function() {
				return roots;
			},
			getSetting: function(treeId) {
				return settings[treeId];
			},
			getSettings: function() {
				return settings;
			},
			getZTreeTools: function(treeId) {
				var r = this.getRoot(this.getSetting(treeId));
				return r ? r.treeTools : null;
			},
			initCache: function(setting) {
				for (var i=0, j=_init.caches.length; i<j; i++) {
					_init.caches[i].apply(this, arguments);
				}
			},
			initNode: function(setting, level, node, parentNode, preNode, nextNode) {
				for (var i=0, j=_init.nodes.length; i<j; i++) {
					_init.nodes[i].apply(this, arguments);
				}
			},
			initRoot: function(setting) {
				for (var i=0, j=_init.roots.length; i<j; i++) {
					_init.roots[i].apply(this, arguments);
				}
			},
			isSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				for (var i=0, j=root.curSelectedList.length; i<j; i++) {
					if(node === root.curSelectedList[i]) return true;
				}
				return false;
			},
			removeNodeCache: function(setting, node) {
				var childKey = setting.data.key.children;
				if (node[childKey]) {
					for (var i=0, l=node[childKey].length; i<l; i++) {
						arguments.callee(setting, node[childKey][i]);
					}
				}
				data.getCache(setting).nodes[data.getNodeCacheId(node.tId)] = null;
			},
			removeSelectedNode: function(setting, node) {
				var root = data.getRoot(setting);
				for (var i=0, j=root.curSelectedList.length; i<j; i++) {
					if(node === root.curSelectedList[i] || !data.getNodeCache(setting, root.curSelectedList[i].tId)) {
						root.curSelectedList.splice(i, 1);
						setting.treeObj.trigger(consts.event.UNSELECTED, [setting.treeId, node]);
						i--;j--;
					}
				}
			},
			setCache: function(setting, cache) {
				caches[setting.treeId] = cache;
			},
			setRoot: function(setting, root) {
				roots[setting.treeId] = root;
			},
			setZTreeTools: function(setting, zTreeTools) {
				for (var i=0, j=_init.zTreeTools.length; i<j; i++) {
					_init.zTreeTools[i].apply(this, arguments);
				}
			},
			transformToArrayFormat: function (setting, nodes) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
				r = [];
				if (tools.isArray(nodes)) {
					for (var i=0, l=nodes.length; i<l; i++) {
						r.push(nodes[i]);
						if (nodes[i][childKey])
							r = r.concat(data.transformToArrayFormat(setting, nodes[i][childKey]));
					}
				} else {
					r.push(nodes);
					if (nodes[childKey])
						r = r.concat(data.transformToArrayFormat(setting, nodes[childKey]));
				}
				return r;
			},
			transformTozTreeFormat: function(setting, sNodes) {
				var i,l,
				key = setting.data.simpleData.idKey,
				parentKey = setting.data.simpleData.pIdKey,
				childKey = setting.data.key.children;
				if (!key || key=="" || !sNodes) return [];
	
				if (tools.isArray(sNodes)) {
					var r = [];
					var tmpMap = [];
					for (i=0, l=sNodes.length; i<l; i++) {
						tmpMap[sNodes[i][key]] = sNodes[i];
					}
					for (i=0, l=sNodes.length; i<l; i++) {
						if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
							if (!tmpMap[sNodes[i][parentKey]][childKey])
								tmpMap[sNodes[i][parentKey]][childKey] = [];
							tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
						} else {
							r.push(sNodes[i]);
						}
					}
					return r;
				}else {
					return [sNodes];
				}
			}
		},
		//method of event proxy
		event = {
			bindEvent: function(setting) {
				for (var i=0, j=_init.bind.length; i<j; i++) {
					_init.bind[i].apply(this, arguments);
				}
			},
			unbindEvent: function(setting) {
				for (var i=0, j=_init.unbind.length; i<j; i++) {
					_init.unbind[i].apply(this, arguments);
				}
			},
			bindTree: function(setting) {
				var eventParam = {
					treeId: setting.treeId
				},
				o = setting.treeObj;
				if (!setting.view.txtSelectedEnable) {
					// for can't select text
					o.bind('selectstart', function(e){
						var node
						var n = e.originalEvent.srcElement.nodeName.toLowerCase();
						return (n === "input" || n === "textarea" );
					}).css({
						"-moz-user-select":"-moz-none"
					});
				}
				o.bind('click', eventParam, event.proxy);
				o.bind('dblclick', eventParam, event.proxy);
				o.bind('mouseover', eventParam, event.proxy);
				o.bind('mouseout', eventParam, event.proxy);
				o.bind('mousedown', eventParam, event.proxy);
				o.bind('mouseup', eventParam, event.proxy);
				o.bind('contextmenu', eventParam, event.proxy);
			},
			unbindTree: function(setting) {
				var o = setting.treeObj;
				o.unbind('click', event.proxy)
				.unbind('dblclick', event.proxy)
				.unbind('mouseover', event.proxy)
				.unbind('mouseout', event.proxy)
				.unbind('mousedown', event.proxy)
				.unbind('mouseup', event.proxy)
				.unbind('contextmenu', event.proxy);
			},
			doProxy: function(e) {
				var results = [];
				for (var i=0, j=_init.proxys.length; i<j; i++) {
					var proxyResult = _init.proxys[i].apply(this, arguments);
					results.push(proxyResult);
					if (proxyResult.stop) {
						break;
					}
				}
				return results;
			},
			proxy: function(e) {
				var setting = data.getSetting(e.data.treeId);
				if (!tools.uCanDo(setting, e)) return true;
				var results = event.doProxy(e),
				r = true, x = false;
				for (var i=0, l=results.length; i<l; i++) {
					var proxyResult = results[i];
					if (proxyResult.nodeEventCallback) {
						x = true;
						r = proxyResult.nodeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r;
					}
					if (proxyResult.treeEventCallback) {
						x = true;
						r = proxyResult.treeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r;
					}
				}
				return r;
			}
		},
		//method of event handler
		handler = {
			onSwitchNode: function (event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (node.open) {
					if (tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false) return true;
					data.getRoot(setting).expandTriggerFlag = true;
					view.switchNode(setting, node);
				} else {
					if (tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false) return true;
					data.getRoot(setting).expandTriggerFlag = true;
					view.switchNode(setting, node);
				}
				return true;
			},
			onClickNode: function (event, node) {
				var setting = data.getSetting(event.data.treeId),
				clickFlag = ( (setting.view.autoCancelSelected && (event.ctrlKey || event.metaKey)) && data.isSelectedNode(setting, node)) ? 0 : (setting.view.autoCancelSelected && (event.ctrlKey || event.metaKey) && setting.view.selectedMulti) ? 2 : 1;
				if (tools.apply(setting.callback.beforeClick, [setting.treeId, node, clickFlag], true) == false) return true;
				if (clickFlag === 0) {
					view.cancelPreSelectedNode(setting, node);
				} else {
					view.selectNode(setting, node, clickFlag === 2);
				}
				setting.treeObj.trigger(consts.event.CLICK, [event, setting.treeId, node, clickFlag]);
				return true;
			},
			onZTreeMousedown: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeMouseDown, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onMouseDown, [event, setting.treeId, node]);
				}
				return true;
			},
			onZTreeMouseup: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeMouseUp, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onMouseUp, [event, setting.treeId, node]);
				}
				return true;
			},
			onZTreeDblclick: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeDblClick, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onDblClick, [event, setting.treeId, node]);
				}
				return true;
			},
			onZTreeContextmenu: function(event, node) {
				var setting = data.getSetting(event.data.treeId);
				if (tools.apply(setting.callback.beforeRightClick, [setting.treeId, node], true)) {
					tools.apply(setting.callback.onRightClick, [event, setting.treeId, node]);
				}
				return (typeof setting.callback.onRightClick) != "function";
			}
		},
		//method of tools for zTree
		tools = {
			apply: function(fun, param, defaultValue) {
				if ((typeof fun) == "function") {
					return fun.apply(zt, param?param:[]);
				}
				return defaultValue;
			},
			canAsync: function(setting, node) {
				var childKey = setting.data.key.children;
				return (setting.async.enable && node && node.isParent && !(node.zAsync || (node[childKey] && node[childKey].length > 0)));
			},
			clone: function (obj){
				if (obj === null) return null;
				var o = tools.isArray(obj) ? [] : {};
				for(var i in obj){
					o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? arguments.callee(obj[i]) : obj[i]);
				}
				return o;
			},
			eqs: function(str1, str2) {
				return str1.toLowerCase() === str2.toLowerCase();
			},
			isArray: function(arr) {
				return Object.prototype.toString.apply(arr) === "[object Array]";
			},
			$: function(node, exp, setting) {
				if (!!exp && typeof exp != "string") {
					setting = exp;
					exp = "";
				}
				if (typeof node == "string") {
					return $(node, setting ? setting.treeObj.get(0).ownerDocument : null);
				} else {
					return $("#" + node.tId + exp, setting ? setting.treeObj : null);
				}
			},
			getMDom: function (setting, curDom, targetExpr) {
				if (!curDom) return null;
				while (curDom && curDom.id !== setting.treeId) {
					for (var i=0, l=targetExpr.length; curDom.tagName && i<l; i++) {
						if (tools.eqs(curDom.tagName, targetExpr[i].tagName) && curDom.getAttribute(targetExpr[i].attrName) !== null) {
							return curDom;
						}
					}
					curDom = curDom.parentNode;
				}
				return null;
			},
			getNodeMainDom:function(target) {
				return ($(target).parent("li").get(0) || $(target).parentsUntil("li").parent().get(0));
			},
			isChildOrSelf: function(dom, parentId) {
				return ( $(dom).closest("#" + parentId).length> 0 );
			},
			uCanDo: function(setting, e) {
				return true;
			}
		},
		//method of operate ztree dom
		view = {
			addNodes: function(setting, parentNode, newNodes, isSilent) {
				if (setting.data.keep.leaf && parentNode && !parentNode.isParent) {
					return;
				}
				if (!tools.isArray(newNodes)) {
					newNodes = [newNodes];
				}
				if (setting.data.simpleData.enable) {
					newNodes = data.transformTozTreeFormat(setting, newNodes);
				}
				if (parentNode) {
					var target_switchObj = $$(parentNode, consts.id.SWITCH, setting),
					target_icoObj = $$(parentNode, consts.id.ICON, setting),
					target_ulObj = $$(parentNode, consts.id.UL, setting);
	
					if (!parentNode.open) {
						view.replaceSwitchClass(parentNode, target_switchObj, consts.folder.CLOSE);
						view.replaceIcoClass(parentNode, target_icoObj, consts.folder.CLOSE);
						parentNode.open = false;
						target_ulObj.css({
							"display": "none"
						});
					}
	
					data.addNodesData(setting, parentNode, newNodes);
					view.createNodes(setting, parentNode.level + 1, newNodes, parentNode);
					if (!isSilent) {
						view.expandCollapseParentNode(setting, parentNode, true);
					}
				} else {
					data.addNodesData(setting, data.getRoot(setting), newNodes);
					view.createNodes(setting, 0, newNodes, null);
				}
			},
			appendNodes: function(setting, level, nodes, parentNode, initFlag, openFlag) {
				if (!nodes) return [];
				var html = [],
				childKey = setting.data.key.children;
				for (var i = 0, l = nodes.length; i < l; i++) {
					var node = nodes[i];
					if (initFlag) {
						var tmpPNode = (parentNode) ? parentNode: data.getRoot(setting),
						tmpPChild = tmpPNode[childKey],
						isFirstNode = ((tmpPChild.length == nodes.length) && (i == 0)),
						isLastNode = (i == (nodes.length - 1));
						data.initNode(setting, level, node, parentNode, isFirstNode, isLastNode, openFlag);
						data.addNodeCache(setting, node);
					}
	
					var childHtml = [];
					if (node[childKey] && node[childKey].length > 0) {
						//make child html first, because checkType
						childHtml = view.appendNodes(setting, level + 1, node[childKey], node, initFlag, openFlag && node.open);
					}
					if (openFlag) {
	
						view.makeDOMNodeMainBefore(html, setting, node);
						view.makeDOMNodeLine(html, setting, node);
						data.getBeforeA(setting, node, html);
						view.makeDOMNodeNameBefore(html, setting, node);
						data.getInnerBeforeA(setting, node, html);
						view.makeDOMNodeIcon(html, setting, node);
						data.getInnerAfterA(setting, node, html);
						view.makeDOMNodeNameAfter(html, setting, node);
						data.getAfterA(setting, node, html);
						if (node.isParent && node.open) {
							view.makeUlHtml(setting, node, html, childHtml.join(''));
						}
						view.makeDOMNodeMainAfter(html, setting, node);
						data.addCreatedNode(setting, node);
					}
				}
				return html;
			},
			appendParentULDom: function(setting, node) {
				var html = [],
				nObj = $$(node, setting);
				if (!nObj.get(0) && !!node.parentTId) {
					view.appendParentULDom(setting, node.getParentNode());
					nObj = $$(node, setting);
				}
				var ulObj = $$(node, consts.id.UL, setting);
				if (ulObj.get(0)) {
					ulObj.remove();
				}
				var childKey = setting.data.key.children,
				childHtml = view.appendNodes(setting, node.level+1, node[childKey], node, false, true);
				view.makeUlHtml(setting, node, html, childHtml.join(''));
				nObj.append(html.join(''));
			},
			asyncNode: function(setting, node, isSilent, callback) {
				var i, l;
				if (node && !node.isParent) {
					tools.apply(callback);
					return false;
				} else if (node && node.isAjaxing) {
					return false;
				} else if (tools.apply(setting.callback.beforeAsync, [setting.treeId, node], true) == false) {
					tools.apply(callback);
					return false;
				}
				if (node) {
					node.isAjaxing = true;
					var icoObj = $$(node, consts.id.ICON, setting);
					icoObj.attr({"style":"", "class":consts.className.BUTTON + " " + consts.className.ICO_LOADING});
				}
	
				var tmpParam = {};
				for (i = 0, l = setting.async.autoParam.length; node && i < l; i++) {
					var pKey = setting.async.autoParam[i].split("="), spKey = pKey;
					if (pKey.length>1) {
						spKey = pKey[1];
						pKey = pKey[0];
					}
					tmpParam[spKey] = node[pKey];
				}
				if (tools.isArray(setting.async.otherParam)) {
					for (i = 0, l = setting.async.otherParam.length; i < l; i += 2) {
						tmpParam[setting.async.otherParam[i]] = setting.async.otherParam[i + 1];
					}
				} else {
					for (var p in setting.async.otherParam) {
						tmpParam[p] = setting.async.otherParam[p];
					}
				}
	
				var _tmpV = data.getRoot(setting)._ver;
				$.ajax({
					contentType: setting.async.contentType,
	                cache: false,
					type: setting.async.type,
					url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url),
					data: tmpParam,
					dataType: setting.async.dataType,
					success: function(msg) {
						if (_tmpV != data.getRoot(setting)._ver) {
							return;
						}
						var newNodes = [];
						try {
							if (!msg || msg.length == 0) {
								newNodes = [];
							} else if (typeof msg == "string") {
								newNodes = eval("(" + msg + ")");
							} else {
								newNodes = msg;
							}
						} catch(err) {
							newNodes = msg;
						}
	
						if (node) {
							node.isAjaxing = null;
							node.zAsync = true;
						}
						view.setNodeLineIcos(setting, node);
						if (newNodes && newNodes !== "") {
							newNodes = tools.apply(setting.async.dataFilter, [setting.treeId, node, newNodes], newNodes);
							view.addNodes(setting, node, !!newNodes ? tools.clone(newNodes) : [], !!isSilent);
						} else {
							view.addNodes(setting, node, [], !!isSilent);
						}
						setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [setting.treeId, node, msg]);
						tools.apply(callback);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						if (_tmpV != data.getRoot(setting)._ver) {
							return;
						}
						if (node) node.isAjaxing = null;
						view.setNodeLineIcos(setting, node);
						setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, XMLHttpRequest, textStatus, errorThrown]);
					}
				});
				return true;
			},
			cancelPreSelectedNode: function (setting, node, excludeNode) {
				var list = data.getRoot(setting).curSelectedList,
					i, n;
				for (i=list.length-1; i>=0; i--) {
					n = list[i];
					if (node === n || (!node && (!excludeNode || excludeNode !== n))) {
						$$(n, consts.id.A, setting).removeClass(consts.node.CURSELECTED);
						if (node) {
							data.removeSelectedNode(setting, node);
							break;
						} else {
							list.splice(i, 1);
							setting.treeObj.trigger(consts.event.UNSELECTED, [setting.treeId, n]);
						}
					}
				}
			},
			createNodeCallback: function(setting) {
				if (!!setting.callback.onNodeCreated || !!setting.view.addDiyDom) {
					var root = data.getRoot(setting);
					while (root.createdNodes.length>0) {
						var node = root.createdNodes.shift();
						tools.apply(setting.view.addDiyDom, [setting.treeId, node]);
						if (!!setting.callback.onNodeCreated) {
							setting.treeObj.trigger(consts.event.NODECREATED, [setting.treeId, node]);
						}
					}
				}
			},
			createNodes: function(setting, level, nodes, parentNode) {
				if (!nodes || nodes.length == 0) return;
				var root = data.getRoot(setting),
				childKey = setting.data.key.children,
				openFlag = !parentNode || parentNode.open || !!$$(parentNode[childKey][0], setting).get(0);
				root.createdNodes = [];
				var zTreeHtml = view.appendNodes(setting, level, nodes, parentNode, true, openFlag);
				if (!parentNode) {
					setting.treeObj.append(zTreeHtml.join(''));
				} else {
					var ulObj = $$(parentNode, consts.id.UL, setting);
					if (ulObj.get(0)) {
						ulObj.append(zTreeHtml.join(''));
					}
				}
				view.createNodeCallback(setting);
			},
			destroy: function(setting) {
				if (!setting) return;
				data.initCache(setting);
				data.initRoot(setting);
				event.unbindTree(setting);
				event.unbindEvent(setting);
				setting.treeObj.empty();
				delete settings[setting.treeId];
			},
			expandCollapseNode: function(setting, node, expandFlag, animateFlag, callback) {
				var root = data.getRoot(setting),
				childKey = setting.data.key.children;
				if (!node) {
					tools.apply(callback, []);
					return;
				}
				if (root.expandTriggerFlag) {
					var _callback = callback;
					callback = function(){
						if (_callback) _callback();
						if (node.open) {
							setting.treeObj.trigger(consts.event.EXPAND, [setting.treeId, node]);
						} else {
							setting.treeObj.trigger(consts.event.COLLAPSE, [setting.treeId, node]);
						}
					};
					root.expandTriggerFlag = false;
				}
				if (!node.open && node.isParent && ((!$$(node, consts.id.UL, setting).get(0)) || (node[childKey] && node[childKey].length>0 && !$$(node[childKey][0], setting).get(0)))) {
					view.appendParentULDom(setting, node);
					view.createNodeCallback(setting);
				}
				if (node.open == expandFlag) {
					tools.apply(callback, []);
					return;
				}
				var ulObj = $$(node, consts.id.UL, setting),
				switchObj = $$(node, consts.id.SWITCH, setting),
				icoObj = $$(node, consts.id.ICON, setting);
	
				if (node.isParent) {
					node.open = !node.open;
					if (node.iconOpen && node.iconClose) {
						icoObj.attr("style", view.makeNodeIcoStyle(setting, node));
					}
	
					if (node.open) {
						view.replaceSwitchClass(node, switchObj, consts.folder.OPEN);
						view.replaceIcoClass(node, icoObj, consts.folder.OPEN);
						if (animateFlag == false || setting.view.expandSpeed == "") {
							ulObj.show();
							tools.apply(callback, []);
						} else {
							if (node[childKey] && node[childKey].length > 0) {
								ulObj.slideDown(setting.view.expandSpeed, callback);
							} else {
								ulObj.show();
								tools.apply(callback, []);
							}
						}
					} else {
						view.replaceSwitchClass(node, switchObj, consts.folder.CLOSE);
						view.replaceIcoClass(node, icoObj, consts.folder.CLOSE);
						if (animateFlag == false || setting.view.expandSpeed == "" || !(node[childKey] && node[childKey].length > 0)) {
							ulObj.hide();
							tools.apply(callback, []);
						} else {
							ulObj.slideUp(setting.view.expandSpeed, callback);
						}
					}
				} else {
					tools.apply(callback, []);
				}
			},
			expandCollapseParentNode: function(setting, node, expandFlag, animateFlag, callback) {
				if (!node) return;
				if (!node.parentTId) {
					view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback);
					return;
				} else {
					view.expandCollapseNode(setting, node, expandFlag, animateFlag);
				}
				if (node.parentTId) {
					view.expandCollapseParentNode(setting, node.getParentNode(), expandFlag, animateFlag, callback);
				}
			},
			expandCollapseSonNode: function(setting, node, expandFlag, animateFlag, callback) {
				var root = data.getRoot(setting),
				childKey = setting.data.key.children,
				treeNodes = (node) ? node[childKey]: root[childKey],
				selfAnimateSign = (node) ? false : animateFlag,
				expandTriggerFlag = data.getRoot(setting).expandTriggerFlag;
				data.getRoot(setting).expandTriggerFlag = false;
				if (treeNodes) {
					for (var i = 0, l = treeNodes.length; i < l; i++) {
						if (treeNodes[i]) view.expandCollapseSonNode(setting, treeNodes[i], expandFlag, selfAnimateSign);
					}
				}
				data.getRoot(setting).expandTriggerFlag = expandTriggerFlag;
				view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback );
			},
			isSelectedNode: function (setting, node) {
				if (!node) {
					return false;
				}
				var list = data.getRoot(setting).curSelectedList,
					i;
				for (i=list.length-1; i>=0; i--) {
					if (node === list[i]) {
						return true;
					}
				}
				return false;
			},
			makeDOMNodeIcon: function(html, setting, node) {
				var nameStr = data.getNodeName(setting, node),
				name = setting.view.nameIsHTML ? nameStr : nameStr.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
				html.push("<span id='", node.tId, consts.id.ICON,
					"' title='' treeNode", consts.id.ICON," class='", view.makeNodeIcoClass(setting, node),
					"' style='", view.makeNodeIcoStyle(setting, node), "'></span><span id='", node.tId, consts.id.SPAN,
					"'>",name,"</span>");
			},
			makeDOMNodeLine: function(html, setting, node) {
				html.push("<span id='", node.tId, consts.id.SWITCH,	"' title='' class='", view.makeNodeLineClass(setting, node), "' treeNode", consts.id.SWITCH,"></span>");
			},
			makeDOMNodeMainAfter: function(html, setting, node) {
				html.push("</li>");
			},
			makeDOMNodeMainBefore: function(html, setting, node) {
				html.push("<li id='", node.tId, "' class='", consts.className.LEVEL, node.level,"' tabindex='0' hidefocus='true' treenode>");
			},
			makeDOMNodeNameAfter: function(html, setting, node) {
				html.push("</a>");
			},
			makeDOMNodeNameBefore: function(html, setting, node) {
				var title = data.getNodeTitle(setting, node),
				url = view.makeNodeUrl(setting, node),
				fontcss = view.makeNodeFontCss(setting, node),
				fontStyle = [];
				for (var f in fontcss) {
					fontStyle.push(f, ":", fontcss[f], ";");
				}
				html.push("<a id='", node.tId, consts.id.A, "' class='", consts.className.LEVEL, node.level,"' treeNode", consts.id.A," onclick=\"", (node.click || ''),
					"\" ", ((url != null && url.length > 0) ? "href='" + url + "'" : ""), " target='",view.makeNodeTarget(node),"' style='", fontStyle.join(''),
					"'");
				if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && title) {html.push("title='", title.replace(/'/g,"&#39;").replace(/</g,'&lt;').replace(/>/g,'&gt;'),"'");}
				html.push(">");
			},
			makeNodeFontCss: function(setting, node) {
				var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
				return (fontCss && ((typeof fontCss) != "function")) ? fontCss : {};
			},
			makeNodeIcoClass: function(setting, node) {
				var icoCss = ["ico"];
				if (!node.isAjaxing) {
					icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
					if (node.isParent) {
						icoCss.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE);
					} else {
						icoCss.push(consts.folder.DOCU);
					}
				}
				return consts.className.BUTTON + " " + icoCss.join('_');
			},
			makeNodeIcoStyle: function(setting, node) {
				var icoStyle = [];
				if (!node.isAjaxing) {
					var icon = (node.isParent && node.iconOpen && node.iconClose) ? (node.open ? node.iconOpen : node.iconClose) : node[setting.data.key.icon];
					if (icon) icoStyle.push("background:url(", icon, ") 0 0 no-repeat;");
					if (setting.view.showIcon == false || !tools.apply(setting.view.showIcon, [setting.treeId, node], true)) {
						icoStyle.push("width:0px;height:0px;");
					}
				}
				return icoStyle.join('');
			},
			makeNodeLineClass: function(setting, node) {
				var lineClass = [];
				if (setting.view.showLine) {
					if (node.level == 0 && node.isFirstNode && node.isLastNode) {
						lineClass.push(consts.line.ROOT);
					} else if (node.level == 0 && node.isFirstNode) {
						lineClass.push(consts.line.ROOTS);
					} else if (node.isLastNode) {
						lineClass.push(consts.line.BOTTOM);
					} else {
						lineClass.push(consts.line.CENTER);
					}
				} else {
					lineClass.push(consts.line.NOLINE);
				}
				if (node.isParent) {
					lineClass.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE);
				} else {
					lineClass.push(consts.folder.DOCU);
				}
				return view.makeNodeLineClassEx(node) + lineClass.join('_');
			},
			makeNodeLineClassEx: function(node) {
				return consts.className.BUTTON + " " + consts.className.LEVEL + node.level + " " + consts.className.SWITCH + " ";
			},
			makeNodeTarget: function(node) {
				return (node.target || "_blank");
			},
			makeNodeUrl: function(setting, node) {
				var urlKey = setting.data.key.url;
				return node[urlKey] ? node[urlKey] : null;
			},
			makeUlHtml: function(setting, node, html, content) {
				html.push("<ul id='", node.tId, consts.id.UL, "' class='", consts.className.LEVEL, node.level, " ", view.makeUlLineClass(setting, node), "' style='display:", (node.open ? "block": "none"),"'>");
				html.push(content);
				html.push("</ul>");
			},
			makeUlLineClass: function(setting, node) {
				return ((setting.view.showLine && !node.isLastNode) ? consts.line.LINE : "");
			},
			removeChildNodes: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children,
				nodes = node[childKey];
				if (!nodes) return;
	
				for (var i = 0, l = nodes.length; i < l; i++) {
					data.removeNodeCache(setting, nodes[i]);
				}
				data.removeSelectedNode(setting);
				delete node[childKey];
	
				if (!setting.data.keep.parent) {
					node.isParent = false;
					node.open = false;
					var tmp_switchObj = $$(node, consts.id.SWITCH, setting),
					tmp_icoObj = $$(node, consts.id.ICON, setting);
					view.replaceSwitchClass(node, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(node, tmp_icoObj, consts.folder.DOCU);
					$$(node, consts.id.UL, setting).remove();
				} else {
					$$(node, consts.id.UL, setting).empty();
				}
			},
			setFirstNode: function(setting, parentNode) {
				var childKey = setting.data.key.children, childLength = parentNode[childKey].length;
				if ( childLength > 0) {
					parentNode[childKey][0].isFirstNode = true;
				}
			},
			setLastNode: function(setting, parentNode) {
				var childKey = setting.data.key.children, childLength = parentNode[childKey].length;
				if ( childLength > 0) {
					parentNode[childKey][childLength - 1].isLastNode = true;
				}
			},
			removeNode: function(setting, node) {
				var root = data.getRoot(setting),
				childKey = setting.data.key.children,
				parentNode = (node.parentTId) ? node.getParentNode() : root;
	
				node.isFirstNode = false;
				node.isLastNode = false;
				node.getPreNode = function() {return null;};
				node.getNextNode = function() {return null;};
	
				if (!data.getNodeCache(setting, node.tId)) {
					return;
				}
	
				$$(node, setting).remove();
				data.removeNodeCache(setting, node);
				data.removeSelectedNode(setting, node);
	
				for (var i = 0, l = parentNode[childKey].length; i < l; i++) {
					if (parentNode[childKey][i].tId == node.tId) {
						parentNode[childKey].splice(i, 1);
						break;
					}
				}
				view.setFirstNode(setting, parentNode);
				view.setLastNode(setting, parentNode);
	
				var tmp_ulObj,tmp_switchObj,tmp_icoObj,
				childLength = parentNode[childKey].length;
	
				//repair nodes old parent
				if (!setting.data.keep.parent && childLength == 0) {
					//old parentNode has no child nodes
					parentNode.isParent = false;
					parentNode.open = false;
					tmp_ulObj = $$(parentNode, consts.id.UL, setting);
					tmp_switchObj = $$(parentNode, consts.id.SWITCH, setting);
					tmp_icoObj = $$(parentNode, consts.id.ICON, setting);
					view.replaceSwitchClass(parentNode, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(parentNode, tmp_icoObj, consts.folder.DOCU);
					tmp_ulObj.css("display", "none");
	
				} else if (setting.view.showLine && childLength > 0) {
					//old parentNode has child nodes
					var newLast = parentNode[childKey][childLength - 1];
					tmp_ulObj = $$(newLast, consts.id.UL, setting);
					tmp_switchObj = $$(newLast, consts.id.SWITCH, setting);
					tmp_icoObj = $$(newLast, consts.id.ICON, setting);
					if (parentNode == root) {
						if (parentNode[childKey].length == 1) {
							//node was root, and ztree has only one root after move node
							view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.ROOT);
						} else {
							var tmp_first_switchObj = $$(parentNode[childKey][0], consts.id.SWITCH, setting);
							view.replaceSwitchClass(parentNode[childKey][0], tmp_first_switchObj, consts.line.ROOTS);
							view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.BOTTOM);
						}
					} else {
						view.replaceSwitchClass(newLast, tmp_switchObj, consts.line.BOTTOM);
					}
					tmp_ulObj.removeClass(consts.line.LINE);
				}
			},
			replaceIcoClass: function(node, obj, newName) {
				if (!obj || node.isAjaxing) return;
				var tmpName = obj.attr("class");
				if (tmpName == undefined) return;
				var tmpList = tmpName.split("_");
				switch (newName) {
					case consts.folder.OPEN:
					case consts.folder.CLOSE:
					case consts.folder.DOCU:
						tmpList[tmpList.length-1] = newName;
						break;
				}
				obj.attr("class", tmpList.join("_"));
			},
			replaceSwitchClass: function(node, obj, newName) {
				if (!obj) return;
				var tmpName = obj.attr("class");
				if (tmpName == undefined) return;
				var tmpList = tmpName.split("_");
				switch (newName) {
					case consts.line.ROOT:
					case consts.line.ROOTS:
					case consts.line.CENTER:
					case consts.line.BOTTOM:
					case consts.line.NOLINE:
						tmpList[0] = view.makeNodeLineClassEx(node) + newName;
						break;
					case consts.folder.OPEN:
					case consts.folder.CLOSE:
					case consts.folder.DOCU:
						tmpList[1] = newName;
						break;
				}
				obj.attr("class", tmpList.join("_"));
				if (newName !== consts.folder.DOCU) {
					obj.removeAttr("disabled");
				} else {
					obj.attr("disabled", "disabled");
				}
			},
			selectNode: function(setting, node, addFlag) {
				if (!addFlag) {
					view.cancelPreSelectedNode(setting, null, node);
				}
				$$(node, consts.id.A, setting).addClass(consts.node.CURSELECTED);
				data.addSelectedNode(setting, node);
				setting.treeObj.trigger(consts.event.SELECTED, [setting.treeId, node]);
			},
			setNodeFontCss: function(setting, treeNode) {
				var aObj = $$(treeNode, consts.id.A, setting),
				fontCss = view.makeNodeFontCss(setting, treeNode);
				if (fontCss) {
					aObj.css(fontCss);
				}
			},
			setNodeLineIcos: function(setting, node) {
				if (!node) return;
				var switchObj = $$(node, consts.id.SWITCH, setting),
				ulObj = $$(node, consts.id.UL, setting),
				icoObj = $$(node, consts.id.ICON, setting),
				ulLine = view.makeUlLineClass(setting, node);
				if (ulLine.length==0) {
					ulObj.removeClass(consts.line.LINE);
				} else {
					ulObj.addClass(ulLine);
				}
				switchObj.attr("class", view.makeNodeLineClass(setting, node));
				if (node.isParent) {
					switchObj.removeAttr("disabled");
				} else {
					switchObj.attr("disabled", "disabled");
				}
				icoObj.removeAttr("style");
				icoObj.attr("style", view.makeNodeIcoStyle(setting, node));
				icoObj.attr("class", view.makeNodeIcoClass(setting, node));
			},
			setNodeName: function(setting, node) {
				var title = data.getNodeTitle(setting, node),
				nObj = $$(node, consts.id.SPAN, setting);
				nObj.empty();
				if (setting.view.nameIsHTML) {
					nObj.html(data.getNodeName(setting, node));
				} else {
					nObj.text(data.getNodeName(setting, node));
				}
				if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle)) {
					var aObj = $$(node, consts.id.A, setting);
					aObj.attr("title", !title ? "" : title);
				}
			},
			setNodeTarget: function(setting, node) {
				var aObj = $$(node, consts.id.A, setting);
				aObj.attr("target", view.makeNodeTarget(node));
			},
			setNodeUrl: function(setting, node) {
				var aObj = $$(node, consts.id.A, setting),
				url = view.makeNodeUrl(setting, node);
				if (url == null || url.length == 0) {
					aObj.removeAttr("href");
				} else {
					aObj.attr("href", url);
				}
			},
			switchNode: function(setting, node) {
				if (node.open || !tools.canAsync(setting, node)) {
					view.expandCollapseNode(setting, node, !node.open);
				} else if (setting.async.enable) {
					if (!view.asyncNode(setting, node)) {
						view.expandCollapseNode(setting, node, !node.open);
						return;
					}
				} else if (node) {
					view.expandCollapseNode(setting, node, !node.open);
				}
			}
		};
		// zTree defind
		$.fn.zTree = {
			consts : _consts,
			_z : {
				tools: tools,
				view: view,
				event: event,
				data: data
			},
			getZTreeObj: function(treeId) {
				var o = data.getZTreeTools(treeId);
				return o ? o : null;
			},
			destroy: function(treeId) {
				if (!!treeId && treeId.length > 0) {
					view.destroy(data.getSetting(treeId));
				} else {
					for(var s in settings) {
						view.destroy(settings[s]);
					}
				}
			},
			init: function(obj, zSetting, zNodes) {
				var setting = tools.clone(_setting);
				$.extend(true, setting, zSetting);
				setting.treeId = obj.attr("id");
				setting.treeObj = obj;
				setting.treeObj.empty();
				settings[setting.treeId] = setting;
				//For some older browser,(e.g., ie6)
				if(typeof document.body.style.maxHeight === "undefined") {
					setting.view.expandSpeed = "";
				}
				data.initRoot(setting);
				var root = data.getRoot(setting),
				childKey = setting.data.key.children;
				zNodes = zNodes ? tools.clone(tools.isArray(zNodes)? zNodes : [zNodes]) : [];
				if (setting.data.simpleData.enable) {
					root[childKey] = data.transformTozTreeFormat(setting, zNodes);
				} else {
					root[childKey] = zNodes;
				}
	
				data.initCache(setting);
				event.unbindTree(setting);
				event.bindTree(setting);
				event.unbindEvent(setting);
				event.bindEvent(setting);
	
				var zTreeTools = {
					setting : setting,
					addNodes : function(parentNode, newNodes, isSilent) {
						if (!newNodes) return null;
						if (!parentNode) parentNode = null;
						if (parentNode && !parentNode.isParent && setting.data.keep.leaf) return null;
						var xNewNodes = tools.clone(tools.isArray(newNodes)? newNodes: [newNodes]);
						function addCallback() {
							view.addNodes(setting, parentNode, xNewNodes, (isSilent==true));
						}
	
						if (tools.canAsync(setting, parentNode)) {
							view.asyncNode(setting, parentNode, isSilent, addCallback);
						} else {
							addCallback();
						}
						return xNewNodes;
					},
					cancelSelectedNode : function(node) {
						view.cancelPreSelectedNode(setting, node);
					},
					destroy : function() {
						view.destroy(setting);
					},
					expandAll : function(expandFlag) {
						expandFlag = !!expandFlag;
						view.expandCollapseSonNode(setting, null, expandFlag, true);
						return expandFlag;
					},
					expandNode : function(node, expandFlag, sonSign, focus, callbackFlag) {
						if (!node || !node.isParent) return null;
						if (expandFlag !== true && expandFlag !== false) {
							expandFlag = !node.open;
						}
						callbackFlag = !!callbackFlag;
	
						if (callbackFlag && expandFlag && (tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false)) {
							return null;
						} else if (callbackFlag && !expandFlag && (tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false)) {
							return null;
						}
						if (expandFlag && node.parentTId) {
							view.expandCollapseParentNode(setting, node.getParentNode(), expandFlag, false);
						}
						if (expandFlag === node.open && !sonSign) {
							return null;
						}
	
						data.getRoot(setting).expandTriggerFlag = callbackFlag;
						if (!tools.canAsync(setting, node) && sonSign) {
							view.expandCollapseSonNode(setting, node, expandFlag, true, function() {
								if (focus !== false) {try{$$(node, setting).focus().blur();}catch(e){}}
							});
						} else {
							node.open = !expandFlag;
							view.switchNode(this.setting, node);
							if (focus !== false) {try{$$(node, setting).focus().blur();}catch(e){}}
						}
						return expandFlag;
					},
					getNodes : function() {
						return data.getNodes(setting);
					},
					getNodeByParam : function(key, value, parentNode) {
						if (!key) return null;
						return data.getNodeByParam(setting, parentNode?parentNode[setting.data.key.children]:data.getNodes(setting), key, value);
					},
					getNodeByTId : function(tId) {
						return data.getNodeCache(setting, tId);
					},
					getNodesByParam : function(key, value, parentNode) {
						if (!key) return null;
						return data.getNodesByParam(setting, parentNode?parentNode[setting.data.key.children]:data.getNodes(setting), key, value);
					},
					getNodesByParamFuzzy : function(key, value, parentNode) {
						if (!key) return null;
						return data.getNodesByParamFuzzy(setting, parentNode?parentNode[setting.data.key.children]:data.getNodes(setting), key, value);
					},
					getNodesByFilter: function(filter, isSingle, parentNode, invokeParam) {
						isSingle = !!isSingle;
						if (!filter || (typeof filter != "function")) return (isSingle ? null : []);
						return data.getNodesByFilter(setting, parentNode?parentNode[setting.data.key.children]:data.getNodes(setting), filter, isSingle, invokeParam);
					},
					getNodeIndex : function(node) {
						if (!node) return null;
						var childKey = setting.data.key.children,
						parentNode = (node.parentTId) ? node.getParentNode() : data.getRoot(setting);
						for (var i=0, l = parentNode[childKey].length; i < l; i++) {
							if (parentNode[childKey][i] == node) return i;
						}
						return -1;
					},
					getSelectedNodes : function() {
						var r = [], list = data.getRoot(setting).curSelectedList;
						for (var i=0, l=list.length; i<l; i++) {
							r.push(list[i]);
						}
						return r;
					},
					isSelectedNode : function(node) {
						return data.isSelectedNode(setting, node);
					},
					reAsyncChildNodes : function(parentNode, reloadType, isSilent) {
						if (!this.setting.async.enable) return;
						var isRoot = !parentNode;
						if (isRoot) {
							parentNode = data.getRoot(setting);
						}
						if (reloadType=="refresh") {
							var childKey = this.setting.data.key.children;
							for (var i = 0, l = parentNode[childKey] ? parentNode[childKey].length : 0; i < l; i++) {
								data.removeNodeCache(setting, parentNode[childKey][i]);
							}
							data.removeSelectedNode(setting);
							parentNode[childKey] = [];
							if (isRoot) {
								this.setting.treeObj.empty();
							} else {
								var ulObj = $$(parentNode, consts.id.UL, setting);
								ulObj.empty();
							}
						}
						view.asyncNode(this.setting, isRoot? null:parentNode, !!isSilent);
					},
					refresh : function() {
						this.setting.treeObj.empty();
						var root = data.getRoot(setting),
						nodes = root[setting.data.key.children]
						data.initRoot(setting);
						root[setting.data.key.children] = nodes
						data.initCache(setting);
						view.createNodes(setting, 0, root[setting.data.key.children]);
					},
					removeChildNodes : function(node) {
						if (!node) return null;
						var childKey = setting.data.key.children,
						nodes = node[childKey];
						view.removeChildNodes(setting, node);
						return nodes ? nodes : null;
					},
					removeNode : function(node, callbackFlag) {
						if (!node) return;
						callbackFlag = !!callbackFlag;
						if (callbackFlag && tools.apply(setting.callback.beforeRemove, [setting.treeId, node], true) == false) return;
						view.removeNode(setting, node);
						if (callbackFlag) {
							this.setting.treeObj.trigger(consts.event.REMOVE, [setting.treeId, node]);
						}
					},
					selectNode : function(node, addFlag) {
						if (!node) return;
						if (tools.uCanDo(setting)) {
							addFlag = setting.view.selectedMulti && addFlag;
							if (node.parentTId) {
								view.expandCollapseParentNode(setting, node.getParentNode(), true, false, function() {
									try{$$(node, setting).focus().blur();}catch(e){}
								});
							} else {
								try{$$(node, setting).focus().blur();}catch(e){}
							}
							view.selectNode(setting, node, addFlag);
						}
					},
					transformTozTreeNodes : function(simpleNodes) {
						return data.transformTozTreeFormat(setting, simpleNodes);
					},
					transformToArray : function(nodes) {
						return data.transformToArrayFormat(setting, nodes);
					},
					updateNode : function(node, checkTypeFlag) {
						if (!node) return;
						var nObj = $$(node, setting);
						if (nObj.get(0) && tools.uCanDo(setting)) {
							view.setNodeName(setting, node);
							view.setNodeTarget(setting, node);
							view.setNodeUrl(setting, node);
							view.setNodeLineIcos(setting, node);
							view.setNodeFontCss(setting, node);
						}
					}
				}
				root.treeTools = zTreeTools;
				data.setZTreeTools(setting, zTreeTools);
	
				if (root[childKey] && root[childKey].length > 0) {
					view.createNodes(setting, 0, root[childKey]);
				} else if (setting.async.enable && setting.async.url && setting.async.url !== '') {
					view.asyncNode(setting);
				}
				return zTreeTools;
			}
		};
	
		var zt = $.fn.zTree,
		$$ = tools.$,
		consts = zt.consts;
	})(jQuery);
	/*
	 * JQuery zTree excheck v3.5.18
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2015-08-26
	 */
	(function($){
		//default consts of excheck
		var _consts = {
			event: {
				CHECK: "ztree_check"
			},
			id: {
				CHECK: "_check"
			},
			checkbox: {
				STYLE: "checkbox",
				DEFAULT: "chk",
				DISABLED: "disable",
				FALSE: "false",
				TRUE: "true",
				FULL: "full",
				PART: "part",
				FOCUS: "focus"
			},
			radio: {
				STYLE: "radio",
				TYPE_ALL: "all",
				TYPE_LEVEL: "level"
			}
		},
		//default setting of excheck
		_setting = {
			check: {
				enable: false,
				autoCheckTrigger: false,
				chkStyle: _consts.checkbox.STYLE,
				nocheckInherit: false,
				chkDisabledInherit: false,
				radioType: _consts.radio.TYPE_LEVEL,
				chkboxType: {
					"Y": "ps",
					"N": "ps"
				}
			},
			data: {
				key: {
					checked: "checked"
				}
			},
			callback: {
				beforeCheck:null,
				onCheck:null
			}
		},
		//default root of excheck
		_initRoot = function (setting) {
			var r = data.getRoot(setting);
			r.radioCheckedList = [];
		},
		//default cache of excheck
		_initCache = function(treeId) {},
		//default bind event of excheck
		_bindEvent = function(setting) {
			var o = setting.treeObj,
			c = consts.event;
			o.bind(c.CHECK, function (event, srcEvent, treeId, node) {
				event.srcEvent = srcEvent;
				tools.apply(setting.callback.onCheck, [event, treeId, node]);
			});
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj,
			c = consts.event;
			o.unbind(c.CHECK);
		},
		//default event proxy of excheck
		_eventProxy = function(e) {
			var target = e.target,
			setting = data.getSetting(e.data.treeId),
			tId = "", node = null,
			nodeEventType = "", treeEventType = "",
			nodeEventCallback = null, treeEventCallback = null;
	
			if (tools.eqs(e.type, "mouseover")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode"+ consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "mouseoverCheck";
				}
			} else if (tools.eqs(e.type, "mouseout")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode"+ consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "mouseoutCheck";
				}
			} else if (tools.eqs(e.type, "click")) {
				if (setting.check.enable && tools.eqs(target.tagName, "span") && target.getAttribute("treeNode"+ consts.id.CHECK) !== null) {
					tId = tools.getNodeMainDom(target).id;
					nodeEventType = "checkNode";
				}
			}
			if (tId.length>0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
					case "checkNode" :
						nodeEventCallback = _handler.onCheckNode;
						break;
					case "mouseoverCheck" :
						nodeEventCallback = _handler.onMouseoverCheck;
						break;
					case "mouseoutCheck" :
						nodeEventCallback = _handler.onMouseoutCheck;
						break;
				}
			}
			var proxyResult = {
				stop: nodeEventType === "checkNode",
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		//default init node of excheck
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			var checkedKey = setting.data.key.checked;
			if (typeof n[checkedKey] == "string") n[checkedKey] = tools.eqs(n[checkedKey], "true");
			n[checkedKey] = !!n[checkedKey];
			n.checkedOld = n[checkedKey];
			if (typeof n.nocheck == "string") n.nocheck = tools.eqs(n.nocheck, "true");
			n.nocheck = !!n.nocheck || (setting.check.nocheckInherit && parentNode && !!parentNode.nocheck);
			if (typeof n.chkDisabled == "string") n.chkDisabled = tools.eqs(n.chkDisabled, "true");
			n.chkDisabled = !!n.chkDisabled || (setting.check.chkDisabledInherit && parentNode && !!parentNode.chkDisabled);
			if (typeof n.halfCheck == "string") n.halfCheck = tools.eqs(n.halfCheck, "true");
			n.halfCheck = !!n.halfCheck;
			n.check_Child_State = -1;
			n.check_Focus = false;
			n.getCheckStatus = function() {return data.getCheckStatus(setting, n);};
	
			if (setting.check.chkStyle == consts.radio.STYLE && setting.check.radioType == consts.radio.TYPE_ALL && n[checkedKey] ) {
				var r = data.getRoot(setting);
				r.radioCheckedList.push(n);
			}
		},
		//add dom for check
		_beforeA = function(setting, node, html) {
			var checkedKey = setting.data.key.checked;
			if (setting.check.enable) {
				data.makeChkFlag(setting, node);
				html.push("<span ID='", node.tId, consts.id.CHECK, "' class='", view.makeChkClass(setting, node), "' treeNode", consts.id.CHECK, (node.nocheck === true?" style='display:none;'":""),"></span>");
			}
		},
		//update zTreeObj, add method of check
		_zTreeTools = function(setting, zTreeTools) {
			zTreeTools.checkNode = function(node, checked, checkTypeFlag, callbackFlag) {
				var checkedKey = this.setting.data.key.checked;
				if (node.chkDisabled === true) return;
				if (checked !== true && checked !== false) {
					checked = !node[checkedKey];
				}
				callbackFlag = !!callbackFlag;
	
				if (node[checkedKey] === checked && !checkTypeFlag) {
					return;
				} else if (callbackFlag && tools.apply(this.setting.callback.beforeCheck, [this.setting.treeId, node], true) == false) {
					return;
				}
				if (tools.uCanDo(this.setting) && this.setting.check.enable && node.nocheck !== true) {
					node[checkedKey] = checked;
					var checkObj = $$(node, consts.id.CHECK, this.setting);
					if (checkTypeFlag || this.setting.check.chkStyle === consts.radio.STYLE) view.checkNodeRelation(this.setting, node);
					view.setChkClass(this.setting, checkObj, node);
					view.repairParentChkClassWithSelf(this.setting, node);
					if (callbackFlag) {
						this.setting.treeObj.trigger(consts.event.CHECK, [null, this.setting.treeId, node]);
					}
				}
			}
	
			zTreeTools.checkAllNodes = function(checked) {
				view.repairAllChk(this.setting, !!checked);
			}
	
			zTreeTools.getCheckedNodes = function(checked) {
				var childKey = this.setting.data.key.children;
				checked = (checked !== false);
				return data.getTreeCheckedNodes(this.setting, data.getRoot(this.setting)[childKey], checked);
			}
	
			zTreeTools.getChangeCheckedNodes = function() {
				var childKey = this.setting.data.key.children;
				return data.getTreeChangeCheckedNodes(this.setting, data.getRoot(this.setting)[childKey]);
			}
	
			zTreeTools.setChkDisabled = function(node, disabled, inheritParent, inheritChildren) {
				disabled = !!disabled;
				inheritParent = !!inheritParent;
				inheritChildren = !!inheritChildren;
				view.repairSonChkDisabled(this.setting, node, disabled, inheritChildren);
				view.repairParentChkDisabled(this.setting, node.getParentNode(), disabled, inheritParent);
			}
	
			var _updateNode = zTreeTools.updateNode;
			zTreeTools.updateNode = function(node, checkTypeFlag) {
				if (_updateNode) _updateNode.apply(zTreeTools, arguments);
				if (!node || !this.setting.check.enable) return;
				var nObj = $$(node, this.setting);
				if (nObj.get(0) && tools.uCanDo(this.setting)) {
					var checkObj = $$(node, consts.id.CHECK, this.setting);
					if (checkTypeFlag == true || this.setting.check.chkStyle === consts.radio.STYLE) view.checkNodeRelation(this.setting, node);
					view.setChkClass(this.setting, checkObj, node);
					view.repairParentChkClassWithSelf(this.setting, node);
				}
			}
		},
		//method of operate data
		_data = {
			getRadioCheckedList: function(setting) {
				var checkedList = data.getRoot(setting).radioCheckedList;
				for (var i=0, j=checkedList.length; i<j; i++) {
					if(!data.getNodeCache(setting, checkedList[i].tId)) {
						checkedList.splice(i, 1);
						i--; j--;
					}
				}
				return checkedList;
			},
			getCheckStatus: function(setting, node) {
				if (!setting.check.enable || node.nocheck || node.chkDisabled) return null;
				var checkedKey = setting.data.key.checked,
				r = {
					checked: node[checkedKey],
					half: node.halfCheck ? node.halfCheck : (setting.check.chkStyle == consts.radio.STYLE ? (node.check_Child_State === 2) : (node[checkedKey] ? (node.check_Child_State > -1 && node.check_Child_State < 2) : (node.check_Child_State > 0)))
				};
				return r;
			},
			getTreeCheckedNodes: function(setting, nodes, checked, results) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked,
				onlyOne = (checked && setting.check.chkStyle == consts.radio.STYLE && setting.check.radioType == consts.radio.TYPE_ALL);
				results = !results ? [] : results;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i].nocheck !== true && nodes[i].chkDisabled !== true && nodes[i][checkedKey] == checked) {
						results.push(nodes[i]);
						if(onlyOne) {
							break;
						}
					}
					data.getTreeCheckedNodes(setting, nodes[i][childKey], checked, results);
					if(onlyOne && results.length > 0) {
						break;
					}
				}
				return results;
			},
			getTreeChangeCheckedNodes: function(setting, nodes, results) {
				if (!nodes) return [];
				var childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked;
				results = !results ? [] : results;
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (nodes[i].nocheck !== true && nodes[i].chkDisabled !== true && nodes[i][checkedKey] != nodes[i].checkedOld) {
						results.push(nodes[i]);
					}
					data.getTreeChangeCheckedNodes(setting, nodes[i][childKey], results);
				}
				return results;
			},
			makeChkFlag: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked,
				chkFlag = -1;
				if (node[childKey]) {
					for (var i = 0, l = node[childKey].length; i < l; i++) {
						var cNode = node[childKey][i];
						var tmp = -1;
						if (setting.check.chkStyle == consts.radio.STYLE) {
							if (cNode.nocheck === true || cNode.chkDisabled === true) {
								tmp = cNode.check_Child_State;
							} else if (cNode.halfCheck === true) {
								tmp = 2;
							} else if (cNode[checkedKey]) {
								tmp = 2;
							} else {
								tmp = cNode.check_Child_State > 0 ? 2:0;
							}
							if (tmp == 2) {
								chkFlag = 2; break;
							} else if (tmp == 0){
								chkFlag = 0;
							}
						} else if (setting.check.chkStyle == consts.checkbox.STYLE) {
							if (cNode.nocheck === true || cNode.chkDisabled === true) {
								tmp = cNode.check_Child_State;
							} else if (cNode.halfCheck === true) {
								tmp = 1;
							} else if (cNode[checkedKey] ) {
								tmp = (cNode.check_Child_State === -1 || cNode.check_Child_State === 2) ? 2 : 1;
							} else {
								tmp = (cNode.check_Child_State > 0) ? 1 : 0;
							}
							if (tmp === 1) {
								chkFlag = 1; break;
							} else if (tmp === 2 && chkFlag > -1 && i > 0 && tmp !== chkFlag) {
								chkFlag = 1; break;
							} else if (chkFlag === 2 && tmp > -1 && tmp < 2) {
								chkFlag = 1; break;
							} else if (tmp > -1) {
								chkFlag = tmp;
							}
						}
					}
				}
				node.check_Child_State = chkFlag;
			}
		},
		//method of event proxy
		_event = {
	
		},
		//method of event handler
		_handler = {
			onCheckNode: function (event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
				checkedKey = setting.data.key.checked;
				if (tools.apply(setting.callback.beforeCheck, [setting.treeId, node], true) == false) return true;
				node[checkedKey] = !node[checkedKey];
				view.checkNodeRelation(setting, node);
				var checkObj = $$(node, consts.id.CHECK, setting);
				view.setChkClass(setting, checkObj, node);
				view.repairParentChkClassWithSelf(setting, node);
				setting.treeObj.trigger(consts.event.CHECK, [event, setting.treeId, node]);
				return true;
			},
			onMouseoverCheck: function(event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
				checkObj = $$(node, consts.id.CHECK, setting);
				node.check_Focus = true;
				view.setChkClass(setting, checkObj, node);
				return true;
			},
			onMouseoutCheck: function(event, node) {
				if (node.chkDisabled === true) return false;
				var setting = data.getSetting(event.data.treeId),
				checkObj = $$(node, consts.id.CHECK, setting);
				node.check_Focus = false;
				view.setChkClass(setting, checkObj, node);
				return true;
			}
		},
		//method of tools for zTree
		_tools = {
	
		},
		//method of operate ztree dom
		_view = {
			checkNodeRelation: function(setting, node) {
				var pNode, i, l,
				childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked,
				r = consts.radio;
				if (setting.check.chkStyle == r.STYLE) {
					var checkedList = data.getRadioCheckedList(setting);
					if (node[checkedKey]) {
						if (setting.check.radioType == r.TYPE_ALL) {
							for (i = checkedList.length-1; i >= 0; i--) {
								pNode = checkedList[i];
								if (pNode[checkedKey] && pNode != node) {
									pNode[checkedKey] = false;
									checkedList.splice(i, 1);
	
									view.setChkClass(setting, $$(pNode, consts.id.CHECK, setting), pNode);
									if (pNode.parentTId != node.parentTId) {
										view.repairParentChkClassWithSelf(setting, pNode);
									}
								}
							}
							checkedList.push(node);
						} else {
							var parentNode = (node.parentTId) ? node.getParentNode() : data.getRoot(setting);
							for (i = 0, l = parentNode[childKey].length; i < l; i++) {
								pNode = parentNode[childKey][i];
								if (pNode[checkedKey] && pNode != node) {
									pNode[checkedKey] = false;
									view.setChkClass(setting, $$(pNode, consts.id.CHECK, setting), pNode);
								}
							}
						}
					} else if (setting.check.radioType == r.TYPE_ALL) {
						for (i = 0, l = checkedList.length; i < l; i++) {
							if (node == checkedList[i]) {
								checkedList.splice(i, 1);
								break;
							}
						}
					}
	
				} else {
					if (node[checkedKey] && (!node[childKey] || node[childKey].length==0 || setting.check.chkboxType.Y.indexOf("s") > -1)) {
						view.setSonNodeCheckBox(setting, node, true);
					}
					if (!node[checkedKey] && (!node[childKey] || node[childKey].length==0 || setting.check.chkboxType.N.indexOf("s") > -1)) {
						view.setSonNodeCheckBox(setting, node, false);
					}
					if (node[checkedKey] && setting.check.chkboxType.Y.indexOf("p") > -1) {
						view.setParentNodeCheckBox(setting, node, true);
					}
					if (!node[checkedKey] && setting.check.chkboxType.N.indexOf("p") > -1) {
						view.setParentNodeCheckBox(setting, node, false);
					}
				}
			},
			makeChkClass: function(setting, node) {
				var checkedKey = setting.data.key.checked,
				c = consts.checkbox, r = consts.radio,
				fullStyle = "";
				if (node.chkDisabled === true) {
					fullStyle = c.DISABLED;
				} else if (node.halfCheck) {
					fullStyle = c.PART;
				} else if (setting.check.chkStyle == r.STYLE) {
					fullStyle = (node.check_Child_State < 1)? c.FULL:c.PART;
				} else {
					fullStyle = node[checkedKey] ? ((node.check_Child_State === 2 || node.check_Child_State === -1) ? c.FULL:c.PART) : ((node.check_Child_State < 1)? c.FULL:c.PART);
				}
				var chkName = setting.check.chkStyle + "_" + (node[checkedKey] ? c.TRUE : c.FALSE) + "_" + fullStyle;
				chkName = (node.check_Focus && node.chkDisabled !== true) ? chkName + "_" + c.FOCUS : chkName;
				return consts.className.BUTTON + " " + c.DEFAULT + " " + chkName;
			},
			repairAllChk: function(setting, checked) {
				if (setting.check.enable && setting.check.chkStyle === consts.checkbox.STYLE) {
					var checkedKey = setting.data.key.checked,
					childKey = setting.data.key.children,
					root = data.getRoot(setting);
					for (var i = 0, l = root[childKey].length; i<l ; i++) {
						var node = root[childKey][i];
						if (node.nocheck !== true && node.chkDisabled !== true) {
							node[checkedKey] = checked;
						}
						view.setSonNodeCheckBox(setting, node, checked);
					}
				}
			},
			repairChkClass: function(setting, node) {
				if (!node) return;
				data.makeChkFlag(setting, node);
				if (node.nocheck !== true) {
					var checkObj = $$(node, consts.id.CHECK, setting);
					view.setChkClass(setting, checkObj, node);
				}
			},
			repairParentChkClass: function(setting, node) {
				if (!node || !node.parentTId) return;
				var pNode = node.getParentNode();
				view.repairChkClass(setting, pNode);
				view.repairParentChkClass(setting, pNode);
			},
			repairParentChkClassWithSelf: function(setting, node) {
				if (!node) return;
				var childKey = setting.data.key.children;
				if (node[childKey] && node[childKey].length > 0) {
					view.repairParentChkClass(setting, node[childKey][0]);
				} else {
					view.repairParentChkClass(setting, node);
				}
			},
			repairSonChkDisabled: function(setting, node, chkDisabled, inherit) {
				if (!node) return;
				var childKey = setting.data.key.children;
				if (node.chkDisabled != chkDisabled) {
					node.chkDisabled = chkDisabled;
				}
				view.repairChkClass(setting, node);
				if (node[childKey] && inherit) {
					for (var i = 0, l = node[childKey].length; i < l; i++) {
						var sNode = node[childKey][i];
						view.repairSonChkDisabled(setting, sNode, chkDisabled, inherit);
					}
				}
			},
			repairParentChkDisabled: function(setting, node, chkDisabled, inherit) {
				if (!node) return;
				if (node.chkDisabled != chkDisabled && inherit) {
					node.chkDisabled = chkDisabled;
				}
				view.repairChkClass(setting, node);
				view.repairParentChkDisabled(setting, node.getParentNode(), chkDisabled, inherit);
			},
			setChkClass: function(setting, obj, node) {
				if (!obj) return;
				if (node.nocheck === true) {
					obj.hide();
				} else {
					obj.show();
				}
	            obj.attr('class', view.makeChkClass(setting, node));
			},
			setParentNodeCheckBox: function(setting, node, value, srcNode) {
				var childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked,
				checkObj = $$(node, consts.id.CHECK, setting);
				if (!srcNode) srcNode = node;
				data.makeChkFlag(setting, node);
				if (node.nocheck !== true && node.chkDisabled !== true) {
					node[checkedKey] = value;
					view.setChkClass(setting, checkObj, node);
					if (setting.check.autoCheckTrigger && node != srcNode) {
						setting.treeObj.trigger(consts.event.CHECK, [null, setting.treeId, node]);
					}
				}
				if (node.parentTId) {
					var pSign = true;
					if (!value) {
						var pNodes = node.getParentNode()[childKey];
						for (var i = 0, l = pNodes.length; i < l; i++) {
							if ((pNodes[i].nocheck !== true && pNodes[i].chkDisabled !== true && pNodes[i][checkedKey])
							|| ((pNodes[i].nocheck === true || pNodes[i].chkDisabled === true) && pNodes[i].check_Child_State > 0)) {
								pSign = false;
								break;
							}
						}
					}
					if (pSign) {
						view.setParentNodeCheckBox(setting, node.getParentNode(), value, srcNode);
					}
				}
			},
			setSonNodeCheckBox: function(setting, node, value, srcNode) {
				if (!node) return;
				var childKey = setting.data.key.children,
				checkedKey = setting.data.key.checked,
				checkObj = $$(node, consts.id.CHECK, setting);
				if (!srcNode) srcNode = node;
	
				var hasDisable = false;
				if (node[childKey]) {
					for (var i = 0, l = node[childKey].length; i < l && node.chkDisabled !== true; i++) {
						var sNode = node[childKey][i];
						view.setSonNodeCheckBox(setting, sNode, value, srcNode);
						if (sNode.chkDisabled === true) hasDisable = true;
					}
				}
	
				if (node != data.getRoot(setting) && node.chkDisabled !== true) {
					if (hasDisable && node.nocheck !== true) {
						data.makeChkFlag(setting, node);
					}
					if (node.nocheck !== true && node.chkDisabled !== true) {
						node[checkedKey] = value;
						if (!hasDisable) node.check_Child_State = (node[childKey] && node[childKey].length > 0) ? (value ? 2 : 0) : -1;
					} else {
						node.check_Child_State = -1;
					}
					view.setChkClass(setting, checkObj, node);
					if (setting.check.autoCheckTrigger && node != srcNode && node.nocheck !== true && node.chkDisabled !== true) {
						setting.treeObj.trigger(consts.event.CHECK, [null, setting.treeId, node]);
					}
				}
	
			}
		},
	
		_z = {
			tools: _tools,
			view: _view,
			event: _event,
			data: _data
		};
		$.extend(true, $.fn.zTree.consts, _consts);
		$.extend(true, $.fn.zTree._z, _z);
	
		var zt = $.fn.zTree,
		tools = zt._z.tools,
		consts = zt.consts,
		view = zt._z.view,
		data = zt._z.data,
		event = zt._z.event,
		$$ = tools.$;
	
		data.exSetting(_setting);
		data.addInitBind(_bindEvent);
		data.addInitUnBind(_unbindEvent);
		data.addInitCache(_initCache);
		data.addInitNode(_initNode);
		data.addInitProxy(_eventProxy, true);
		data.addInitRoot(_initRoot);
		data.addBeforeA(_beforeA);
		data.addZTreeTools(_zTreeTools);
	
		var _createNodes = view.createNodes;
		view.createNodes = function(setting, level, nodes, parentNode) {
			if (_createNodes) _createNodes.apply(view, arguments);
			if (!nodes) return;
			view.repairParentChkClassWithSelf(setting, parentNode);
		}
		var _removeNode = view.removeNode;
		view.removeNode = function(setting, node) {
			var parentNode = node.getParentNode();
			if (_removeNode) _removeNode.apply(view, arguments);
			if (!node || !parentNode) return;
			view.repairChkClass(setting, parentNode);
			view.repairParentChkClass(setting, parentNode);
		}
	
		var _appendNodes = view.appendNodes;
		view.appendNodes = function(setting, level, nodes, parentNode, initFlag, openFlag) {
			var html = "";
			if (_appendNodes) {
				html = _appendNodes.apply(view, arguments);
			}
			if (parentNode) {
				data.makeChkFlag(setting, parentNode);
			}
			return html;
		}
	})(jQuery);
	/*
	 * JQuery zTree exedit v3.5.18
	 * http://zTree.me/
	 *
	 * Copyright (c) 2010 Hunter.z
	 *
	 * Licensed same as jquery - MIT License
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * email: hunter.z@263.net
	 * Date: 2015-08-26
	 */
	(function($){
		//default consts of exedit
		var _consts = {
			event: {
				DRAG: "ztree_drag",
				DROP: "ztree_drop",
				RENAME: "ztree_rename",
				DRAGMOVE:"ztree_dragmove"
			},
			id: {
				EDIT: "_edit",
				INPUT: "_input",
				REMOVE: "_remove"
			},
			move: {
				TYPE_INNER: "inner",
				TYPE_PREV: "prev",
				TYPE_NEXT: "next"
			},
			node: {
				CURSELECTED_EDIT: "curSelectedNode_Edit",
				TMPTARGET_TREE: "tmpTargetzTree",
				TMPTARGET_NODE: "tmpTargetNode"
			}
		},
		//default setting of exedit
		_setting = {
			edit: {
				enable: false,
				editNameSelectAll: false,
				showRemoveBtn: true,
				showRenameBtn: true,
				removeTitle: "remove",
				renameTitle: "rename",
				drag: {
					autoExpandTrigger: false,
					isCopy: true,
					isMove: true,
					prev: true,
					next: true,
					inner: true,
					minMoveSize: 5,
					borderMax: 10,
					borderMin: -5,
					maxShowNodeNum: 5,
					autoOpenTime: 500
				}
			},
			view: {
				addHoverDom: null,
				removeHoverDom: null
			},
			callback: {
				beforeDrag:null,
				beforeDragOpen:null,
				beforeDrop:null,
				beforeEditName:null,
				beforeRename:null,
				onDrag:null,
				onDragMove:null,
				onDrop:null,
				onRename:null
			}
		},
		//default root of exedit
		_initRoot = function (setting) {
			var r = data.getRoot(setting), rs = data.getRoots();
			r.curEditNode = null;
			r.curEditInput = null;
			r.curHoverNode = null;
			r.dragFlag = 0;
			r.dragNodeShowBefore = [];
			r.dragMaskList = new Array();
			rs.showHoverDom = true;
		},
		//default cache of exedit
		_initCache = function(treeId) {},
		//default bind event of exedit
		_bindEvent = function(setting) {
			var o = setting.treeObj;
			var c = consts.event;
			o.bind(c.RENAME, function (event, treeId, treeNode, isCancel) {
				tools.apply(setting.callback.onRename, [event, treeId, treeNode, isCancel]);
			});
	
			o.bind(c.DRAG, function (event, srcEvent, treeId, treeNodes) {
				tools.apply(setting.callback.onDrag, [srcEvent, treeId, treeNodes]);
			});
	
			o.bind(c.DRAGMOVE,function(event, srcEvent, treeId, treeNodes){
				tools.apply(setting.callback.onDragMove,[srcEvent, treeId, treeNodes]);
			});
	
			o.bind(c.DROP, function (event, srcEvent, treeId, treeNodes, targetNode, moveType, isCopy) {
				tools.apply(setting.callback.onDrop, [srcEvent, treeId, treeNodes, targetNode, moveType, isCopy]);
			});
		},
		_unbindEvent = function(setting) {
			var o = setting.treeObj;
			var c = consts.event;
			o.unbind(c.RENAME);
			o.unbind(c.DRAG);
			o.unbind(c.DRAGMOVE);
			o.unbind(c.DROP);
		},
		//default event proxy of exedit
		_eventProxy = function(e) {
			var target = e.target,
			setting = data.getSetting(e.data.treeId),
			relatedTarget = e.relatedTarget,
			tId = "", node = null,
			nodeEventType = "", treeEventType = "",
			nodeEventCallback = null, treeEventCallback = null,
			tmp = null;
	
			if (tools.eqs(e.type, "mouseover")) {
				tmp = tools.getMDom(setting, target, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "hoverOverNode";
				}
			} else if (tools.eqs(e.type, "mouseout")) {
				tmp = tools.getMDom(setting, relatedTarget, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
				if (!tmp) {
					tId = "remove";
					nodeEventType = "hoverOutNode";
				}
			} else if (tools.eqs(e.type, "mousedown")) {
				tmp = tools.getMDom(setting, target, [{tagName:"a", attrName:"treeNode"+consts.id.A}]);
				if (tmp) {
					tId = tools.getNodeMainDom(tmp).id;
					nodeEventType = "mousedownNode";
				}
			}
			if (tId.length>0) {
				node = data.getNodeCache(setting, tId);
				switch (nodeEventType) {
					case "mousedownNode" :
						nodeEventCallback = _handler.onMousedownNode;
						break;
					case "hoverOverNode" :
						nodeEventCallback = _handler.onHoverOverNode;
						break;
					case "hoverOutNode" :
						nodeEventCallback = _handler.onHoverOutNode;
						break;
				}
			}
			var proxyResult = {
				stop: false,
				node: node,
				nodeEventType: nodeEventType,
				nodeEventCallback: nodeEventCallback,
				treeEventType: treeEventType,
				treeEventCallback: treeEventCallback
			};
			return proxyResult
		},
		//default init node of exedit
		_initNode = function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			n.isHover = false;
			n.editNameFlag = false;
		},
		//update zTreeObj, add method of edit
		_zTreeTools = function(setting, zTreeTools) {
			zTreeTools.cancelEditName = function(newName) {
				var root = data.getRoot(this.setting);
				if (!root.curEditNode) return;
				view.cancelCurEditNode(this.setting, newName?newName:null, true);
			}
			zTreeTools.copyNode = function(targetNode, node, moveType, isSilent) {
				if (!node) return null;
				if (targetNode && !targetNode.isParent && this.setting.data.keep.leaf && moveType === consts.move.TYPE_INNER) return null;
				var _this = this,
					newNode = tools.clone(node);
				if (!targetNode) {
					targetNode = null;
					moveType = consts.move.TYPE_INNER;
				}
				if (moveType == consts.move.TYPE_INNER) {
					function copyCallback() {
						view.addNodes(_this.setting, targetNode, [newNode], isSilent);
					}
	
					if (tools.canAsync(this.setting, targetNode)) {
						view.asyncNode(this.setting, targetNode, isSilent, copyCallback);
					} else {
						copyCallback();
					}
				} else {
					view.addNodes(this.setting, targetNode.parentNode, [newNode], isSilent);
					view.moveNode(this.setting, targetNode, newNode, moveType, false, isSilent);
				}
				return newNode;
			}
			zTreeTools.editName = function(node) {
				if (!node || !node.tId || node !== data.getNodeCache(this.setting, node.tId)) return;
				if (node.parentTId) view.expandCollapseParentNode(this.setting, node.getParentNode(), true);
				view.editNode(this.setting, node)
			}
			zTreeTools.moveNode = function(targetNode, node, moveType, isSilent) {
				if (!node) return node;
				if (targetNode && !targetNode.isParent && this.setting.data.keep.leaf && moveType === consts.move.TYPE_INNER) {
					return null;
				} else if (targetNode && ((node.parentTId == targetNode.tId && moveType == consts.move.TYPE_INNER) || $$(node, this.setting).find("#" + targetNode.tId).length > 0)) {
					return null;
				} else if (!targetNode) {
					targetNode = null;
				}
				var _this = this;
				function moveCallback() {
					view.moveNode(_this.setting, targetNode, node, moveType, false, isSilent);
				}
				if (tools.canAsync(this.setting, targetNode) && moveType === consts.move.TYPE_INNER) {
					view.asyncNode(this.setting, targetNode, isSilent, moveCallback);
				} else {
					moveCallback();
				}
				return node;
			}
			zTreeTools.setEditable = function(editable) {
				this.setting.edit.enable = editable;
				return this.refresh();
			}
		},
		//method of operate data
		_data = {
			setSonNodeLevel: function(setting, parentNode, node) {
				if (!node) return;
				var childKey = setting.data.key.children;
				node.level = (parentNode)? parentNode.level + 1 : 0;
				if (!node[childKey]) return;
				for (var i = 0, l = node[childKey].length; i < l; i++) {
					if (node[childKey][i]) data.setSonNodeLevel(setting, node, node[childKey][i]);
				}
			}
		},
		//method of event proxy
		_event = {
	
		},
		//method of event handler
		_handler = {
			onHoverOverNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId),
				root = data.getRoot(setting);
				if (root.curHoverNode != node) {
					_handler.onHoverOutNode(event);
				}
				root.curHoverNode = node;
				view.addHoverDom(setting, node);
			},
			onHoverOutNode: function(event, node) {
				var setting = data.getSetting(event.data.treeId),
				root = data.getRoot(setting);
				if (root.curHoverNode && !data.isSelectedNode(setting, root.curHoverNode)) {
					view.removeTreeDom(setting, root.curHoverNode);
					root.curHoverNode = null;
				}
			},
			onMousedownNode: function(eventMouseDown, _node) {
				var i,l,
				setting = data.getSetting(eventMouseDown.data.treeId),
				root = data.getRoot(setting), roots = data.getRoots();
				//right click can't drag & drop
				if (eventMouseDown.button == 2 || !setting.edit.enable || (!setting.edit.drag.isCopy && !setting.edit.drag.isMove)) return true;
	
				//input of edit node name can't drag & drop
				var target = eventMouseDown.target,
				_nodes = data.getRoot(setting).curSelectedList,
				nodes = [];
				if (!data.isSelectedNode(setting, _node)) {
					nodes = [_node];
				} else {
					for (i=0, l=_nodes.length; i<l; i++) {
						if (_nodes[i].editNameFlag && tools.eqs(target.tagName, "input") && target.getAttribute("treeNode"+consts.id.INPUT) !== null) {
							return true;
						}
						nodes.push(_nodes[i]);
						if (nodes[0].parentTId !== _nodes[i].parentTId) {
							nodes = [_node];
							break;
						}
					}
				}
	
				view.editNodeBlur = true;
				view.cancelCurEditNode(setting);
	
				var doc = $(setting.treeObj.get(0).ownerDocument),
				body = $(setting.treeObj.get(0).ownerDocument.body), curNode, tmpArrow, tmpTarget,
				isOtherTree = false,
				targetSetting = setting,
				sourceSetting = setting,
				preNode, nextNode,
				preTmpTargetNodeId = null,
				preTmpMoveType = null,
				tmpTargetNodeId = null,
				moveType = consts.move.TYPE_INNER,
				mouseDownX = eventMouseDown.clientX,
				mouseDownY = eventMouseDown.clientY,
				startTime = (new Date()).getTime();
	
				if (tools.uCanDo(setting)) {
					doc.bind("mousemove", _docMouseMove);
				}
				function _docMouseMove(event) {
					//avoid start drag after click node
					if (root.dragFlag == 0 && Math.abs(mouseDownX - event.clientX) < setting.edit.drag.minMoveSize
						&& Math.abs(mouseDownY - event.clientY) < setting.edit.drag.minMoveSize) {
						return true;
					}
					var i, l, tmpNode, tmpDom, tmpNodes,
					childKey = setting.data.key.children;
					body.css("cursor", "pointer");
	
					if (root.dragFlag == 0) {
						if (tools.apply(setting.callback.beforeDrag, [setting.treeId, nodes], true) == false) {
							_docMouseUp(event);
							return true;
						}
	
						for (i=0, l=nodes.length; i<l; i++) {
							if (i==0) {
								root.dragNodeShowBefore = [];
							}
							tmpNode = nodes[i];
							if (tmpNode.isParent && tmpNode.open) {
								view.expandCollapseNode(setting, tmpNode, !tmpNode.open);
								root.dragNodeShowBefore[tmpNode.tId] = true;
							} else {
								root.dragNodeShowBefore[tmpNode.tId] = false;
							}
						}
	
						root.dragFlag = 1;
						roots.showHoverDom = false;
						tools.showIfameMask(setting, true);
	
						//sort
						var isOrder = true, lastIndex = -1;
						if (nodes.length>1) {
							var pNodes = nodes[0].parentTId ? nodes[0].getParentNode()[childKey] : data.getNodes(setting);
							tmpNodes = [];
							for (i=0, l=pNodes.length; i<l; i++) {
								if (root.dragNodeShowBefore[pNodes[i].tId] !== undefined) {
									if (isOrder && lastIndex > -1 && (lastIndex+1) !== i) {
										isOrder = false;
									}
									tmpNodes.push(pNodes[i]);
									lastIndex = i;
								}
								if (nodes.length === tmpNodes.length) {
									nodes = tmpNodes;
									break;
								}
							}
						}
						if (isOrder) {
							preNode = nodes[0].getPreNode();
							nextNode = nodes[nodes.length-1].getNextNode();
						}
	
						//set node in selected
						curNode = $$("<ul class='zTreeDragUL'></ul>", setting);
						for (i=0, l=nodes.length; i<l; i++) {
							tmpNode = nodes[i];
							tmpNode.editNameFlag = false;
							view.selectNode(setting, tmpNode, i>0);
							view.removeTreeDom(setting, tmpNode);
	
							if (i > setting.edit.drag.maxShowNodeNum-1) {
								continue;
							}
	
							tmpDom = $$("<li id='"+ tmpNode.tId +"_tmp'></li>", setting);
							tmpDom.append($$(tmpNode, consts.id.A, setting).clone());
							tmpDom.css("padding", "0");
							tmpDom.children("#" + tmpNode.tId + consts.id.A).removeClass(consts.node.CURSELECTED);
							curNode.append(tmpDom);
							if (i == setting.edit.drag.maxShowNodeNum-1) {
								tmpDom = $$("<li id='"+ tmpNode.tId +"_moretmp'><a>  ...  </a></li>", setting);
								curNode.append(tmpDom);
							}
						}
						curNode.attr("id", nodes[0].tId + consts.id.UL + "_tmp");
						curNode.addClass(setting.treeObj.attr("class"));
						curNode.appendTo(body);
	
						tmpArrow = $$("<span class='tmpzTreeMove_arrow'></span>", setting);
						tmpArrow.attr("id", "zTreeMove_arrow_tmp");
						tmpArrow.appendTo(body);
	
						setting.treeObj.trigger(consts.event.DRAG, [event, setting.treeId, nodes]);
					}
	
					if (root.dragFlag == 1) {
						if (tmpTarget && tmpArrow.attr("id") == event.target.id && tmpTargetNodeId && (event.clientX + doc.scrollLeft()+2) > ($("#" + tmpTargetNodeId + consts.id.A, tmpTarget).offset().left)) {
							var xT = $("#" + tmpTargetNodeId + consts.id.A, tmpTarget);
							event.target = (xT.length > 0) ? xT.get(0) : event.target;
						} else if (tmpTarget) {
							tmpTarget.removeClass(consts.node.TMPTARGET_TREE);
							if (tmpTargetNodeId) $("#" + tmpTargetNodeId + consts.id.A, tmpTarget).removeClass(consts.node.TMPTARGET_NODE + "_" + consts.move.TYPE_PREV)
								.removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_NEXT).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_INNER);
						}
						tmpTarget = null;
						tmpTargetNodeId = null;
	
						//judge drag & drop in multi ztree
						isOtherTree = false;
						targetSetting = setting;
						var settings = data.getSettings();
						for (var s in settings) {
							if (settings[s].treeId && settings[s].edit.enable && settings[s].treeId != setting.treeId
								&& (event.target.id == settings[s].treeId || $(event.target).parents("#" + settings[s].treeId).length>0)) {
								isOtherTree = true;
								targetSetting = settings[s];
							}
						}
	
						var docScrollTop = doc.scrollTop(),
						docScrollLeft = doc.scrollLeft(),
						treeOffset = targetSetting.treeObj.offset(),
						scrollHeight = targetSetting.treeObj.get(0).scrollHeight,
						scrollWidth = targetSetting.treeObj.get(0).scrollWidth,
						dTop = (event.clientY + docScrollTop - treeOffset.top),
						dBottom = (targetSetting.treeObj.height() + treeOffset.top - event.clientY - docScrollTop),
						dLeft = (event.clientX + docScrollLeft - treeOffset.left),
						dRight = (targetSetting.treeObj.width() + treeOffset.left - event.clientX - docScrollLeft),
						isTop = (dTop < setting.edit.drag.borderMax && dTop > setting.edit.drag.borderMin),
						isBottom = (dBottom < setting.edit.drag.borderMax && dBottom > setting.edit.drag.borderMin),
						isLeft = (dLeft < setting.edit.drag.borderMax && dLeft > setting.edit.drag.borderMin),
						isRight = (dRight < setting.edit.drag.borderMax && dRight > setting.edit.drag.borderMin),
						isTreeInner = dTop > setting.edit.drag.borderMin && dBottom > setting.edit.drag.borderMin && dLeft > setting.edit.drag.borderMin && dRight > setting.edit.drag.borderMin,
						isTreeTop = (isTop && targetSetting.treeObj.scrollTop() <= 0),
						isTreeBottom = (isBottom && (targetSetting.treeObj.scrollTop() + targetSetting.treeObj.height()+10) >= scrollHeight),
						isTreeLeft = (isLeft && targetSetting.treeObj.scrollLeft() <= 0),
						isTreeRight = (isRight && (targetSetting.treeObj.scrollLeft() + targetSetting.treeObj.width()+10) >= scrollWidth);
	
						if (event.target && tools.isChildOrSelf(event.target, targetSetting.treeId)) {
							//get node <li> dom
							var targetObj = event.target;
							while (targetObj && targetObj.tagName && !tools.eqs(targetObj.tagName, "li") && targetObj.id != targetSetting.treeId) {
								targetObj = targetObj.parentNode;
							}
	
							var canMove = true;
							//don't move to self or children of self
							for (i=0, l=nodes.length; i<l; i++) {
								tmpNode = nodes[i];
								if (targetObj.id === tmpNode.tId) {
									canMove = false;
									break;
								} else if ($$(tmpNode, setting).find("#" + targetObj.id).length > 0) {
									canMove = false;
									break;
								}
							}
							if (canMove && event.target && tools.isChildOrSelf(event.target, targetObj.id + consts.id.A)) {
								tmpTarget = $(targetObj);
								tmpTargetNodeId = targetObj.id;
							}
						}
	
						//the mouse must be in zTree
						tmpNode = nodes[0];
						if (isTreeInner && tools.isChildOrSelf(event.target, targetSetting.treeId)) {
							//judge mouse move in root of ztree
							if (!tmpTarget && (event.target.id == targetSetting.treeId || isTreeTop || isTreeBottom || isTreeLeft || isTreeRight) && (isOtherTree || (!isOtherTree && tmpNode.parentTId))) {
								tmpTarget = targetSetting.treeObj;
							}
							//auto scroll top
							if (isTop) {
								targetSetting.treeObj.scrollTop(targetSetting.treeObj.scrollTop()-10);
							} else if (isBottom)  {
								targetSetting.treeObj.scrollTop(targetSetting.treeObj.scrollTop()+10);
							}
							if (isLeft) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft()-10);
							} else if (isRight) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft()+10);
							}
							//auto scroll left
							if (tmpTarget && tmpTarget != targetSetting.treeObj && tmpTarget.offset().left < targetSetting.treeObj.offset().left) {
								targetSetting.treeObj.scrollLeft(targetSetting.treeObj.scrollLeft()+ tmpTarget.offset().left - targetSetting.treeObj.offset().left);
							}
						}
	
						curNode.css({
							"top": (event.clientY + docScrollTop + 3) + "px",
							"left": (event.clientX + docScrollLeft + 3) + "px"
						});
	
						var dX = 0;
						var dY = 0;
						if (tmpTarget && tmpTarget.attr("id")!=targetSetting.treeId) {
							var tmpTargetNode = tmpTargetNodeId == null ? null: data.getNodeCache(targetSetting, tmpTargetNodeId),
							isCopy = ((event.ctrlKey || event.metaKey) && setting.edit.drag.isMove && setting.edit.drag.isCopy) || (!setting.edit.drag.isMove && setting.edit.drag.isCopy),
							isPrev = !!(preNode && tmpTargetNodeId === preNode.tId),
							isNext = !!(nextNode && tmpTargetNodeId === nextNode.tId),
							isInner = (tmpNode.parentTId && tmpNode.parentTId == tmpTargetNodeId),
							canPrev = (isCopy || !isNext) && tools.apply(targetSetting.edit.drag.prev, [targetSetting.treeId, nodes, tmpTargetNode], !!targetSetting.edit.drag.prev),
							canNext = (isCopy || !isPrev) && tools.apply(targetSetting.edit.drag.next, [targetSetting.treeId, nodes, tmpTargetNode], !!targetSetting.edit.drag.next),
							canInner = (isCopy || !isInner) && !(targetSetting.data.keep.leaf && !tmpTargetNode.isParent) && tools.apply(targetSetting.edit.drag.inner, [targetSetting.treeId, nodes, tmpTargetNode], !!targetSetting.edit.drag.inner);
							if (!canPrev && !canNext && !canInner) {
								tmpTarget = null;
								tmpTargetNodeId = "";
								moveType = consts.move.TYPE_INNER;
								tmpArrow.css({
									"display":"none"
								});
								if (window.zTreeMoveTimer) {
									clearTimeout(window.zTreeMoveTimer);
									window.zTreeMoveTargetNodeTId = null
								}
							} else {
								var tmpTargetA = $("#" + tmpTargetNodeId + consts.id.A, tmpTarget),
								tmpNextA = tmpTargetNode.isLastNode ? null : $("#" + tmpTargetNode.getNextNode().tId + consts.id.A, tmpTarget.next()),
								tmpTop = tmpTargetA.offset().top,
								tmpLeft = tmpTargetA.offset().left,
								prevPercent = canPrev ? (canInner ? 0.25 : (canNext ? 0.5 : 1) ) : -1,
								nextPercent = canNext ? (canInner ? 0.75 : (canPrev ? 0.5 : 0) ) : -1,
								dY_percent = (event.clientY + docScrollTop - tmpTop)/tmpTargetA.height();
								if ((prevPercent==1 ||dY_percent<=prevPercent && dY_percent>=-.2) && canPrev) {
									dX = 1 - tmpArrow.width();
									dY = tmpTop - tmpArrow.height()/2;
									moveType = consts.move.TYPE_PREV;
								} else if ((nextPercent==0 || dY_percent>=nextPercent && dY_percent<=1.2) && canNext) {
									dX = 1 - tmpArrow.width();
									dY = (tmpNextA == null || (tmpTargetNode.isParent && tmpTargetNode.open)) ? (tmpTop + tmpTargetA.height() - tmpArrow.height()/2) : (tmpNextA.offset().top - tmpArrow.height()/2);
									moveType = consts.move.TYPE_NEXT;
								}else {
									dX = 5 - tmpArrow.width();
									dY = tmpTop;
									moveType = consts.move.TYPE_INNER;
								}
								tmpArrow.css({
									"display":"block",
									"top": dY + "px",
									"left": (tmpLeft + dX) + "px"
								});
								tmpTargetA.addClass(consts.node.TMPTARGET_NODE + "_" + moveType);
	
								if (preTmpTargetNodeId != tmpTargetNodeId || preTmpMoveType != moveType) {
									startTime = (new Date()).getTime();
								}
								if (tmpTargetNode && tmpTargetNode.isParent && moveType == consts.move.TYPE_INNER) {
									var startTimer = true;
									if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== tmpTargetNode.tId) {
										clearTimeout(window.zTreeMoveTimer);
										window.zTreeMoveTargetNodeTId = null;
									}else if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === tmpTargetNode.tId) {
										startTimer = false;
									}
									if (startTimer) {
										window.zTreeMoveTimer = setTimeout(function() {
											if (moveType != consts.move.TYPE_INNER) return;
											if (tmpTargetNode && tmpTargetNode.isParent && !tmpTargetNode.open && (new Date()).getTime() - startTime > targetSetting.edit.drag.autoOpenTime
												&& tools.apply(targetSetting.callback.beforeDragOpen, [targetSetting.treeId, tmpTargetNode], true)) {
												view.switchNode(targetSetting, tmpTargetNode);
												if (targetSetting.edit.drag.autoExpandTrigger) {
													targetSetting.treeObj.trigger(consts.event.EXPAND, [targetSetting.treeId, tmpTargetNode]);
												}
											}
										}, targetSetting.edit.drag.autoOpenTime+50);
										window.zTreeMoveTargetNodeTId = tmpTargetNode.tId;
									}
								}
							}
						} else {
							moveType = consts.move.TYPE_INNER;
							if (tmpTarget && tools.apply(targetSetting.edit.drag.inner, [targetSetting.treeId, nodes, null], !!targetSetting.edit.drag.inner)) {
								tmpTarget.addClass(consts.node.TMPTARGET_TREE);
							} else {
								tmpTarget = null;
							}
							tmpArrow.css({
								"display":"none"
							});
							if (window.zTreeMoveTimer) {
								clearTimeout(window.zTreeMoveTimer);
								window.zTreeMoveTargetNodeTId = null;
							}
						}
						preTmpTargetNodeId = tmpTargetNodeId;
						preTmpMoveType = moveType;
	
						setting.treeObj.trigger(consts.event.DRAGMOVE, [event, setting.treeId, nodes]);
					}
					return false;
				}
	
				doc.bind("mouseup", _docMouseUp);
				function _docMouseUp(event) {
					if (window.zTreeMoveTimer) {
						clearTimeout(window.zTreeMoveTimer);
						window.zTreeMoveTargetNodeTId = null;
					}
					preTmpTargetNodeId = null;
					preTmpMoveType = null;
					doc.unbind("mousemove", _docMouseMove);
					doc.unbind("mouseup", _docMouseUp);
					doc.unbind("selectstart", _docSelect);
					body.css("cursor", "auto");
					if (tmpTarget) {
						tmpTarget.removeClass(consts.node.TMPTARGET_TREE);
						if (tmpTargetNodeId) $("#" + tmpTargetNodeId + consts.id.A, tmpTarget).removeClass(consts.node.TMPTARGET_NODE + "_" + consts.move.TYPE_PREV)
								.removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_NEXT).removeClass(consts.node.TMPTARGET_NODE + "_" + _consts.move.TYPE_INNER);
					}
					tools.showIfameMask(setting, false);
	
					roots.showHoverDom = true;
					if (root.dragFlag == 0) return;
					root.dragFlag = 0;
	
					var i, l, tmpNode;
					for (i=0, l=nodes.length; i<l; i++) {
						tmpNode = nodes[i];
						if (tmpNode.isParent && root.dragNodeShowBefore[tmpNode.tId] && !tmpNode.open) {
							view.expandCollapseNode(setting, tmpNode, !tmpNode.open);
							delete root.dragNodeShowBefore[tmpNode.tId];
						}
					}
	
					if (curNode) curNode.remove();
					if (tmpArrow) tmpArrow.remove();
	
					var isCopy = ((event.ctrlKey || event.metaKey) && setting.edit.drag.isMove && setting.edit.drag.isCopy) || (!setting.edit.drag.isMove && setting.edit.drag.isCopy);
					if (!isCopy && tmpTarget && tmpTargetNodeId && nodes[0].parentTId && tmpTargetNodeId==nodes[0].parentTId && moveType == consts.move.TYPE_INNER) {
						tmpTarget = null;
					}
					if (tmpTarget) {
						var dragTargetNode = tmpTargetNodeId == null ? null: data.getNodeCache(targetSetting, tmpTargetNodeId);
						if (tools.apply(setting.callback.beforeDrop, [targetSetting.treeId, nodes, dragTargetNode, moveType, isCopy], true) == false) {
							view.selectNodes(sourceSetting, nodes);
							return;
						}
						var newNodes = isCopy ? tools.clone(nodes) : nodes;
	
						function dropCallback() {
							if (isOtherTree) {
								if (!isCopy) {
									for(var i=0, l=nodes.length; i<l; i++) {
										view.removeNode(setting, nodes[i]);
									}
								}
								if (moveType == consts.move.TYPE_INNER) {
									view.addNodes(targetSetting, dragTargetNode, newNodes);
								} else {
									view.addNodes(targetSetting, dragTargetNode.getParentNode(), newNodes);
									if (moveType == consts.move.TYPE_PREV) {
										for (i=0, l=newNodes.length; i<l; i++) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[i], moveType, false);
										}
									} else {
										for (i=-1, l=newNodes.length-1; i<l; l--) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[l], moveType, false);
										}
									}
								}
							} else {
								if (isCopy && moveType == consts.move.TYPE_INNER) {
									view.addNodes(targetSetting, dragTargetNode, newNodes);
								} else {
									if (isCopy) {
										view.addNodes(targetSetting, dragTargetNode.getParentNode(), newNodes);
									}
									if (moveType != consts.move.TYPE_NEXT) {
										for (i=0, l=newNodes.length; i<l; i++) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[i], moveType, false);
										}
									} else {
										for (i=-1, l=newNodes.length-1; i<l; l--) {
											view.moveNode(targetSetting, dragTargetNode, newNodes[l], moveType, false);
										}
									}
								}
							}
							view.selectNodes(targetSetting, newNodes);
							$$(newNodes[0], setting).focus().blur();
	
							setting.treeObj.trigger(consts.event.DROP, [event, targetSetting.treeId, newNodes, dragTargetNode, moveType, isCopy]);
						}
	
						if (moveType == consts.move.TYPE_INNER && tools.canAsync(targetSetting, dragTargetNode)) {
							view.asyncNode(targetSetting, dragTargetNode, false, dropCallback);
						} else {
							dropCallback();
						}
	
					} else {
						view.selectNodes(sourceSetting, nodes);
						setting.treeObj.trigger(consts.event.DROP, [event, setting.treeId, nodes, null, null, null]);
					}
				}
	
				doc.bind("selectstart", _docSelect);
				function _docSelect() {
					return false;
				}
	
				//Avoid FireFox's Bug
				//If zTree Div CSS set 'overflow', so drag node outside of zTree, and event.target is error.
				if(eventMouseDown.preventDefault) {
					eventMouseDown.preventDefault();
				}
				return true;
			}
		},
		//method of tools for zTree
		_tools = {
			getAbs: function (obj) {
				var oRect = obj.getBoundingClientRect(),
				scrollTop = document.body.scrollTop+document.documentElement.scrollTop,
				scrollLeft = document.body.scrollLeft+document.documentElement.scrollLeft;
				return [oRect.left+scrollLeft,oRect.top+scrollTop];
			},
			inputFocus: function(inputObj) {
				if (inputObj.get(0)) {
					inputObj.focus();
					tools.setCursorPosition(inputObj.get(0), inputObj.val().length);
				}
			},
			inputSelect: function(inputObj) {
				if (inputObj.get(0)) {
					inputObj.focus();
					inputObj.select();
				}
			},
			setCursorPosition: function(obj, pos){
				if(obj.setSelectionRange) {
					obj.focus();
					obj.setSelectionRange(pos,pos);
				} else if (obj.createTextRange) {
					var range = obj.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			},
			showIfameMask: function(setting, showSign) {
				var root = data.getRoot(setting);
				//clear full mask
				while (root.dragMaskList.length > 0) {
					root.dragMaskList[0].remove();
					root.dragMaskList.shift();
				}
				if (showSign) {
					//show mask
					var iframeList = $$("iframe", setting);
					for (var i = 0, l = iframeList.length; i < l; i++) {
						var obj = iframeList.get(i),
						r = tools.getAbs(obj),
						dragMask = $$("<div id='zTreeMask_" + i + "' class='zTreeMask' style='top:" + r[1] + "px; left:" + r[0] + "px; width:" + obj.offsetWidth + "px; height:" + obj.offsetHeight + "px;'></div>", setting);
						dragMask.appendTo($$("body", setting));
						root.dragMaskList.push(dragMask);
					}
				}
			}
		},
		//method of operate ztree dom
		_view = {
			addEditBtn: function(setting, node) {
				if (node.editNameFlag || $$(node, consts.id.EDIT, setting).length > 0) {
					return;
				}
				if (!tools.apply(setting.edit.showRenameBtn, [setting.treeId, node], setting.edit.showRenameBtn)) {
					return;
				}
				var aObj = $$(node, consts.id.A, setting),
				editStr = "<span class='" + consts.className.BUTTON + " edit' id='" + node.tId + consts.id.EDIT + "' title='"+tools.apply(setting.edit.renameTitle, [setting.treeId, node], setting.edit.renameTitle)+"' treeNode"+consts.id.EDIT+" style='display:none;'></span>";
				aObj.append(editStr);
	
				$$(node, consts.id.EDIT, setting).bind('click',
					function() {
						if (!tools.uCanDo(setting) || tools.apply(setting.callback.beforeEditName, [setting.treeId, node], true) == false) return false;
						view.editNode(setting, node);
						return false;
					}
					).show();
			},
			addRemoveBtn: function(setting, node) {
				if (node.editNameFlag || $$(node, consts.id.REMOVE, setting).length > 0) {
					return;
				}
				if (!tools.apply(setting.edit.showRemoveBtn, [setting.treeId, node], setting.edit.showRemoveBtn)) {
					return;
				}
				var aObj = $$(node, consts.id.A, setting),
				removeStr = "<span class='" + consts.className.BUTTON + " remove' id='" + node.tId + consts.id.REMOVE + "' title='"+tools.apply(setting.edit.removeTitle, [setting.treeId, node], setting.edit.removeTitle)+"' treeNode"+consts.id.REMOVE+" style='display:none;'></span>";
				aObj.append(removeStr);
	
				$$(node, consts.id.REMOVE, setting).bind('click',
					function() {
						if (!tools.uCanDo(setting) || tools.apply(setting.callback.beforeRemove, [setting.treeId, node], true) == false) return false;
						view.removeNode(setting, node);
						setting.treeObj.trigger(consts.event.REMOVE, [setting.treeId, node]);
						return false;
					}
					).bind('mousedown',
					function(eventMouseDown) {
						return true;
					}
					).show();
			},
			addHoverDom: function(setting, node) {
				if (data.getRoots().showHoverDom) {
					node.isHover = true;
					if (setting.edit.enable) {
						view.addEditBtn(setting, node);
						view.addRemoveBtn(setting, node);
					}
					tools.apply(setting.view.addHoverDom, [setting.treeId, node]);
				}
			},
			cancelCurEditNode: function (setting, forceName, isCancel) {
				var root = data.getRoot(setting),
				nameKey = setting.data.key.name,
				node = root.curEditNode;
	
				if (node) {
					var inputObj = root.curEditInput,
					newName = forceName ? forceName:(isCancel ? node[nameKey]: inputObj.val());
					if (tools.apply(setting.callback.beforeRename, [setting.treeId, node, newName, isCancel], true) === false) {
						return false;
					}
	                node[nameKey] = newName;
	                var aObj = $$(node, consts.id.A, setting);
					aObj.removeClass(consts.node.CURSELECTED_EDIT);
					inputObj.unbind();
					view.setNodeName(setting, node);
					node.editNameFlag = false;
					root.curEditNode = null;
					root.curEditInput = null;
					view.selectNode(setting, node, false);
	                setting.treeObj.trigger(consts.event.RENAME, [setting.treeId, node, isCancel]);
				}
				root.noSelection = true;
				return true;
			},
			editNode: function(setting, node) {
				var root = data.getRoot(setting);
				view.editNodeBlur = false;
				if (data.isSelectedNode(setting, node) && root.curEditNode == node && node.editNameFlag) {
					setTimeout(function() {tools.inputFocus(root.curEditInput);}, 0);
					return;
				}
				var nameKey = setting.data.key.name;
				node.editNameFlag = true;
				view.removeTreeDom(setting, node);
				view.cancelCurEditNode(setting);
				view.selectNode(setting, node, false);
				$$(node, consts.id.SPAN, setting).html("<input type=text class='rename' id='" + node.tId + consts.id.INPUT + "' treeNode" + consts.id.INPUT + " >");
				var inputObj = $$(node, consts.id.INPUT, setting);
				inputObj.attr("value", node[nameKey]);
				if (setting.edit.editNameSelectAll) {
					tools.inputSelect(inputObj);
				} else {
					tools.inputFocus(inputObj);
				}
	
				inputObj.bind('blur', function(event) {
					if (!view.editNodeBlur) {
						view.cancelCurEditNode(setting);
					}
				}).bind('keydown', function(event) {
					if (event.keyCode=="13") {
						view.editNodeBlur = true;
						view.cancelCurEditNode(setting);
					} else if (event.keyCode=="27") {
						view.cancelCurEditNode(setting, null, true);
					}
				}).bind('click', function(event) {
					return false;
				}).bind('dblclick', function(event) {
					return false;
				});
	
				$$(node, consts.id.A, setting).addClass(consts.node.CURSELECTED_EDIT);
				root.curEditInput = inputObj;
				root.noSelection = false;
				root.curEditNode = node;
			},
			moveNode: function(setting, targetNode, node, moveType, animateFlag, isSilent) {
				var root = data.getRoot(setting),
				childKey = setting.data.key.children;
				if (targetNode == node) return;
				if (setting.data.keep.leaf && targetNode && !targetNode.isParent && moveType == consts.move.TYPE_INNER) return;
				var oldParentNode = (node.parentTId ? node.getParentNode(): root),
				targetNodeIsRoot = (targetNode === null || targetNode == root);
				if (targetNodeIsRoot && targetNode === null) targetNode = root;
				if (targetNodeIsRoot) moveType = consts.move.TYPE_INNER;
				var targetParentNode = (targetNode.parentTId ? targetNode.getParentNode() : root);
	
				if (moveType != consts.move.TYPE_PREV && moveType != consts.move.TYPE_NEXT) {
					moveType = consts.move.TYPE_INNER;
				}
	
				if (moveType == consts.move.TYPE_INNER) {
					if (targetNodeIsRoot) {
						//parentTId of root node is null
						node.parentTId = null;
					} else {
						if (!targetNode.isParent) {
							targetNode.isParent = true;
							targetNode.open = !!targetNode.open;
							view.setNodeLineIcos(setting, targetNode);
						}
						node.parentTId = targetNode.tId;
					}
				}
	
				//move node Dom
				var targetObj, target_ulObj;
				if (targetNodeIsRoot) {
					targetObj = setting.treeObj;
					target_ulObj = targetObj;
				} else {
					if (!isSilent && moveType == consts.move.TYPE_INNER) {
						view.expandCollapseNode(setting, targetNode, true, false);
					} else if (!isSilent) {
						view.expandCollapseNode(setting, targetNode.getParentNode(), true, false);
					}
					targetObj = $$(targetNode, setting);
					target_ulObj = $$(targetNode, consts.id.UL, setting);
					if (!!targetObj.get(0) && !target_ulObj.get(0)) {
						var ulstr = [];
						view.makeUlHtml(setting, targetNode, ulstr, '');
						targetObj.append(ulstr.join(''));
					}
					target_ulObj = $$(targetNode, consts.id.UL, setting);
				}
				var nodeDom = $$(node, setting);
				if (!nodeDom.get(0)) {
					nodeDom = view.appendNodes(setting, node.level, [node], null, false, true).join('');
				} else if (!targetObj.get(0)) {
					nodeDom.remove();
				}
				if (target_ulObj.get(0) && moveType == consts.move.TYPE_INNER) {
					target_ulObj.append(nodeDom);
				} else if (targetObj.get(0) && moveType == consts.move.TYPE_PREV) {
					targetObj.before(nodeDom);
				} else if (targetObj.get(0) && moveType == consts.move.TYPE_NEXT) {
					targetObj.after(nodeDom);
				}
	
				//repair the data after move
				var i,l,
				tmpSrcIndex = -1,
				tmpTargetIndex = 0,
				oldNeighbor = null,
				newNeighbor = null,
				oldLevel = node.level;
				if (node.isFirstNode) {
					tmpSrcIndex = 0;
					if (oldParentNode[childKey].length > 1 ) {
						oldNeighbor = oldParentNode[childKey][1];
						oldNeighbor.isFirstNode = true;
					}
				} else if (node.isLastNode) {
					tmpSrcIndex = oldParentNode[childKey].length -1;
					oldNeighbor = oldParentNode[childKey][tmpSrcIndex - 1];
					oldNeighbor.isLastNode = true;
				} else {
					for (i = 0, l = oldParentNode[childKey].length; i < l; i++) {
						if (oldParentNode[childKey][i].tId == node.tId) {
							tmpSrcIndex = i;
							break;
						}
					}
				}
				if (tmpSrcIndex >= 0) {
					oldParentNode[childKey].splice(tmpSrcIndex, 1);
				}
				if (moveType != consts.move.TYPE_INNER) {
					for (i = 0, l = targetParentNode[childKey].length; i < l; i++) {
						if (targetParentNode[childKey][i].tId == targetNode.tId) tmpTargetIndex = i;
					}
				}
				if (moveType == consts.move.TYPE_INNER) {
					if (!targetNode[childKey]) targetNode[childKey] = new Array();
					if (targetNode[childKey].length > 0) {
						newNeighbor = targetNode[childKey][targetNode[childKey].length - 1];
						newNeighbor.isLastNode = false;
					}
					targetNode[childKey].splice(targetNode[childKey].length, 0, node);
					node.isLastNode = true;
					node.isFirstNode = (targetNode[childKey].length == 1);
				} else if (targetNode.isFirstNode && moveType == consts.move.TYPE_PREV) {
					targetParentNode[childKey].splice(tmpTargetIndex, 0, node);
					newNeighbor = targetNode;
					newNeighbor.isFirstNode = false;
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = true;
					node.isLastNode = false;
	
				} else if (targetNode.isLastNode && moveType == consts.move.TYPE_NEXT) {
					targetParentNode[childKey].splice(tmpTargetIndex + 1, 0, node);
					newNeighbor = targetNode;
					newNeighbor.isLastNode = false;
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = false;
					node.isLastNode = true;
	
				} else {
					if (moveType == consts.move.TYPE_PREV) {
						targetParentNode[childKey].splice(tmpTargetIndex, 0, node);
					} else {
						targetParentNode[childKey].splice(tmpTargetIndex + 1, 0, node);
					}
					node.parentTId = targetNode.parentTId;
					node.isFirstNode = false;
					node.isLastNode = false;
				}
				data.fixPIdKeyValue(setting, node);
				data.setSonNodeLevel(setting, node.getParentNode(), node);
	
				//repair node what been moved
				view.setNodeLineIcos(setting, node);
				view.repairNodeLevelClass(setting, node, oldLevel)
	
				//repair node's old parentNode dom
				if (!setting.data.keep.parent && oldParentNode[childKey].length < 1) {
					//old parentNode has no child nodes
					oldParentNode.isParent = false;
					oldParentNode.open = false;
					var tmp_ulObj = $$(oldParentNode, consts.id.UL, setting),
					tmp_switchObj = $$(oldParentNode, consts.id.SWITCH, setting),
					tmp_icoObj = $$(oldParentNode, consts.id.ICON, setting);
					view.replaceSwitchClass(oldParentNode, tmp_switchObj, consts.folder.DOCU);
					view.replaceIcoClass(oldParentNode, tmp_icoObj, consts.folder.DOCU);
					tmp_ulObj.css("display", "none");
	
				} else if (oldNeighbor) {
					//old neigbor node
					view.setNodeLineIcos(setting, oldNeighbor);
				}
	
				//new neigbor node
				if (newNeighbor) {
					view.setNodeLineIcos(setting, newNeighbor);
				}
	
				//repair checkbox / radio
				if (!!setting.check && setting.check.enable && view.repairChkClass) {
					view.repairChkClass(setting, oldParentNode);
					view.repairParentChkClassWithSelf(setting, oldParentNode);
					if (oldParentNode != node.parent)
						view.repairParentChkClassWithSelf(setting, node);
				}
	
				//expand parents after move
				if (!isSilent) {
					view.expandCollapseParentNode(setting, node.getParentNode(), true, animateFlag);
				}
			},
			removeEditBtn: function(setting, node) {
				$$(node, consts.id.EDIT, setting).unbind().remove();
			},
			removeRemoveBtn: function(setting, node) {
				$$(node, consts.id.REMOVE, setting).unbind().remove();
			},
			removeTreeDom: function(setting, node) {
				node.isHover = false;
				view.removeEditBtn(setting, node);
				view.removeRemoveBtn(setting, node);
				tools.apply(setting.view.removeHoverDom, [setting.treeId, node]);
			},
			repairNodeLevelClass: function(setting, node, oldLevel) {
				if (oldLevel === node.level) return;
				var liObj = $$(node, setting),
				aObj = $$(node, consts.id.A, setting),
				ulObj = $$(node, consts.id.UL, setting),
				oldClass = consts.className.LEVEL + oldLevel,
				newClass = consts.className.LEVEL + node.level;
				liObj.removeClass(oldClass);
				liObj.addClass(newClass);
				aObj.removeClass(oldClass);
				aObj.addClass(newClass);
				ulObj.removeClass(oldClass);
				ulObj.addClass(newClass);
			},
			selectNodes : function(setting, nodes) {
				for (var i=0, l=nodes.length; i<l; i++) {
					view.selectNode(setting, nodes[i], i>0);
				}
			}
		},
	
		_z = {
			tools: _tools,
			view: _view,
			event: _event,
			data: _data
		};
		$.extend(true, $.fn.zTree.consts, _consts);
		$.extend(true, $.fn.zTree._z, _z);
	
		var zt = $.fn.zTree,
		tools = zt._z.tools,
		consts = zt.consts,
		view = zt._z.view,
		data = zt._z.data,
		event = zt._z.event,
		$$ = tools.$;
	
		data.exSetting(_setting);
		data.addInitBind(_bindEvent);
		data.addInitUnBind(_unbindEvent);
		data.addInitCache(_initCache);
		data.addInitNode(_initNode);
		data.addInitProxy(_eventProxy);
		data.addInitRoot(_initRoot);
		data.addZTreeTools(_zTreeTools);
	
		var _cancelPreSelectedNode = view.cancelPreSelectedNode;
		view.cancelPreSelectedNode = function (setting, node) {
			var list = data.getRoot(setting).curSelectedList;
			for (var i=0, j=list.length; i<j; i++) {
				if (!node || node === list[i]) {
					view.removeTreeDom(setting, list[i]);
					if (node) break;
				}
			}
			if (_cancelPreSelectedNode) _cancelPreSelectedNode.apply(view, arguments);
		}
	
		var _createNodes = view.createNodes;
		view.createNodes = function(setting, level, nodes, parentNode) {
			if (_createNodes) {
				_createNodes.apply(view, arguments);
			}
			if (!nodes) return;
			if (view.repairParentChkClassWithSelf) {
				view.repairParentChkClassWithSelf(setting, parentNode);
			}
		}
	
		var _makeNodeUrl = view.makeNodeUrl;
		view.makeNodeUrl = function(setting, node) {
			return setting.edit.enable ? null : (_makeNodeUrl.apply(view, arguments));
		}
	
		var _removeNode = view.removeNode;
		view.removeNode = function(setting, node) {
			var root = data.getRoot(setting);
			if (root.curEditNode === node) root.curEditNode = null;
			if (_removeNode) {
				_removeNode.apply(view, arguments);
			}
		}
	
		var _selectNode = view.selectNode;
		view.selectNode = function(setting, node, addFlag) {
			var root = data.getRoot(setting);
			if (data.isSelectedNode(setting, node) && root.curEditNode == node && node.editNameFlag) {
				return false;
			}
			if (_selectNode) _selectNode.apply(view, arguments);
			view.addHoverDom(setting, node);
			return true;
		}
	
		var _uCanDo = tools.uCanDo;
		tools.uCanDo = function(setting, e) {
			var root = data.getRoot(setting);
			if (e && (tools.eqs(e.type, "mouseover") || tools.eqs(e.type, "mouseout") || tools.eqs(e.type, "mousedown") || tools.eqs(e.type, "mouseup"))) {
				return true;
			}
			if (root.curEditNode) {
				view.editNodeBlur = false;
				root.curEditInput.focus();
			}
			return (!root.curEditNode) && (_uCanDo ? _uCanDo.apply(view, arguments) : true);
		}
	})(jQuery);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "<div class=\"zTreeDemoBackground left\">\r\n        <ul id=\"treeDemo\" class=\"ztree\"></ul>\r\n    </div>";

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-md-12\">\n        <ztree\n                :setting=\"setting\"\n                :znodes=\"znodes\">\n        </ztree>\n    </div>";

/***/ }
]);
//# sourceMappingURL=build.js.map