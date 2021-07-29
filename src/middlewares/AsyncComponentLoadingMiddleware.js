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

/**
 * Create Async Component Loading Middleware
 * @param asyncComponentLoadingModelNameSpace {string}
 * @returns {function({getState: *}): function(*): function(*=): (*|undefined)}
 */
export default function (asyncComponentLoadingModelNameSpace) {
    return ({getState}) => next => action => {

        // Whether async component is loading
        const loading = getState()?.[asyncComponentLoadingModelNameSpace];

        // Start loading
        if (action.type === ASYNC_COMPONENT_LOADING_START) {

            // Clear timeout
            timeoutId && clearTimeout(timeoutId);

            // Dispatch start loading component action
            !loading && next({
                type: `${asyncComponentLoadingModelNameSpace}/start`
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
                    type: `${asyncComponentLoadingModelNameSpace}/complete`
                });

            }, DURATION);

        }

        // Other actions
        else {
            return next(action);
        }

    };
}
