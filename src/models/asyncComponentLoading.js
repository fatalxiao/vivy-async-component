/**
 * @file asyncComponentLoading.js
 */

/**
 * Create asyncComponentLoading model
 * @param nameSpace
 * @returns {{}}
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
