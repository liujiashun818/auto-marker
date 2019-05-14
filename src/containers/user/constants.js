import images from '../../images';

export const ArtificerInfoStepItems = [{
  title: '录入基本信息',
  image: images.step.step1,
  passImage: images.step.stepOK,
}, {
  title: '填写认证信息',
  image: images.step.step2Gray,
  activeImage: images.step.step2,
  passImage: images.step.stepOK,
}, {
  title: '提交审核',
  image: images.step.step3Gray,
  activeImage: images.step.step3,
  passImage: images.step.stepOK,
}];

export default {
  ArtificerInfoStepItems,
};
