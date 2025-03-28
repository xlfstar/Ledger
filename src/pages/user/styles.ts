import { ms, ScaledSheet } from 'react-native-size-matters'
import { PixelRatio } from 'react-native'
import { infoColor, lineColor, themeGreenColor } from '@/contents/theme'

const styles = ScaledSheet.create({
  pageContainer: {
    marginTop: ms(10),
    backgroundColor: '#fff',
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: ms(16),
    borderBottomColor: lineColor,
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingVertical: ms(15),
    alignItems: 'center',
  },
  lastItem: {
    borderBottomColor: 'transparent',
    // borderBottomWidth: 1 / PixelRatio.get(),
  },
  formImage: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
  },

  formLabel: {
    fontWeight: 300,
    color: 'rgba(0,0,0,.7)',
    fontSize: ms(13),
  },
  formContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: ms(16),
    alignItems: 'center',
  },
  fromValue: {
    color: '#a3a4a5',
    marginRight: ms(10),
    fontSize: ms(13),
    fontWeight: 300,
  },
  fromNoValue: {
    color: 'rgb(238, 123, 15)',
    marginRight: ms(10),
    fontSize: ms(13),
    fontWeight: 300,
  },
  logoutBtn: {
    paddingVertical: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtnText: {
    fontWeight: 300,
    color: '#666',
  },
  modalContent: {
    backgroundColor: '#f1f2f3',
    borderRadius: ms(15),
    marginHorizontal: ms(40),
  },
  modalTitle: {
    fontSize: ms(16),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: ms(16),
  },
  nicknameInput: {
    height: ms(28),
    backgroundColor: '#fff',
    marginHorizontal: ms(16),
    borderColor: '#aaa',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: ms(8),
    paddingVertical: 0,
    lineHeight: ms(28),
    paddingHorizontal: ms(8),
    fontSize: ms(11),
  },
  btnGroup: {
    flexDirection: 'row',
    borderTopColor: '#aaa',
    borderTopWidth: 1 / PixelRatio.get(),
    marginTop: ms(16),
    alignItems: 'center',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {
    borderRightColor: '#aaa',
    borderRightWidth: 1 / PixelRatio.get(),
  },
  cancelBtnText: {
    fontWeight: 600,
    fontSize: ms(15),
    color: infoColor,
  },
  confirmBtnText: {
    fontSize: ms(15),
    color: infoColor,
  },
  disabledBtn: {
    color: '#999',
  },
})
export default styles
