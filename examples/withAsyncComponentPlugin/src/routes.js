/**
 * @file routes.js
 */

// Components
import React from 'react';
import { AsyncComponent } from 'vivy-async-component';

/**
 * Get route config
 * @param store
 * @returns {[]}
 */
export function configureRoutes(store) {
    return [
        {
            path: '/',
            component: AsyncComponent(
                () => import('./modules/Root/containers/Root'),
                store,
                [() => import('./modules/Root/models/root')],
            ),
            routes: [
                {
                    path: '/a',
                    component: AsyncComponent(
                        () => import('./modules/A/containers/A'),
                        store,
                        [() => import('./modules/A/models/a')],
                        undefined,
                        <div>loading...</div>,
                    ),
                },
                {
                    path: '/b',
                    component: AsyncComponent(
                        () => import('./modules/B/containers/B'),
                        store,
                        [() => import('./modules/B/models/b')],
                    ),
                },
                {
                    path: '/c',
                    component: AsyncComponent(
                        () => import('./modules/C/containers/C'),
                        store,
                        [() => import('./modules/C/models/c')],
                    ),
                },
            ],
        },
    ];
}
