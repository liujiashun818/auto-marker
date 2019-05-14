import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import Carousel from 'react-native-looped-carousel';
import { Actions } from 'react-native-router-flux';

import BaseView from '../components/BaseView';
import ImageView from '../components/ImageView/index';
import ListLoading from '../components/ListLoading';

import styles from '../styles/index';
import colors from '../styles/colors';
import images from '../images/index';
import { ScreenWidth } from '../styles/sizes';

import { getMainBanner } from '../redux/banner/actions';
import { getMainPlan } from '../redux/plan/actions';

/**
 *  首页
 */
const style = StyleSheet.create({
  carouselContainer: {
    height: 360 * ScreenWidth / 1000,
    width: ScreenWidth,
    backgroundColor: '#fff',
  },
  bulletStyle: {
    width: 7,
    height: 7,
    margin: 4,
    backgroundColor: 'rgba(0,0,0, .8)',
    borderColor: 'rgba(0,0,0, .8)',
  },
  bulletChosen: {
    width: 7,
    height: 7,
    margin: 4,
    backgroundColor: colors.yellow,
  },
  carPlanList: {
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  planList: {
    width: (ScreenWidth) / 2 - 1,
    flexDirection: 'row',
    padding: 15,
    borderRightWidth: 1,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
    // marginBottom: 10,
  },
  listCar: {
    backgroundColor: '#fff',
    width: ScreenWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  borderLine: {
    width: 1,
    height: 100,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  createPlanBtn: {
    position: 'absolute',
    bottom: 65,
    right: 15,
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
  btnNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginRight: 10,
  },
  totalNum: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: ScreenWidth,
  },
  advertImg: {
    width: ScreenWidth,
    height: (360 * ScreenWidth) / 1000,
  },
  carType: {
    fontSize: 16,
    fontWeight: '600',
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.getMainBanner();
    this.props.actions.getMainPlan();
  }

  creatPlan() {
    Actions.CalculatePlan();
  }

  toCarTypeList() {
    Actions.CarTypeList();
  }

  toDetail() {
    Actions.CarTypePlan();
  }

  openUrl(item) {
    Actions.Browser({ uri: item.url });
  }

  renderHotPlan(dataSource) {
    var result = [];
    dataSource.forEach((item) => {
      result.push(
          <TouchableOpacity
            activeOpacity={1}
            key={item._id}
            onPress={this.toDetail.bind(this)}
            style={style.planList}
          >
            <View>
              <Text style={[styles.mb5, styles.textOrange]}>首付{item.rent_down_payment}元</Text>
              <Text style={[styles.mb15, styles.textGray]}>月租{item.monthly_rent}元</Text>
              <Image source={{ uri: item.auto_type_pic }} style={{width: 140, height: 70 }}/>
              <Text style={[styles.mt15, style.carType]}>{item.auto_type_name}</Text>
            </View>
          </TouchableOpacity>,
      );
    })
    return result;
  }
  render() {
    const { mainBannerList, mainHotList } = this.props;
    return (
      <BaseView
        title="首页"
        leftButton={null}
        rightButton={
          <View style={style.btnNavRight}>
            <Text style={styles.fdf}>添加客户</Text>
          </View>
        }
      >
        <ScrollView
          style={[styles.container, { marginBottom: 46 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh}
              tintColor="#999"
              colors={['#999', '#999', '#999']}
              progressBackgroundColor="#fff"
            />
          }
        >
          <View style={[style.carouselContainer]}>
            <Carousel
              style={{ width: ScreenWidth, height: (360 * ScreenWidth) / 1000 }}
              contentContainerStyle={[style.carouselContainer]}
              bulletsContainerStyle={{ alignSelf: 'flex-end' }}
              bulletStyle={style.bulletStyle}
              chosenBulletStyle={style.bulletChosen}
              delay={2000}
              autoplay
              bullets
            >
              {mainBannerList.length === 0 ? (
                <TouchableOpacity activeOpacity={1} style={[style.carouselItem]}>
                  <ListLoading hasMore />
                </TouchableOpacity>
              ) : mainBannerList.map(advertItem =>
                (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[style.carouselItem]} key={advertItem._id}
                    onPress={() => this.openUrl(advertItem)}
                  >
                    <ImageView
                      url={{ uri: advertItem.banner_pic_url }}
                      style={style.advertImg}
                      imageMode={1}
                    />
                  </TouchableOpacity>
                ),
              )}
            </Carousel>
          </View>
          <View style={style.carPlanList}>
            <Text>车型方案</Text>
            <TouchableOpacity activeOpacity={1} style={style.totalNum} onPress={this.toCarTypeList}>
              <Text style={styles.mr5}>查看全部12个</Text>
              <Image source={images.icon.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={style.listCar}>
            {this.renderHotPlan(mainHotList)}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={1}
          style={style.createPlanBtn}
          onPress={this.creatPlan}
        >
          {/*<Image*/}
          {/*style={qStyles.createQuestionImage}*/}
          {/*source={images.icon.btnAsk}*/}
          {/*/>*/}
          <Text>计算方案</Text>
        </TouchableOpacity>
      </BaseView>
    );
  }
}

function mapStateToProps(state) {
  const { mainBannerList } = state.banner;
  const { mainHotList } = state.plan;
  return { mainBannerList, mainHotList };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getMainBanner, getMainPlan }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
