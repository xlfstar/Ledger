import { ScaledSheet, ms } from 'react-native-size-matters'
import {
  themeGreenColor,
  primaryTextColor,
  lineColor,
  backgroundColor,
} from '@/contents/theme'
import { PixelRatio } from 'react-native'
const styles = ScaledSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
  },
  typesTab: {
    flexDirection: 'row',
    margin: ms(10),
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: ms(8),
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(4),
  },

  centerItem: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#000',
    borderRightColor: '#000',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  btnText: {
    fontSize: ms(12),
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  block: {
    paddingLeft: ms(16),
  },
  blockTitle: {
    fontWeight: 600,
    color: '#000',
    marginTop: ms(10),
  },
  blockContent: {
    flexDirection: 'row',
    paddingVertical: ms(20),
    alignItems: 'center',
    paddingRight: ms(16),
  },
  pieChart: {
    position: 'relative',
  },
  pieInfo: {
    flex: 1,
    paddingHorizontal: ms(15),
    marginLeft: ms(30),
  },
  pieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(2.5),
  },
  pieColor: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(3),
    marginRight: ms(10),
  },
  pieTextLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pieText: {
    fontSize: ms(10),
    color: 'rgba(0, 0, 0, 0.5)',
  },
  piePercent: {
    fontSize: ms(10),
    color: '#000',
    fontWeight: 500,
  },
  totalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    textAlign: 'center',
    fontSize: ms(10),
    color: 'rgba(0,0,0,0.5)',
  },
  totalValue: {
    marginTop: ms(2),
    textAlign: 'center',
    color: '#000',
    fontSize: ms(12),
    fontWeight: 500,
  },
  lineChart: {
    padding: ms(16),
  },
  lineChartContent: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: ms(16),
    paddingTop: ms(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: ms(15),
    overflow: 'hidden',
  },
  lineHeader: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,.3)',
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingBottom: ms(6),
    alignItems: 'center',
    left: ms(16),
    right: ms(16),
    top: ms(16),
    zIndex: 999,
  },
  lineChartTitle: {
    fontWeight: 600,
    color: '#000',
  },
  changeTabBtn: {
    paddingHorizontal: ms(8),
    paddingVertical: ms(3),
    borderRadius: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  changeTabBtnText: {
    fontSize: ms(10),
  },
})
export default styles
