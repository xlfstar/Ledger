import { ScaledSheet, ms } from 'react-native-size-matters'
import { themeGreenColor, primaryTextColor, lineColor } from '@/contents/theme'
const styles = ScaledSheet.create({
  topContainer: {
    paddingLeft: ms(30),
    paddingRight: ms(30), 
    paddingBottom: ms(30),
    backgroundColor: themeGreenColor
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(30),
    borderWidth: ms(2),
    borderColor: '#fff'
  },
  userName: {
    fontSize: ms(16),
    fontWeight: '600',
    marginLeft: ms(10)
  },
  clockInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: ms(12),
    paddingHorizontal:ms(8),
    height: ms(24)
  },
  clockIcon: {
    width: ms(16),
    height: ms(16)
  },
  clockInText: {
    fontSize: ms(12),
    marginLeft: ms(3)
  },
  staticBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: ms(30)
  },
  staticItem:{},
  staticItemValue: {
    fontWeight: '600',
    fontSize: ms(20),
    textAlign: 'center'
  },
  staticItemTitle: {
    marginTop: ms(5),
    fontSize: ms(12),
    textAlign: 'center',
    color: '#333'
  },
  mainContainer: {
    paddingLeft: ms(16),
    paddingRight: ms(16),
    flex: 1
  }
})

export default styles
