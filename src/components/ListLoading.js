import React, { PropTypes } from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';

import images from '../images/index';

const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spinner: {
    flex: 0,
  },
});

export default function ListLoading(props) {
  return (
    <View style={props.style ? props.style : styles.contentStyle}>
      {props.hasMore ? <Image source={images.loading.default} /> : null}
    </View>
  );
}

ListLoading.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  style: ViewPropTypes.style,
};

ListLoading.defaultProps = {
  hasMore: false,
  style: {},
};
