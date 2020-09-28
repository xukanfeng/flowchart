import React, { useContext } from 'react';
import { Menu } from 'antd';
import { editorContext } from '../reducers';
import {
  addSingleNode,
  addBranchNode,
  addBranchSubNode,
  addConditionNode,
  addConditionSubNode,
  deleteNode,
  deleteChildren,
  deleteNodeAndChildren,
  foldNodes,
  unfoldNodes,
} from '../actions';

export const MENU = {
  ADD_SINGLE_NODE: { action: 'add-single-node', desc: '新增子节点' },
  ADD_BRANCH_NODE: { action: 'add-branch-node', desc: '新增分支节点' },
  ADD_BRANCH_SUB_NODE: { action: 'add-branch-sub-node', desc: '新增分支' },
  ADD_CONDITION_NODE: { action: 'add-condition-node', desc: '新增条件节点' },
  DELETE_NODE: { action: 'delete-node', desc: '删除当前节点' },
  DELETE_CHILDREN: { action: 'delete-children', desc: '删除子节点' },
  DELETE_NODE_AND_CHILDREN: {
    action: 'delete-node-and-children',
    desc: '删除当前节点及子节点',
  },
  FOLD_NODES: { action: 'fold-nodes', desc: '收起节点' },
  UNFOLD_NODES: { action: 'unfold-nodes', desc: '展开节点' },
};

export interface MenuConfig {
  action: string;
  desc: string;
}

const useNodeMenu = (nodeId: string, menuConfig: Array<MenuConfig>) => {
  const { dispatch } = useContext(editorContext);

  const handleMenuClick = ({ key }: { key: any }) => {
    const [nodeId, action] = key.split('_');
    console.log('handleMenuClick', nodeId, action);
    switch (action) {
      case 'add-single-node': {
        dispatch(addSingleNode(nodeId));
        break;
      }
      case 'add-branch-node': {
        dispatch(addBranchNode(nodeId));
        break;
      }
      case 'add-branch-sub-node': {
        dispatch(addBranchSubNode(nodeId));
        break;
      }
      case 'add-condition-node': {
        dispatch(addConditionNode(nodeId));
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
      case 'delete-children': {
        dispatch(deleteChildren(nodeId));
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
