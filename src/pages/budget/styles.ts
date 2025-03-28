import { ScaledSheet,ms } from 'react-native-size-matters'
import { primaryTextColor, themeGreenColor ,lineColor} from '@/contents/theme'
const styles = ScaledSheet.create({
  
  content:{
    flex:1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  emptyImg: {
    width: ms(60),
    height: ms(60),
  },
  emptyText: {
    color: 'rgba(0,0,0,.2)',
    marginTop: ms(10),
    fontSize: ms(12),
    textAlign:'center'
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: themeGreenColor,
    marginTop: ms(20),
    height: ms(46),
    paddingHorizontal: ms(90),
    borderRadius: ms(23),
  },
  addClassifyBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingTop:ms(15),
    // borderTopColor:'#000',
    // borderTopWidth:0.5,
    // 阴影的颜色
    shadowColor: '#000',
    // // 阴影偏移量,width控制水平偏移,height控制垂直偏移(负值向上偏移)
    shadowOffset: {
      width: 0,
      height: -2,
    },
    // // 阴影的不透明度,取值0-1,值越大阴影越深
    shadowOpacity: 0.8,
    // // 阴影扩散半径,值越大阴影范围越大
    shadowRadius: 3,
    // // Android平台的阴影属性,数值越大阴影越明显
    elevation: 5,
    // 背景颜色
    backgroundColor: '#fff'
  },
  addClassifyBtnText:{
    textAlign:'center',
    fontSize:ms(12)
  },
  backButton:{
    position:'absolute',
    // backgroundColor:'white',
    width:60,
    height:ms(32),
    zIndex:1,
    top:0,
    left:0,
  }
 
})

export default styles
