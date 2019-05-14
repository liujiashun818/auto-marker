import server from './server';
import api from '../config/api';

// 图片上传 imageInfo:{fileName, imageUri, fileSize, width, height}
export function imageUploader(imageInfo, isPrivate = false, uploadFinish = null) {
  let ext = `w${imageInfo.width || 0}h${imageInfo.height || 0}`;
  let apiKey = isPrivate ? 'getPrivatePicUploadToken' : 'getPublicPicUploadToken';

  //请求上传口令
  server.get(api.qiniu[apiKey]('pic', ext), (data) => {
    //请求上传口令成功
    let fileKey = data.res.file_name;
    let token = data.res.token;

    //上传图片
    const {fileName, imageUri, fileSize} = imageInfo;
    let formInput = {
      'key': fileKey,
      'x:filename': fileName,
      'x:size': fileSize,
    };

    qiniuUploader(imageUri, token, formInput)
      .then(() => {
        uploadFinish(imageInfo, fileKey, null);
      })
      .catch((error) => {
        uploadFinish(imageInfo, fileKey, '上传失败：' + error);
      });
  }, (error) => {
    uploadFinish(imageInfo, null, '请求上传口令失败：' + error);
  });
}

// 七牛云上传器
export function qiniuUploader(uri, token, formInput, onprogress) {
  return new Promise((resolve, reject) => {
    if (typeof uri != 'string' || uri == '' || typeof formInput.key == 'undefined') {
      reject && reject(null);
      return;
    }
    if (uri[0] == '/') {
      uri = 'file://' + uri;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', api.qiniu.getUploadUrl());
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject && reject(xhr);
        return;
      }

      resolve && resolve(xhr);
    };

    let formdata = new FormData();
    formdata.append('key', formInput.key);
    formdata.append('token', token);
    if (typeof formInput.type == 'undefined')
      formInput.type = 'application/octet-stream';
    if (typeof formInput.name == 'undefined') {
      let filePath = uri.split('/');
      if (filePath.length > 0)
        formInput.name = filePath[filePath.length - 1];
      else
        formInput.name = '';
    }
    formdata.append('file', {uri: uri, type: formInput.type, name: formInput.name});
    xhr.upload.onprogress = (event) => {
      onprogress && onprogress(event, xhr);
    };
    xhr.send(formdata);
  });
}
