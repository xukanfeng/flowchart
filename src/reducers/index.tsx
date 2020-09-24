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
  ADD_BRANCH_SUB_NODE,
  ADD_CONDITION_SUB_NODE,
} from '../actions';
import { findNodeById, findParentNode } from '../utils/findNode';
import {
  NodeData,
  SingleNodeData,
  ConditionNodeData,
  BranchNodeData,
} from '../Editor';

const handleNodeOperation = (nodeData = {}, action: any) => {
  const { id, node } = action.payload;
  let curNode = findNodeById(nodeData as NodeData, id);
  if (!curNode) return nodeData;

  switch (action.type) {
    case ADD_SINGLE_NODE:
    case ADD_BRANCH_NODE:
    case ADD_CONDITION_NODE: {
      const curNodeData = curNode as SingleNodeData | ConditionNodeData;
      if (curNodeData.child) {
        node.child = { ...curNodeData.child };
      }
      curNodeData.child = node;
      return { ...nodeData };
    }
    case ADD_BRANCH_SUB_NODE: {
      (curNode as BranchNodeData).subNodes.push(node);
      return { ...nodeData };
    }
    case ADD_CONDITION_SUB_NODE: {
      (curNode as ConditionNodeData).subNodes.push(node);
      return { ...nodeData };
    }
    case DELETE_NODE:
    case DELETE_NODE_AND_CHILDREN: {
      let parentNode = findParentNode(nodeData as NodeData, id);
      if (!parentNode) return nodeData;
      if (
        parentNode.type === 'branch-node' ||
        parentNode.type === 'condition-node'
      ) {
        const parentNodeData = parentNode as BranchNodeData | ConditionNodeData;
        if (parentNodeData.subNodes.length > 2) {
          for (let subNode of parentNodeData.subNodes) {
            subNode.deletable = true;
          }
        } else {
          for (let subNode of parentNodeData.subNodes) {
            subNode.deletable = false;
          }
        }
      }
      const curNodeData = curNode as SingleNodeData | ConditionNodeData;
      const parentNodeData = parentNode as SingleNodeData | ConditionNodeData;
      if (action.type === DELETE_NODE && curNodeData.child) {
        parentNodeData.child = curNodeData.child;
      }
      parentNodeData.child = undefined;
      return { ...nodeData };
    }
    case FOLD_NODES:
    case UNFOLD_NODES: {
      const curNodeData = curNode as BranchNodeData | ConditionNodeData;
      curNodeData.folded = action.type === FOLD_NODES ? true : false;
      for (let subNode of curNodeData.subNodes) {
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
        const node = findNodeById(nodeData as NodeData, action.id);
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
