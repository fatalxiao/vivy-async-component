/**
 * @file B.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const B = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const modelBState = useModelState('b');

    return (
        <>
            <h2>Module B</h2>
            <div>{modelBState}</div>
        </>
    );

};

export default B;
