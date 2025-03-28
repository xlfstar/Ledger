import {
  themeGreenColor,
  primaryTextColor,
  lineColor,
  pageBg,
} from '@/contents/theme'
import { ScaledSheet, ms } from 'react-native-size-matters'
const styles = ScaledSheet.create({
  pageHeader:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeGreenColor,
    position: 'relative',
  },
  listView:{
    // paddingLeft:ms(16),
    backgroundColor: '#fff',
  },

  typeItemIcon: {
    width: ms(20),
    height: ms(20),
    marginLeft: ms(16),
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  typeItemText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(15),
    justifyContent: 'space-between',
    paddingRight: ms(16),
    marginLeft:ms(16),
    borderTopColor: lineColor,
    borderTopWidth: 0.5,
  },
  centerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
    // backgroundColor:'#fff'
  },
  centerLabel: {
    fontSize: ms(16),
    // marginRight: ms(3),
  },
})
export default styles