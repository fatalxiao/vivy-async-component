/**
 * @file AsyncComponentLoadingMiddleware.ts
 * @author Liangxiaojun
 */

// Action Types
import {
    ASYNC_COMPONENT_LOADING_START, ASYNC_COMPONENT_LOADING_COMPLETE
} from '../actionTypes/AsyncComponentLoadingActionType';

// Types
import {Middleware} from 'vivy';

/**
 * Timeout duration
 * @type {number}
 */
const DURATION = 250;

/**
 * Component loading complete timeout id
 */
let timeoutId: number;

/**
 * Create Async Component Loading Middleware
 * @param asyncComponentLoadingModelNameSpace
 */
export default function (asyncComponentLoadingModelNameSpace: string): Middleware {
    return ({dispatch, getState}) => next => action => {

        // Whether async component is loading
        const loading = getState()?.[asyncComponentLoadingModelNameSpace];

        // Start loading
        if (action.type === ASYNC_COMPONENT_LOADING_START) {

            // Clear timeout
            timeoutId && clearTimeout(timeoutId);

            // Dispatch start loading component action
            !loading && dispatch({
                ...action,
                type: `${asyncComponentLoadingModelNameSpace}/start`
            });

        }

        // Loading complete
        else if (action.type === ASYNC_COMPONENT_LOADING_COMPLETE) {

            // Clear time out
            timeoutId && clearTimeout(timeoutId);

            // Set timeout
            timeoutId = window.setTimeout(() => {

                // Clear time out
                timeoutId && clearTimeout(timeoutId);

                // Dispatch loading component complete action
                dispatch({
                    ...action,
                    type: `${asyncComponentLoadingModelNameSpace}/complete`
                });

            }, DURATION);

        }

        return next(action);

    };
}
