import { ScaledSheet } from 'react-native-size-matters'
import {
  themeGreenColor,
  lineColor,
  blockColor3,
  blockColor6,
  blockColor9,
} from '@/contents/theme'
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  keyboardAwareScrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
  },

  formContainer: {
    width: '100%',
    padding: '20@ms',
  },

  title: {
    fontSize: '28@ms',
    fontWeight: 'bold',
    color: blockColor3,
    marginBottom: '10@ms',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '16@ms',
    color: blockColor6,
    textAlign: 'center',
    marginBottom: '30@ms',
  },

  loginTypeSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '30@ms',
    padding: '4@ms',
    backgroundColor: '#f5f5f5',
    borderRadius: '8@ms',
    position: 'relative',
    height: '44@ms',
  },

  switchIndicator: {
    position: 'absolute',
    width: '50%',
    height: '36@ms',
    backgroundColor: '#fff',
    borderRadius: '6@ms',
    top: '4@ms',
    left: '4@ms',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  loginTypeBtn: {
    flex: 1,
    height: '36@ms',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  loginTypeBtnText: {
    fontSize: '15@ms',
    color: blockColor6,
    fontWeight: '400',
  },

  loginTypeBtnTextActive: {
    color: '#409EFF',
    fontWeight: '500',
  },

  inputGroup: {
    marginBottom: '25@ms',
  },

  inputWrapper: {
    marginBottom: '20@ms',
  },

  label: {
    fontSize: '14@ms',
    color: '#333',
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

  codeInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  codeInput: {
    flex: 1,
    marginRight: 12,
  },

  codeButton: {
    width: '120@ms',
    height: '50@ms',
    backgroundColor: '#409EFF',
    borderRadius: '12@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },

  codeButtonDisabled: {
    backgroundColor: '#a0cfff',
  },

  codeButtonText: {
    color: 'white',
    fontSize: '14@ms',
    fontWeight: '500',
  },

  loginButton: {
    height: '54@ms',
    backgroundColor: '#409EFF',
    borderRadius: '12@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30@ms',
    shadowColor: '#409EFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  loginButtonText: {
    color: 'white',
    fontSize: '18@ms',
    fontWeight: 'bold',
  },

  registerButton: {
    marginTop: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10@ms',
  },

  registerButtonText: {
    color: '#409EFF',
    fontSize: '14@ms',
  },

  rankingListTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: '24@ms',
    borderRadius: '12@ms',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    justifyContent: 'space-between',
    width: '150@ms',
  },

  rankingListTitleRightItem: {
    paddingHorizontal: '10@ms',
  },

  rankingListTitleRightItemText: {
    fontSize: '11@ms',
    color: blockColor9,
  },

  mask: {
    position: 'absolute',
    left: 1,
    top: 1,
    width: '74@ms',
    height: '22@ms',
    borderRadius: '12@ms',
    backgroundColor: '#409EFF',
  },
})

export default styles
