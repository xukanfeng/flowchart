export const ADD_START_NODE = 'ADD_START_NODE'
export const ADD_SINGLE_NODE = 'ADD_SINGLE_NODE';
export const ADD_BRANCH_NODE = 'ADD_BRANCH_NODE';
export const ADD_CONDITION_NODE = 'ADD_CONDITION_NODE';
export const DELETE_NODE = 'DELETE_NODE';

let id = 0

export const addStartNode = () => ({
  type: ADD_START_NODE,
  payload: {
    id: "",
    type: 'single-node'
  }
})

export const addSingleNode = (nodeId: string) => ({
  type: ADD_SINGLE_NODE,
  payload: {
    nodeId,
    id: '10' + id++,
    type: 'single-node',
  },
});

export const addBranchNode = (nodeId: string) => ({
  type: ADD_BRANCH_NODE,
  payload: {
    nodeId,
    id: '0',
    type: 'branch-node',
    branches: [
      {
        id: '0',
        type: 'single-node',
      },
      {
        id: '0',
        type: 'single-node',
      },
    ],
  },
});

export const addConditionNode = (nodeId: string) => ({
  type: ADD_CONDITION_NODE,
  payload: {
    nodeId,
    id: '0',
    type: 'condition-node',
    conditions: [
      {
        id: '0',
        type: 'single-node',
      },
      {
        id: '0',
        type: 'single-node',
      },
    ],
  },
});

export const deleteNode = (nodeId: string) => ({
  type: DELETE_NODE,
  nodeId,
});
