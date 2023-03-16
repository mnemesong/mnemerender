/**
 * A function that draws a template based on the parameters and the name of the components collection
 */
export type MnemeTemplateFunc<Params> = (params: Readonly<Params>, name: Readonly<string>) => string;
/**
 * Декладация функций, которые требуются компоненту
 */
export type MnemeActionsDeclaration = Record<string, Function>;
/**
 * Функция, отрабатывающая для инициализации компонента
 */
export type MnemePostRenderUnpureFunc<Params, State> = (params: Readonly<Params>, name: Readonly<string>, state: Readonly<State>) => void;
/**
 * Функция запуска пост-рендер скрипта изнутри компонента
 */
export type MnemePostRenderPureFunc<Params, Actions extends MnemeActionsDeclaration> = (params: Params, name: string, actions: Actions) => void;
/**
 * Функция для внедрения доп. кода на этапе инициализации компонента в приложении
 */
export type MnemeAfterScriptPostFunc<Params, State> = (params: Readonly<Params>, name: Readonly<string>, afterPost: MnemePostRenderUnpureFunc<Params, State>) => void;
/**
 * Функция отрисовки CSS
 */
export type MnemeProduceCSSFunc = (name: Readonly<string>) => string;
/**
 * Функция производящая querySelector-строку для компонента, исходя из его названия и значений
 */
export type MnemeHostFunction<Params> = (params: Readonly<Params>, name: Readonly<string>) => string;
/**
 * Тип скомпонованных статических данных компонента
 */
export type MnemeComponent<Params, Actions extends MnemeActionsDeclaration> = Readonly<{
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderPureFunc<Params, Actions>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * Тип порождающих компонент функций, проинициализированных состоянием
 */
export type MnemeComponentData<Params, State> = Readonly<{
    host: MnemeHostFunction<Params>;
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderUnpureFunc<Params, State>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * Конвертер after функции с обогащением ее состоянием
 */
export type MnemePostScriptConverter<Params, Actions extends MnemeActionsDeclaration, State> = (func: MnemePostRenderPureFunc<Params, Actions>) => MnemePostRenderUnpureFunc<Params, State>;
/**
 * Функция обогащения компонента состоянием
 */
export declare const initComponent: <Params, Actions extends MnemeActionsDeclaration, State>(component: Readonly<Readonly<{
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderPureFunc<Params, Actions>;
    css: MnemeProduceCSSFunc;
}>>, afterConvertor: MnemePostScriptConverter<Params, Actions, State>, host: MnemeHostFunction<Params>) => Readonly<{
    host: MnemeHostFunction<Params>;
    template: MnemeTemplateFunc<Params>;
    after: MnemePostRenderUnpureFunc<Params, State>;
    css: MnemeProduceCSSFunc;
}>;
/**
 * Метод для получения нужных ствойств компонента из хранилища
 */
export type ComponentsCollectionContoller<Params, State> = Readonly<{
    getElements: (state: State) => Params[];
    getComponentData: (state: State) => MnemeComponentData<Params, State>;
    getName: (state: State) => string;
}>;
/**
 * Метод перерисовки коллекции объектов
 */
export declare const rerenderComponentsCollection: <Params, State>(root: Readonly<HTMLElement>, collController: Readonly<{
    getElements: (state: State) => Params[];
    getComponentData: (state: State) => Readonly<{
        host: MnemeHostFunction<Params>;
        template: MnemeTemplateFunc<Params>;
        after: MnemePostRenderUnpureFunc<Params, State>;
        css: MnemeProduceCSSFunc;
    }>;
    getName: (state: State) => string;
}>, state: Readonly<State>) => void;
