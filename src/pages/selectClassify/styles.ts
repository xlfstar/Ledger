import { ScaledSheet,ms } from "react-native-size-matters";
import {themeGreenColor,primaryTextColor,lineColor, blockColor9, blockColor6,pageBg} from '@/contents/theme'

const styles = ScaledSheet.create({
  itemBox:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop:ms(16)
  },
  iconBox:{
    justifyContent:'center',
    alignItems:'center',
    width:ms(50),
    height:ms(50),
    backgroundColor:lineColor,
    borderRadius:ms(50)
  },
  icon:{
    width:ms(32),
    height:ms(32)
  }
})
export default styles