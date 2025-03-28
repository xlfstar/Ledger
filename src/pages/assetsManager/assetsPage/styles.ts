import { ScaledSheet } from 'react-native-size-matters'
import { themeGreenColor, primaryTextColor, pageBg } from '@/contents/theme'

const styles = ScaledSheet.create({
  containerStyle: {
    paddingHorizontal: '16@ms',
  },
  pageTitle: {
    fontSize: 20,
    color: primaryTextColor,
    fontWeight: '500',
  },

  wrapper: {
    // padding: '0@ms'
    backgroundColor: 'white',
  },

  topCard: {
    marginTop: '15@ms',
    paddingHorizontal: '30@ms',
    paddingVertical: '15@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '10@ms',
    marginBottom: '15@ms',
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

  addAssets: {
    width: '100%',
    marginTop: '20@ms',
    marginBottom: '20@ms',
  },

  addAssetsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '10@ms',
    padding: '15@ms',
  },

  addAssetsText: {
    marginLeft: '5@ms',
    color: primaryTextColor,
  },

  extraDelete: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#F56C6C',
    overflow: 'hidden',
    opacity: 0.9,
  },

  extraView: {
    width: '75@ms',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  frontItem: {
    flexDirection: 'row',
    paddingVertical: '8@ms',
    paddingHorizontal: '15@ms',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  iconOutView: {
    width: '34@ms',
    height: '34@ms',
    borderRadius: '8@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f7f8',
    marginRight: '8@ms',
  },

  icon: {
    width: '26@ms',
    height: '26@ms',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '8@ms',
    paddingHorizontal: '15@ms',
  },

  headerTypeName: {
    color: primaryTextColor,
    fontSize: '11@ms',
    fontWeight: 'bold',
  },

  headerTotal: {
    color: '#9d9e9f',
    fontSize: '11@ms',
  },

  itemLabel: {
    flex: 1,
    justifyContent: 'center',
  },

  itemName: {
    color: primaryTextColor,
    fontWeight: 'bold',
    fontSize: '13@ms',
  },

  itemRemark: {
    color: '#9f9f9f',
    fontSize: '10@ms',
    fontWeight: '300',
  },

  itemBalance: {
    color: primaryTextColor,
    fontWeight: '500',
  },

  editBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '12@ms',
  },

  emptyData: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    width: '60@ms',
    height: '60@ms',
  },

  emptyText: {
    color: 'rgba(0, 0, 0, .2)',
    marginTop: '10@ms',
  },
  rightAction: {
    width: 100,
    backgroundColor: '#F56C6C',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionText: {
    color: '#fff',
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: '56@ms',
    backgroundColor: pageBg,
    // alignItems: 'center',
  },
})

export default styles
