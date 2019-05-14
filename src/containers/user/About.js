import React from 'react';
import { Image, ScrollView } from 'react-native';

import BaseView from '../../components/BaseView/index';

import styles from '../../styles/index';
import images from '../../images/index';

export default function About() {
  return (
    <BaseView title={'关于我们'} leftButton={AConfig.backBtn}>
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <Image
          source={images.img.aboutUs}
          style={{ width: AData.ScreenWidth, height: AData.ScreenHeight }}
          resizeMode="cover"
        />
      </ScrollView>
    </BaseView>
  );
}
