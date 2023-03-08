/**
 * @file AsyncComponent.tsx
 * @author Liangxiaojun
 */

import {Component, ComponentClass, createElement} from 'react';

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
) => class AsyncComponentClass extends Component<object, { Cmpnt?: ComponentClass }> {

    constructor(props: object) {

        super(props);

        this.state = {
            Cmpnt: undefined
        };

    }

    /**
     * Call init
     */
    componentDidMount() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.init();
    }

    /**
     * get "overwriteSameNameSpaceModel" from vivy option
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
     * @param Cmpnt
     */
    loadCompleteCallback = (
        models: VivyModel[], reducers: object, Cmpnt: ComponentClass
    ) => {
        store?.dispatch({
            type: ASYNC_COMPONENT_LOADING_COMPLETE,
            getComponent,
            store,
            getModels,
            getReducers,
            Component: Cmpnt,
            models,
            reducers
        });
    };

    /**
     * Load model from getModel
     * @param getModel
     */
    loadModel = async (getModel: () => Promise<any>) => {

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
     */
    loadReducer = async (nameSpace: string, getReducer: () => Promise<any>) => {

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
     */
    loadComponent = async () => {

        if (!getComponent || typeof getComponent !== 'function') {
            return null;
        }

        const ComponentModule = await getComponent();
        const NextComponent = ComponentModule?.default || ComponentModule;
        this.setState({
            Cmpnt: NextComponent
        });

        return NextComponent;

    };

    /**
     * Init getting models and Component
     */
    init = async () => {

        if (this.state.Cmpnt) {
            return;
        }

        this.loadStartCallback();
        this.loadCompleteCallback(await this.loadModels(), await this.loadReducers(), await this.loadComponent());

    };

    render() {
        const {Cmpnt} = this.state;
        return Cmpnt && createElement(Cmpnt, this.props as any)
    }

};
