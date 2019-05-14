import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { ActionConst, Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';

import styles from '../../styles/index';

/**
 * 客户详情
 */
export default function Detail(props) {
  const { customer } = props;

  const rightButton = (
    <TouchableOpacity
      style={[styles.flexRowCenter, styles.mr10]}
      onPress={() => Actions.CustomerAdd({ customer, isEdit: true, type: ActionConst.REPLACE })}
    >
      <Text style={[styles.f16]}>编辑</Text>
    </TouchableOpacity>
  );

  return (
    <BaseView title="客户信息" rightButton={rightButton}>
      <ScrollView>
        <View style={[styles.formGroup, styles.mb15]}>
          <View style={styles.formGroupBody}>
            <View style={[styles.formControl, { justifyContent: 'flex-start' }]}>
              <Text style={styles.formLabel}>姓名</Text>
              <Text>{customer.name}</Text>
            </View>

            <View
              style={[styles.formControl, { justifyContent: 'flex-start' }, styles.noBorderBottom]}>
              <Text style={styles.formLabel}>手机号</Text>
              <Text>{customer.phone}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.formGroup, styles.mb30]}>
          <View style={styles.formGroupBody}>
            <View style={[styles.formControl, { justifyContent: 'flex-start' }]}>
              <Text style={styles.formLabel}>性别</Text>
              <Text>{customer.gender === '1' ? '男' : '女'}</Text>
            </View>

            <View style={[styles.formControl, { justifyContent: 'flex-start' }]}>
              <Text style={styles.formLabel}>年龄</Text>
              <Text>{customer.age}</Text>
            </View>

            <View
              style={[styles.formControl, { justifyContent: 'flex-start' }, styles.noBorderBottom]}>
              <Text style={styles.formLabel}>职业</Text>
              <Text>{customer.profession_name}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
}
