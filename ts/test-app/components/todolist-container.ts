import { MnemeComponent, MnemeTemplateFunc } from "../../src/src"

export type TodolistContainerParams = {
    id: string,
    isDone: boolean
}

export type TodoListContainerActions = {
    renderContent: (id: string) => void
}

const todoListTemplate: MnemeTemplateFunc<TodolistContainerParams> = 
    (params, name) =>
`
<div id="${name}${params.id}"${params.isDone ? ' style="background-color: #aaa;"' : ''}>
</div>
`

export const todoListContanerComponent: 
MnemeComponent<TodolistContainerParams, TodoListContainerActions> = {
    template: todoListTemplate,
    css: (name) => '',
    after: (params, name, actions) => {
        actions.renderContent(params.id)
    }
}