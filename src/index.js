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
 * @type {{asyncComponentLoadingModelNameSpace: string}}
 */
const DEFAULT_OPTIONS = {
    asyncComponentLoadingModelNameSpace: 'asyncComponentLoading'
};

/**
 * Create Vivy async component plugin
 * @param options
 * @returns {{}}
 */
export default function createVivyAsyncComponentPlugin(options = {}) {

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
