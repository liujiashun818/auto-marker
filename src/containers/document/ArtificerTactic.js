import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

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
    <BaseView title="技师攻略">

      <ScrollView style={styles.container} contentContainerStyle={[styles.pv30, styles.ph20]}>

        <Text style={[style.text, styles.mv10]}>{'一、答题范围'}</Text>
        <Text style={style.text}>{'水稻汽车技师端为技师量身打造，致力于汽车后市场问题的咨询服务，答题范围包括维修保养、购车咨询、保险金融等。'}</Text>

        <Text style={[style.text, styles.mv10]}>{'二、答题规范'}</Text>
        <Text style={style.text}>{'1. 用技术为自己代言，回答问题除了给出问题的所在，更应该对提问者进行一些补充说明，一个完整的回答应该包含以下几个部分：'}</Text>
        <Text style={[style.text, styles.ml20]}>{'1. 什么样的故障；'}</Text>
        <Text style={[style.text, styles.ml20]}>{'2. 故障的原因；'}</Text>
        <Text style={[style.text, styles.ml20]}>{'3. 需要维修那些配件等等。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'2. 身为技师专家，应该充分展现技术价值，耐心且完整准确地回答问题，并对自己的技术负责，承诺不懂不会不擅长的问题谨慎回答。'}</Text>

        <Text style={[style.text, styles.mv10]}>{'三、注意事项'}</Text>
        <Text style={[style.text, styles.mt10]}>{'1. 严禁答题过程中出现“求采纳”或者变相求采纳等一系列诱导提问者采纳的行为，若情节严重将取消该技师的答题资格。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'2. 水稻汽车不鼓励技师留下自己的联系方式，如果收到举报或者检测到答题过程中有违规行为，若情节严重将取消该技师的答题资格。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'3. 水稻汽车（技师端）是一个展现、分享自己技术的平台，所以平台严禁复制答题的行为（比如多次复制自己的答案，别人的答案，或者百度的答案等），若情节严重将取消该技师的答题资格。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'4. 如果出现侮辱、谩骂、人身攻击他人等行为将直接取消该技师的答题资格。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'5. 严禁无意义的，不能解决实际问题的回复。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'6. 若提问者未回复，技师可以对车主进行留言（不能超过五条），如“在吗”、“问题是否已经解决”等，避免对提问者造成骚扰。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'7. 严禁出现乱报价的行为，当对提问者进行维修报价或者配件报价的时候，应给出准确或者接近的数值，并告知是原厂件还是副厂件。'}</Text>

        <Text style={[style.text, styles.mv10]}>{'四、关于技师收益'}</Text>
        <Text style={[style.text, styles.mt10]}>{'1. 每月25日为结算日。若遇周末或节假日，则顺延至之后第一个工作日。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'2. 设置了悬赏金额的问题每次回答被采纳，技师会得到相应的悬赏金额。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'3. 已经有回答的问题，但是提问者24小时内没有采纳任何答案，管理员筛选后，帮技师平分赏金。'}</Text>

        <Text style={[style.text, styles.mv10]}>{'五、其他'}</Text>
        <Text style={[style.text, styles.mt10]}>{'1. 明确自己的擅长车型，并且在个人页面进行准确设置，尽量少的避免无法解答问题的情况。'}</Text>
        <Text style={[style.text, styles.mt10]}>{'2. 积极的解答车主的问题直至服务完毕，如发现中途拒绝回答或中断回答，一经发现水稻汽车将不会对此问题支付赏金，若情节严重将取消该技师的答题资格。'}</Text>
      </ScrollView>
    </BaseView>
  );
}
