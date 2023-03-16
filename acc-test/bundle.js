(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rerenderComponentsCollection = exports.initComponent = void 0;
/**
 * A function that converts an agnostic component block into a gnostic component
 * data block, initializing it with a state
 */
var initComponent = function (component, afterConvertor, host) { return ({
    host: host,
    template: component.template,
    after: afterConvertor(component.after),
    css: component.css,
}); };
exports.initComponent = initComponent;
/**
 * Method for redrawing a collection of objects
 */
var rerenderComponentsCollection = function (root, collController, state) {
    var addElToTodoElToSelectorMap = function (acc, el) {
        var _a;
        return (el.s in acc)
            ? (function () {
                var obj = __assign({}, acc);
                obj[el.s] = obj[el.s].concat(el.p);
                return obj;
            })()
            : __assign(__assign({}, acc), (_a = {}, _a[el.s] = [el.p], _a));
    };
    var hostedContainers = collController.getElements(state)
        .map(function (el) { return ({
        p: el,
        s: collController.getComponentData(state).host(el, collController.getName(state))
    }); })
        .reduce(addElToTodoElToSelectorMap, {});
    Object.keys(hostedContainers)
        .forEach(function (s) {
        var htmlEl = root.querySelector(s);
        if (htmlEl) {
            htmlEl.innerHTML = hostedContainers[s]
                .reduce(function (acc, el) { return acc.concat(collController.getComponentData(state).template(el, collController.getName(state))); }, "");
        }
    });
    collController.getElements(state).forEach(function (el) { return collController
        .getComponentData(state)
        .after(el, collController.getName(state), state); });
};
exports.rerenderComponentsCollection = rerenderComponentsCollection;

},{}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.getTodoContainerController = exports.getTodoElController = exports.rerenderStyleBlock = void 0;
var src_1 = require("../src/src");
var todo_el_1 = require("./components/todo-el");
var todolist_container_1 = require("./components/todolist-container");
var static_store_1 = require("./store/static-store");
var initState = function (toloEls, todoListContainers) {
    global.state = {
        toloEls: toloEls,
        todoListContainers: todoListContainers
    };
};
var rerenderStyleBlock = function (css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = (head.querySelector("style"))
        ? head.querySelector("style")
        : (function () {
            head.appendChild(document.createElement('style'));
            return head.querySelector("style");
        })();
    style.innerHTML = css;
};
exports.rerenderStyleBlock = rerenderStyleBlock;
exports.getTodoElController = (0, static_store_1.getStaticStoreController)(function (state) { return state.toloEls; });
exports.getTodoContainerController = (0, static_store_1.getStaticStoreController)(function (state) { return state.todoListContainers; });
var calculateAllTodosIsDone = function (state) {
    return state.toloEls.elements.every(function (el) { return (el.isDone === true); });
};
var init = function () {
    var initTodoElsData = [
        { name: "Помыть кошку", isDone: true },
        { name: "Постирать собаку", isDone: false },
        { name: "Высушить хомяка", isDone: true },
    ];
    var initTodoContainerData = [
        { isDone: (function () { return initTodoElsData.every(function (el) { return el.isDone === true; }); })() }
    ];
    var todoElComponentData = (0, src_1.initComponent)(todo_el_1.todoElComponent, function (afterPost) { return (function (params, name, state) {
        afterPost(params, name, {
            updateTodoIsDone: function (id, val) {
                state.toloEls.elements.find(function (el) { return (el.id === id); }).isDone =
                    val;
                state.todoListContainers.elements.find(function () { return true; }).isDone =
                    calculateAllTodosIsDone(state);
                (0, src_1.rerenderComponentsCollection)(document.body, exports.getTodoContainerController, state);
                console.log(global.state.toloEls);
            }
        });
    }); }, function (params, name) { return "#todoAppContainer0"; });
    var todoContainerComponentData = (0, src_1.initComponent)(todolist_container_1.todoListContanerComponent, function (afterPost) { return (function (params, name, state) {
        afterPost(params, name, {
            renderContent: function (id) {
                console.log("render content had been act");
                (0, src_1.rerenderComponentsCollection)(document.body, exports.getTodoElController, state);
            }
        });
    }); }, function (params, name) { return "#todoApp"; });
    initState((0, static_store_1.initStorFromData)(todoElComponentData, "todoEl", initTodoElsData, "id"), (0, static_store_1.initStorFromData)(todoContainerComponentData, "todoAppContainer", initTodoContainerData, "id"));
    (0, exports.rerenderStyleBlock)(global.state.toloEls.component.css(global.state.toloEls.name));
    (0, src_1.rerenderComponentsCollection)(document.body, exports.getTodoContainerController, global.state);
};
exports.init = init;
(0, exports.init)();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/src":1,"./components/todo-el":3,"./components/todolist-container":4,"./store/static-store":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoElComponent = void 0;
var todoElCSS = function (name) {
    return "\n.".concat(name, "-todo-el {\n    display: grid;\n    grid-gap: 20px;\n    grid-template-columns: 20px 1fr;\n}\n");
};
var todoElRender = function (params, name) {
    return "\n<div class=\"".concat(name, "-todo-el\" id=\"").concat(name).concat(params.id, "\">\n    <input type=\"checkbox\"").concat(params.isDone ? " checked" : "", ">\n    <div>").concat(params.isDone ? '<b>' : '').concat(params.name).concat(params.isDone ? '</b>' : '', "</div>\n</div>\n");
};
var todoElAfter = function (params, name, actions) {
    var selector = document
        .querySelector(".".concat(name, "-todo-el#").concat(name).concat(params.id, " > input"));
    if (selector) {
        selector
            .addEventListener('change', function (e) {
            actions.updateTodoIsDone(params.id, !params.isDone);
        });
    }
};
exports.todoElComponent = {
    template: todoElRender,
    css: todoElCSS,
    after: todoElAfter,
};

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoListContanerComponent = void 0;
var todoListTemplate = function (params, name) {
    return "\n<div id=\"".concat(name).concat(params.id, "\"").concat(params.isDone ? ' style="background-color: #aaa;"' : '', ">\n</div>\n");
};
exports.todoListContanerComponent = {
    template: todoListTemplate,
    css: function (name) { return ''; },
    after: function (params, name, actions) {
        actions.renderContent(params.id);
    }
};

},{}],5:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticStoreController = exports.initStorFromData = exports.initStor = void 0;
var initStor = function (component, name, elements) { return ({
    elements: elements,
    component: component,
    name: name,
}); };
exports.initStor = initStor;
var initStorFromData = function (component, name, elements, id) { return ({
    elements: elements.map(function (el, i) {
        var _a;
        return (__assign(__assign({}, el), (_a = {}, _a[id] = i.toString(), _a)));
    }),
    component: component,
    name: name,
}); };
exports.initStorFromData = initStorFromData;
var getStaticStoreController = function (getStore) { return ({
    getName: function (state) { return getStore(state).name; },
    getComponentData: function (state) { return getStore(state).component; },
    getElements: function (state) { return getStore(state).elements; },
}); };
exports.getStaticStoreController = getStaticStoreController;

},{}]},{},[2]);
