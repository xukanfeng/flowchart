import React, { createContext } from 'react';
import {
  ADD_SINGLE_NODE,
  ADD_BRANCH_NODE,
  ADD_CONDITION_NODE,
  UPDATE_NODES,
  FOLD_NODES,
  UNFOLD_NODES,
  DELETE_NODE,
  DELETE_NODE_AND_CHILDREN,
} from '../actions';
import { SingleNodeProps } from '../components/SingleNode';
import { BranchNodeProps } from '../components/BranchNode';
import { ConditionNodeProps } from '../components/ConditionNode';

type NodeProps =
  | SingleNodeProps
  | BranchNodeProps
  | ConditionNodeProps
  | undefined;

const findNode: (
  node: NodeProps,
  match: (...args: any) => boolean
) => NodeProps = (node, match) => {
  if (!node) return;
  if (match(node)) {
    return node;
  }
  switch (node.type) {
    case 'single-node':
      return findNode((node as SingleNodeProps).child, match);
    case 'branch-node': {
      for (let branch of (node as BranchNodeProps).branches) {
        const node = findNode(branch, match);
        if (node) return node;
      }
      return;
    }
    case 'condition-node': {
      for (let condition of (node as ConditionNodeProps).conditions) {
        const node = findNode(condition, match);
        if (node) return node;
      }
      return findNode((node as ConditionNodeProps).child, match);
    }
    default:
      return;
  }
};

const _findNodeById: (node: NodeProps, id: string) => boolean = (node, id) => {
  if (!node) return false;
  return node.id === id;
};

const findNodeById = (nodeData: NodeProps, id: string) => {
  return findNode(nodeData, (node) => _findNodeById(node, id));
};

const _findParentNode: (node: NodeProps, id: string) => boolean = (
  node,
  id
) => {
  if (!node) return false;
  node = node as SingleNodeProps | ConditionNodeProps;
  return !!node.child && node.child.id === id;
};

const findParentNode = (nodeData: NodeProps, childNodeId: string) => {
  return findNode(nodeData, (node) => _findParentNode(node, childNodeId));
};

const handleNodeOperation = (nodeData = {}, action: any) => {
  const { id } = action.payload;
  let curNode = findNodeById(nodeData as NodeProps, id);
  if (!curNode) return nodeData;

  switch (action.type) {
    case ADD_SINGLE_NODE:
    case ADD_BRANCH_NODE:
    case ADD_CONDITION_NODE: {
      curNode = curNode as SingleNodeProps | ConditionNodeProps;
      const newNode = JSON.parse(JSON.stringify(action.payload.node));
      if (curNode.child) {
        newNode.child = { ...curNode.child };
      }
      curNode.child = newNode;
      return { ...nodeData };
    }
    case DELETE_NODE:
    case DELETE_NODE_AND_CHILDREN: {
      let parentNode = findParentNode(nodeData as NodeProps, id);
      console.log('parentNode', parentNode, curNode);
      if (!parentNode) return nodeData;
      curNode = curNode as SingleNodeProps | ConditionNodeProps;
      parentNode = parentNode as SingleNodeProps | ConditionNodeProps;
      if (action.type === DELETE_NODE && curNode.child) {
        parentNode.child = curNode.child;
      }
      parentNode.child = undefined;
      console.log('parentNode', parentNode, curNode);

      return { ...nodeData };
    }
    case FOLD_NODES:
    case UNFOLD_NODES: {
      (curNode as BranchNodeProps | ConditionNodeProps).folded =
        action.type === FOLD_NODES ? true : false;
      for (let subNode of (curNode as BranchNodeProps).branches ||
        (curNode as ConditionNodeProps).conditions) {
        subNode.visible = action.type === FOLD_NODES ? false : true;
      }
      return { ...nodeData };
    }
    default:
      return nodeData;
  }
};

const reducer = (nodeData = {}, action: any) => {
  switch (action.type) {
    case UPDATE_NODES: {
      const { customizedNodes } = action;
      for (let item of customizedNodes) {
        const node = findNodeById(nodeData as NodeProps, action.id);
        if (node) {
          node.customShape = item.shape;
        }
      }
      return { ...nodeData };
    }
    default:
      return handleNodeOperation(nodeData, action);
  }
};

const initialState: {
  nodeData: any;
  dispatch: React.Dispatch<any>;
  onNodeDoubleClick?: (id: string) => any;
} = { nodeData: {}, dispatch: () => {}, onNodeDoubleClick: () => {} };
const editorContext = createContext(initialState);

export { reducer, editorContext };
