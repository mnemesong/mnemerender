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
