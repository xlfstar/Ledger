import { ScaledSheet } from 'react-native-size-matters'
// import { themeGreenColor, blockColor6, themeBlueColor } from 'src/contents/theme';
const styles = ScaledSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 9999,
  },
  modalContent: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 300,
    zIndex: 9999,
  },
})

export default styles
