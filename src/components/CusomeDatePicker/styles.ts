import { ScaledSheet } from 'react-native-size-matters'
import {
  themeGreenColor,
  blockColor6,
  themeBlueColor,
  gray1,
} from '@/contents/theme'
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  content: {
    flex: 1,
    // backgroundColor: 'black',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  overlayItemStyle: {
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
    height: 48,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  cancelText: {
    color: gray1,
    fontSize: 16,
  },
  confirmText: {
    color: themeBlueColor,
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#333',
  },
})

export default styles
