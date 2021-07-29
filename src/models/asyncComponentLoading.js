/**
 * @file asyncComponentLoading.js
 */

/**
 * Create asyncComponentLoading model
 * @param nameSpace {string}
 * @returns {{reducers: {start: (function(): boolean), complete: (function(): boolean)}, nameSpace: string, state: boolean}}
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
