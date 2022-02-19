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
            start: () => {
                onLoadStart?.();
                return true;
            },

            /**
             * Load async component complete
             */
            complete: () => {
                onLoadComplete?.();
                return false;
            }

        }
    };
}
