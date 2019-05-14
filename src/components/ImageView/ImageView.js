import React, { PropTypes } from 'react';
import { Image, View } from 'react-native';
import ListLoading from '../ListLoading';
import styles from './styles';

export default class ImageView extends React.Component {
  static propTypes = {
    url: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    imageMode: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      isview: false,
    };
  }

  setNativeProps(nativeProps) {
    this.qImage.setNativeProps(nativeProps);
  }

  render() {
    let { url, style, imageMode } = this.props;
    let imageStyle;
    if (imageMode == 1) {
      imageStyle = {
        resizeMode: Image.resizeMode.cover,
      };
    } else if (imageMode == 2) {
      imageStyle = {
        resizeMode: Image.resizeMode.contain,
      };
    } else if (imageMode == 3) {
      imageStyle = {
        resizeMode: Image.resizeMode.stretch,
      };
    } else if (imageMode == 4) {
      imageStyle = {
        resizeMode: Image.resizeMode.repeat,
      };
    } else if (imageMode == 5) {
      imageStyle = {
        resizeMode: Image.resizeMode.center,
      };
    } else {
      imageStyle = null;
    }

    return (
      <View>
        <View style={[style ? style : null, styles.viewStyle]}>
          {
            this.state.isview ? null
              : <ListLoading hasMore />
          }
        </View>
        <Image
          ref={ref => this.qImage = ref}
          style={[style || null, imageStyle]} source={url}
          {...this.props.imageProps}
          onLoad={() => this.setState({ isview: true })}
        />
      </View>
    );
  }
}
