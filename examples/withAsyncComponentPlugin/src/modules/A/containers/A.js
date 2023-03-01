/**
 * @file A.js
 */

import React from 'react';
import {useModelState} from 'react-vivy';

const A = () => {

    /**
     * Get state from model using hook "useModelState".
     */
    const modelAState = useModelState('a');

    return (
        <>
            <h2>Module A</h2>
            <div>{modelAState}</div>
        </>
    );

};

export default A;
