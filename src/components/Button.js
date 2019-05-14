import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

export default function Button(props) {
  const {
    buttonStyle,
    textStyle,
    title,
    onPress,
    disabled,
  } = props;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  buttonStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),    //string or TextElement
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
