import React, { PropTypes } from 'react';
import { Animated, Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import images from '../../images/index';

import style from './style';

export default class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
      height: new Animated.Value(85),
      top: new Animated.Value(0),
    };

    this.onNotificationClick = this.onNotificationClick.bind(this);
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.height,
        { toValue: 0, duration: 1000, delay: 3000 },
      ),
      Animated.timing(
        this.state.opacity,
        { toValue: 0 },
      ),
      Animated.timing(
        this.state.top,
        { toValue: -85 },
      ),
    ]).start();

    setTimeout(() => {
      this.props.destroy();
    }, 5000);
  }

  onNotificationClick() {
    const { onClick } = this.props;
    if (onClick && typeof onClick === 'function') {
      this.props.onClick();
      this.props.destroy();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onNotificationClick}>
        <Animated.View
          style={[
            style.container,
            {
              height: this.state.height,
              opacity: this.state.opacity,
              top: this.state.top,
            },
          ]}
        >
          <View style={style.msgBody}>
            <Image source={images.logo.notification} style={style.logo} />
            <View style={{ flex: 1 }}>
              <Text style={style.title}>{this.props.title}</Text>
              <Text style={style.content} numberOfLines={1}>{this.props.msg}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={style.tinyBar} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

NotificationContainer.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

NotificationContainer.defaultProps = {
  title: '水稻技师',
  msg: '',
};
