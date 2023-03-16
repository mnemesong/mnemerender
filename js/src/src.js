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
 * Функция обогащения компонента состоянием
 */
var initComponent = function (component, afterConvertor, host) { return ({
    host: host,
    template: component.template,
    after: afterConvertor(component.after),
    css: component.css,
}); };
exports.initComponent = initComponent;
/**
 * Метод перерисовки коллекции объектов
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
