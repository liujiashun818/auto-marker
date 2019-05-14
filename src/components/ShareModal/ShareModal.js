import React, { Component } from 'react';
import {
  Image,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  CameraRoll,
} from 'react-native';

import * as WeChat from 'react-native-wechat';
import Permissions from 'react-native-permissions';

import message from '../Message/index';
import images from '../../images/index';

import styles from './style';
import SafeComponent from '../SafeComponent';

export default class ShareModal extends SafeComponent {
  constructor(props) {
    super(props);
    this.state = {
      weChatItem: [
        {
          title: '微信好友',
          handler: this.jumpWechat.bind(this, 1),
          image: images.icon.tabIcon1Active,
        },
        {
          title: '保存到本地',
          handler: this.jumpWechat.bind(this, 2),
          image: images.icon.tabIcon1Normal,
        },
      ],
      rewardModalVisible: false,
      thumbUrl: '',
    };
    this.showSelect = this.showSelect.bind(this);
  }

  componentDidMount() {
    WeChat.registerApp('wx41b3ef8c0331361a');
  }

  showSelect() {
    this.setState({
      rewardModalVisible: !this.state.rewardModalVisible,
    });
  }

  handlePressAction(handler) {
    handler();
    this.showSelect();
  }

  jumpWechat(type) {
    const { Imagedata } = this.props;
    // WeChat.isWXAppInstalled().then((isInstalled) => {
    //   if (isInstalled) {
    //     if (type === 1) {
    //       WeChat.shareToTimeline({
    //         type: 'news',
    //         title: data.title,
    //         description: data.description,
    //         thumbImage: url,
    //         webpageUrl: `${data.url}&user_id=${currentUserId}`,
    //       }).catch((error) => {
    //         message.show(error);
    //       });
    //     } else {
    //       WeChat.shareToSession({
    //         type: 'news',
    //         title: data.title,
    //         description: data.description,
    //         thumbImage: url,
    //         webpageUrl: `${data.url}&user_id=${currentUserId}`,
    //       }).catch((error) => {
    //         message.show(error);
    //       });
    //     }
    //   } else {
    //     message.show('请您先安装微信之后再试');
    //   }
    // });
    Permissions.requestPermission('photo').then((response) =>{
      CameraRoll.saveToCameraRoll(Imagedata,'photo').then(
        message.show('图片已保存到本地'),
      ).catch((error) =>{
        message.show(error)
      });
    });
  }

  render() {
    const { weChatItem } = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.rewardModalVisible}
        onRequestClose={this.showSelect.bind(this)}
      >
        <TouchableWithoutFeedback onPress={this.props.strict ? null : this.showSelect}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.actionSheetContainer}>
                  <View style={styles.titleView}>
                    <Text>已为您生成方案图片，发送图片转发给好友吧</Text>
                  </View>
                  <View style={styles.flexRow}>
                    {
                      weChatItem && weChatItem.map((actionConf, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.actionView}
                          onPress={this.handlePressAction.bind(this, actionConf.handler)}
                        >
                          <Image
                            style={styles.actionImage}
                            source={actionConf.image}
                          />
                          <Text style={styles.actionText}>
                            {actionConf.title}
                          </Text>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.actionViewCancel}
                  onPress={this.showSelect}
                >
                  <Text style={styles.newActionText}>
                    {'取消'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
