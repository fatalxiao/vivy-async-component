'use strict';

import VivyAsyncComponent, { AsyncComponent } from 'src';
import Vivy from 'vivy';
import VivyRouter from 'vivy-router';

// History
import { createMemoryHistory } from 'history';

test('Use Vivy Async Component by memory history', () => {
    const history = createMemoryHistory();
    const vivy = Vivy();

    vivy.use(
        VivyRouter({
            history,
        }),
    );
    vivy.use(VivyAsyncComponent());

    const store = vivy.createStore();

    expect(store.history).toEqual(history);
});

test('Use AsyncComponent loading component', () => {
    const history = createMemoryHistory();
    const vivy = Vivy();

    vivy.use(
        VivyRouter({
            history,
        }),
    );
    vivy.use(VivyAsyncComponent());

    const store = vivy.createStore();

    const asyncComponent = AsyncComponent(
        () => import('./mocks/TestComponent'),
        store,
        [() => import('./mocks/testModel')],
    );

    expect(typeof asyncComponent).toEqual('function');
});
