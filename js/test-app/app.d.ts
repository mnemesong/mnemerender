import { TodoElParams } from "./components/todo-el";
import { TodolistContainerParams } from "./components/todolist-container";
import { StaticStore } from "./store/static-store";
type State = {
    toloEls: StaticStore<TodoElParams, State>;
    todoListContainers: StaticStore<TodolistContainerParams, State>;
};
declare global {
    var state: State;
}
export declare const rerenderStyleBlock: (css: string) => void;
export declare const getTodoElController: Readonly<{
    getElements: (state: State) => TodoElParams[];
    getComponentData: (state: State) => Readonly<{
        host: import("../src/src").MnemeHostFunction<TodoElParams>;
        template: import("../src/src").MnemeTemplateFunc<TodoElParams>;
        after: import("../src/src").MnemePostRenderGnosticFunc<TodoElParams, State>;
        css: import("../src/src").MnemeProduceCSSFunc;
    }>;
    getName: (state: State) => string;
}>;
export declare const getTodoContainerController: Readonly<{
    getElements: (state: State) => TodolistContainerParams[];
    getComponentData: (state: State) => Readonly<{
        host: import("../src/src").MnemeHostFunction<TodolistContainerParams>;
        template: import("../src/src").MnemeTemplateFunc<TodolistContainerParams>;
        after: import("../src/src").MnemePostRenderGnosticFunc<TodolistContainerParams, State>;
        css: import("../src/src").MnemeProduceCSSFunc;
    }>;
    getName: (state: State) => string;
}>;
export declare const init: () => void;
export {};
