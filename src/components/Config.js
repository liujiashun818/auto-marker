import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import colors from '../styles/colors';

export const statusBar = {
  style: 'default',
};

export const backBtn = {
  title: '返回',
  tintColor: '#303234',
  handler: Actions.pop,
  style: {
    paddingLeft: 5,
  },
};

export const rightBtnGoHomeYellow = {
  title: '去首页',
  tintColor: colors.themeYellow,
  handler: () => {
    Actions.TabBar();
  },
  style: {
    paddingRight: 5,
  },
};

export const dialCustomerService = (phone = '4000918118') => {
  Communications.phonecall(phone, true);
};

// react-native-image-picker Options
export const imagePickerOption = {
  default: {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择照片',
    // cameraType: 'front',    // iOS only
    mediaType: 'photo',
    // allowsEditing: true,    // iOS only
    noData: true,

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  },

  webIM: {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  },
};

export const imagePickerError = {
  // iOS
  'Camera not available on simulator': '模拟器上无法使用相机。',
  'Camera permissions not granted': '无法访问相机。如果您的确需要拍摄图片，请允许访问相机。',
  'Photo library permissions not granted': '无法访问相册。如果您的确需要选择图片，请允许访问相册。',
};

// react-native-image-crop-picker Options
export const imageCropPickerOption = {
  avatar: {
    width: 120,
    height: 120,
    cropperCircleOverlay: true,
    cropping: true,
  },
};

/**
 * react-native-image-crop-picker Displayed Errors
 * 留空或注释的Key，不会/不应该被提示
 */
export const imageCropPickerError = {
  ERROR_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR_KEY: '模拟器上无法打开相机。',
  // ERROR_PICKER_NO_CAMERA_PERMISSION_KEY: '无法访问相机。如果您的确需要拍摄图片，请允许访问相机。',
  ERROR_PICKER_NO_CAMERA_PERMISSION_KEY: '您已关闭相机功能，请允许水稻汽车访问您的相机。',
  // ERROR_PICKER_UNAUTHORIZED_KEY: '无法访问图片。如果您的确需要选择图片，请允许访问图片。',
  ERROR_PICKER_UNAUTHORIZED_KEY: '您已关闭相册功能，请允许水稻汽车访问您的相册。',
  // ERROR_PICKER_CANCEL_KEY: '',   //用户退出了图片选择，不是错误
  ERROR_PICKER_NO_DATA_KEY: '无法找到图片。',
  ERROR_CROPPER_IMAGE_NOT_FOUND_KEY: '在指定位置无法找到图片。',
  // ERROR_CLEANUP_ERROR_KEY: '清理图片缓存失败',
  ERROR_CANNOT_SAVE_IMAGE_KEY: '保存图片失败。',
  ERROR_CANNOT_PROCESS_VIDEO_KEY: '无法处理视频数据。',
};

export const imagePicker = (option, success, fail) => {
  ImagePicker.showImagePicker(option, (response) => {
    if (response.error) {
      fail && fail(response.error);
    } else if (!response.didCancel && !response.customButton) {
      let fileName = response.uri.split('/').pop();
      let imageInfo = {
        fileName,
        imageUri: response.uri,
        fileSize: response.fileSize,
        width: response.width,
        height: response.height,
      };
      success && success(imageInfo);
    }
  });
};

/**
 * 选择图片，crop
 * @param option Object
 * @param success function
 * @param fail function
 */
export const imageCropPicker = (option, success, fail) => {
  ImageCropPicker.openPicker(option)
    .then(image => {
      let fileName = image.path.split('/').pop();
      let imageInfo = {
        fileName,
        imageUri: image.path,
        fileSize: image.size,
        width: image.width,
        height: image.height,
      };

      success && success(imageInfo);
    })
    .catch(error => {
      fail && fail(error);
    });
};

export default {
  statusBar,
  backBtn,
  rightBtnGoHomeYellow,
  dialCustomerService,

  imagePickerOption,
  imagePickerError,

  imageCropPickerOption,
  imageCropPickerError,

  imagePicker,
  imageCropPicker,
};
