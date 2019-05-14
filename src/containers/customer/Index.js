import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  FlatList,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import BaseView from '../../components/BaseView';
import Loading from '../../components/Loading';

import images from '../../images/index';

import styles from '../../styles/index';
import colors from '../../styles/colors';

import { getCustomers } from '../../redux/customer/actions';

const style = StyleSheet.create({
  topSearchBanner: {
    height: 60,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ffbb00',
    borderRadius: 22,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#ffbb00',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },

  list: {
    backgroundColor: colors.white,
  },

  listItem: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    marginLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dividerLine: {
    height: 1,
    backgroundColor: colors.borderColor,
  },
});

/**
 * 客户
 */
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.getCustomers(this.props.page);
    });
  }

  onSearchChange(phone) {
    if (String(phone).length > 3) {
      this.props.actions.getCustomers(this.props.page, phone);
    }
  }

  onLoadMore() {
    console.log('load more...');
  }

  keyExtractor(rowData) {
    return rowData._id;
  }

  renderRow(rowData) {
    const { item, index } = rowData;

    return (
      <TouchableOpacity
        style={[style.listItem, index === 0 ? styles.noBorderTop : null]}
        onPress={() => Actions.CustomerDetail({ customer: item })}
      >
        <Text>{item.name} <Text>{item.phone}</Text></Text>
        <Image source={images.icon.arrowRight} />
      </TouchableOpacity>
    );
  }

  render() {
    const { isFetching, customers } = this.props;

    const rightButton = (
      <TouchableOpacity style={[styles.flexRowCenter, styles.mr10]} onPress={Actions.CustomerAdd}>
        <Text style={styles.f16}>添加客户</Text>
      </TouchableOpacity>
    );

    return (
      <BaseView title="我的客户" rightButton={rightButton}>
        <View style={[style.topSearchBanner]}>
          <TextInput
            style={style.searchInput}
            underlineColorAndroid="transparent"
            keyboardType="phone-pad"
            placeholder={'请输入手机号搜索'}
            placeholderTextColor="#99771a"
            maxLength={11}
            onChangeText={(phone) => this.onSearchChange(phone)}
            clearButtonMode={'while-editing'}
          />
        </View>

        <Loading isLoading={isFetching} />

        <FlatList
          style={style.list}
          data={customers}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={() => <View style={style.dividerLine} />}
          initialNumToRender={8}
          onEndReachedThreshold={0.8}
          onEndReached={this.onLoadMore()}
        />
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    customers,
    page,
  } = state.customer;
  return {
    isFetching,
    customers,
    page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getCustomers }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
