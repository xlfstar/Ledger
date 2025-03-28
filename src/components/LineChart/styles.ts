import {ScaledSheet,ms} from 'react-native-size-matters'
import {themeGreenColor,lineColor,blockColor9} from '@/contents/theme'
const ITEM_WIDTH = '200@ms'
const styles = ScaledSheet.create({
  dotItem:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:ms(2)
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: ms(4),
    padding: ms(5),
    zIndex: 999,
    transform: [{ translateY: '-100%' }],
    marginTop: ms(-47.5),
  },
  line: {
    position: 'absolute',
    width: 1,
    height: '40@ms',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform:[{translateX: -0.5},{translateY:ms(-40)}]
  },
  triangle: {
    position:'absolute',
    width: 0,
    height: 0,
    borderTopWidth: '10@ms',
    borderLeftWidth: '6@ms',
    borderRightWidth: '6@ms',
    borderBottomWidth: 0,
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    transform:[{translateX: ms(-6)}],
   
  },
  
  circle: {
    position: 'absolute',
    width: ms(5),
    height: ms(5),
    borderRadius: ms(5),
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: [{translateX: ms(-2.5)},{translateY: ms(-2.5)}]
  },
  topText: {
    backgroundColor: '#444',
    alignContent: 'center',
    paddingHorizontal: ms(3),
    borderRadius: ms(3),
    color: '#ccc',
    fontSize: ms(9),
    textAlign: 'center',
    paddingVertical:ms(3),
    marginBottom:ms(5)
  },
  itemDate: {
    fontSize:ms(9),
    color: '#ccc',
    fontWeight:300
  },
  
  iconView: {
    width: ms(16),
    height: ms(16),
    borderRadius: ms(8),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:ms(5)
  },
  
  icon: {
    height: ms(12),
    width: ms(12),
  },
  itemLabel:{
    fontSize:ms(9),
    color: '#ccc',
    flex:1,
    marginLeft:ms(5)
  },
  amount: {
    fontSize: ms(9),
    color: '#ccc',
  },
  
  emptyText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: ms(12),
    paddingVertical: '5@ms',
  },
  
  
  
  totalExpense: {
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  
  averageExpense: {
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '12@ms',
  },
  
  maxExpense: {
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '12@ms',
    textAlign: 'right',
  },
  topLine: {
    position: 'absolute',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    textAlign: 'right',
    zIndex: 1,
    color: blockColor9,
    fontSize: ms(10),
    top: 0,
  },
  totalLabel:{
    fontSize:ms(9),
    color:'#ccc',
    paddingVertical:ms(2)
  }
})
export default styles
