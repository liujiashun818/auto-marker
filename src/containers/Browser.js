import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationBar, { TitleShape, StatusBarShape, ButtonShape } from 'react-native-navbar';
import debounce from 'lodash.debounce';

import colors from '../styles/colors';

// WebViewX ButtonShape. "title"建议使用string或者Text元素.
const ButtonShapeX = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  style: PropTypes.any,
};

// WebViewX toolBarShape
// const toolBarShape = {};

class WebViewX extends Component {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };

    [
      'onBack',
      'onNavigationStateChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  onBack() {
    this.refs['WEB_VIEW_REF'].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  render() {
    const { canGoBack } = this.state;
    const {
      uri,
      navTitle,
      navTintColor,
      statusBar,
      alwaysShowBackButton,
      backButton,
      closeButton,
      rightButton,
    } = this.props;

    const _navTitle = typeof(navTitle) === 'string' ? {
      title: navTitle,
      tintColor: colors.navBarTextColor,
    } : navTitle;

    const leftButtons = (
      <View style={webViewXStyles.leftButtons}>
        {
          canGoBack || alwaysShowBackButton
            ? (
            <Text style={backButton.style}
                  onPress={debounce(this.onBack, 250, { leading: true, trailing: false })}>
              {backButton.title}
            </Text>
          )
            : (null)}
        <Text style={closeButton.style} onPress={debounce(Actions.pop, 250, {
          leading: true,
          trailing: false,
        })}>{closeButton.title}</Text>
      </View>
    );

    return (
      <View style={webViewXStyles.webViewContainer}>
        <NavigationBar
          title={_navTitle}
          tintColor={navTintColor}
          statusBar={statusBar}
          leftButton={leftButtons}
          rightButton={rightButton}
        />

        <WebView
          ref="WEB_VIEW_REF"
          source={{ uri }}
          startInLoadingState={true}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>

    );
  }

  static propTypes = {
    uri: PropTypes.string.isRequired,             // uri
    navTitle: PropTypes.oneOfType([               // WebView标题
      PropTypes.string,
      PropTypes.shape(TitleShape),
      PropTypes.element,
    ]),
    navTintColor: PropTypes.string,               // navBar tintColor
    statusBar: PropTypes.shape(StatusBarShape),   // statusBar
    alwaysShowBackButton: PropTypes.bool,         // 有时候拿不到onNavigationStateChange事件
    backButton: PropTypes.shape(ButtonShapeX),    // 左侧后退按钮
    closeButton: PropTypes.shape(ButtonShapeX),   // 左侧关闭按钮
    rightButton: PropTypes.oneOfType([            // 右侧按钮
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),

    // toolBar: PropTypes.shape(toolBarShape);
  };

  static defaultProps = {
    navTintColor: colors.navBarBG,
    navTitle: {
      title: '网页',
    },
    statusBar: AConfig.statusBar,
    alwaysShowBackButton: false,
    backButton: {
      title: '后退',
      style: { fontSize: 17, fontWeight: '400', color: colors.navBarTextColor },
    },
    closeButton: {
      title: '关闭',
      style: { fontSize: 17, fontWeight: '400', color: colors.navBarTextColor },
    },
  };

}

const webViewXStyles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    // marginTop: 64,      //default NavBar height
    // marginBottom: 55,   //default TabBar height
  },

  leftButtons: {
    width: 80,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftButton: {
    fontSize: 17,
    fontWeight: '400',
  },
});

export default WebViewX;

// ReadeMe
// 目前还不支持下部ToolBar
