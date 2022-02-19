/**
 * @file AsyncModuleComponent.js
 */

import React, {useState, useCallback, useEffect} from 'react';

// Action Types
import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoadingActionType';

/**
 * Create Async Module Component
 * @param getComponent {Function}
 * @param store {Object}
 * @param getModels {Function[]}
 * @param getReducers {Function[]}
 * @returns {function(*): JSX.Element|null}
 */
export default (getComponent, store, getModels, getReducers) => props => {

    /**
     * Component from getComponent
     */
    const [Component, setComponent] = useState(null);

    /**
     * Dispatch starting load Component action
     * @type {(function(): void)|*}
     */
    const loadStartCallback = useCallback(() => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_START,
            getComponent,
            store,
            getModels,
            getReducers
        });
    }, []);

    /**
     * Dispatch loading Component complete action
     * @type {(function(): void)|*}
     */
    const loadCompleteCallback = useCallback((models, reducers, Component) => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_COMPLETE,
            getComponent,
            store,
            getModels,
            getReducers,
            Component,
            models,
            reducers
        });
    }, []);

    /**
     * Load model from getModel
     * @type {(function(*): Promise<null|*>)|*}
     */
    const loadModel = useCallback(async getModel => {

        if (!getModel || typeof getModel !== 'function') {
            return null;
        }

        const modelModule = await getModel();
        const model = modelModule?.default || modelModule;
        store?.registerModel(model);

        return model;

    }, []);

    /**
     * Load models from getModels
     * @type {(function(): Promise<[]|*>)|*}
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
     * @type {(function(*, *): Promise<[]|[any,(*)]>)|*}
     */
    const loadReducer = useCallback(async (nameSpace, getReducer) => {

        if (!nameSpace || !getReducer || typeof getReducer !== 'function') {
            return [];
        }

        const reducerModule = await getReducer();
        const reducer = reducerModule?.default || reducerModule;
        store?.registerReducer(nameSpace, reducer);

        return [
            nameSpace,
            reducer
        ];

    }, []);

    /**
     * Load reducers from getReducers
     * @type {(function(): Promise<{}|*>)|*}
     */
    const loadReducers = useCallback(async () => {

        if (!getReducers) {
            return {};
        }

        return (
            await Promise.all(Object.entries(getReducers).map(([nameSpace, getReducer]) =>
                loadReducer(nameSpace, getReducer)
            )) || []
        ).reduce((rs, [nameSpace, reducer]) => nameSpace && reducer ? {
            ...rs,
            [nameSpace]: reducer
        } : rs, {});

    }, [
        loadReducer
    ]);

    /**
     * Load Component from getComponent
     * @type {(function(): Promise<void>)|*}
     */
    const loadComponent = useCallback(async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return null;
        }

        const ComponentModule = await getComponent();
        const NextComponent = ComponentModule?.default || ComponentModule;
        setComponent(NextComponent);

        return NextComponent;

    }, []);

    /**
     * Init getting models and Component
     * @type {(function(): Promise<void>)|*}
     */
    const init = useCallback(async () => {

        if (Component) {
            return;
        }

        loadStartCallback();
        loadCompleteCallback(await loadModels(), await loadReducers(), await loadComponent());

    }, [
        Component,
        loadStartCallback, loadModels, loadReducers, loadComponent, loadCompleteCallback
    ]);

    useEffect(async () => {
        await init();
    }, [
        init
    ]);

    return Component ?
        <Component {...props}/>
        :
        null;

};
