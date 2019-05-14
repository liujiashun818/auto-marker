import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import images from '../../images/index';

import style from '../../styles/index';

/**
 * 类描述
 */
export default class ConditionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentTab: 'time',
    };
  }

  onConditionItemClick(field) {
    if (!this.state.isVisible) {
      this.setState({ isVisible: true });
    }
    this.setState({ currentTab: field });
  }

  onMaskClick() {
    this.setState({ isVisible: false });
  }

  // todo handle mask content's click event
  onMaskContentClick(e) {
    console.log('click mask content', e);
  }

  render() {
    const { isVisible, currentTab } = this.state;

    console.log('currentTab', currentTab);

    return (
      <View style={{ position: 'relative' }}>
        <View style={style.topConditionBar}>
          <TouchableOpacity
            style={style.topBannerItem}
            onPress={() => this.onConditionItemClick('time')}
          >
            <Text style={[style.textDefault, style.mr5]}>创建时间</Text>
            <Image source={images.icon.arrowDown} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.topBannerItem}
            onPress={() => this.onConditionItemClick('type')}
          >
            <Text style={[style.textDefault, style.mr5]}>方案类型</Text>
            <Image source={images.icon.arrowDown} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.topBannerItem}
            onPress={() => this.onConditionItemClick('status')}
          >
            <Text style={[style.textDefault, style.mr5]}>状态</Text>
            <Image source={images.icon.arrowDown} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[style.mask, isVisible ? null : style.hide]}
          onPress={() => this.onMaskClick()}
        >
          <View style={style.maskContent}>
            <View style={[style.maskContentList, currentTab === 'time' ? null : style.hide]}>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text style={style.maskContentListItemTextActive}>全部</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text>近7天</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text>近30天</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text>近90天</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
            </View>

            <View style={[style.maskContentList, currentTab === 'type' ? null : style.hide]}>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text style={style.maskContentListItemTextActive}>全部</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text>车型方案</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
              <TouchableOpacity style={style.maskContentListItem}>
                <Text>金融方案</Text>
                <Image source={images.icon.arrowRight} />
              </TouchableOpacity>
            </View>

            <View style={[style.maskContentList, currentTab === 'status' ? null : style.hide]}>
              <View style={style.maskContentModule} onPress={this.onMaskContentClick}>
                <TouchableOpacity
                  style={[style.btnSelect, style.mr10, style.mb10, style.btnSelectActive]}
                >
                  <Text style={style.btnSelectTextActive}>全部</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>意向</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>待进件</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>进件中</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>驳回</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>待交定金</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>签单中</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>贷后</Text>
                </TouchableOpacity>
              </View>

              <View style={style.maskContentModule} onPress={this.onMaskContentClick}>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>交易成功</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnSelect, style.mr10, style.mb10]}>
                  <Text style={style.btnSelectText}>交易停止</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
