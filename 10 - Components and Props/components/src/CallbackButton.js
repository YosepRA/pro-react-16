import React from 'react';
import { SimpleButton } from './SimpleButton';
import PropTypes from 'prop-types';

// Default props will be used if parent component doesn't provide a value to a prop.
CallbackButton.defaultProps = {
  theme: 'warning',
  text: 'Default Text',
};

export function CallbackButton(props) {
  // Object destructuring can be used to extract only a few properties and have the rest of ~
  // ~ the properties to be identified by a variable.
  // 'childProps' will represent an object filled with the leftover properties.
  const { theme, ...childProps } = props;

  return (
    <SimpleButton
      {...childProps}
      className={`btn btn-${props.theme} btn-sm m-1`}
    />
  );
}

CallbackButton.propTypes = {
  // "oneOf" will only validate the prop data if its one of the expected values.
  theme: PropTypes.oneOf(['primary', 'info']),
};
