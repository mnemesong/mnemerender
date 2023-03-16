import { MnemeComponent, MnemeComponentGnosticData } from "../../src/src";
export type TodoElParams = {
    id: Readonly<string>;
    isDone: Readonly<boolean>;
    name: Readonly<string>;
};
export type TodoActions = {
    updateTodoIsDone: (id: string, val: boolean) => void;
};
export type TodoElComponent = MnemeComponent<TodoElParams, TodoActions>;
export type TodoElComponenData<State> = MnemeComponentGnosticData<TodoElParams, State>;
export declare const todoElComponent: TodoElComponent;
