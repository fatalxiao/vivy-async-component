/**
 * @file Root.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {useModelState} from 'react-vivy';

// Component
import {NavLink} from 'react-router-dom';
import PageLoading from 'alcedo-ui/PageLoading';

// Vendors
import {renderRoutes} from 'react-router-config';

const Root = ({
    route
}) => {

    /**
     * Get state from model using hook "useModelState".
     */
    const {menu} = useModelState('root');

    /**
     * Get async component loading from customized name space model
     * ( default vivy-async-component model name space is "asyncComponentLoading" )
     * customizedAsyncComponentLoading: state.customizedAsyncComponentLoading
     */
    const asyncComponentLoading = useModelState('asyncComponentLoading');

    return (
        <div style={{
            display: 'flex',
            boxSizing: 'border-box',
            height: '100vh'
        }}>

            <div style={{
                padding: 24,
                background: '#f0f0f0'
            }}>
                <h2>Module Root</h2>
                <h3>Menu:</h3>
                <ul>
                    {
                        menu?.map((item, index) =>
                            <li key={index}>
                                <NavLink to={item?.route}>
                                    {item?.name}
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
                Loading: {asyncComponentLoading ? 'true' : 'false'}
            </div>

            <div style={{
                flex: 1,
                padding: 24
            }}>
                {renderRoutes(route.routes)}
            </div>

        </div>
    );

};

Root.propTypes = {
    route: PropTypes.object
};

export default Root;
