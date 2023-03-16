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
