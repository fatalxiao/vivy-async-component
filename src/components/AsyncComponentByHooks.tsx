/**
 * @file AsyncComponentByHooks.tsx
 * @author Liangxiaojun
 */

import {ComponentClass, createElement, useState, useMemo, useCallback, useEffect} from 'react';

// ReducerNameSpaces
import {VIVY_OPTION_REDUCER_NAME_SPACE, VivyModel, VivyStore} from 'vivy';

// Action Types
import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoadingActionType';

/**
 * Create Async Module Component
 * @param getComponent
 * @param store
 * @param getModels
 * @param getReducers
 */
export const AsyncComponent = (
    getComponent: () => Promise<any>, store: VivyStore,
    getModels: (() => Promise<any>)[], getReducers: (() => Promise<any>)[]
) => (props: object) => {

    /**
     * AsyncComponent from getComponent
     */
    const [Cmpnt, setCmpnt] = useState();

    /**
     * get "overwriteSameNameSpaceModel" from vivy option
     */
    const overwriteSameNameSpaceModel = useMemo(() => {
        return store.getState()[VIVY_OPTION_REDUCER_NAME_SPACE]?.overwriteSameNameSpaceModel || false;
    }, []);

    /**
     * Dispatch starting load Component action
     */
    const loadStartCallback = useCallback(() => store?.dispatch({
        type: ASYNC_COMPONENT_LOADING_START,
        getComponent,
        store,
        getModels,
        getReducers
    }), []);

    /**
     * Dispatch loading Component complete action
     */
    const loadCompleteCallback = useCallback((
        models: VivyModel[], reducers: object, Cmpnt: ComponentClass
    ) => store?.dispatch({
        type: ASYNC_COMPONENT_LOADING_COMPLETE,
        getComponent,
        store,
        getModels,
        getReducers,
        Component: Cmpnt,
        models,
        reducers
    }), []);

    /**
     * Load model from getModel
     */
    const loadModel = useCallback(async (getModel: () => Promise<any>) => {

        if (!getModel || typeof getModel !== 'function') {
            return null;
        }

        const modelModule = await getModel();
        const model = modelModule?.default || modelModule;

        if (!overwriteSameNameSpaceModel && store.asyncReducers.hasOwnProperty(model?.nameSpace)) {
            return null;
        }

        store?.registerModel(model);

        return model;

    }, [
        overwriteSameNameSpaceModel
    ]);

    /**
     * Load models from getModels
     */
    const loadModels = useCallback(async () => {

        if (!getModels || getModels?.length < 1) {
            return [];
        }

        return await Promise.all(getModels.map(getModel => loadModel(getModel))) || [];

    }, [
        loadModel
    ]);

    /**
     * Load reducer from getReducer
     */
    const loadReducer = useCallback(async (nameSpace: string, getReducer: () => Promise<any>) => {

        if (!nameSpace || !getReducer || typeof getReducer !== 'function'
            || (!overwriteSameNameSpaceModel && store.asyncReducers.hasOwnProperty(nameSpace))) {
            return [];
        }

        const reducerModule = await getReducer();
        const reducer = reducerModule?.default || reducerModule;
        store?.registerReducer(nameSpace, reducer);

        return [
            nameSpace,
            reducer
        ];

    }, [
        overwriteSameNameSpaceModel
    ]);

    /**
     * Load reducers from getReducers
     */
    const loadReducers = useCallback(async () => {

        if (!getReducers) {
            return {};
        }

        return (await Promise.all(Object.entries(getReducers).map(([nameSpace, getReducer]) =>
            loadReducer(nameSpace, getReducer)
        )) || []).reduce((rs, [nameSpace, reducer]) => nameSpace && reducer ? {
            ...rs,
            [nameSpace]: reducer
        } : rs, {});

    }, [
        loadReducer
    ]);

    /**
     * Load Component from getComponent
     */
    const loadComponent = useCallback(async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return null;
        }

        const ComponentModule = await getComponent();
        const NextComponent = ComponentModule?.default || ComponentModule;
        setCmpnt(NextComponent);

        return NextComponent;

    }, []);

    /**
     * Init getting models and Component
     */
    const init = useCallback(async () => {

        if (Cmpnt) {
            return;
        }

        loadStartCallback();
        loadCompleteCallback(await loadModels(), await loadReducers(), await loadComponent());

    }, [
        Cmpnt,
        loadStartCallback, loadModels, loadReducers, loadComponent, loadCompleteCallback
    ]);

    useEffect(() => {

        /**
         * Call init
         * @returns {Promise<void>}
         */
        async function runInit() {
            await init();
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        runInit();

    }, [
        init
    ]);

    return Cmpnt && createElement(Cmpnt, props as any)

};
