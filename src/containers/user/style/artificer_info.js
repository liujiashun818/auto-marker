import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // iStyles.devBorder
  devBorder: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
  },

  basicCell: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },

  auditFailCell: {
    height: 56,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  auditFail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fee5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  auditFailText: {
    fontSize: 12,
    color: '#fc5659',
  },

  cellLabel: {
    width: 100,
    fontSize: 16,
    color: '#666',
  },
  cellContext: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  cellContextLeft: {
    flex: 1,
    fontSize: 16,
  },
  cellInput: {
    flex: 1,
    // textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },

  nextButtonContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#ffd500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // WorkerCard Upload Cell
  workerCardCell: {
    height: 220,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },

  WCUploaderHeader: {
    fontSize: 14,
    color: '#666666',
  },

  WCUploader: {
    width: 150,
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  WCUploaderImage: {
    width: 148,
    height: 118,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Audit Result Cell
  auditResultCell: {
    height: 240,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  auditResultImage: {
    width: 80,
    height: 80,
  },
  auditResultTitle: {
    fontSize: 26,
  },
  auditResultSubtitle: {
    fontSize: 14,
    color: '#666666',
  },

  // Audit Info
  AIWorkerCardCell: {
    height: 180,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  WCUploaderLabel: {
    fontSize: 16,
    color: '#666666',
    alignSelf: 'flex-start',
  },

});
