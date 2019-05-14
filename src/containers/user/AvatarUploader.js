import React, { PropTypes } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import SafeComponent from '../../components/SafeComponent';

import { imageUploader } from '../../utils/qiniuUploader';
import server from '../../utils/server';
import api from '../../config/api';

export default class AvatarUploader extends SafeComponent {
  static propTypes = {
    sourcePlaceholder: Image.propTypes.source,
    isPrivate: PropTypes.bool,
    imageName: PropTypes.string,
    imageUri: PropTypes.string,
    uploadFinish: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: Image.propTypes.style,
    imagePickerOption: PropTypes.object,
  };

  static defaultProps = {
    isPrivate: false,
    disabled: false,
    imagePickerOption: AConfig.imageCropPickerOption.avatar,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileName: null,
      imageUri: null,
      fileSize: null,
      width: null,
      height: null,
    };

    [
      'handlePress',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const pImageName = this.props.imageName;
    const pImageUri = this.props.imageUri;
    const sImageUri = this.state.imageUri;

    const apiKey = this.props.isPrivate ? 'getPrivatePicUrl' : 'getPublicPicUrl';

    if (pImageName && !pImageUri && (!sImageUri || sImageUri.indexOf('/') !== 0)) {
      server.get(api.qiniu[apiKey](pImageName), (data) => {
        this.safeSetState({ imageUri: data.res && data.res.url || '' });
      }, (error) => {
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const apiKey = nextProps.isPrivate ? 'getPrivatePicUrl' : 'getQaPublicUrl';
    if (this.props.imageName !== nextProps.imageName && !nextProps.imageUri) {
      server.get(api.qiniu[apiKey](nextProps.imageName), (data) => {
        this.safeSetState({ imageUri: data.res && data.res.url || '' });
      }, (error) => {
      });
    }
  }

  handlePress() {
    const {
      imagePickerOption,
      isPrivate,
      uploadFinish,
    } = this.props;
    AConfig.imageCropPicker(imagePickerOption, (imageInfo) => {
      this.safeSetState(imageInfo);
      imageUploader(imageInfo, isPrivate, uploadFinish);
    }, (error) => {
      let msg = AConfig.imageCropPickerError[error.code];
      // Alert.alert('失败', msg);
      uploadFinish(null, null, msg);
    });
  }

  renderPlaceholder() {
    const {
      sourcePlaceholder,
      style,
      disabled,
    } = this.props;

    return (
      <TouchableOpacity onPress={this.handlePress} disabled={disabled}>
        <Image
          style={[styles.imageIcon, style]}
          source={sourcePlaceholder}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );

  }

  renderImage(imageUri) {
    const {
      style,
      disabled,
    } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress} disabled={disabled}>
        <Image style={[styles.imageIcon, style]} source={{ uri: imageUri }} resizeMode="contain" />
      </TouchableOpacity>
    );

  }

  render() {
    if (this.props.imageUri) {
      return this.renderImage(this.props.imageUri);
    } else {
      return this.state.imageUri ? this.renderImage(this.state.imageUri) : this.renderPlaceholder();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 120,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageIcon: {
    width: 50,
    height: 50,
  },

  image: {
    flex: 1,
  },
});
