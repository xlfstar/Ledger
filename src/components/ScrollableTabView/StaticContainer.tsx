import React from 'react';
import { StaticContainerProps } from './types';

/**
 * StaticContainer是一个性能优化组件，只在shouldUpdate为true时更新子组件
 */
class StaticContainer extends React.Component<StaticContainerProps> {
  shouldComponentUpdate(nextProps: StaticContainerProps): boolean {
    return !!nextProps.shouldUpdate;
  }

  render() {
    const child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return React.Children.only(child);
  }
}

export default StaticContainer;