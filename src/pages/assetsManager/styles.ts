import { ScaledSheet } from 'react-native-size-matters'
import { themeGreenColor, primaryTextColor } from '@/contents/theme'

const styles = ScaledSheet.create({
  pageTitle: {
    fontSize: '20@ms',
    color: primaryTextColor,
    fontWeight: '500',
  },
  wrapper: {
    padding: '15@ms',
  },
  topCard: {
    marginTop: '15@ms',
    paddingHorizontal: '30@ms',
    paddingVertical: '15@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '10@ms',
    marginBottom: '30@ms',
  },
  topCardText: {
    fontSize: '12@ms',
    color: primaryTextColor,
    fontWeight: '300',
  },
  balanceText: {
    fontSize: '28@ms',
    color: primaryTextColor,
    fontWeight: '500',
    marginVertical: '10@ms',
  },
  topCardRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topCardRightText: {
    flex: 1,
    fontSize: '12@ms',
    color: primaryTextColor,
    fontWeight: '300',
  },
  topCardRightTextValue: {
    fontSize: '16@ms',
    color: primaryTextColor,
    fontWeight: '500',
  },
})

export default styles
