import { ScaledSheet } from 'react-native-size-matters'
import { themeGreenColor, primaryTextColor, pageBg } from '@/contents/theme'

const styles = ScaledSheet.create({
  pageView: {
    backgroundColor: pageBg,
    // paddingTop: 10,
  },
  container: {
    flex: 1,
    paddingTop: '10@ms',
    backgroundColor: pageBg,
  },
  list: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    width: '36@ms',
    height: '36@ms',
    borderRadius: '18@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15@ms',
    marginRight: '10@ms',
  },
  icon: {
    height: '28@ms',
    width: '28@ms',
    marginLeft: '15@ms',
    marginRight: '10@ms',
  },
  content: {
    flex: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 0.5,
    height: '60@ms',
    paddingRight: '15@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    flex: 1,
  },
  label: {
    color: primaryTextColor,
    fontWeight: '300',
  },
  caption: {
    fontSize: '12@ms',
    color: '#9f9f9f',
    fontWeight: '300',
  },
  formBox: {
    backgroundColor: '#fff',
    paddingLeft: '16@ms',
  },
  formItem: {
    paddingRight: '16@ms',
    height: '55@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 0.5,
  },
  formItemLabel: {
    color: primaryTextColor,
    paddingRight: '10@ms',
  },
  formItemTitle: {
    color: '#9e9e9e',
  },
  formSubmit: {
    marginTop: '30@ms',
    alignItems: 'center',
  },
  submitBtn: {
    height: '48@ms',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: '150@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '8@ms',
  },
  submitBtnText: {
    color: primaryTextColor,
    fontSize: '16@ms',
    fontWeight: '500',
  },
  selectIcon: {
    width: '28@ms',
    height: '28@ms',
  },
  formItemInput: {
    flex: 1,
  },
})

export default styles
