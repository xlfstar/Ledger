import React, { useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info'

export default function useDeviceInfo() {
  const [deviceId, setDeviceId] = useState<string>('')

  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setDeviceId(uniqueId)
      // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
      // Android: "dd96dec43fb81c97"
      // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
    })
  }, [])
  return { deviceId }
}
