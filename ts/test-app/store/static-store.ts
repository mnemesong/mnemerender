import { MnemeComponentGnosticData, MnemeComponentsCollectionContoller } 
    from "../../src/src";

export type StaticStore<Params, State> = {
    elements: Array<Params>,
    component: MnemeComponentGnosticData<Params, State>,
    name: string,
}

export const initStor = <Params, State>(
    component: MnemeComponentGnosticData<Params, State>, 
    name: string, 
    elements: Params[], 
): StaticStore<Params, State> => ({
    elements: elements,
    component: component,
    name: name,
})

export const initStorFromData = <Params, State, Id extends string>(
    component: MnemeComponentGnosticData<Params, State>, 
    name: string, 
    elements: Omit<Params, Id>[],
    id: Id
): StaticStore<Params, State> => ({
    elements: elements.map(
        (el, i) => ({...el, [id]: i.toString()})
    ) as unknown as Params[],
    component: component,
    name: name,
})

export const getStaticStoreController = <Params, State>(
    getStore: (state: State) => StaticStore<Params, State>
): MnemeComponentsCollectionContoller<Params, State> => ({
    getName: (state) => getStore(state).name,
    getComponentData: (state) => getStore(state).component,
    getElements: (state) => getStore(state).elements,
})
