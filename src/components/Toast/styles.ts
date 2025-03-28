import { ScaledSheet } from 'react-native-size-matters'

export const styles = ScaledSheet.create({
  loadView: {
    width: '140@ms',
    minHeight: '140@ms',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '20@ms',
  },
  loadViewText: {
    color: 'white',
    fontSize: '14@ms',
    width: '120@ms',
    textAlign: 'center',
    marginTop: '30@ms',
  },
})
export default styles
