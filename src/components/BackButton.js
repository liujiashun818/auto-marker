import React, { PropTypes } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import images from '../images/index';
import style from '../styles/index';

function BackButton(props) {
  return (
    <TouchableOpacity activeOpacity={1} style={style.btnBack} onPress={Actions.pop}>
      {props.showIcon ? <Image source={images.icon.topIconBack} /> : null}
      <Text style={[style.btnBackFont, { ...props.style }]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

BackButton.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
};

BackButton.defaultProps = {
  style: null,
  text: ' ',
  showIcon: true,
};

export default BackButton;
