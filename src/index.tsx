import ActionButtonItem from './ActionButtonItem';
import _ActionButton from './ActionButton';

type ActionButtonType = typeof _ActionButton & {
  Item: typeof ActionButtonItem;
};
const ActionButton = _ActionButton as ActionButtonType;
ActionButton.Item = ActionButtonItem;

export { ActionButtonItem };
export type { ActionButtonProps } from './types';
export type { ActionButtonItemProps } from './types';
export default ActionButton;
