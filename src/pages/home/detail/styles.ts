import {ScaledSheet} from 'react-native-size-matters';
import {
  themeGreenColor,
  primaryTextColor,
  blockColor9,
  pageBg,
  lineColor,
} from '@/contents/theme';
const styles = ScaledSheet.create({
  logo: {
    width: '96@ms',
    height: '32@ms',
  },
  searchButton: {
    paddingRight: '10@ms',
  },
  pageTop: {
    paddingVertical: '10@ms',
    flexDirection: 'row',
    backgroundColor: themeGreenColor,
    paddingHorizontal: '16@ms',
  },
  pageTopItem: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: '20@ms',
  },
  topItemLabel: {
    fontSize: '11@ms',
    fontWeight: '300',
    opacity: 0.8,
    marginBottom: '10@ms',
  },
  topItemValueBig: {
    fontSize: '26@ms',
    fontWeight: '300',
    lineHeight: '26@ms',
  },
  pageTopItemSmall: {
    fontSize: '12@ms',
    fontWeight: '300',
    lineHeight: '26@ms',
    marginLeft: '3@ms',
  },
  diviver: {
    position: 'absolute',
    width: 0.5,
    height: '24@ms',
    bottom: '3@ms',
    right: 0,
    backgroundColor: primaryTextColor,
  },
  pageTopItemDate: {
    width: '20%',
  },
  pageTopItemEye: {
    width: '20%',
    alignItems: 'flex-end',
  },
  eyeIcon: {
    width: '16@ms',
    height: '16@ms',
  },
  linearGradient: {},
  topBarContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // marginTop: '10@ms',
    paddingHorizontal: '10@ms',
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: '10@ms',
    paddingVertical: '10@ms',
    borderWidth: 0.5,
    borderColor: pageBg,
    transform: [{translateY: 10}],
    boxShadow: '0 10@ms 10@ms   rgba(0, 0, 0, 0.1)',
    elevation: 2, // for Android
    // margin-bottom: 10px,
  },
  topBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  topBarItemIcon: {
    width: '24@ms',
    height: '24@ms',
  },
  topBarItemText: {
    fontSize: '10@ms',
    fontWeight: 300,
    marginTop: '5@ms',
    color: blockColor9,
  },
  sectionHeader: {
    marginTop:'10@ms',
    paddingVertical:'10@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '16@ms',
    borderTopColor:lineColor,
    borderTopWidth:0.5

  },
  firstSectionHeader:{
    borderTopWidth:0
  },
  headerLeft:{
    flexDirection:'row'
  },
  headerLabel:{
    fontSize:'11@ms',
    color:'#9f9f9f',
    fontWeight:300
  },
 
});
export default styles;
