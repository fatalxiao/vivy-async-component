/**
 * @file C.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const C = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const modelCState = useModelState('c');

    return (
        <>
            <h2>Module C</h2>
            <div>{modelCState}</div>
        </>
    );

};

export default C;
