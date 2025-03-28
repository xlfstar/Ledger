import { backgroundColor, lineColor, themeGreenColor } from '@/contents/theme'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { PixelRatio } from 'react-native'
const styles = ScaledSheet.create({
  flashingLine: {
    height: ms(26),
    width: ms(2),
    backgroundColor: '#3368FF',
    borderRadius: ms(1),
  },
  accountNamePlaceholder: {
    fontSize: ms(13),
    color: '#999',
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
    overflow: 'hidden',
    height: '500@ms',
  },
  modalItem: {
    height: '48@ms',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '16@ms',
    // borderBottomColor: lineColor,
    // borderBottomWidth: '0.5@ms',
  },

  modalText: {
    marginLeft: '10@ms',
  },
  contentHeader: {
    height: '50@ms',
    paddingHorizontal: '16@ms',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  contentTitle: {},
  iconCircle: {
    width: '30@ms',
    height: '30@ms',
    borderRadius: '15@ms',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: ms(56),
  },
  closeBtn: {
    zIndex: 1,
    width: ms(20),
    height: ms(20),
    backgroundColor: lineColor,
    borderRadius: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ms(16),
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  form: {
    // alignItems:'center',
    paddingHorizontal: ms(16),
    marginBottom: ms(16),
  },
  valueInput: {
    // marginLeft: ms(-15),
    fontSize: ms(13),
    height: ms(40),
  },
  confirmBtn: {
    width: ms(200),
    marginVertical: ms(30),
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeGreenColor,
    height: ms(44),
    borderRadius: ms(22),
  },
  confirmBtnText: {
    fontSize: ms(16),
    fontWeight: 300,
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
  },
  confirmBtnDisabled: {
    width: ms(200),
    marginVertical: ms(30),
    backgroundColor: lineColor,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(44),
    borderRadius: ms(22),
  },
  confirmBtnDisabledText: {
    fontSize: ms(16),
    fontWeight: 300,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  accountLabel: {
    fontSize: ms(13),
    color: '#000',
    marginBottom: ms(8),
  },
  accountBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(10),
    // backgroundColor: 'blue',
  },
  accountInfo: {
    marginLeft: ms(10),
    height: ms(40),
  },
  outAccount: {
    marginTop: ms(16),
  },
  transformLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: ms(16),
    marginVertical: ms(16),
  },
  line: {
    flex: 1,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#ccc',
  },
  transformCircle: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    backgroundColor: lineColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ms(10),
    transform: [{ rotate: '-90deg' }],
  },
  inAccount: {
    marginTop: ms(16),
  },
  accountName: {
    fontWeight: 600,
  },
  accountAmount: {
    color: '#000',
    opacity: 0.5,
    fontSize: ms(9),
    marginTop: ms(5),
  },
  pName: {
    fontSize: ms(9),
    fontWeight: 500,
    color: '#000',
  },
  pNameView: {
    marginLeft: ms(8),
    backgroundColor: '#eee',
    paddingHorizontal: ms(8),
    borderRadius: ms(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(15),
  },
  accountAmountValue: {
    fontSize: ms(18),
    color: '#000',
  },
  itemBox: {},
  itemLabel: {
    fontSize: ms(13),
    color: '#000',
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(40),
    paddingTop: ms(10),
    // flex: 1,
    // backgroundColor: 'blue',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfoLeftContent: {
    marginLeft: ms(10),
    flex: 1,
  },
  transformAmount: {
    paddingBottom: ms(16),
  },

  evenItem: {
    backgroundColor: '#fafbfc',
  },

  assetLabel: {
    marginLeft: '10@ms',
    justifyContent: 'center',
  },
  modalTextLabel: {
    fontWeight: 'bold',
    fontSize: '13@ms',
  },
  modalTextRemark: {
    color: '#9d9e9f',
    fontSize: '11@ms',
  },
  assetContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: '12@ms',
    marginRight: '16@ms',
    color: '#999',
  },
})
export default styles
