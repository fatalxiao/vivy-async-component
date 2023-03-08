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
