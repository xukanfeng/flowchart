import React, { createContext } from 'react';
import { ADD_SINGLE_NODE } from '../actions';
import { SingleNodeProps } from '../components/SingleNode';
import { BranchNodeProps } from '../components/BranchNode';
import { ConditionNodeProps } from '../components/ConditionNode';

type NodeProps =
  | SingleNodeProps
  | BranchNodeProps
  | ConditionNodeProps
  | undefined;

const findNode: (node: NodeProps, id: string) => NodeProps = (node, id) => {
  console.log(node, id);
  if (!node) return;
  if (node.id === id) {
    return node;
  }
  switch (node.type) {
    case 'single-node':
      return findNode((node as SingleNodeProps).child, id);
    case 'branch-node': {
      for (let branch of (node as BranchNodeProps).branches) {
        const node = findNode(branch, id);
        if (node) return node;
      }
      return;
    }
    case 'condition-node': {
      for (let condition of (node as ConditionNodeProps).conditions) {
        const node = findNode(condition, id);
        if (node) return node;
      }
      return findNode((node as ConditionNodeProps).child, id);
    }
    default:
      return;
  }
};

const reducer = (state = {}, action: any) => {
  // console.log(state);
  switch (action.type) {
    case ADD_SINGLE_NODE: {
      const { nodeId, id, type } = action.payload;
      const node = findNode(state as NodeProps, nodeId);
      console.log('###', node);

      if (!node || node.type === 'branch-node') return state;
      const curNode = node as SingleNodeProps | ConditionNodeProps;
      if (curNode.child) {
        let newNode = curNode.child as SingleNodeProps;
        newNode.child = { ...curNode.child };
        newNode.id = id;
        newNode.type = type;
      } else {
        curNode.child = { id, type };
      }

      return { ...state };
    }
  }
  return state;
};

const initialState: {
  state: any;
  dispatch: React.Dispatch<any>;
} = { state: { id: '' }, dispatch: () => {} };
const nodeDataContext = createContext(initialState);

export { reducer, nodeDataContext };
