import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  topLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  loginForm: {
    flex: 1,
  },

  formGroup: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff',
  },

  formLabel: {
    color: '#303234',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
  },

  textInput: {
    flex: 1,
    marginLeft: 15,
  },
  btnGetCode: {
    width: 110,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 0,
  },

  getCodeTextDisable: {
    color: '#82858a',
    fontSize: 14,
  },
  getCodeText: {
    color: '#303234',
    fontSize: 14,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  btnLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  btnLogin: {
    marginTop: 40,
    width: 180,
    backgroundColor: '#ffd500',
    borderColor: '#ffd500',
    borderRadius: 4,
    marginHorizontal: 5,
    height: 40,
  },
  loginText: {
    color: '#303234',
    fontSize: 16,
  },
});
