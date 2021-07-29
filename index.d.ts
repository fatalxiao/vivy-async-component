import * as AsyncComponent from './src/components/AsyncComponent';

/**
 * AsyncComponent
 */
export {AsyncComponent};

export interface VivyAsyncComponentPluginOption {

    /**
     * NameSpace of "asyncComponentLoading" Model
     */
    asyncComponentLoadingModelNameSpace?: string

}

/**
 * Create Vivy async component plugin
 * @param options
 */
export default function createVivyAsyncComponentPlugin(options?: VivyAsyncComponentPluginOption): Object;
