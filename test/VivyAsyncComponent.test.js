'use strict';

import Vivy from 'vivy';
import VivyRouter from 'vivy-router';
import VivyAsyncComponent from '../src';

import {createMemoryHistory} from 'history';

test('Use Vivy Async Component by memory history', () => {

    const history = createMemoryHistory();
    const vivy = Vivy();

    vivy.use(VivyRouter({
        history
    }));
    vivy.use(VivyAsyncComponent());

    const store = vivy.createStore();

    expect(
        store.history
    ).toEqual(
        history
    );

});
