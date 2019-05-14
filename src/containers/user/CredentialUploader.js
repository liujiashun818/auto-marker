import React, { PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

import SafeComponent from '../../components/SafeComponent';
import Loading from '../../components/ListLoading';
import ImageView from '../../components/ImageView/index';

import { qiniuUploader } from '../../utils/qiniuUploader';
import server from '../../utils/server';
import api from '../../config/api';

export default class CredentialsUploader extends SafeComponent {
  static propTypes = {
    tipText: PropTypes.string,
    sourcePlaceholder: Image.propTypes.source,
    isPrivate: PropTypes.bool,
    imageName: PropTypes.string,
    imageUri: PropTypes.string,
    uploadFinish: PropTypes.func.isRequired,
    disabled: PropTypes.bool,

    style: ViewPropTypes.style,
    tipStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    placeholderStyle: Image.propTypes.style,

    imagePickerOption: PropTypes.object,
  };

  static defaultProps = {
    tipText: '点击上传',
    isPrivate: false,
    uploadFinish: () => {},
    disabled: false,

    imagePickerOption: AConfig.imagePickerOption.default,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileName: null,
      imageUri: null,
      fileSize: null,
      width: null,
      height: null,
      uploadImg: false,
    };

    [
      'handlePress',
      'uploadImage',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const pImageName = this.props.imageName;
    const pImageUri = this.props.imageUri;
    const sImageUri = this.state.imageUri;

    const apiKey = this.props.isPrivate ? 'getPrivatePicUrl' : 'getPublicPicUrl';

    if (pImageName && !pImageUri && (!sImageUri || sImageUri.indexOf('/') !== 0)) {
      this.safeSetState({ imageUri: null });
      server.get(api.qiniu[apiKey](pImageName), (data) => {
        this.safeSetState({ imageUri: data.res && data.res.url || '' });
        this.setState({ uploadImg: true });
      }, (error) => {
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const apiKey = nextProps.isPrivate ? 'getPrivatePicUrl' : 'getQaPublicUrl';

    if (this.props.imageName !== nextProps.imageName && !nextProps.imageUri) {
      this.safeSetState({ imageUri: null });
      server.get(api.qiniu[apiKey](nextProps.imageName), (data) => {
        this.safeSetState({ imageUri: data.res && data.res.url || '' });
        this.setState({ uploadImg: true });
      }, (error) => {
      });
    }
  }

  handlePress() {
    const { uploadFinish } = this.props;
    AConfig.imagePicker(this.props.imagePickerOption, (imageInfo) => {
      this.safeSetState(imageInfo);
      this.uploadImage(imageInfo);
    }, (error) => {
      const msg = AConfig.imagePickerError[error] || error;
      // Alert.alert('失败', msg);
      uploadFinish(null, null, msg);
    });
  }

  uploadImage(imageInfo) {
    const { isPrivate, uploadFinish } = this.props;
    this.setState({ uploadImg: false });
    const ext = `w${imageInfo.width || 0}h${imageInfo.height || 0}`;
    const apiKey = isPrivate ? 'getPrivatePicUploadToken' : 'getPublicPicUploadToken';
    // 请求上传口令
    server.get(api.qiniu[apiKey]('pic', ext), (data) => {
      // 请求上传口令成功
      const fileKey = data.res.file_name;
      const token = data.res.token;

      // 上传图片
      const { fileName, imageUri, fileSize } = imageInfo;
      const formInput = {
        key: fileKey,
        'x:filename': fileName,
        'x:size': fileSize,
      };

      qiniuUploader(imageUri, token, formInput)
        .then(() => {
          uploadFinish(imageInfo, fileKey, null);
          this.setState({ uploadImg: true });
        })
        .catch((error) => {
          uploadFinish(imageInfo, fileKey, `上传失败：${error}`);
        });
    }, (error) => {
      uploadFinish(imageInfo, null, `请求上传口令失败：${error}`);
    });
  }

  renderPlaceholder() {
    const {
      tipText,
      sourcePlaceholder,
      style,
      tipStyle,
      placeholderStyle,
      disabled,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        disabled={disabled}
        style={[styles.containerPlaceholder, style]}
      >
        <Image
          style={[placeholderStyle]}
          source={sourcePlaceholder}
          resizeMode="contain"
        />

        {tipText ? (<Text style={[styles.uploadTip, tipStyle]}>{tipText}</Text>) : (null)}
      </TouchableOpacity>
    );
  }

  renderImage(imageUri) {
    const {
      style,
      imageStyle,
      disabled,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        disabled={disabled}
        style={[styles.containerImage, style]}
      >
        {
          !this.state.uploadImg ? <Loading hasMore /> :
            <ImageView
              style={[imageStyle]}
              url={{ uri: imageUri }}
              imageMode={1}
            />
        }
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
  containerPlaceholder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerImage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
  },

  uploadTip: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 6,
  },

});
