import React, { Component } from 'react';
import { Image, ListView, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BaseView from '../../components/BaseView/index';
import style from '../../styles';
import colors from '../../styles/colors';
import Loading from '../../components/Loading/index';
import images from '../../images/index';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class BrandItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      stateObj: {},
    };

    [
      'showModal',
      'hideModal',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.series) {
      const { selectSeries } = this.props;

      const stateObj = {};
      nextProps.series.map((item) => {
        stateObj[item._id] = false;
      });
      stateObj[selectSeries._id] = true;

      this.setState({ stateObj });
    }

    if (nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  handleSelectSeries(series) {
    const { stateObj } = this.state;
    for (const state in stateObj) {
      stateObj[state] = false;
    }
    stateObj[series._id] = true;
    this.setState({
      stateObj,
      visible: false,
    });
    this.props.onSelectSeries(series);
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  renderHeader(brand) {
    return (
      <View style={styles.topHeader}>
        <Text style={[style.font12, style.textDefault]}>已选择：{brand.name}</Text>
      </View>
    );
  }

  renderSeriesRow(series, sectionID, rowID) {
    const { stateObj } = this.state;

    return (
      <TouchableOpacity
        style={[
          styles.groupItem,
          stateObj[series._id] ? { justifyContent: 'space-between' } : null,
        ]}
        key={series._id}
        onPress={this.handleSelectSeries.bind(this, series)}
      >
        <Text>{series.name}</Text>
        {
          stateObj[series._id]
            ? <Image source={images.icon.selectTick} />
            : null
        }
      </TouchableOpacity>
    );
  }

  render() {
    const { isFetching, selectBrand, series } = this.props;
    const { visible } = this.state;

    const configTitle = {
      title: '选择车系',
      tintColor: colors.dark,
    };

    if (!series) {
      return null;
    }

    const leftButton = (
      <TouchableOpacity
        style={style.btnBack}
        onPress={this.hideModal}
      >
        <Image source={images.icon.topIconBack} />
      </TouchableOpacity>
    );

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={visible}
        onRequestClose={this.hideModal}
      >
        <BaseView
          title="选择车系"
          containerStyle={[style.view, { backgroundColor: 'transparent' }]}
          leftButton={leftButton}
        >

          <View style={[styles.modal, { backgroundColor: 'transparent' }]}>
            <View style={{ flexDirection: 'row', marginHorizontal: 0, flex: 1 }}>
              <TouchableOpacity style={styles.leftBar} onPress={this.hideModal} />

              <ListView
                style={styles.rightContent}
                dataSource={ds.cloneWithRows(series)}
                renderRow={this.renderSeriesRow.bind(this)}
                renderHeader={this.renderHeader.bind(this, selectBrand)}
                enableEmptySections
                initialListSize={10}
                pageSize={1}
              />

            </View>
          </View>

          <Loading isLoading={isFetching} />

        </BaseView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(127, 127, 127, .7)',
  },
  topHeader: {
    height: 20,
    backgroundColor: colors.viewBG,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  groupTitle: {
    height: 20,
    backgroundColor: colors.viewBG,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItem: {
    height: 55,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },

  leftOpenList: {
    flexDirection: 'row',
  },

  leftBar: {
    width: 75,
    backgroundColor: 'rgba(127, 127, 127, .5)',
  },
  rightContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
