// require react-native-in-app-utils

import { NativeModules } from 'react-native';
import storage from 'react-native-simple-store';

import api from '../config/api';
import server from './server';

import IAPProductsInfo from '../config/IAPProductsInfo';

const { InAppUtils } = NativeModules;

// 存储商品列表
let IAPProducts = null;

// 苹果支付 查询商品列表
export const IAPLoadProducts = (productIdArr, succ, fail) => {
  if (AData.OS === 'ios') {
    InAppUtils.loadProducts(productIdArr, (error, productArr) => {
      if (error) {
        if (typeof fail === 'function') fail(error);
      } else {
        if (typeof succ === 'function') {
          const productObj = {};
          for (const product of productArr) {
            productObj[product.identifier] = product;
          }
          IAPProducts = productObj;
          succ(productArr);
        }
      }
    });
  } else {
    if (typeof fail === 'function') fail(new Error('参数异常:IAPLoadProducts'));
  }
};

// 苹果支付 购买
export const IAPPurchaseProduct = (productId, customerId, succ, fail) => {
  if (AData.OS === 'ios') {
    InAppUtils.purchaseProduct(productId, (error, response) => {
      if (response && response.productIdentifier) {
        if (typeof succ === 'function') succ(response);
      } else {
        if (typeof fail === 'function') fail(error);
      }
    });
  } else {
    if (typeof fail === 'function') fail(new Error('参数异常:IAPPurchaseProduct'));
  }
};

// 苹果支付 存储购买结果
export const saveIAPTransactionResult = (IAPRecord) => {
  if (AData.OS === 'ios' && IAPRecord && Object.keys(IAPRecord).length >= 3) {
    storage.get('IAPRecords')
      .then((rawIAPRecords) => {
        // console.log('saveIAPTransactionResult success');
        const IAPRecords = rawIAPRecords ? Object.assign({}, rawIAPRecords) : {};
        IAPRecords[IAPRecord.record.transactionIdentifier] = IAPRecord;
        storage.save('IAPRecords', IAPRecords);
      });
  }
};

// 苹果支付 删除购买结果存储
export const deleteIAPTransactionResult = (IAPRecordId) => {
  if (AData.OS === 'ios' && IAPRecordId) {
    storage.get('IAPRecords')
      .then((IAPRecords) => {
        // console.log('deleteIAPTransactionResult success');
        if (IAPRecords) {
          delete IAPRecords[IAPRecordId];
          storage.save('IAPRecords', IAPRecords);
        }
      });
  }
};

// 苹果支付 发送支付结果到服务器
export const postIAPTransactionResult = (IAPRecord, succ, fail) => {
  if (AData.OS === 'ios' && IAPRecord && Object.keys(IAPRecord).length >= 3) {
    // 构造数据
    const postData = {
      data: IAPRecord.record && IAPRecord.record.transactionReceipt || '',
      amount: IAPRecord.product && IAPRecord.product.price || 0,
      customerId: IAPRecord.customerId || '',
    };

    // 回传购买结果，只处理成功结果
    server.post(api.IAP.verify(), postData, (data) => {
      if (typeof succ === 'function') succ();
    }, (error) => {
      if (typeof fail === 'function') fail(error);
    });
  } else {
    if (typeof fail === 'function') fail(new Error('参数异常:postIAPTransactionResult'));
  }
};

// 苹果支付 购买流程
export const IAPBuyProduct = (productId, customerId, succ, fail) => {
  if (AData.OS === 'ios' && productId && customerId) {
    // 定义购买行为函数
    const funPurchaseProduct = () => {
      // 购买
      IAPPurchaseProduct(productId, customerId, (record) => {
        const product = IAPProducts && IAPProducts[productId] || {};
        const IAPRecord = { product, record, customerId };

        // 购买成功后存储凭证
        saveIAPTransactionResult(IAPRecord);

        // 进行服务器验证
        postIAPTransactionResult(IAPRecord, () => {
          // 回传结果正常，删除购买结果存储
          deleteIAPTransactionResult(record.transactionIdentifier);
          if (typeof succ === 'function') succ();
        }, () => {
          if (typeof fail === 'function') fail(new Error('购买验证失败'));
        });
      }, () => {
        if (typeof fail === 'function') fail(new Error('购买商品失败'));
      });
    };

    // 判断当前是否请求了商品数据，若已有直接进行购买，若无则请求商品数据后购买
    if (IAPProducts && IAPProducts[productId]) {
      funPurchaseProduct();
    } else {
      IAPLoadProducts(Object.keys(IAPProductsInfo), () => {
        funPurchaseProduct();
      }, () => {
        if (typeof fail === 'function') fail(new Error('请求商品数据失败'));
      });
    }
  } else {
    if (typeof fail === 'function') fail(new Error('参数异常:IAPBuyProduct'));
  }
};

// 自动检测当前未进行服务器验证的购买记录
(() => {
  storage.get('IAPRecords')
    .then((IAPRecords) => {
      // 打印当前未验证的购买数据
      if (__DEV__) {
        console.log('IAPRecords: ', IAPRecords);
      }

      // 自动验证
      if (IAPRecords instanceof Object) {
        let time = 5000;
        Object.keys(IAPRecords).map((key) => {
          const IAPRecord = IAPRecords[key];
          setTimeout(() => {
            // 进行服务器验证
            postIAPTransactionResult(IAPRecord, () => {
              // 回传结果正常，删除购买结果存储
              deleteIAPTransactionResult(IAPRecord.record.transactionIdentifier);
            });
          }, time += 2500);
        });
      }
    });
})();

// 购买商品示例
// import Toast from 'react-native-root-toast';
// import { IAPBuyProduct } from '../../utils/iap';
//
// IAPBuyProduct('10010012', currentUser._id, () => {
//   console.log('购买成功');
// }, (error) => {
//   Toast.show(error.message || '购买失败', { position: -70 });
// });
