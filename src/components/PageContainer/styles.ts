import { ScaledSheet } from 'react-native-size-matters'
import { primaryTextColor } from '@/contents/theme'
import { PixelRatio } from 'react-native'
const styles = ScaledSheet.create({
  pageContainer: {
    flex: 1,
  },
  pageContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '44@ms',
    alignItems: 'center',
    paddingHorizontal: '10@ms',
  },
  leftComponent: {
    minWidth: '30@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44@ms',
  },
  backButton: {
    // paddingLeft: '10@ms',
    paddingRight: '30@ms',
    height: '44@ms',
    justifyContent: 'center',
  },
  centerComponent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '80@ms',
    right: '80@ms',
    top: 0,
    bottom: 0,
  },
  headerTitle: {
    fontSize: '16@ms',
    color: primaryTextColor,
    fontWeight: 500,
    textAlign: 'center',
  },
  rightComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '30@ms',
  },
  goHomeBtn: {
    height: '26@ms',
    paddingHorizontal: '10@ms',
    borderRadius: '15@ms',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    width: '3@ms',
    height: '3@ms',
    borderRadius: '50%',
    marginLeft: '2@ms',
    backgroundColor: '#000',
  },
  centerPoint: {
    width: '5@ms',
    height: '5@ms',
  },
  centerLine: {
    height: '14@ms',
    width: 1 / PixelRatio.get(),
    backgroundColor: '#666',
    marginHorizontal: '10@ms',
  },
  circleGroup: {
    flexDirection: 'row',
  },
  outsideCircle: {
    width: '15@ms',
    height: '15@ms',
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideCircle: {
    width: '6@ms',
    height: '6@ms',
    borderRadius: '50%',
    backgroundColor: '#000',
  },
})

export default styles
