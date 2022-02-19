/**
 * @file asyncComponentLoading.js
 */

/**
 * Create asyncComponentLoading model
 * @param nameSpace {string}
 * @param onLoadStart {Function}
 * @param onLoadComplete {Function}
 * @returns {Object}
 */
export default function createAsyncComponentLoading(nameSpace, onLoadStart, onLoadComplete) {
    return {
        nameSpace: nameSpace || 'asyncComponentLoading',
        state: false,
        reducers: {

            /**
             * Start loading async component
             */
            start: (state, {type, ...restActionProps}) => {
                onLoadStart?.(restActionProps);
                return true;
            },

            /**
             * Load async component complete
             */
            complete: (state, {type, ...restActionProps}) => {
                onLoadComplete?.(restActionProps);
                return false;
            }

        }
    };
}
