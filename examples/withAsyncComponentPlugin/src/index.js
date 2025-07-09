/**
 * @file index.js
 */

import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-vivy';
import { configureRoutes } from './routes';

// Import Vivy
import Vivy from 'vivy';
import VivyAsyncComponent from 'vivy-async-component';
import VivyRouter, { ConnectedRouter } from 'vivy-router';

// Create browser history
const history = createBrowserHistory({});

// Create vivy
const vivy = Vivy();

// Apply router plugin
vivy.use(
    VivyRouter({
        history,
    }),
);

// Apply async component plugin
vivy.use(
    VivyAsyncComponent({
        // Customized AsyncComponentLoading model nameSpace
        // default is "asyncComponentLoading"
        // asyncComponentLoadingModelNameSpace: 'customizedAsyncComponentLoading',

        // Load start callback
        onLoadStart: ({ getComponent, store, getModels, getReducers }) => {
            console.log('Load Start');
            console.log('getComponent::', getComponent);
            console.log('store::', store);
            console.log('getModels::', getModels);
            console.log('getReducers::', getReducers);
        },

        // Load complete callback
        onLoadComplete: ({
            getComponent,
            store,
            getModels,
            getReducers,
            Component,
            models,
            reducers,
        }) => {
            console.log('Load Complete');
            console.log('getComponent::', getComponent);
            console.log('store::', store);
            console.log('getModels::', getModels);
            console.log('getReducers::', getReducers);
            console.log('Component::', Component);
            console.log('models::', models);
            console.log('reducers::', reducers);
        },
    }),
);

// Create store after configuration
const store = vivy.createStore();

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>,
);
