/**
 * @file AsyncComponent.ts
 * @author Liangxiaojun
 */

import {Component} from 'react';

// ReducerNameSpaces
import {VIVY_OPTION_REDUCER_NAME_SPACE} from 'vivy';

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
export default (getComponent, store, getModels, getReducers) => class AsyncComponent extends Component {

    constructor(props) {

        super(props);

        this.state = {
            Component: null
        };

    }

    /**
     * Call init
     */
    componentDidMount() {
        this.init();
    }

    /**
     * get "overwriteSameNameSpaceModel" from vivy option
     * @returns {boolean}
     */
    isOverwriteSameNameSpaceModel = () => {
        return store.getState()[VIVY_OPTION_REDUCER_NAME_SPACE]?.overwriteSameNameSpaceModel || false;
    };

    /**
     * Dispatch starting load Component action
     */
    loadStartCallback = () => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_START,
            getComponent,
            store,
            getModels,
            getReducers
        });
    };

    /**
     * Dispatch loading Component complete action
     * @param models
     * @param reducers
     * @param Component
     */
    loadCompleteCallback = (models, reducers, Component) => {
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
    };

    /**
     * Load model from getModel
     * @param getModel
     * @returns {Promise<*|null>}
     */
    loadModel = async getModel => {

        if (!getModel || typeof getModel !== 'function') {
            return null;
        }

        const modelModule = await getModel();
        const model = modelModule?.default || modelModule;

        if (!this.isOverwriteSameNameSpaceModel() && store.asyncReducers.hasOwnProperty(model?.nameSpace)) {
            return null;
        }

        store?.registerModel(model);

        return model;

    };

    /**
     * Load models from getModels
     * @returns {Promise<Awaited<*|null>[]|*[]>}
     */
    loadModels = async () => {

        if (!getModels || getModels?.length < 1) {
            return [];
        }

        return await Promise.all(getModels.map(getModel => this.loadModel(getModel))) || [];

    };

    /**
     * Load reducer from getReducer
     * @param nameSpace
     * @param getReducer
     * @returns {Promise<*[]>}
     */
    loadReducer = async (nameSpace, getReducer) => {

        if (!nameSpace || !getReducer || typeof getReducer !== 'function'
            || (!this.isOverwriteSameNameSpaceModel() && store.asyncReducers.hasOwnProperty(nameSpace))) {
            return [];
        }

        const reducerModule = await getReducer();
        const reducer = reducerModule?.default || reducerModule;
        store?.registerReducer(nameSpace, reducer);

        return [
            nameSpace,
            reducer
        ];

    };

    /**
     * Load reducers from getReducers
     * @returns {Promise<{}|*|{[p: number]: *}|{}>}
     */
    loadReducers = async () => {

        if (!getReducers) {
            return {};
        }

        return (await Promise.all(Object.entries(getReducers).map(([nameSpace, getReducer]) =>
            this.loadReducer(nameSpace, getReducer)
        )) || []).reduce((rs, [nameSpace, reducer]) => nameSpace && reducer ? {
            ...rs,
            [nameSpace]: reducer
        } : rs, {});

    };

    /**
     * Load Component from getComponent
     * @returns {Promise<*|null>}
     */
    loadComponent = async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return null;
        }

        const ComponentModule = await getComponent();
        const NextComponent = ComponentModule?.default || ComponentModule;
        this.setState({
            Component: NextComponent
        });

        return NextComponent;

    };

    /**
     * Init getting models and Component
     * @returns {Promise<void>}
     */
    init = async () => {

        if (this.state.Component) {
            return;
        }

        this.loadStartCallback();
        this.loadCompleteCallback(await this.loadModels(), await this.loadReducers(), await this.loadComponent());

    };

    render() {
        const {Component} = this.state;
        return Component && <Component {...this.props}/> || null;
    }

};
