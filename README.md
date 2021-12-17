[npm-image]: https://img.shields.io/npm/v/vivy-async-component.svg?style=flat-square

[npm-url]: https://npmjs.org/package/vivy-async-component

[license-image]: https://img.shields.io/npm/l/vivy-async-component.svg?style=flat-square

[vivy-url]: https://github.com/fatalxiao/vivy

[with-async-component-plugin-example-url]: https://github.com/fatalxiao/vivy-async-component/tree/main/examples/withAsyncComponentPlugin

[pieb-with-dpe-frontend-url]: https://github.com/fatalxiao/pieb-with-dpe-frontend

# vivy-async-component

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][npm-url]

A [Vivy][vivy-url] plugin to load async component and async Vivy model to easily split chunks by route.

* [Installation](#installation)
* [Examples](#examples)
    * [Examples in repository](#examples-in-repository)
    * [Complete and real project example](#complete-and-real-project-example)
* [Documentation](#documentation)
    * [Basic usage](#basic-usage)

## Installation

Using npm:

```shell
$ npm install vivy vivy-router vivy-async-component
```

## Examples

### Examples in repository

```shell
$ cd ./examples/[EXAMPLE_NAME]
$ npm run start
```

**Example names**:

* [withAsyncComponentPlugin][with-async-component-plugin-example-url]

### Complete and real project example

* [pieb-with-dpe-frontend][pieb-with-dpe-frontend-url]

## Documentation

### Basic usage

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';

// Import Vivy
import Vivy from 'vivy';

// Import VivyRouter and ConnectedRouter
import VivyRouter, {ConnectedRouter} from 'vivy-router';

// Import component
import Root from './path_to_your_Root_component';

// Import Vivy model
import yourVivyModel from './path_to_your_vivy_model';

// Routes config
const routes = [{
    path: '/',
    component: Root
}]

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy();

// Apply router plugin
vivy.use(VivyRouter({
    history
}));

// Create store after configuration
const store = vivy.createStore();

// Register vivy models
store.registerModel(yourVivyModel);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(routes)}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
```
