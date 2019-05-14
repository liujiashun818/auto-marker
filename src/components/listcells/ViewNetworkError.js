import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../../images/index';

export default class ViewNetwork extends Component {
  render() {
    return (
      <View style={styles.vlContainer}>
        <View style={styles.vlView}>
          <Image style={styles.vlImage} source={images.icon.toastError}/>
          <Text style={styles.vlText}>网络连接异常</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vlContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e6e8',
    paddingBottom: 150,
  },
  vlView: {
    height: 170,
    width: 170,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    paddingTop: 30,
    paddingBottom: 20,
    marginTop: 100,
  },
  vlImage: {
    width: 90,
    height: 90,
  },
  vlText: {
    fontSize: 14,
    color: '#333',
  },
});
