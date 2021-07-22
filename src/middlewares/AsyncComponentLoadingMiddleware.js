/**
 * @file AsyncComponentLoadingMiddleware.js
 */

// Action Types
import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoading';

/**
 * Timeout duration
 * @type {number}
 */
const DURATION = 1000;

/**
 * Component loading complete timeout id
 * @type {null}
 */
let timeoutId = null;

export default function (modelNameSpace) {
    return ({dispatch, getState}) => next => action => {

        // Whether async component is loading
        const loading = getState()?.[modelNameSpace];

        // Start loading
        if (action.type === ASYNC_COMPONENT_LOADING_START) {

            // Clear timeout
            timeoutId && clearTimeout(timeoutId);

            // Dispatch start loading component action
            !loading && next({
                type: `${modelNameSpace}/start`
            });

        }

        // Loading complete
        else if (action.type === ASYNC_COMPONENT_LOADING_COMPLETE) {

            // Clear time out
            timeoutId && clearTimeout(timeoutId);

            // Set timeout
            timeoutId = setTimeout(() => {

                // Clear time out
                timeoutId && clearTimeout(timeoutId);

                // Dispatch loading component complete action
                next({
                    type: `${modelNameSpace}/complete`
                });

            }, DURATION);

        }

        // Other actions
        else {
            return next(action);
        }

    };
}
