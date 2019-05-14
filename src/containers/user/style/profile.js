import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  topBanner: {
    height: 100,
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  avatarWrapper: {
    width: 74,
    height: 74,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 35,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },

  peAvatar: {
    width: 60,
    height: 60,
    borderColor: '#999',
    borderRadius: 30,
    overflow: 'hidden',
    marginHorizontal: 10,
  },

  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 10,
  },
  userCompany: {
    color: '#666666',
  },

  borderDev: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
  },

  pProfile: {
    height: 150,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pProfileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  pProfileInfo: {
    flex: 1,
    marginHorizontal: 12,
  },

  pProfileName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  pProfileSkill: {
    fontSize: 12,
    color: '#999',
    paddingVertical: 3,
  },

  pAchievement: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  pAchievementItem: {
    height: 60,
    width: 100,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  pCountIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
  },
  pCountInfo: {
    marginLeft: 10,
  },
  pCountText: {
    fontSize: 16,
    color: '#333',
  },
  pCountName: {
    fontSize: 12,
    color: '#999',
  },

  pItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  pItemIcon: {
    width: 20,
    height: 20,
  },

  pItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    marginHorizontal: 10,
  },
  fcccccc: { color: '#cccccc' },
  ff29a00: { color: '#f29a00' },
  f71cd00: { color: '#71cd00' },
  ffc0013: { color: '#fc0013' },

  pSummaryCell: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 10,
  },
  pSummaryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#e5e5e5',
  },
});
