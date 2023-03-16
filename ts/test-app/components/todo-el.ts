import { 
    MnemeComponent, 
    MnemeTemplateFunc, 
    MnemeProduceCSSFunc, 
    MnemeComponentGnosticData, 
    MnemePostRenderAgnosticFunc, 
} from "../../src/src";

export type TodoElParams = {
    id: Readonly<string>,
    isDone: Readonly<boolean>,
    name: Readonly<string>,
}

export type TodoActions = {
    updateTodoIsDone: (id: string, val: boolean) => void,
}

export type TodoElComponent = MnemeComponent<TodoElParams, TodoActions>

export type TodoElComponenData<State> = 
    MnemeComponentGnosticData<TodoElParams, State>

const todoElCSS: MnemeProduceCSSFunc = (name: string): string =>
`
.${name}-todo-el {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 20px 1fr;
}
`

const todoElRender: MnemeTemplateFunc<TodoElParams> = 
    (params: TodoElParams, name: string) =>
`
<div class="${name}-todo-el" id="${name}${params.id}">
    <input type="checkbox"${ params.isDone ? " checked" : "" }>
    <div>${params.isDone ? '<b>' : ''}${params.name}${params.isDone ? '</b>' : ''}</div>
</div>
`

const todoElAfter: MnemePostRenderAgnosticFunc<TodoElParams, TodoActions> = 
    (params: TodoElParams, name: string, actions: TodoActions) => {
        const selector = document
            .querySelector(`.${name}-todo-el#${name}${params.id} > input`)
        if(selector) {
            selector
                .addEventListener('change', (e) => {
                    actions.updateTodoIsDone(params.id, !params.isDone)
                })
        }
    }

export const todoElComponent: TodoElComponent = {
    template: todoElRender,
    css: todoElCSS,
    after: todoElAfter,
}