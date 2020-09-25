import React, { createContext } from 'react';
import {
  ADD_START_NODE,
  ADD_SINGLE_NODE,
  ADD_BRANCH_NODE,
  ADD_BRANCH_SUB_NODE,
  ADD_CONDITION_NODE,
  ADD_CONDITION_SUB_NODE,
  DELETE_NODE,
  DELETE_CHILDREN,
  DELETE_NODE_AND_CHILDREN,
  FOLD_NODES,
  UNFOLD_NODES,
  UPDATE_NODES,
} from '../actions';
import {
  findNodeById,
  findParentNode,
  findBranchOrConditionNode,
} from '../utils/findNode';
import {
  NodeData,
  SingleNodeData,
  BranchNodeData,
  ConditionNodeData,
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
      } else if (curNodeData.child === null) {
        // current node is the last node of a branch in branch-node, the new node will be the last one after been added.
        node.child = null;
      }
      curNodeData.child = node;
      return { ...nodeData };
    }
    case ADD_BRANCH_SUB_NODE:
    case ADD_CONDITION_SUB_NODE: {
      const curNodeData = curNode as BranchNodeData | ConditionNodeData;
      curNodeData.subNodes.push(node);
      curNodeData.subNodes.forEach((subNode) => {
        subNode.deletable = true;
      });
      return { ...nodeData };
    }
    case DELETE_NODE:
    case DELETE_NODE_AND_CHILDREN: {
      const parentNode = findParentNode(nodeData as NodeData, id);
      // the start-node and the direct sub-nodes in branch-node or condition-node don't have parent; the start-node is ignored because it's undeletable.
      if (!parentNode) {
        let branchOrConditionNode = findBranchOrConditionNode(
          nodeData as NodeData,
          id
        );
        if (!branchOrConditionNode) return nodeData;
        const branchOrConditionNodeData = branchOrConditionNode as
          | BranchNodeData
          | ConditionNodeData;
        branchOrConditionNodeData.subNodes.some((subNode, index) => {
          if (subNode.id === id) {
            const subNodeData = subNode as SingleNodeData | ConditionNodeData;
            if (action.type === DELETE_NODE && subNodeData.child) {
              branchOrConditionNodeData.subNodes.splice(
                index,
                1,
                subNodeData.child
              );
            } else {
              branchOrConditionNodeData.subNodes.splice(index, 1);
            }
            return true;
          }
          return false;
        });
        // branches or conditions can only be deleted while there are two or more in branch-node or condition-node
        if (branchOrConditionNodeData.subNodes.length > 2) {
          branchOrConditionNodeData.subNodes.forEach((subNode) => {
            subNode.deletable = true;
          });
        } else {
          branchOrConditionNodeData.subNodes.forEach((subNode) => {
            subNode.deletable = false;
          });
        }
      } else {
        const curNodeData = curNode as SingleNodeData | ConditionNodeData;
        const parentNodeData = parentNode as SingleNodeData | ConditionNodeData;
        if (action.type === DELETE_NODE && curNodeData.child) {
          parentNodeData.child = curNodeData.child;
        } else parentNodeData.child = undefined;
      }

      return { ...nodeData };
    }
    case DELETE_CHILDREN: {
      const curNodeData = curNode as SingleNodeData | ConditionNodeData;
      let lastChild = curNodeData.child;
      while (lastChild) {
        lastChild = (lastChild as SingleNodeData | ConditionNodeData).child;
      }
      if (lastChild === null) curNodeData.child = null;
      else curNodeData.child = undefined;

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
  console.log('reducer', action.type, nodeData);
  switch (action.type) {
    case ADD_START_NODE: {
      return { ...action.payload.node };
    }
    case UPDATE_NODES: {
      const { customizedNodes } = action;
      for (let item of customizedNodes) {
        const node = findNodeById(nodeData as NodeData, item.id);
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
