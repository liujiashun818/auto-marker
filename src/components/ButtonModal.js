import React, { Component, PropTypes } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

import Button from 'apsl-react-native-button';

import commonStyle from '../styles/index';

const ModalButtonShape = {
  title: PropTypes.string.isRequired,
  style: Text.propTypes.style,
  handler: PropTypes.func,
};

export default class ButtonModal extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,             //外显按钮
    buttonStyle: ViewPropTypes.style,              //外显按钮样式
    titleStyle: Text.propTypes.style,               //外显文字样式
    modalTitle: PropTypes.string,                   //Modal标题
    modalSubtitle: PropTypes.string,                //Modal副标题
    renderModalView: PropTypes.func.isRequired,     //渲染Modal视图
    modalButtons: PropTypes.arrayOf(PropTypes.shape(ModalButtonShape)),   //Modal按钮配置
    animationType: Modal.propTypes.animationType,   //Modal动画效果
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    [
      'toggleModalVisible',
      'handleButtonPress',
    ].map(method => this[method] = this[method].bind(this));
  }

  toggleModalVisible() {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  }

  handleButtonPress(handler) {
    this.toggleModalVisible();
    handler && handler();
  }

  render() {
    const {
      title,                //外显按钮
      buttonStyle,          //外显按钮样式
      titleStyle,           //外显按钮样式
      modalTitle,           //Modal标题
      modalSubtitle,        //Modal副标题
      renderModalView,      //渲染Modal视图
      modalButtons,         //Modal按钮配置
      animationType,        //Modal动画效果
    } = this.props;
    const { modalVisible } = this.state;

    return (
      <TouchableOpacity style={buttonStyle} onPress={this.toggleModalVisible}>
        <Text style={titleStyle}>{title}</Text>

        <Modal
          visible={modalVisible}
          animationType={animationType || 'fade'}
          transparent={true}
          onRequestClose={() => {
          }}>
          <TouchableWithoutFeedback onPress={this.toggleModalVisible}>
            <View style={[commonStyle.modal]}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={commonStyle.modalContent}>
                  {
                    modalTitle !== undefined ? (
                      <Text style={commonStyle.modalTitle}>{modalTitle}</Text>
                    ) : (null)
                  }

                  {
                    modalSubtitle !== undefined ? (
                      <Text style={[commonStyle.modalDesc]}>{modalSubtitle}</Text>
                    ) : (null)
                  }

                  {renderModalView()}

                  <View style={commonStyle.modalButtons}>
                    {
                      modalButtons && modalButtons.map((btnConf, index) => {
                        let btnMarginStyle = null;
                        if (index === 0) {
                          btnMarginStyle = commonStyle.mr5;
                        } else if (index === modalButtons.length - 1) {
                          btnMarginStyle = commonStyle.ml5;
                        } else {
                          btnMarginStyle = commonStyle.mh5;
                        }

                        return (
                          <Button
                            key={index}
                            onPress={this.handleButtonPress.bind(this, btnConf.handler)}
                            style={[styles.button, btnConf.style, btnMarginStyle]}
                            textStyle={[styles.buttonTitle]}
                          >
                            {btnConf.title}
                          </Button>
                        );
                      })
                    }
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#303234',
  },
});
