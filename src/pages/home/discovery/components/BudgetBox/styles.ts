import { pageBg } from '@/contents/theme'
import { ms, ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  itemBox: {
    // backgroundColor: 'blue',
  },

  // itemTop: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },

  itemMain: {
    flexDirection: 'row',
  },

  itemEditText: {
    color: 'rgba(0, 0, 0, .4)',
    fontSize: ms(12),
  },

  itemContent: {
    marginLeft: ms(-10),
  },

  hint: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
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
    marginLeft: '15@ms',
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
    fontWeight: 400,
    color: 'rgba(0,0,0,.8)',
  },

  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4@ms',
  },

  bottomText: {
    fontSize: '11@ms',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: 300,
  },

  overspended: {
    color: '#ff4400',
    fontSize: '14@ms',
    fontWeight: '300',
  },
  itemDate: {
    fontSize: ms(12),
  },
})

export default styles
