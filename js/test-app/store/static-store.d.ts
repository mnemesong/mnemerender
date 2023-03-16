import { MnemeComponentGnosticData, MnemeComponentsCollectionContoller } from "../../src/src";
export type StaticStore<Params, State> = {
    elements: Array<Params>;
    component: MnemeComponentGnosticData<Params, State>;
    name: string;
};
export declare const initStor: <Params, State>(component: Readonly<{
    host: import("../../src/src").MnemeHostFunction<Params>;
    template: import("../../src/src").MnemeTemplateFunc<Params>;
    after: import("../../src/src").MnemePostRenderGnosticFunc<Params, State>;
    css: import("../../src/src").MnemeProduceCSSFunc;
}>, name: string, elements: Params[]) => StaticStore<Params, State>;
export declare const initStorFromData: <Params, State, Id extends string>(component: Readonly<{
    host: import("../../src/src").MnemeHostFunction<Params>;
    template: import("../../src/src").MnemeTemplateFunc<Params>;
    after: import("../../src/src").MnemePostRenderGnosticFunc<Params, State>;
    css: import("../../src/src").MnemeProduceCSSFunc;
}>, name: string, elements: Omit<Params, Id>[], id: Id) => StaticStore<Params, State>;
export declare const getStaticStoreController: <Params, State>(getStore: (state: State) => StaticStore<Params, State>) => Readonly<{
    getElements: (state: State) => Params[];
    getComponentData: (state: State) => Readonly<{
        host: import("../../src/src").MnemeHostFunction<Params>;
        template: import("../../src/src").MnemeTemplateFunc<Params>;
        after: import("../../src/src").MnemePostRenderGnosticFunc<Params, State>;
        css: import("../../src/src").MnemeProduceCSSFunc;
    }>;
    getName: (state: State) => string;
}>;
