import { initComponent, rerenderComponentsCollection } from "../src/src";
import { TodoActions, TodoElParams, todoElComponent } from "./components/todo-el";
import { 
    TodoListContainerActions, 
    TodolistContainerParams, 
    todoListContanerComponent 
} from "./components/todolist-container";
import { 
    StaticStore, 
    getStaticStoreController, 
    initStorFromData as initStoreFromData 
} from "./store/static-store";

type State = {
    toloEls: StaticStore<TodoElParams, State>,
    todoListContainers: StaticStore<TodolistContainerParams, State>
}

declare global {
    var state: State
}

const initState = (
    toloEls: StaticStore<TodoElParams, State>,
    todoListContainers: StaticStore<TodolistContainerParams, State>
): void => {
    global.state = {
        toloEls: toloEls,
        todoListContainers: todoListContainers
    }
}

export const rerenderStyleBlock = (css: string): void => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = (head.querySelector("style"))
        ? head.querySelector("style")
        : (() => {
            head.appendChild(document.createElement('style'))
            return head.querySelector("style")
        })()
    style.innerHTML = css
}

export const getTodoElController = 
    getStaticStoreController((state: State) => state.toloEls)
export const getTodoContainerController = 
    getStaticStoreController((state: State) => state.todoListContainers)

const calculateAllTodosIsDone = (state: State): boolean => 
    state.toloEls.elements.every(el => (el.isDone === true))

export const init = () => {
    const initTodoElsData: Omit<TodoElParams, "id">[] = [
        { name: "Помыть кошку", isDone: true },
        { name: "Постирать собаку", isDone: false },
        { name: "Высушить хомяка", isDone: true },
    ]
    const initTodoContainerData: Omit<TodolistContainerParams, "id">[] = [
        { isDone: (() => initTodoElsData.every(el => el.isDone === true))() }
    ]

    const todoElComponentData = initComponent<TodoElParams, TodoActions, State>(
        todoElComponent, 
        (afterPost) => ((params: TodoElParams, name: string, state: State) => {
            afterPost(params, name, {
                updateTodoIsDone: (id: string, val: boolean) => {
                    state.toloEls.elements.find(el => (el.id === id)).isDone = 
                        val
                    state.todoListContainers.elements.find(() => true).isDone = 
                        calculateAllTodosIsDone(state)
                    rerenderComponentsCollection(
                        document.body, 
                        getTodoContainerController, 
                        state
                    )
                    console.log(global.state.toloEls)
                }
            })
        }),
        (params, name) => `#todoAppContainer0`
    )
    const todoContainerComponentData = 
        initComponent<TodolistContainerParams, TodoListContainerActions, State>(
            todoListContanerComponent,
            (afterPost) => ((
                    params: TodolistContainerParams, 
                    name: string, 
                    state: State
                ) => {
                    afterPost(params, name, {
                        renderContent: (id) => {
                            console.log("render content had been act")
                            rerenderComponentsCollection(
                                document.body, 
                                getTodoElController, 
                                state
                            )
                        }
                    })
                }),
            (params, name) => "#todoApp"
        )
    initState(
        initStoreFromData(todoElComponentData, "todoEl", initTodoElsData, "id"),
        initStoreFromData(todoContainerComponentData, "todoAppContainer", 
            initTodoContainerData, "id")
    )
    rerenderStyleBlock(
        global.state.toloEls.component.css(global.state.toloEls.name)
    )
    rerenderComponentsCollection(
        document.body, 
        getTodoContainerController, 
        global.state
    )
}

init()