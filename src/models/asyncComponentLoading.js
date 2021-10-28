/**
 * @file asyncComponentLoading.js
 */

/**
 * Create asyncComponentLoading model
 * @param nameSpace {string}
 * @returns {Object}
 */
export default function createAsyncComponentLoading(nameSpace) {
    return {
        nameSpace: nameSpace || 'asyncComponentLoading',
        state: false,
        reducers: {

            /**
             * Start loading async component
             */
            start: () => {
                return true;
            },

            /**
             * Load async component complete
             */
            complete: () => {
                return false;
            }

        }
    };
}
