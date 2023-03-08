/**
 * @file index.ts
 * @author Liangxiaojun
 */

// Models
import createAsyncComponentLoading from './models/asyncComponentLoading';

// Middlewares
import createAsyncComponentLoadingMiddleware from './middlewares/AsyncComponentLoadingMiddleware';

// Hooks
import {useModel, useModelState} from 'react-vivy';

// Types
import {VivyAsyncComponentPluginOption} from 'src/types';

/**
 * Default Vivy async component options
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
    asyncComponentLoadingModelNameSpace: 'asyncComponentLoading'
};

let optionAsyncComponentLoadingModelNameSpace: string;

export * from './components/AsyncComponent';

/**
 * A hook to access the state and reducers from vivy async component model.
 * @returns {[]}
 */
export function useAsyncComponent() {
    return useModel(optionAsyncComponentLoadingModelNameSpace);
}

/**
 * A hook to access the state from vivy async component model.
 * @returns {boolean}
 */
export function useAsyncComponentLoading() {
    return useModelState(optionAsyncComponentLoadingModelNameSpace);
}

/**
 * Create Vivy async component plugin
 * @param options {Object}
 * @returns {Object}
 */
export default function VivyAsyncComponent(options: VivyAsyncComponentPluginOption = {}) {

    const op = {...DEFAULT_OPTIONS, ...options};

    const {
        asyncComponentLoadingModelNameSpace,
        onLoadStart, onLoadComplete
    } = op;

    optionAsyncComponentLoadingModelNameSpace = asyncComponentLoadingModelNameSpace;

    return {
        extraMiddlewares: [
            createAsyncComponentLoadingMiddleware(asyncComponentLoadingModelNameSpace)
        ],
        extraModels: [
            createAsyncComponentLoading(
                asyncComponentLoadingModelNameSpace,
                onLoadStart,
                onLoadComplete
            )
        ]
    };

}
