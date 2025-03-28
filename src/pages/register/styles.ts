import { ScaledSheet } from 'react-native-size-matters'
import {
  themeGreenColor,
  lineColor,
  blockColor6,
  blockColor3,
} from '@/contents/theme'

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  keyboardAwareScrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff', // Changed from red to white
  },

  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
  },

  formContainer: {
    flex: 1,
    width: '100%',
    padding: '20@ms',
  },

  form: {
    paddingTop: '40@ms',
    marginTop: '200@ms',
  },

  title: {
    fontSize: '28@ms',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30@ms',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '14@ms',
    color: blockColor6,
    textAlign: 'center',
    marginBottom: '40@ms',
  },

  inputGroup: {
    marginBottom: '25@ms',
  },

  inputWrapper: {
    marginBottom: '20@ms',
  },

  label: {
    fontSize: '14@ms',
    color: blockColor3,
    marginBottom: '8@ms',
    marginLeft: '4@ms',
  },

  input: {
    height: '50@ms',
    borderRadius: '12@ms',
    paddingHorizontal: '15@ms',
    fontSize: '16@ms',
    backgroundColor: '#f8f8f8',
  },

  codeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  codeInput: {
    flex: 1,
    marginRight: '12@ms',
  },

  codeButton: {
    width: '120@ms',
    height: '50@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '12@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },

  codeButtonText: {
    color: '#fff',
    fontSize: '14@ms',
    fontWeight: '500',
  },

  registerButton: {
    height: '54@ms',
    backgroundColor: themeGreenColor,
    borderRadius: '12@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30@ms',
    shadowColor: themeGreenColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  registerButtonText: {
    color: '#fff',
    fontSize: '18@ms',
    fontWeight: 'bold',
  },

  loginButton: {
    marginTop: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10@ms',
  },

  loginButtonText: {
    color: themeGreenColor,
    fontSize: '14@ms',
  },

  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20@ms',
  },

  agreementText: {
    fontSize: '12@ms',
    color: '#999',
  },

  agreementLink: {
    color: themeGreenColor,
  },
})

export default styles
