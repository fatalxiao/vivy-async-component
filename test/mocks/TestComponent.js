/**
 * @file TestComponent.js
 */

import PropTypes from 'prop-types';
import {connect} from 'react-vivy';

const TestComponent = ({
    asyncComponentLoading
}) => asyncComponentLoading;

TestComponent.propTypes = {
    asyncComponentLoading: PropTypes.bool
};

export default connect(state => ({
    asyncComponentLoading: state.asyncComponentLoading
}))(TestComponent);
