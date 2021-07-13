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
 * Create Vivy async component plugin
 * @param options
 * @returns {{}}
 */
export default function createVivyAsyncComponentPlugin(options = {}) {

    const {modelNameSpace} = options;

    return {
        extraMiddlewares: [
            createAsyncComponentLoadingMiddleware(modelNameSpace)
        ],
        extraModels: [
            createAsyncComponentLoading(modelNameSpace)
        ]
    };

};
