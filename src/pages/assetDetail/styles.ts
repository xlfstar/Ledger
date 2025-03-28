import { ScaledSheet, ms, vs } from 'react-native-size-matters'
import {
  themeGreenColor,
  primaryTextColor,
  pageBg,
  lineColor,
} from '@/contents/theme'
import { PixelRatio } from 'react-native'

const styles = ScaledSheet.create({
  topBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: themeGreenColor,
    height: ms(60),
  },
  topCard: {
    marginHorizontal: ms(12),
    padding: ms(15),
    borderRadius: ms(12),
    backgroundColor: '#fff',
    shadowColor: '#888',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: ms(120),
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoName: {
    fontWeight: 600,
    fontSize: ms(14),
  },
  pName: {
    marginLeft: ms(5),
    paddingHorizontal: ms(8),
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: ms(5),
    height: ms(17),
  },
  pNameText: {
    color: '#eee',
    fontSize: ms(9),
  },
  infoRemark: {
    fontSize: ms(9),
    color: '#777',
  },
  cardTopImg: {
    width: ms(28),
    height: ms(28),
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  changeBtn: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(5),
    borderRadius: ms(16),
    backgroundColor: themeGreenColor,
  },
  cardBottomText: {
    fontSize: ms(11),
  },
  amountText: {
    fontSize: ms(22),
    fontWeight: 500,
  },
  details: {
    marginTop: ms(30),
    marginBottom: ms(10),
  },
  headTitle: {
    paddingHorizontal: ms(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitleText: {
    fontSize: ms(12),
    color: '#000',
  },
  changeMonth: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: ms(32),
    height: ms(32),
    borderRadius: '50%',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(10),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ms(15),
  },
  itemRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingRight: ms(15),
    paddingVertical: ms(10),
    borderTopColor: '#ddd',
    borderTopWidth: 1 / PixelRatio.get(),
  },
  itemLeftLabel: {
    fontWeight: 300,
    color: '#333',
  },
  itemLeftText: {
    fontWeight: 300,
    color: '#777',
    fontSize: ms(10),
    marginTop: ms(3),
  },
  firstItem: {
    borderTopColor: 'transparent',
  },
  itemRightText: {
    textAlign: 'right',
    fontWeight: 300,
  },
  sctionHeader: {
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
  },
  sectionTitle: {
    fontSize: ms(11),
    color: '#999',
  },
  bottomBtnGroup: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1 / PixelRatio.get(),
    // paddingTop: ms(15),
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(15),
  },
  centerBottomBtn: {
    borderLeftColor: '#aaa',
    borderLeftWidth: 1 / PixelRatio.get(),
    borderRightColor: '#aaa',
    borderRightWidth: 1 / PixelRatio.get(),
  },
  btnLine: {
    width: 1 / PixelRatio.get(),
    backgroundColor: '#aaa',
    height: ms(16),
    transform: [{ translateY: ms(15) }],
  },
  bottomBtnText: {
    fontSize: ms(11),
    marginLeft: ms(5),
    color: '#000',
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
})
export default styles
