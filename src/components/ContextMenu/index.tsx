import React, { memo, useContext } from 'react';
import { Menu } from 'antd';
import { nodeDataDispatchContext } from '../../context';
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
} from '../../actions';

export const MENU = {
  ADD_SINGLE_NODE: { action: 'add-single-node', desc: '新增子节点' },
  ADD_BRANCH_NODE: { action: 'add-branch-node', desc: '新增分支节点' },
  ADD_BRANCH_SUB_NODE: { action: 'add-branch-sub-node', desc: '新增分支' },
  ADD_CONDITION_NODE: { action: 'add-condition-node', desc: '新增条件节点' },
  ADD_CONDITION_SUB_NODE: {
    action: 'add-condition-sub-node',
    desc: '新增分支',
  },
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

export interface ContextMenuProps {
  nodeId: string;
  menuConfig: Array<MenuConfig>;
  onClick: (key: any) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { nodeId, menuConfig, onClick } = props;

  return (
    <Menu onClick={onClick}>
      {menuConfig.map((item) => (
        <Menu.Item key={`${nodeId}_${item.action}`}>{item.desc}</Menu.Item>
      ))}
    </Menu>
  );
};

// only re-render when the menu items changes
const MemoContextMenu = memo(
  ContextMenu,
  (prevStates, nextStates) =>
    JSON.stringify(prevStates.menuConfig) ===
    JSON.stringify(nextStates.menuConfig)
);

const useContextMenuHandler = (
  nodeId: string,
  menuConfig: Array<MenuConfig>
) => {
  const dispatch = useContext(nodeDataDispatchContext);
  const contextMenuHandler = ({ key }: { key: string }) => {
    // parse the key set in <Menu.Item></Menu.Item>
    const [nodeId, action] = key.split('_');
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
  return contextMenuHandler;
};

const useContextMenu = (nodeId: string, menuConfig: Array<MenuConfig>) => {
  const contextMenuHandler = useContextMenuHandler(nodeId, menuConfig);

  return (
    <MemoContextMenu
      nodeId={nodeId}
      menuConfig={menuConfig}
      // the 'onClick' prop must be passed through to <Menu></Menu>, because <Dropdown></Dropdown> needs to call 'onClick' of the overlay, which is <MemoContextMenu></MemoContextMenu> now.
      onClick={contextMenuHandler}
    ></MemoContextMenu>
  );
};

export default useContextMenu;
