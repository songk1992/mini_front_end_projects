// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"core/router.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Router =
/** @class */
function () {
  function Router() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.routeTable = [];
    this.defaultRoute = null;
  }

  Router.prototype.setDefaultPage = function (page) {
    this.defaultRoute = {
      path: '',
      page: page
    };
  };

  Router.prototype.addRoutePath = function (path, page) {
    this.routeTable.push({
      path: path,
      page: page
    });
  };

  Router.prototype.route = function () {
    var routePath = location.hash;

    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (var _i = 0, _a = this.routeTable; _i < _a.length; _i++) {
      var routeInfo = _a[_i];

      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  };

  return Router;
}();

exports.default = Router;
},{}],"core/view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View =
/** @class */
function () {
  function View(containerId, template) {
    var containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw '최상위 컨테이너가 존재하지 않습니다.';
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
  }

  View.prototype.updateView = function () {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  };

  View.prototype.setTemplateData = function (key, value) {
    this.renderTemplate = this.renderTemplate.replace("{{__" + key + "__}}", value);
  };

  return View;
}();

exports.default = View;
},{}],"page/index-view.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = __importDefault(require("../core/view"));

var template = "     \n<div class=\"my_container\">\n    <div class=\"my_text\">\n        <a href=\"#/bible/\"> \uC131\uACBDApi</a>\n        <a href=\"#\"> N\uC0AC \uD074\uB860 \uCF54\uB529</a>\n    </div>\n</div>\n";

var IndexView =
/** @class */
function (_super) {
  __extends(IndexView, _super);

  function IndexView(containerId) {
    return _super.call(this, containerId, template) || this;
  }

  IndexView.prototype.render = function () {
    // TODO : 작업중
    this.updateView();
  };

  return IndexView;
}(view_1.default);

exports.default = IndexView;
},{"../core/view":"core/view.ts"}],"config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BIBLE_URL = "https://raw.githubusercontent.com/songk1992/mini_front_end_projects/master/src/data/newTestament.json";
},{}],"core/api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var config_1 = require("../config");

var Api =
/** @class */
function () {
  function Api(url) {
    this.url = url;
  }

  Api.prototype.request = function () {
    return __awaiter(this, void 0, Promise, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch(this.url)];

          case 1:
            response = _a.sent();
            return [4
            /*yield*/
            , response.json()];

          case 2:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  return Api;
}();

exports.default = Api;
/**
 * 성경을 읽어오는 클래스
 * 추후 필요시 외부 URL 과 연결된 DB로 변경
 */

var BibleApi =
/** @class */
function (_super) {
  __extends(BibleApi, _super);

  function BibleApi() {
    return _super.call(this, config_1.BIBLE_URL) || this;
  }

  BibleApi.prototype.getData = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request()];
      });
    });
  };

  return BibleApi;
}(Api);

exports.BibleApi = BibleApi;
},{"../config":"config.ts"}],"page/bible-view.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = __importDefault(require("../core/view"));

var api_1 = require("../core/api");

var template = "\n<div class=\"bible-menu\">\n<p>\uC791\uC5C5\uC911</p>\n<p>{{__abbrev__}}</p>\n<p>{{__name__}}</p>\n<a href=\"#\"> \uB4A4\uB85C \uAC00\uAE30</a>\n</div>\n\n<div class=\"bible_bg\">\n    <div class=\"bible_text\">\n        <p>{{__ch_name__}} {{__ch_no__}} - {{__verse_no__}}</p>\n        <p>{{__verse_text__}}</p>\n    </div>\n</div>\n";

var BibleView =
/** @class */
function (_super) {
  __extends(BibleView, _super);

  function BibleView(containerId, bStore) {
    var _this = _super.call(this, containerId, template) || this;

    _this.render = function () {
      return __awaiter(_this, void 0, Promise, function () {
        var api, _a, abbrev, name, book, _b, ch_name, chapter, _c, ch_no, verse, _d, verse_no, verse_text;

        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              api = new api_1.BibleApi();
              return [4
              /*yield*/
              , api.getData()];

            case 1:
              _a = _e.sent(), abbrev = _a.abbrev, name = _a.name, book = _a.book; // 신약 마태복음 추후 수정

              this._bStore.currentBook = this.findRandomNo(book.length);

              if (book[this._bStore.currentBook] == NaN || book[this._bStore.currentBook] == undefined) {
                this.render();
                return [2
                /*return*/
                ];
              }

              _b = book[this._bStore.currentBook], ch_name = _b.ch_name, chapter = _b.chapter;
              this._bStore.currentChapter = this.findRandomNo(chapter.length);

              if (chapter[this._bStore.currentChapter] == NaN || chapter[this._bStore.currentChapter] == undefined) {
                this.render();
                return [2
                /*return*/
                ];
              }

              _c = chapter[this._bStore.currentChapter], ch_no = _c.ch_no, verse = _c.verse;
              this._bStore._currentVerse = this.findRandomNo(verse.length);

              if (verse[this._bStore.currentVerse] == NaN || verse[this._bStore.currentVerse] == undefined) {
                this.render();
                return [2
                /*return*/
                ];
              }

              _d = verse[this._bStore.currentVerse], verse_no = _d.verse_no, verse_text = _d.verse_text;
              this.setTemplateData('abbrev', abbrev);
              this.setTemplateData('name', name);
              this.setTemplateData('ch_name', ch_name);
              this.setTemplateData('ch_no', ch_no);
              this.setTemplateData('verse_no', verse_no);
              this.setTemplateData('verse_text', verse_text);
              this.updateView();
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    _this._bStore = bStore;
    return _this;
  }

  BibleView.prototype.findRandomNo = function (curLen) {
    var tempNo = Math.floor(Math.random() * curLen);

    if (tempNo == null) {
      tempNo = 0;
    }

    if (tempNo == NaN) {
      tempNo = 0;
    }

    return tempNo;
  };

  return BibleView;
}(view_1.default);

exports.default = BibleView;
},{"../core/view":"core/view.ts","../core/api":"core/api.ts"}],"page/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_view_1 = require("./index-view");

exports.IndexView = index_view_1.default;

var bible_view_1 = require("./bible-view");

exports.BibleView = bible_view_1.default;
},{"./index-view":"page/index-view.ts","./bible-view":"page/bible-view.ts"}],"store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BStore =
/** @class */
function () {
  function BStore(cb, cc, cv) {
    if (cb === void 0) {
      cb = 0;
    }

    if (cc === void 0) {
      cc = 0;
    }

    if (cv === void 0) {
      cv = 0;
    }

    this._currentBook = cb;
    this._currentChapter = cc;
    this._currentVerse = cv;
  }

  Object.defineProperty(BStore.prototype, "currentBook", {
    get: function get() {
      return this._currentBook;
    },
    set: function set(cb) {
      this._currentBook = cb;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BStore.prototype, "currentChapter", {
    get: function get() {
      return this._currentChapter;
    },
    set: function set(cc) {
      this._currentChapter = cc;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BStore.prototype, "currentVerse", {
    get: function get() {
      return this._currentVerse;
    },
    set: function set(cv) {
      this._currentVerse = cv;
    },
    enumerable: true,
    configurable: true
  });
  return BStore;
}();

exports.default = BStore;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var router_1 = __importDefault(require("./core/router"));

var index_1 = require("./page/index");

var store_1 = __importDefault(require("./store"));

var bStore = new store_1.default();
var router = new router_1.default();
var indexView = new index_1.IndexView('root');
var bibleView = new index_1.BibleView('root', bStore);
router.setDefaultPage(indexView);
router.addRoutePath('/index', indexView);
router.addRoutePath('/bible', bibleView);
router.route();
},{"./core/router":"core/router.ts","./page/index":"page/index.ts","./store":"store.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50078" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map