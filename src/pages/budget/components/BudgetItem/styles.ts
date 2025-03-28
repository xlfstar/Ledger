import { lineColor, pageBg } from '@/contents/theme'
import { ms, ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  budgetItem:{
    backgroundColor:pageBg
  },
  classifyTitle:{
    padding:ms(15),
    paddingBottom:0,

  },
  itemBox: {
    padding: '15@ms',
    borderTopWidth:0.5,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    paddingLeft:ms(30),
    paddingBottom:ms(5)
    
  },

  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemMain: {
    flexDirection: 'row',
  },

  itemEditText: {
    color: 'rgba(0, 0, 0, .4)',
    fontSize: ms(12),
  },

  itemContent: {
    marginLeft:ms(-30),
  },

  hint: {
    position: 'absolute',
    left:0,
    top:0,
    bottom:0,
    right:0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hintText: {
    color: 'rgba(0, 0, 0, .4)',
    fontSize: '10@ms',
  },

  hintPercent: {
    fontSize: '14@ms',
    fontWeight: '300',
  },

  valueInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
    paddingBottom: '3@ms',
    marginBottom: '4@ms',
  },

  topText: {
    fontWeight:400,
    color:'rgba(0,0,0,.8)'
  },

  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4@ms',
  },

  bottomText: {
    fontSize: '11@ms',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight:300
  },

  overspended: {
    color: '#ff4400',
    fontSize: '12@ms',
    fontWeight: '300',
  },
  itemDate:{
    fontSize:ms(12)
  },
  classifyInfo:{
  
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    width:ms(18),
    height:ms(18)
  },
  iconCircle:{
    padding:ms(2),
    borderRadius:'50%',
    backgroundColor:lineColor,
    marginRight:ms(4)
  }
})

export default styles
