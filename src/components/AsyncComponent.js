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
    const [Cpt, setCpt] = useState(null);

    /**
     * Dispatch starting load component action
     * @type {(function(): void)|*}
     */
    const loadStartCallback = useCallback(() => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_START
        });
    }, []);

    /**
     * Dispatch loading component complete action
     * @type {(function(): void)|*}
     */
    const loadCompleteCallback = useCallback(() => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_COMPLETE
        });
    }, []);

    /**
     * Load model from getModel
     * @type {(function(*=): Promise<void>)|*}
     */
    const loadModel = useCallback(async getModel => {

        if (!getModel || typeof getModel !== 'function') {
            return;
        }

        const model = await getModel();
        store?.registerModel(model?.default || model);

    }, []);

    /**
     * Load models from getModels
     * @type {(function(): Promise<void>)|*}
     */
    const loadModels = useCallback(async () => {

        if (!getModels || getModels?.length < 1) {
            return;
        }

        await Promise.all(getModels.map(getModel => loadModel(getModel)));

    }, [
        loadModel
    ]);

    /**
     * Load reducer from getReducer
     * @type {(function(*=, *=): Promise<void>)|*}
     */
    const loadReducer = useCallback(async (nameSpace, getReducer) => {

        if (!nameSpace || !getReducer || typeof getReducer !== 'function') {
            return;
        }

        const reducer = await getReducer();
        store?.registerReducer(nameSpace, reducer?.default || reducer);

    }, []);

    /**
     * Load reducers from getReducers
     * @type {(function(): Promise<void>)|*}
     */
    const loadReducers = useCallback(async () => {

        if (!getReducers) {
            return;
        }

        await Promise.all(
            Object.entries(getReducers).map(([nameSpace, getReducer]) =>
                loadReducer(nameSpace, getReducer)
            )
        );

    }, [
        loadReducer
    ]);

    /**
     * Load component from getComponent
     * @type {(function(): Promise<void>)|*}
     */
    const loadComponent = useCallback(async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return;
        }

        const component = await getComponent();
        setCpt(component.default || component);

    }, []);

    /**
     * Init getting models and component
     * @type {(function(): Promise<void>)|*}
     */
    const init = useCallback(async () => {

        if (Cpt) {
            return;
        }

        loadStartCallback();

        await loadModels();
        await loadReducers();
        await loadComponent();

        loadCompleteCallback();

    }, [
        Cpt,
        loadStartCallback, loadCompleteCallback, loadModels, loadReducers, loadComponent
    ]);

    useEffect(() => {

        /**
         * Call init
         * @returns {Promise<void>}
         */
        async function callInit() {
            await init();
        }

        callInit();

    }, [
        init
    ]);

    return Cpt ?
        <Cpt {...props}/>
        :
        null;

};
