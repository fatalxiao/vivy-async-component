/**
 * @file index.js
 */

// Models
import createAsyncComponentLoading from './models/asyncComponentLoading';

// Middlewares
import createAsyncComponentLoadingMiddleware from './middlewares/AsyncComponentLoadingMiddleware';

// Components
export AsyncComponent from './components/AsyncComponent';

/**
 * Default Vivy async component options
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
    asyncComponentLoadingModelNameSpace: 'asyncComponentLoading'
};

/**
 * Create Vivy async component plugin
 * @param options {Object}
 * @returns {Object}
 */
export default function VivyAsyncComponent(options = {}) {

    const op = {...DEFAULT_OPTIONS, ...options};

    const {asyncComponentLoadingModelNameSpace} = op;

    return {
        extraMiddlewares: [
            createAsyncComponentLoadingMiddleware(asyncComponentLoadingModelNameSpace)
        ],
        extraModels: [
            createAsyncComponentLoading(asyncComponentLoadingModelNameSpace)
        ]
    };

}
