import { lineColor, primaryTextColor, themeGreenColor } from '@/contents/theme'
import { ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  pageContainer: {},
  content: {
    paddingLeft: '15@ms',
    paddingTop:'15@ms',
    flex: 1,
    backgroundColor: 'white',
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '10@ms',
  },
  rightText: {
    fontSize: 14,
    color: primaryTextColor,
    fontWeight: 600,
  },
  centerComponent: {
    flexDirection: 'row',
    width: '140@ms',
    borderRadius: '13@ms',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: themeGreenColor,
    height: '26@ms',
    overflow: 'hidden',
  },
  centerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnActive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#95d475',
    justifyContent: 'center',
  },
  centerBtnText: {
    fontSize: '12@ms',
    color: themeGreenColor,
    fontWeight: 300,
  },
  centerBtnTextActive: {
    color: 'white',
    fontSize: '12@ms',
    fontWeight: 600,
  },
  yearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearText: {
    fontSize: '14@ms',
    color: primaryTextColor,
    fontWeight: 600,
  },
  topCard: {
    paddingVertical: '15@ms',
    paddingHorizontal: '30@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '10@ms',
    marginBottom: '30@ms',
    marginRight:'15@ms'
  },
  topCardText: {
    fontSize: '12@ms',
    color: primaryTextColor,
    fontWeight: 300,
  },
  balanceText: {
    fontSize: '28@ms',
    color: primaryTextColor,
    fontWeight: 500,
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
    fontWeight: 300,
  },
  topCardRightTextValue: {
    fontSize: '16@ms',
    color: primaryTextColor,
    fontWeight: 500,
  },
  billTitle: {
    flexDirection: 'row',
    paddingVertical: '10@ms',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  billTitleText: {
    fontSize: '10@ms',
    color: '#aaa',
    fontWeight: 300,
    width: '23%',
  },
  billContent: {
    flexDirection: 'row',
    paddingVertical: '15@ms',
    borderTopWidth: 0.5,
    borderTopColor: lineColor,
    marginLeft:'15@ms',
    paddingRight:'15@ms'
  },
  billContentText: {
    width: '23%',
    fontSize: 14,
    color: primaryTextColor,
    fontWeight: 600,
  },
  billContentRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  billContentYear: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  billYearHintText: {
    borderTopColor:lineColor,
    borderTopWidth:0.5,
    paddingTop: '20@ms',
    fontSize: '13@ms',
    color: '#777',
    textAlign: 'center',
    fontWeight: 300,
    marginLeft:'15@ms',
    paddingRight:'15@ms'
  },
})
export default styles

