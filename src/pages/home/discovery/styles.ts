import { ms, ScaledSheet } from 'react-native-size-matters'
import { themeGreenColor, lineColor } from '@/contents/theme'
import { PixelRatio } from 'react-native'

const styles = ScaledSheet.create({
  pageContainer: {
    backgroundColor: '#f2f6f7',
    flex: 1,
  },
  topBg: {
    backgroundColor: themeGreenColor,
    height: ms(16),
  },
  section: {
    marginHorizontal: ms(16),
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
    backgroundColor: '#fff',
    borderRadius: ms(5),
    transform: [
      {
        translateY: -ms(16),
      },
    ],
    marginBottom: ms(10),
    overflow: 'hidden',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(16),
  },
  sectionTitle: {
    fontSize: ms(15),
    fontWeight: '600',
    color: '#000',
  },
  detailBox: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  detailBoxLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  divider: {
    width: 1 / PixelRatio.get(),
    height: ms(24),
    backgroundColor: '#000',
    marginHorizontal: ms(16),
  },
  detailBoxRight: {
    flex: 1,
    flexDirection: 'row',
  },
  monthValue: {
    fontSize: ms(24),
    fontWeight: 300,
  },
  monthUnit: {
    fontSize: ms(12),
  },
  incomeBlock: {
    flex: 1,
  },
  rightLabel: {
    fontSize: ms(10),
    fontWeight: 300,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: ms(4),
  },
  rightValue: {
    fontWeight: 300,
  },
  assetsContent: {
    flexDirection: 'row',
  },
  assetsBlock: {
    flex: 1,
  },
  assetsLabel: {
    fontSize: ms(10),
    marginBottom: ms(4),
  },
  setBudgetBtn: {
    paddingVertical: ms(4),
    paddingHorizontal: ms(4),
    borderRadius: ms(4),
    backgroundColor: themeGreenColor,
  },
  setBudgetBtnText: {
    fontSize: ms(10),
  },
})
export default styles
