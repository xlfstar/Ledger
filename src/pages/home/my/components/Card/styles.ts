import {ScaledSheet,ms} from 'react-native-size-matters'
import {themeGreenColor} from '@/contents/theme'

const styles = ScaledSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16
  },
  itemIcon: {
    width: 20,
    height: 20
  },
  itemContent: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    height: 56,
    paddingRight: 16,
    marginRight: 2
  },
  itemContentFirst: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 56,
    paddingRight: 16,
    marginRight: 2
  },
  itemLabel:{}
})

export default styles
