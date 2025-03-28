import { LogBox } from 'react-native';

// 忽略全部警告和错误日志
LogBox.ignoreAllLogs(true);

// 忽略指定警告日志
LogBox.ignoreLogs([
  "'$' in identifier [-Wdollar-in-identifier-extension]",
  "'MapBuilder' is deprecated. Deprecated in Java",
  "'RCTEventEmitter' is deprecated. Deprecated in Java",
  "'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java",
  "'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java",
  "The corresponding parameter in the supertype 'ViewGroupManager' is named 'parent'. This may cause problems when calling this function with named arguments.",
  "'getter for uiImplementation: UIImplementation!' is deprecated. Deprecated in Java",
  "'getter for hasConstants: Boolean' is deprecated. This property is unused and it's planning to be removed in a future version of React Native. Please refrain from using it.",
  "'constructor ReactModuleInfo(String, String, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)]",
  "The corresponding parameter in the supertype 'ViewGroupManager' is named 'borderRadius'. This may cause problems when calling this function with named arguments.",
  "'FrameCallback' is deprecated. Use Choreographer.FrameCallback instead",
  'Unchecked cast: CoordinatorLayout.Behavior<(raw) View!>? to BottomSheetBehavior<Screen>',
  "'ReactFeatureFlags' is deprecated. Deprecated in Java",
  "Parameter 'flag' is never used",
]);
