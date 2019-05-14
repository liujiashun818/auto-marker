import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ActionConst, Modal, Router, Scene } from 'react-native-router-flux';
// 首页
import Main from './containers/Main';
// 订单
import OrderIndex from './containers/order/Index';
import OrderDetail from './containers/order/Detail';
// 问答
import QAIndex from './containers/qa/Index';
import QaDetail from './containers/qa/Detail';
// 我的
import Profile from './containers/user/Profile';

import CustomerIndex from './containers/customer/Index';
import CustomerAdd from './containers/customer/Add';
import CustomerDetail from './containers/customer/Detail';

// 公共页面
import Login from './containers/auth/Login';
import Settings from './containers/user/Settings';
import About from './containers/user/About';
import ProfileEdit from './containers/user/ProfileEdit';
import AliPayNumberEdit from './containers/user/AliPayNumberEdit';
import Agreement from './containers/document/Agreement';

import MyAccount from './containers/user/MyAccount';

import Browser from './containers/Browser';

import ArtificerTactic from './containers/document/ArtificerTactic';
import Chargelnstructions from './containers/document/Chargelnstructions';
import LocationSelector from './containers/user/LocationSelector';
import AutoBrandSelector from './containers/user/AutoBrandSelector';
import AutoSelectBrand from './containers/auto/SelectBrand';

import ArtificerInfoBasicEdit from './containers/user/ArtificerInfoBasicEdit';
import ArtificerInfoAuditEdit from './containers/user/ArtificerInfoAuditEdit';
import ArtificerInfoAuditResult from './containers/user/ArtificerInfoAuditResult';
import ArtificerAuditInfo from './containers/user/ArtificerAuditInfo';

import CalculatePlan from './containers/plan/CalculatePlan';
import SelectBugCar from './containers/plan/SelectBugCar';
import CarTypeList from './containers/plan/CarTypeList';
import SiftPrice from './containers/plan/SiftPrice';
import CarTypePlan from './containers/plan/CarTypePlan';
import FinancePlan from './containers/plan/FinancePlan';

import images from './images';

/**
 * ### containers
 *
 * All the top level containers
 *
 */

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  tabTitle: {
    fontSize: 11,
    color: '#303234',
  },
});

// TabIcon
const TabIcon = props => (
  <View style={styles.tabItem}>
    <Image source={props.selected ? props.selectedIcon : props.icon} />
    <Text style={styles.tabTitle}>{props.title}</Text>
  </View>
);
const tabIcons1 = {
  icon: images.icon.tabIcon1Normal,
  selectedIcon: images.icon.tabIcon1Active,
};
const tabIcons2 = {
  icon: images.icon.tabIcon2Normal,
  selectedIcon: images.icon.tabIcon2Active,
};
const tabIcons3 = {
  icon: images.icon.tabIcon4Normal,
  selectedIcon: images.icon.tabIcon4Active,
};
const tabIcons4 = {
  icon: images.icon.tabIcon3Normal,
  selectedIcon: images.icon.tabIcon3Active,
};

const routes = props => (
  <Router sceneStyle={{ backgroundColor: 'white' }} onExitApp={props.handleExit}>
    <Scene key="modal" component={Modal}>
      <Scene key="root" hideNavBar>
        <Scene
          key="TabBar"
          type={ActionConst.RESET}
          initial
          tabs
          hideNavBar
          tabBarStyle={styles.tabBar}
          default="order"
        >
          <Scene
            key="main"
            title="首页"
            component={Main}
            hideNavBar
            icon={selfProps => (<TabIcon {...selfProps} {...tabIcons1} />)}
          />

          <Scene
            key="order"
            title="订单"
            component={OrderIndex}
            hideNavBar
            icon={selfProps => (<TabIcon {...selfProps} {...tabIcons2} />)}
          />
          <Scene
            key="qa"
            title="问答"
            component={QAIndex}
            hideNavBar
            icon={selfProps => (<TabIcon {...selfProps} {...tabIcons3} />)}
          />
          <Scene
            key="profile"
            title="我的"
            component={Profile}
            hideNavBar
            icon={selfProps => (<TabIcon {...selfProps} {...tabIcons4} />)}
          />
        </Scene>

        <Scene key="Login" description="登陆" component={Login} />
        <Scene key="About" description="关于我们" component={About} />

        <Scene key="OrderDetail" description="订单详情" component={OrderDetail} />
        <Scene key="QaDetail" description="问答详情" component={QaDetail} />

        <Scene key="CustomerIndex" description="我的客户" component={CustomerIndex} />
        <Scene key="CustomerAdd" description="添加客户" component={CustomerAdd} />
        <Scene key="CustomerDetail" description="编辑客户" component={CustomerDetail} />

        <Scene key="ProfileEdit" description="用户信息编辑" component={ProfileEdit} />
        <Scene key="AliPayNumberEdit" description="用户信息支付宝账号编辑" component={AliPayNumberEdit} />
        <Scene key="Agreement" description="用户条款" component={Agreement} />

        <Scene key="Browser" description="WebView" component={Browser} />
        <Scene key="MyAccount" description="技师账户" component={MyAccount} />
        <Scene key="Settings" description="设置" component={Settings} />
        <Scene key="ArtificerTactic" description="技师攻略" component={ArtificerTactic} />
        <Scene key="Chargelnstructions" description="充值说明" component={Chargelnstructions} />

        <Scene key="LocationSelector" description="位置选择器" component={LocationSelector} />
        <Scene key="AutoBrandSelector" description="品牌多选器" component={AutoBrandSelector} />
        <Scene key="AutoSelectBrand" description="品牌选择器" component={AutoSelectBrand} />

        <Scene key="ArtificerInfoBasicEdit" description="技师录入基本信息"
               component={ArtificerInfoBasicEdit} />
        <Scene key="ArtificerInfoAuditEdit" description="技师录入认证信息"
               component={ArtificerInfoAuditEdit} />
        <Scene key="ArtificerInfoAuditResult" description="技师认证结果"
               component={ArtificerInfoAuditResult} />
        <Scene key="ArtificerAuditInfo" description="技师认证信息" component={ArtificerAuditInfo} />
        <Scene key="CalculatePlan" description="计算方案" component={CalculatePlan} />
        <Scene key="SelectBugCar" description="选择车系" component={SelectBugCar} />
        <Scene key="CarTypeList" description="车型方案列表" component={CarTypeList} />
        <Scene key="SiftPrice" description="车型方案列表选择价格" component={SiftPrice} />
        <Scene key="CarTypePlan" description="车型方案详情" component={CarTypePlan} />
        <Scene key="FinancePlan" description="金融方案详情" component={FinancePlan} />
      </Scene>
    </Scene>
  </Router>
);

export default routes;
