import React, { createContext } from 'react';
import { ADD_SINGLE_NODE } from '../actions';
import { SingleNodeProps } from '../components/SingleNode';
import { BranchNodeProps } from '../components/BranchNode';
import { ConditionNodeProps } from '../components/ConditionNode';
// import { NodeProps } from '../components/type';
type NodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps
const findNode: (state: any, action: any) => any = (state, action) => {
  // console.log(state);
  if (!state) return null
  if (state.id === action.payload.nodeId) {
    return state;
  }
  switch (state.type) {
    case 'single-node':
      return findNode(state.child, action);
    case 'branch-node': {
      for (let branch of state.branches) {
        const node = findNode(branch, action);
        if (node) return node;
      }
      return null
    }
    case 'condition-node': {
      for (let condition of state.conditions) {
        const node = findNode(condition, action);
        if (node) return node;
      }
      return null
    }
    default: return null
  }
};

const reducer = (state = {}, action: any) => {
  // console.log(state);
  switch (action.type) {
    case ADD_SINGLE_NODE: {
      const {nodeId, id, type} = action.payload
      const node = findNode(state, action)
      console.log("###",node)
      if (node.child) {
        node.child.child = {...node.child}
      }
      node.child.id = id
      node.child.type = type
      // node.push()
      return {...state};
    }
  }
  return state;
};

const initialState: {
  state: any;
  dispatch: React.Dispatch<any>;
} = { state: {id: ""}, dispatch: () => {} };
const nodeDataContext = createContext(initialState);

export { reducer, nodeDataContext };
