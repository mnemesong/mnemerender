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
