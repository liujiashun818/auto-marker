import React, { PropTypes } from 'react';
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import SafeComponent from '../SafeComponent';

import styles from './styles';

const ActionItemType = {
  image: Image.propTypes.source,
  imageStyle: Image.propTypes.style,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.string,
  handler: PropTypes.func,
};

export default class ModalActionSheet extends SafeComponent {
  constructor(props) {
    super(props);

    [
      'handleHideModal',
      'handlePressAction',
    ].map((method) => this[method] = this[method].bind(this));
  }

  handleHideModal() {
    const { cancelItem, onCancel } = this.props;

    if (cancelItem && cancelItem.handler) {
      cancelItem.handler();
    } else if (onCancel) {
      onCancel();
    }
  }

  handlePressAction(handler) {
    handler && handler();
    this.props.autoClose && this.handleHideModal();
  }

  render() {
    const {
      visible,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      actionItems,
      cancelItem,
      onCancel,
    } = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={visible}
        onRequestClose={this.handleHideModal}
      >
        <TouchableWithoutFeedback onPress={this.props.strict ? null : this.handleHideModal}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.actionSheetContainer}>
                <View style={styles.titleView}>
                  {
                    title ? (
                      <Text style={titleStyle || styles.titleText}>{title}</Text>
                    ) : (null)
                  }

                  {
                    subTitle ? (
                      <Text style={subTitleStyle || styles.subTitleText}>{subTitle}</Text>
                    ) : (null)
                  }
                </View>

                {
                  actionItems && actionItems.map((actionConf, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.actionView}
                      onPress={this.handlePressAction.bind(this, actionConf.handler)}
                    >
                      {
                        actionConf.image ? (
                          <Image style={actionConf.imageStyle || styles.actionImage}
                                 source={actionConf.image} />
                        ) : (null)
                      }
                      <Text style={actionConf.titleStyle || styles.actionText}>{actionConf.title ||
                      ''}</Text>
                    </TouchableOpacity>
                  ))
                }

                {
                  cancelItem || onCancel ? (
                    <TouchableOpacity
                      style={styles.actionViewCancel}
                      onPress={this.handleHideModal}
                    >
                      <Text style={cancelItem && cancelItem.style || styles.actionText}>
                        {cancelItem && cancelItem.title || '取消'}
                      </Text>
                    </TouchableOpacity>
                  ) : (null)
                }

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

ModalActionSheet.propTypes = {
  visible: PropTypes.bool,
  strict: PropTypes.bool,
  autoClose: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  subTitle: PropTypes.string,
  subTitleStyle: Text.propTypes.style,
  actionItems: PropTypes.arrayOf(PropTypes.shape(ActionItemType)),
  cancelItem: PropTypes.shape(ActionItemType),
  onCancel: PropTypes.func,
};

ModalActionSheet.defaultProps = {
  visible: false,
  strict: false,
  autoClose: true,
  title: '请选择',
  actionItems: [],
  cancelItem: {
    title: '取消',
    style: null,
    handler: null,
  },
  onCancel: null,
};
