import { ScaledSheet, ms } from 'react-native-size-matters'
import {
  themeGreenColor,
  pageBg,
  lineColor,
  blockColor6,
  primaryTextColor,
  blockColor9,
} from '@/contents/theme'

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themeGreenColor,
    paddingBottom: ms(10),
    paddingHorizontal: ms(15),
  },
  headerLeft: {},
  headerCenter: {
    alignItems: 'center',
  },
  headerIconCircle: {
    height: ms(50),
    width: ms(50),
    borderRadius: ms(25),
    backgroundColor: lineColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(10),
  },
  headerIcon: {
    width: ms(30),
    height: ms(30),
  },
  headerRight: {
    paddingTop: ms(6),
    paddingRight: ms(8),
  },
  formContainer: {
    paddingLeft: ms(16),
    flex: 1,
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(56),
    borderBottomColor: lineColor,
    borderBottomWidth: 0.5,
    paddingRight: ms(16),
  },
  formLabel: {
    color: blockColor6,
    opacity: 0.5,
    marginRight: ms(15),
    fontWeight: 300,
  },
  formValue: {
    flex: 1,
    color: primaryTextColor,
    fontWeight: 300,
  },
  formValue1: { color: primaryTextColor, fontWeight: 300 },
  formInput: {
    flex: 1,
  },
  bottomBtnGroup: {
    flexDirection: 'row',
    paddingHorizontal: ms(16),
  },
  cancelBtn: {
    flex: 1,
    marginRight: ms(16),
    backgroundColor: lineColor,
    height: ms(48),
    justifyContent: 'center',
    borderRadius: ms(24),
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: ms(16),
    textAlign: 'center',
    color: blockColor9,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: themeGreenColor,
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(24),
  },
  saveBtnText: {
    fontSize: ms(16),
    textAlign: 'center',
  },
  imagesBox: {
    flexDirection: 'row',
    paddingTop: ms(15),
  },
})
export default styles
