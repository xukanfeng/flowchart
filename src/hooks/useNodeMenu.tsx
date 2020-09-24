import React, { useContext } from 'react';
import { Menu } from 'antd';
import { editorContext } from '../reducers';
import {
  addSingleNode,
  addBranchNode,
  addConditionNode,
  deleteNode,
  foldNodes,
  unfoldNodes,
  deleteNodeAndChildren,
  addBranchSubNode,
  addConditionSubNode,
} from '../actions';

export interface MenuConfig {
  action: string;
  desc: string;
}

const useNodeMenu = (nodeId: string, menuConfig: Array<MenuConfig>) => {
  const { dispatch } = useContext(editorContext);

  const handleMenuClick = ({ key }: { key: any }) => {
    const [nodeId, action] = key.split('_');
    console.log(nodeId, action);
    switch (action) {
      case 'add-single-node': {
        dispatch(addSingleNode(nodeId));
        break;
      }
      case 'add-branch-node': {
        dispatch(addBranchNode(nodeId));
        break;
      }
      case 'add-condition-node': {
        dispatch(addConditionNode(nodeId));
        break;
      }
      case 'add-branch-sub-node': {
        dispatch(addBranchSubNode(nodeId));
        break;
      }
      case 'add-condition-sub-node': {
        dispatch(addConditionSubNode(nodeId));
        break;
      }
      case 'delete-node': {
        dispatch(deleteNode(nodeId));
        break;
      }
      case 'delete-node-and-children': {
        dispatch(deleteNodeAndChildren(nodeId));
        break;
      }
      case 'fold-nodes': {
        dispatch(foldNodes(nodeId));
        break;
      }
      case 'unfold-nodes': {
        dispatch(unfoldNodes(nodeId));
        break;
      }
      default:
        break;
    }
  };

  return (
    <Menu onClick={handleMenuClick}>
      {menuConfig.map((item) => (
        <Menu.Item key={`${nodeId}_${item.action}`}>{item.desc}</Menu.Item>
      ))}
    </Menu>
  );
};

export default useNodeMenu;
