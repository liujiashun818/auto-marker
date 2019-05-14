import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

import ViewEmpty from '../../components/listcells/ViewEmpty';
import ModalActionSheet from '../../components/ActionSheet/ModalActionSheet';

import maStyles from './style/my_account';
import styles from '../../styles';
import images from '../../images';

export default class recordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      rewardModalVisible: false,
      RecoredlistView: props.artificerWithDraw ? props.artificerWithDraw : [],
    };
    this.showIncome = this.showIncome.bind(this);
    this.showSelect = this.showSelect.bind(this);
    this.rewardActionItems = [
      {
        title: '充值',
        handler: this.onSelectType.bind(this, 1),
      },
      {
        title: '提现',
        handler: this.onSelectType.bind(this, 2),
      },
      {
        title: '付费咨询',
        handler: this.onSelectType.bind(this, 3),
      },
    ];
  }

  showIncome() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  showSelect() {
    this.setState({ rewardModalVisible: !this.state.rewardModalVisible });
  }

  onSelectType(type) {
    const {
      artificerCharge,
      artificerWithDraw,
      artificerPay,
    } = this.props;
    this.state.RecoredlistView = type === 1 ? artificerCharge :
                                 type === 2 ? artificerWithDraw :
                                 type === 3 ? artificerPay : null;
  }

  text(item) {
    if (item.transaction_id) {
      return '充值';
    } else if (item.withdraw_user_id) {
      return '提现';
    } else {
      return '咨询付费';
    }
  }

  price(item) {
    if (item.transaction_id) {
      return <Text style={maStyles.priceFont}>+{item.amount}</Text>;
    } else if (item.withdraw_user_id) {
      return <Text style={maStyles.priceNormalFont}>-{item.amount}</Text>;
    } else {
      return <Text style={maStyles.priceNormalFont}>-{item.amount}</Text>;
    }
  }

  render() {
    const {
      type,
      RecoredlistView,
    } = this.props;

    const {
      rewardModalVisible,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View>
          {type === 1 ?
            <TouchableOpacity onPress={this.showIncome}>
              <View style={maStyles.showIncome}>
                <Image source={images.icon.iconInfo} />
                <Text style={styles.ml5}>查看收益说明</Text>
              </View>
            </TouchableOpacity>
            : null
          }
            {type === 1 ?
              RecoredlistView.length === 0 ? <ViewEmpty /> :
              RecoredlistView && RecoredlistView.map((item) =>(
              <View key={item._id} style={maStyles.recordList}>
                <View>
                  <Text style={[maStyles.detailFont, styles.mt5]}>{item.type === '0' ? '问题被采纳,独享收益' : '回答问题,平分收益'}</Text>
                  <Text style={maStyles.timeFont}>{item.ctime}</Text>
                </View>
                <View>
                  <Text
                    style={[item.status === '0' ? maStyles.priceFont : maStyles.priceNormalFont, styles.pb5]}
                  >
                    +{item.amount}
                  </Text>
                  <Text style={maStyles.timeFont}>{item.status === '0' ? '待提现' : '已提现'}</Text>
                </View>
              </View>
            )) :
              <View>
                {AData.OS === 'ios' ?
                  (<TouchableOpacity
                  style={[styles.flexRowCenter, maStyles.selectBar]}
                  onPress={this.showSelect}
                >
                  <Text>
                    交易类型筛选
                  </Text>
                  <Image source={images.icon.arrowDown} />
                </TouchableOpacity>) : (null)
                }
                {
                  this.state.RecoredlistView.length === 0 ? <ViewEmpty /> :
                  this.state.RecoredlistView && this.state.RecoredlistView.map((item, index) =>(
                    this.state.RecoredlistView.length === 0 ? <ViewEmpty /> :
                    <View key={index + 1} style={maStyles.recordList}>
                      <View>
                        <Text style={maStyles.detailFont}>{this.text(item)}</Text>
                        <Text style={maStyles.timeFont}>{item.ctime}</Text>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        {this.price(item)}
                      </View>
                    </View>
                  ))
                }
              </View>
            }
        </View>
        <Modal
          visible={this.state.visible}
          animationType={'fade'}
          onRequestClose={this.showIncome}
          transparent
        >
          <View style={[styles.modal]}>
            <View style={styles.modalContent}>
              <View style={[styles.flexRowCenter, styles.mb20]}>
                <Text style={styles.f16}>收益说明</Text>
              </View>
              <View>
                <Text style={[maStyles.text,styles.mb10]}>
                  Q：待提现金额如何提现，何时到账？
                </Text>
                <Text style={[maStyles.text,styles.mb10]}>
                  每月25日为结算日（若遇周末或节假日，则顺延至之后第一个工作日）
                  ，水稻汽车会将您的待提现金额发放至您提供的支付宝账号内。若支付宝账号有变更，请及时在个人信息编辑页进行修改。
                </Text>
                <Text style={[maStyles.text,styles.mb10]}>
                  Q：为什么iOS设备与安卓设备提问时设置的悬赏金额不一致？
                </Text>
                <Text style={[maStyles.text,styles.mb10]}>
                  若用户通过iOS客户端提问进行悬赏，悬赏金额需与苹果公司分成，
                  31.4%归苹果公司所有，68.6%归技师所有，水稻汽车从中不收取任何费用。
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.showIncome}>
              <Image style={maStyles.closeBtn} source={images.icon.close} />
            </TouchableOpacity>
          </View>
        </Modal>
        {/* 交易类型的Modal */}
        <ModalActionSheet
          visible={rewardModalVisible}
          title={'充值类型'}
          onCancel={this.showSelect}
          actionItems={this.rewardActionItems}
        />
      </ScrollView>
    );
  }
}
