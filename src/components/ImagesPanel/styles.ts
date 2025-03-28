import { ScaledSheet, ms } from 'react-native-size-matters'
export const styles = ScaledSheet.create({
  modalContainer: {
    margin: 0,
    padding: 0,
  },
  modalContent: {
    backgroundColor: 'rgba(0,0,0,.9)',
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTop: {
    flexDirection: 'row',
    paddingHorizontal: ms(16),
  },
  backButton: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBottom: {
    paddingHorizontal: ms(16),
  },
  bottomImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(5),
  },
  bottomImageBtn: {
    width: ms(52),
    height: ms(52),
    marginRight: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
    overflow: 'hidden',
  },

  currentBtn: {
    borderWidth: ms(1),
    borderColor: '#FFD700',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: ms(16),
  },
  optionBtn: {
    height: ms(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    // backgroundColor: '#fff',
  },
  optionBtnText: {
    color: '#FFD700',
    fontSize: ms(12),
  },
})
export default styles
