/**
 * A function that draws a template based on the parameters and the name
 * of the components collection
 */
export type MnemeTemplateFunc<Params> = (params: Readonly<Params>, name: Readonly<string>) => string;
/**
 * Declaring the features that a component needs
 */
export type MnemeActionsDeclaration = Record<string, Function>;
/**
 * A function that executes after the collection is drawn,
 * initialized with state
 */
export type MnemePostRenderGnosticFunc<Params, State> = (params: Readonly<Params>, name: Readonly<string>, state: Readonly<State>) => void;
/**
 * Function to run a post-render script from within a component
 */
export type MnemePostRenderAgnosticFunc<Params, Actions extends MnemeActionsDeclaration> = (params: Params, name: string, actions: Actions) => void;
/**
 * CSS block rendering function for a component
 */
export type MnemeProduceCSSFunc = (name: Readonly<string>) => string;
/**
 * A function that produces a querySelector string for a component
 * based on its name and values
 */
export type MnemeHostFunction<Params> = (params: Readonly<Params>, name: Readonly<string>) => string;
/**
 * Component agnostic data block
 */
export type MnemeComponent<Params, Actions extends MnemeActionsDeclaration> = Readonly<{
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderAgnosticFunc<Params, Actions>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * Component agnostic data block (initialized by state)
 */
export type MnemeComponentGnosticData<Params, State> = Readonly<{
    host: MnemeHostFunction<Params>;
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderGnosticFunc<Params, State>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * A function that converts an agnostic postRender script into a gnostic one,
 * initializing it with a state
 */
export type MnemePostScriptConverter<Params, Actions extends MnemeActionsDeclaration, State> = (func: MnemePostRenderAgnosticFunc<Params, Actions>) => MnemePostRenderGnosticFunc<Params, State>;
/**
 * A function that converts an agnostic component block into a gnostic component
 * data block, initializing it with a state
 */
export declare const initComponent: <Params, Actions extends MnemeActionsDeclaration, State>(component: Readonly<Readonly<{
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderAgnosticFunc<Params, Actions>;
    css: MnemeProduceCSSFunc;
}>>, afterConvertor: MnemePostScriptConverter<Params, Actions, State>, host: MnemeHostFunction<Params>) => Readonly<{
    host: MnemeHostFunction<Params>;
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderGnosticFunc<Params, State>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * Method for getting the required properties of the component from the store
 */
export type MnemeComponentsCollectionContoller<Params, State> = Readonly<{
    getElements: (state: State) => Params[];
    getComponentData: (state: State) => MnemeComponentGnosticData<Params, State>;
    getName: (state: State) => string;
}>;
/**
 * Method for redrawing a collection of objects
 */
export declare const rerenderComponentsCollection: <Params, State>(root: Readonly<HTMLElement>, collController: Readonly<{
    getElements: (state: State) => Params[];
    getComponentData: (state: State) => Readonly<{
        host: MnemeHostFunction<Params>;
        template: MnemeTemplateFunc<Params>;
        after: MnemePostRenderGnosticFunc<Params, State>;
        css: MnemeProduceCSSFunc;
    }>;
    getName: (state: State) => string;
}>, state: Readonly<State>) => void;
