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
