import { Platform } from 'react-native';

const QuestionRewards = Platform.OS === 'ios' ? {
  '¥ 0.00': 0,
  '¥ 7.30': 7.30,
  '¥ 14.60': 14.60,
  '¥ 29.20': 29.20,
} : {
  '¥ 0.00': 0,
  '¥ 5.00': 5,
  '¥ 10.00': 10,
  '¥ 20.00': 20,
};

export default QuestionRewards;
