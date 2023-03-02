/**
 * @file index.js
 */

// Models
import createAsyncComponentLoading from './models/asyncComponentLoading';

// Middlewares
import createAsyncComponentLoadingMiddleware from './middlewares/AsyncComponentLoadingMiddleware';

// Components
export AsyncComponent from './components/AsyncComponent';

// Hooks
import {useModel} from 'react-vivy';

/**
 * Default Vivy async component options
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
    asyncComponentLoadingModelNameSpace: 'asyncComponentLoading'
};

let optionAsyncComponentLoadingModelNameSpace;

/**
 * A hook to access the state and reducers from vivy async component model.
 * @returns {[]}
 */
export function useAsyncComponent() {
    return useModel(optionAsyncComponentLoadingModelNameSpace);
}

/**
 * Create Vivy async component plugin
 * @param options {Object}
 * @returns {Object}
 */
export default function VivyAsyncComponent(options = {}) {

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
