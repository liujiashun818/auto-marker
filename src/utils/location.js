import Geolocation from 'Geolocation';
import server from './server';
import api from '../config/api';

//获取定位位置，以及解析的省市县信息
/**
 *
 * @param geoOption Object
 * @param success Function
 * @param fail Function
 */
function getLocation(geoOption = null, success = null, fail = null) {
  geoOption = geoOption || {
      timeout: 1000,
      maximumAge: 0,
      enableHighAccuracy: true,
      distanceFilter: 1000,
    };

  Geolocation.getCurrentPosition((location) => {
    if (location.coords) {
      let {longitude, latitude}  = location.coords;

      //请求服务器解析位置信息
      server.get(api.location.getLocationNameInfo(longitude, latitude), (data) => {
        let province = data.res.province_info.name;     //省
        let city = data.res.city_info.name;             //市
        let country = data.res.country_info.name;       //县区

        success && success({
          longitude,
          latitude,
          province,
          city,
          country,
        });
      }, (error) => {
        fail && fail({code: '3', msg: '位置解析失败', rawError: error});
      });

    } else {
      fail && fail({code: '2', msg: '定位数据错误', rawError: location});
    }
  }, (error) => {
    fail && fail({code: '1', msg: '定位失败', rawError: error});
  }, geoOption);
}

const Location = {
  getLocation,
};

export default Location;
