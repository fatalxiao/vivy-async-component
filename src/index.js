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
 * Default vivy-api options
 * @type {{modelNameSpace: string}}
 */
const DEFAULT_OPTIONS = {
    modelNameSpace: 'asyncComponentLoading'
};

/**
 * Create Vivy async component plugin
 * @param options
 * @returns {{}}
 */
export default function createVivyAsyncComponentPlugin(options = {}) {

    const op = {...DEFAULT_OPTIONS, ...options};

    const {modelNameSpace} = op;

    return {
        extraMiddlewares: [
            createAsyncComponentLoadingMiddleware(modelNameSpace)
        ],
        extraModels: [
            createAsyncComponentLoading(modelNameSpace)
        ]
    };

};
