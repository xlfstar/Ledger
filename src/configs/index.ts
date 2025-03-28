import configDev from './dev.config'
import configPro from './pro.config'

export default Object.assign({}, __DEV__ ? configDev : configPro)
