import {ScaledSheet,ms} from 'react-native-size-matters'
import {
  themeGreenColor,
  primaryTextColor,
  lineColor,
  pageBg,
  blockColor9,
} from '@/contents/theme'

const styles = ScaledSheet.create({
  rankTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
    marginTop: ms(10),
  },
  dateFormat: {
    fontSize: ms(10),
    fontWeight: 300,
    color: blockColor9,
  },
  listBox: {
    position: 'relative',
    height: ms(36),
    borderBottomColor: lineColor,
    borderBottomWidth: 0.5,
  },
  typeItemText1: {
    borderBottomColor: lineColor,
    borderBottomWidth: 0.5,
  },
  typeItemIcon: {
    width: ms(20),
    height: ms(20),
    marginHorizontal: ms(16),
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  typeItemText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(15),
    justifyContent: 'space-between',
    paddingRight: ms(16),
  },
  dateList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: pageBg,
  },
  dateItem: {
    height: ms(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItemText: {
    height: ms(36),
    fontSize: ms(12),
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 300,
    lineHeight: ms(36),
  },
  activeDateItemText: {
    lineHeight: ms(36),
    height: ms(36),
    color: primaryTextColor,
    fontSize: ms(14),
    borderBottomColor: primaryTextColor,
    borderBottomWidth: 2,
  },
  pageHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeGreenColor,
    position: 'relative',
  },
  percentage: {
    fontSize: ms(11),
    fontWeight: 300,
  },
  classifyValue: {
    fontWeight: 300,
    fontSize: ms(12),
  },
  classifyLabel: {
    fontSize: ms(12),
    color: primaryTextColor,
  },
  reankContent: {
    flex: 1,
    borderTopColor: lineColor,
    borderTopWidth: 0.5,
    height: ms(56),
    justifyContent: 'center',
    paddingRight: ms(16),
  },
  rankContentTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proportionLine: {
    marginTop: ms(2),
    height: ms(6),
    backgroundColor: themeGreenColor,
    borderRadius: ms(3),
    minWidth: ms(6),
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(16),
  },
  iconCircle: {
    backgroundColor: lineColor,
    height: ms(34),
    width: ms(34),
    borderRadius: ms(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(10),
  },
  icon: {
    height: ms(24),
    width: ms(24),
  },
  rankList: {
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    paddingHorizontal: ms(16),
    marginTop: ms(10),
    flex: 1,
  },
  rankLabel: {
    fontWeight: 600,
    fontSize: ms(14),
  },
  topContainer: {
    backgroundColor: themeGreenColor,
    width: '100%',
  },
  changeTypeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(10),
  },
  typeLabel: {
    fontWeight: 300,
    fontSize: ms(16),
    marginRight: ms(5),
  },
  dateTypeBtnGroup: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: primaryTextColor,
    borderRadius: ms(8),
    marginBottom: ms(10),
    marginHorizontal: ms(16),
  },
  dateTypeBtn: {
    flex: 1,
    paddingVertical: ms(4),
    alignItems: 'center',
    jusitifyContent: 'center',
  },
  dateTypeBtn1: {
    borderLeftColor: primaryTextColor,
    borderLeftWidth: 1,
    borderRightColor: primaryTextColor,
    borderRightWidth: 1,
  },
  activeDateTypeBtn: {
    backgroundColor: primaryTextColor,
  },
  dateTypeBtnText: {
    fontSize: ms(12),
    color: primaryTextColor,
  },
  changeDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(16),
    alignItems: 'center',
    backgroundColor: themeGreenColor,
  },
  changeDateLabel: {
    color: '#ccc',
  },
  changeDateRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeDateValue: {
    fontSize: ms(12),
    fontWeight: 300,
  },
  
  typeBtnGroup: {
    backgroundColor: themeGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: ms(10),
    marginBottom: ms(10),
  },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(15),
  },
  typeBtnText: {
    color: primaryTextColor,
    marginLeft: ms(5),
  },
  centerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  centerLabel: {
    fontSize: ms(16),
    marginRight: ms(3),
  },
})
export default styles
