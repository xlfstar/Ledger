import {ScaledSheet} from 'react-native-size-matters';
import {primaryTextColor} from '@/contents/theme';
export default ScaledSheet.create({
  money: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  integer: {
    fontSize: '24@ms',
    fontWeight: 300,
    lineHeight: '24@ms',
    color: primaryTextColor,
  },
  decimal: {
    fontSize: '14@ms',
    fontWeight: 300,
    lineHeight: '24@ms',
    color: primaryTextColor,
  },
});
