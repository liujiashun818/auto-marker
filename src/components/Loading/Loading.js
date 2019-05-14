import React, { PropTypes } from 'react';
import { Platform, View } from 'react-native';
import Spinner from 'react-native-spinkit';

import colors from '../../styles/colors';
import styles from './styles';

function Loading(props) {
  const { type, isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingOverlay}>
        <Spinner
          isVisible={isLoading}
          color={colors.yellow}
          type={type}
          style={styles.spinner}
        />
      </View>
    );
  }

  if (Platform.OS === 'ios') {
    return null;
  }

  return <View style={{ width: 0, height: 0 }} />;
}

Loading.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Loading.defaultProps = {
  type: 'FadingCircleAlt',
  isLoading: false,
};

export default Loading;
