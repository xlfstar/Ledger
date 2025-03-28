import RootSiblingsManager from 'react-native-root-siblings';
import AlertContainer from './component/Alert';

class Alert {
  private toastNode: any = null;
  hide(): void {
    if (!!this?.toastNode && typeof this.toastNode?.destroy === 'function') {
      this.toastNode.destroy();
    }
  }
  show(options: Dialog.ShowOptions) {
    this.hide();
    this.toastNode = new RootSiblingsManager(<AlertContainer isVisible onDestroy={this.hide} {...options} />);
    return this.toastNode;
  }
}

export default new Alert();
