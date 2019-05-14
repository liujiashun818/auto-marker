import React from 'react';
import SafeComponent from './SafeComponent';

import ImageView from './ImageView/index';

import server from '../utils/server';
import api from '../config/api';
// import CachedImage from 'react-native-cached-image';

const ImageUrlTypes = {
  Message: 'getQaPublicUrl',
  Avatar: 'getPublicPicUrl',
};

// 通过imageName，向服务器请求其在七牛云的访问链接，然后更新占位图片
// imageType: Message(default), Avatar
export default class QiniuImage extends SafeComponent {
  constructor(props) {
    super(props);
    const { imageType, imageName, imageUrl, thumbType, imagePlaceholder, source, ...imageProps } = props;
    this.state = {
      imageType: imageType || 'Message',
      imageName: imageName || null,
      imageUrl: imageUrl || null,
      thumbType: thumbType || 0,
      imagePlaceholder: imagePlaceholder || null,
      source: source || null,
      imageProps: imageProps || null,
    };
  }

  componentDidMount() {
    const { imageType, imageName, imageUrl, thumbType } = this.state;
    if (imageName && (!imageUrl || imageUrl.indexOf('/') !== 0)) {
      server.get(api.qiniu[ImageUrlTypes[imageType]](imageName, thumbType), (data) => {
        this.safeSetState({ imageUrl: data.res && data.res.url || '' });
      }, () => {});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.imageName !== nextProps.imageName
      || this.props.imageUrl !== nextProps.imageUrl) {
      const imageName = nextProps.imageName;
      const imageUrl = nextProps.imageUrl;
      const { imageType, thumbType } = this.state;
      if (imageName && (!imageUrl || imageUrl.indexOf('/') !== 0)) {
        server.get(api.qiniu[ImageUrlTypes[imageType]](imageName, thumbType), (data) => {
          this.safeSetState({ imageUrl: data.res && data.res.url || '' });
        }, () => {});
      }
    }
  }

  setNativeProps(nativeProps) {
    this.qImage.setNativeProps(nativeProps);
  }

  render() {
    const {
      imageName,
      imageUrl,
      imagePlaceholder,
      source,
      imageProps,
    } = this.state;
    let imgSource = source;

    if (!imgSource) {
      // 如果没有imgSource
      if (imageUrl && imageUrl.indexOf('/') === 0) {
        // imageUrl如果是文件路径，说明是本地文件
        imgSource = { uri: imageUrl, cache: 'force-cache' };
      } else if (!imageName) {
        // 没有imageName，只能依照imageUrl或者imagePlaceholder显示图片
        imgSource = imageUrl ? { uri: imageUrl, cache: 'force-cache' } : imagePlaceholder;
      } else {
        // 有imageName
        if (imageUrl && imageUrl.indexOf('easemob') === -1) {
          // 不是环信
          imgSource = { uri: imageUrl, cache: 'force-cache' };
        } else {
          // 是环信
          imgSource = imagePlaceholder;
        }
      }
    }

    return (
      <ImageView
        style={imageProps.style}
        ref={ref => this.qImage = ref}
        imageProps={imageProps}
        url={imgSource}
      />
    );

    // return (
    //   <Image {...imageProps} source={imgSource} ref={ref => this.qImage = ref} />
    // );
  }
}
