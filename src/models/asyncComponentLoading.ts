/**
 * @file asyncComponentLoading.ts
 * @author Liangxiaojun
 */

// Types
import { VivyModel } from 'vivy';
import { Hook } from '../types';

/**
 * Create asyncComponentLoading model
 * @param nameSpace
 * @param onLoadStart
 * @param onLoadComplete
 */
export default function createAsyncComponentLoading(
    nameSpace: string,
    onLoadStart?: Hook,
    onLoadComplete?: Hook,
): VivyModel<boolean> {
    return {
        nameSpace: nameSpace || 'asyncComponentLoading',
        state: false,
        reducers: {
            /**
             * Start loading async component
             */
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            start: (state: boolean, { type, ...restActionProps }): boolean => {
                onLoadStart?.(restActionProps);
                return true;
            },

            /**
             * Load async component complete
             */
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            complete: (
                state: boolean,
                { type, ...restActionProps },
            ): boolean => {
                onLoadComplete?.(restActionProps);
                return false;
            },
        },
    };
}
