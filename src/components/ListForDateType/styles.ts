import { ScaledSheet,ms } from "react-native-size-matters";
import { pageBg,blockColor9,lineColor,primaryTextColor } from '@/contents/theme'

const styles = ScaledSheet.create({
  dateItem: {
    height: ms(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItemText: {
    height: ms(36),
    fontSize: ms(12),
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 300,
    lineHeight: ms(36),
  },
  activeDateItemText: {
    lineHeight: ms(36),
    height: ms(36),
    color: primaryTextColor,
    fontSize: ms(14),
    borderBottomColor: primaryTextColor,
    borderBottomWidth: 2,
  },
})
export default styles
