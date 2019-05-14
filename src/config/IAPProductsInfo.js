// 苹果支付 商品ID
const IAPProductsInfo = {
  10010012: 12,
  10010018: 18,
  10010030: 30,
  10010050: 50,
};

const productArr = [];
Object.keys(IAPProductsInfo).map((key) => {
  productArr.push({
    productId: key,
    price: IAPProductsInfo[key],
  });
});
export const IAPProductsArray = productArr;

export default IAPProductsInfo;
