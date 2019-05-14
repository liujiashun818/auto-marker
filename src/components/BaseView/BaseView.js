import React, { PropTypes } from 'react';
import { View, ViewPropTypes } from 'react-native';

import NavigationBar from 'react-native-navbar';

import BackButton from '../../components/BackButton';

import colors from '../../styles/colors';
import styles from '../../styles';

const ButtonShape = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
};

const TitleShape = {
  title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
};

export default function BaseView(props) {
  const {
    title,
    containerStyle,
    leftButton,
    rightButton,
    children,
  } = props;

  let configTitle;

  if (typeof title === 'string') {
    configTitle = {
      title,
      tintColor: colors.navBarTextColor,
    };
  } else {
    configTitle = title;
  }

  return (
    <View style={[styles.container, ...containerStyle]}>
      <NavigationBar
        title={configTitle}
        tintColor={colors.navBarBG}
        statusBar={AConfig.statusBar}
        leftButton={leftButton}
        rightButton={rightButton}
      />
      {children}
    </View>
  );
}

BaseView.propTypes = {
  leftButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    React.PropTypes.oneOf([null]),
  ]),
  rightButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    React.PropTypes.oneOf([null]),
  ]),
  title: PropTypes.oneOfType([
    PropTypes.shape(TitleShape),
    PropTypes.string,
    PropTypes.element,
    React.PropTypes.oneOf([null]),
  ]),
  containerStyle: ViewPropTypes.style,
};

BaseView.defaultProps = {
  leftButton: <BackButton />,
  rightButton: null,
  title: null,
  statusBar: {
    style: 'default',
    hidden: false,
    hideAnimation: 'slide',
    showAnimation: 'slide',
  },
  containerStyle: {},
};
