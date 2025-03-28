import { ScaledSheet } from 'react-native-size-matters'
import {
  themeGreenColor,
  primaryTextColor,
  blockColor9,
  pageBg,
} from '@/contents/theme'
const styles = ScaledSheet.create({
  tabBar: {
    backgroundColor: themeGreenColor,
    alignItems: 'center',
  },
  tabBarContent: {
    flexDirection: 'row',
  },
  tabBarItem: {
    alignItems: 'center',
    paddingTop: '10@ms',
    paddingHorizontal: '20@ms',
  },
  tabBarItemText: {
    color: primaryTextColor,
    fontSize: '16@ms',
    fontWeight: '300',
  },
  tabBarLine: {
    position: 'absolute',
    bottom: '-6@ms',
    left: '21@ms',
    height: '2@ms',
    width: '30@ms',
    backgroundColor: primaryTextColor,
    borderRadius: '2@ms',
  },
})
export default styles
