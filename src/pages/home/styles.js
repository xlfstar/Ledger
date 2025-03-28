import {ScaledSheet} from 'react-native-size-matters';
// import { themeGreenColor, blockColor6, themeBlueColor } from 'src/contents/theme';
const styles = ScaledSheet.create({
  tabBar: {},
  addButton: {
    position: 'absolute',
    bottom: 32.5,
    left: '50%',
    transform: [{translateX: -30}],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#95D475', // Customize the color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 3,
  },

  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  centerText: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -15}],
    fontSize: 10,
    color: '#0f0f0f',
    bottom: 8,
  },
  centerTextSelected: {
    color: '#0AE019',
  },
});

export default styles;
