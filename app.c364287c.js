parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xFc4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){window.addEventListener("hashchange",this.route.bind(this)),this.routeTable=[],this.defaultRoute=null}return t.prototype.setDefaultPage=function(t){this.defaultRoute={path:"",page:t}},t.prototype.addRoutePath=function(t,e){this.routeTable.push({path:t,page:e})},t.prototype.route=function(){var t=location.hash;""===t&&this.defaultRoute&&this.defaultRoute.page.render();for(var e=0,a=this.routeTable;e<a.length;e++){var o=a[e];if(t.indexOf(o.path)>=0){o.page.render();break}}},t}();exports.default=t;
},{}],"LGie":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){var r=document.getElementById(e);if(!r)throw"최상위 컨테이너가 존재하지 않습니다.";this.container=r,this.template=t,this.renderTemplate=t}return e.prototype.updateView=function(){this.container.innerHTML=this.renderTemplate,this.renderTemplate=this.template},e}();exports.default=e;
},{}],"XHtH":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n=e(require("../core/view")),r='     \n<div class="my_container">\n    <div class="my_text">\n        <a href="#"> 성경Api</a>\n        <a href="#"> N사 클론 코딩</a>\n    </div>\n</div>\n',o=function(e){function n(t){return e.call(this,t,r)||this}return t(n,e),n.prototype.render=function(){this.updateView()},n}(n.default);exports.default=o;
},{"../core/view":"LGie"}],"fP1r":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./index-view");exports.IndexView=e.default;
},{"./index-view":"XHtH"}],"EVxB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./core/router")),r=require("./page/index"),u=new t.default,o=new r.IndexView("root");u.setDefaultPage(o),u.addRoutePath("/index",o),u.route();
},{"./core/router":"xFc4","./page/index":"fP1r"}]},{},["EVxB"], null)
//# sourceMappingURL=app.c364287c.js.map