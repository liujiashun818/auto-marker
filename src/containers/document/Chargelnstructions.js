import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';

import styles from '../../styles';
import colors from '../../styles/colors';
import BaseView from '../../components/BaseView/index';

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.defaultText,
    lineHeight: 20,
  },
});

export default function Agreement() {
  return (
    <BaseView title="充值说明">

      <ScrollView style={styles.container} contentContainerStyle={[styles.pv30, styles.ph20]}>

        <Text style={[style.text, styles.mv10]}>{'一、定义'}</Text>
        <Text style={style.text}>{'充值余额：您通过苹果应用内支付充值的金额与您进行问题悬赏支付的金额的差值。'}</Text>

        <Text style={[style.text, styles.mv10]}>{'二、说明'}</Text>
        <Text style={style.text}>{'* 苹果公司规定，iOS设备上的充值金额不能在非iOS终端上使用，敬请谅解。'}</Text>
        <Text style={style.text}>{'* 充值金额仅用于在水稻技师版 iOS App 内进行问题的付费悬赏。'}</Text>
        <Text style={style.text}>{'* 充值金额没有使用期限，会一直保存在您的账户内，可以随时使用。'}</Text>
        <Text style={style.text}>{'* 充值金额不能退回。'}</Text>
        <TouchableOpacity onPress={() => Communications.phonecall('4000918118', true)}>
        <Text style={style.text}>{'* 充值到账时间可能有延迟。如果扣款后一小时仍未到账，请联系客服人员，我们会尽快为您处理。客服电话：400-091-8118'}</Text>
        </TouchableOpacity>
        <Text style={style.text}>{'*  在适用法律法规允许的范围内，充值以及余额使用规则的最终解释权归水稻汽车所有。'}</Text>
      </ScrollView>
    </BaseView>
  );
}
