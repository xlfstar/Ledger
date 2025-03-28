import { StyleSheet } from 'react-native'
import { primaryTextColor, themeGreenColor } from '@/contents/theme'
import { ms, ScaledSheet } from 'react-native-size-matters'
export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: primaryTextColor,
    marginBottom: 30,
  },
  loader: {
    marginBottom: 20,
  },
  version: {
    position: 'absolute',
    bottom: 40,
    color: '#888',
  },
  homeButton: {
    backgroundColor: themeGreenColor,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   padding: ms(20)
  // },
  // logo: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   padding: ms(20)
  // },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: ms(20),
  },
  termsContainer: {
    flex: 1,
    marginBottom: ms(20),
  },
  termsText: {
    fontSize: ms(16),
    lineHeight: ms(24),
    color: primaryTextColor,
  },
  agreeButton: {
    backgroundColor: themeGreenColor,
    padding: ms(15),
    borderRadius: ms(8),
    alignItems: 'center',
  },
  agreeText: {
    color: '#fff',
    fontSize: ms(16),
    fontWeight: 'bold',
  },
})
