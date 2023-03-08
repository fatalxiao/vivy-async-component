/**
 * @file types.ts
 * @author Liangxiaojun
 */

export interface Hook {
    (args: any): void
}

export interface Hooks {

    /**
     * Load component start callback
     */
    onLoadStart?: Hook,

    /**
     * Load component complete callback
     */
    onLoadComplete?: Hook

}

export type VivyAsyncComponentPluginOption = Hooks & {

    /**
     * NameSpace of "asyncComponentLoading" Model
     */
    asyncComponentLoadingModelNameSpace?: string

}

/**
 * Whether is it loading model or component.
 */
export type asyncComponentLoading = boolean;

export interface VivyAsyncComponentModelActions {

    /**
     * Set model state "asyncComponentLoading" value to true.
     */
    start?: () => void,

    /**
     * Set model state "asyncComponentLoading" value to false.
     */
    complete?: () => void

}

// /**
//  * A hook to access the state and reducers from vivy async component model.
//  */
// export function useAsyncComponent(): [asyncComponentLoading, VivyAsyncComponentModelActions];
//
// /**
//  * A hook to access the state from vivy async component model.
//  */
// export function useAsyncComponentLoading(): asyncComponentLoading;
//
// /**
//  * Create Vivy async component plugin
//  * @param options
//  */
// export default function VivyAsyncComponent(options?: VivyAsyncComponentPluginOption);
