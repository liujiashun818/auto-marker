import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';

import Toast from 'react-native-root-toast';

import SafeComponent from '../../components/SafeComponent';
import BaseView from '../../components/BaseView/index';
import RecoredlistView from './RecoredlistView';

import styles from '../../styles';
import maStyles from './style/my_account';
import colors from '../../styles/colors';

import { IAPBuyProduct } from '../../utils/iap';

import {
  getArtificerCharge,
  getArtificerIncome,
  getArtificerPay,
  getArtificerWithDraw,
  getUserInfo,
} from '../../redux/auth/actions';

class MyAccount extends SafeComponent {
  constructor(props) {
    super(props);

    this.state = {
      rechargeModalVisible: false,
      recharging: false,
    };

    [
      'onSelectRechargeItem',
      'toggleRechargeModalVisible',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getRecordList();
  }

  getRecordList() {
    this.props.actions.getArtificerIncome();
    this.props.actions.getArtificerCharge();
    this.props.actions.getArtificerWithDraw();
    this.props.actions.getArtificerPay();
    this.props.actions.getUserInfo();
  }

  onSelectRechargeItem(product) {
    const { currentUser } = this.props;
    this.safeSetState({ recharging: true });
    // 处理充值
    IAPBuyProduct(product.productId, currentUser._id, () => {
      // 充值成功后拉取用户信息
      this.props.actions.getUserInfo();
      this.toggleRechargeModalVisible();
      this.getRecordList();
      this.safeSetState({ recharging: false });
    }, (error) => {
      this.toggleRechargeModalVisible();
      this.safeSetState({ recharging: false });
      Toast.show(error.message || '购买失败', { position: -70 });
    });
  }

  toggleRechargeModalVisible() {
    this.safeSetState({ rechargeModalVisible: !this.state.rechargeModalVisible });
  }

  render() {
    const currentUser = this.props.currentUser || {};
    const artificerInfoFetching = this.props.artificerInfoFetching;
    const { rechargeModalVisible } = this.state;
    const {
      artificerIncomeFetching,
      artificerIncome,
      artificerChargeFetching,
      artificerCharge,
      artificerWithDrawFetching,
      artificerWithDraw,
      artificerPayFetching,
      artificerPay,
    } = this.props;

    return (
      <BaseView
        title={'我的账户'}
        rightButton={
          AData.OS === 'ios' ? <TouchableOpacity
            style={styles.flexRowCenter}
            onPress={() => Actions.Chargelnstructions()}
          >
            <Text style={[styles.fwh, styles.f16, styles.mr10]}>充值说明</Text>
          </TouchableOpacity> : null
        }
      >
        <View style={styles.container}>
          <View style={maStyles.header}>
            <View style={maStyles.withdraw}>
              <Text style={maStyles.withdrawTitle}>待提现</Text>
              <Text style={maStyles.withdrawAmount}>
                {`¥ ${currentUser.unpay_amount || 0.00}`}
              </Text>
            </View>

            {
              AData.OS === 'ios' ? (
                <View style={maStyles.recharge}>
                  <View style={maStyles.rechargeLeft}>
                    <Text style={maStyles.rechargeLeftTitle}>
                      充值余额（不可提现）
                    </Text>
                    <Text style={maStyles.rechargeLeftAccount}>
                      {`¥ ${currentUser.remain_charge_amount || 0.00}`}
                    </Text>
                  </View>
                  <View style={maStyles.rechargeRight}>
                    <TouchableOpacity
                      style={maStyles.rechargeBtn}
                      onPress={this.toggleRechargeModalVisible}
                    >
                      <Text style={maStyles.rechargeText}>充值</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (null)
            }
          </View>
          <View style={[styles.mt10, { flex: 1 }]}>
            <ScrollableTabView
              initialPage={0}
              tabBarUnderlineStyle={{ backgroundColor: '#ffd500', height: 2 }}
              tabBarBackgroundColor={colors.btnDisable}
              tabBarActiveTextColor={colors.darkGray}
              tabBarInactiveTextColor={colors.darkGray}
              tabBarTextStyle={styles.mt10}
            >
              <RecoredlistView
                tabLabel="收益记录"
                type={1}
                RecoredlistView={!artificerIncomeFetching && artificerIncome}
              />
              <RecoredlistView
                tabLabel="交易记录"
                type={2}
                RecoredlistView={artificerCharge}
                artificerCharge={artificerCharge}
                artificerWithDraw={artificerWithDraw}
                artificerPay={artificerPay}
              />
            </ScrollableTabView>
          </View>

        </View>

      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const {
    currentUser,
    artificerInfoFetching,
    artificerIncomeFetching,
    artificerIncome,
    artificerChargeFetching,
    artificerCharge,
    artificerWithDrawFetching,
    artificerWithDraw,
    artificerPayFetching,
    artificerPay,
  } = state.auth;
  return {
    currentUser,
    artificerInfoFetching,
    artificerIncomeFetching,
    artificerIncome,
    artificerChargeFetching,
    artificerCharge,
    artificerWithDrawFetching,
    artificerWithDraw,
    artificerPayFetching,
    artificerPay,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserInfo,
      getArtificerIncome,
      getArtificerCharge,
      getArtificerWithDraw,
      getArtificerPay,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
