import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../../images/index';

export default class ViewEmpty extends Component {
  render() {
    return (
      <View style={styles.veContainer}>
        <View style={styles.veView}>
          <Image style={styles.veImage} source={images.icon.listEmptyIcon}/>
          <Text style={styles.veText}>暂无查询记录</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  veContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e6e8',
    paddingBottom: 150,
  },
  veView: {
    height: 148,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 100,
  },
  veImage: {
    width: 120,
    height: 120,
  },
  veText: {
    fontSize: 18,
    color: '#ccc',
    fontWeight: 'bold',
  },
});
