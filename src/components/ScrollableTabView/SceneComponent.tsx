import React from 'react';
import { View } from 'react-native';
import { SceneComponentProps } from './types';
import StaticContainer from './StaticContainer';

/**
 * SceneComponent是一个包装组件，用于控制场景的更新
 * 只有当shouldUpdated为true时，子组件才会更新
 */
const SceneComponent: React.FC<SceneComponentProps> = (props) => {
  const { shouldUpdated, children, ...restProps } = props;
  
  return (
    <View {...restProps}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {children}
      </StaticContainer>
    </View>
  );
};

export default SceneComponent;