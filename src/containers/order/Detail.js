import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';

import images from '../../images/index';

import style from '../../styles/index';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  moduleBodyImg: {
    width: 140,
    height: 80,
  },

  listItem: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemLeft: {
    flexDirection: 'column',
  },

  imgStatusLabel: {
    width: 40,
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 1,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStatusLabelDefault: {
    backgroundColor: colors.blue,
  },
  imgStatusLabelSuccess: {
    backgroundColor: colors.green,
  },
  imgStatusLabelText: {
    fontSize: 12,
    color: colors.white,
  },

  bottomAction: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.yellow,
  },
});

/**
 * 订单详情
 */
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'id_card',
    };
  }

  onMaterialItemClick(type) {
    console.log('type:', type);
    this.setState({ type });
  }

  render() {
    return (
      <BaseView title="订单详情">
        <ScrollView style={{ marginBottom: 50 }}>
          <View style={[style.module, style.mb15]}>
            <TouchableOpacity style={style.moduleTitleWithArrow}>
              <View style={style.flexRowLeft}>
                <Text style={style.leftBar} />
                <Text>客户信息</Text>
              </View>

              <View style={style.flexRow}>
                <Text style={[style.textPrimary, style.mr5]}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <View style={style.moduleContent}>
              <Text>网意思</Text>
              <Text>15282828282</Text>
              <Text>女 18岁</Text>
            </View>
          </View>

          <View style={[style.module, style.flexRowBetween, style.mb15]}>
            <Image style={styles.moduleBodyImg} source={require('../../images/auto.png')} />

            <View style={style.moduleContentRight}>
              <Text style={{ flexWrap: 'wrap', borderWidth: 1, }}>大众朗逸 2013款 经典款 1.6L 手自一体</Text>
              <Text style={[style.textGray, style.f12]}>指导价：120000元</Text>
              <Text style={[style.textGray, style.f12]}>外观/内饰：白/黑</Text>
            </View>
          </View>

          <View style={[style.module, style.mb15]}>
            <TouchableOpacity style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>开走吧-保证金客户(车型方案)</Text>
            </TouchableOpacity>

            <View style={style.moduleContent}>
              <View style={[style.flexRowLeft, style.mb10]}>
                <Text style={{ flex: 1 }}>首付租金 <Text style={style.textOrange}>12000元</Text></Text>
                <Text style={{ flex: 1 }}>月租 <Text style={style.textOrange}>12000元</Text></Text>
              </View>
              <View style={[style.flexRowLeft, style.mb10]}>
                <Text style={{ flex: 1 }}>提车费 <Text style={style.textOrange}>12000元</Text></Text>
                <Text style={{ flex: 1 }}>服务费 <Text style={style.textOrange}>12000元</Text></Text>
              </View>
              <View style={[style.flexRowLeft, style.moduleContentLine, style.withBorderBottom]}>
                <Text style={{ flex: 1 }}>保证金 <Text style={style.textOrange}>12000元</Text></Text>
              </View>

              <View style={[style.flexRowLeft, style.moduleContentLine, style.withBorderBottom]}>
                <Text style={{ flex: 1 }}>首次支出 <Text style={style.textOrange}>12000元</Text></Text>
              </View>

              <View style={[style.flexRowLeft, style.moduleContentLine, style.withBorderBottom]}>
                <Text style={{ flex: 1 }}>残值 <Text style={style.textOrange}>12000元</Text></Text>
                <Text style={{ flex: 1 }}>月供(36期) <Text
                  style={style.textOrange}>12000元</Text></Text>
              </View>

              <View style={[style.flexRowLeft, style.moduleContentLine]}>
                <Text>可选套餐：赠送垫脚4个，香水1个</Text>
              </View>

            </View>
          </View>

          <View style={[style.module, style.mb15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>申请材料</Text>
            </View>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('id_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>身份证照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>正面、反面</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('id_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>驾驶证照片</Text>
                  <View style={styles.imgStatusLabelDefault}>
                    <Text style={styles.imgStatusLabelText}>待传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>正面、反面</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('half_year_crash')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>半年银行流水照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>正本、副本</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('apply_paper')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>申请表照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>表、手续、签字</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('bank_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>银行卡</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>中/工/建/招</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('house_certificate')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>房产照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>房产证、村委会正面、家访</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('other')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>其他照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>营业执照、学历证、学位证</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.listItem, style.noBorderBottom]}
              onPress={() => this.onMaterialItemClick('id_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>身份证照片</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>正面、反面</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[style.module, style.mb15]}>
            <View style={[style.moduleTitle, style.flexRowLeft]}>
              <Text style={style.leftBar} />
              <Text>转款凭证</Text>
            </View>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.onMaterialItemClick('id_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>意向金转款凭证</Text>
                  <View style={[styles.imgStatusLabel, styles.imgStatusLabelSuccess]}>
                    <Text style={styles.imgStatusLabelText}>已传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>线下支付必传</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.listItem, style.noBorderBottom]}
              onPress={() => this.onMaterialItemClick('id_card')}
            >
              <View style={styles.listItemLeft}>
                <View style={style.flexRowLeft}>
                  <Text>定金转款凭证</Text>
                  <View style={styles.imgStatusLabelDefault}>
                    <Text style={styles.imgStatusLabelText}>待传</Text>
                  </View>
                </View>
                <Text style={[style.f12, style.textGray, style.mt5]}>线下支付必传</Text>
              </View>

              <View style={style.flexRowRight}>
                <Text style={style.mr5}>编辑</Text>
                <Image source={images.icon.arrowRight} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.bottomAction}>
          <Text>支付意向金</Text>
        </TouchableOpacity>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
