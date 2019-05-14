import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  peItem: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  peText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },

  peDataText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },

  peContainer: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  peInput: {
    flex: 1,
    marginTop: 4,
    textAlign: 'left',
  },

  peItemAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  peItemActionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifySpace: {
    justifyContent: 'space-between',
  },

  peTip: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  peTipText: {
    fontSize: 12,
    color: '#666',
  },

  peUploadItem: {
    height: 182,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  peImgUploadContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  peImgUploadTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },

  pepeImageUploadStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },

  peImageUploadPlaceholder: {
    width: 50,
    height: 50,
  },

  peUploadTip: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 6,
  },

  WCUploader: {
    width: 120,
    height: 90,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  WCUploaderImage: {
    width: 118,
    height: 88,
    borderRadius: 8,
    overflow: 'hidden',
  },

  peSubmit: {
    flex: 0,
    height: 40,
    width: 180,
    alignSelf: 'center',
  },

  adoptStatusWaiting: {
    height: 40,
    backgroundColor: '#ffd500',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptStatusWaitingText: {
    fontSize: 14,
    color: '#666',
  },
  adoptStatusFail: {
    height: 40,
    backgroundColor: '#ff4200',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adoptStatusFailText: {
    fontSize: 14,
    color: '#fff',
  },
});
