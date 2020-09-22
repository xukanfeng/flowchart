export const fakeData = {
  id: "0",
  type: "single-node",
  child: {
    id: "1",
    type: "single-node",
    child: {
      id: "2",
      type: "branch-node",
      branches: [{
        id: "2-0",
        type: "base-node",
      }, {
        id: "2-1",
        type: "single-node",
        child: {
          id: "7",
          type: "base-node"
        }
      }, {
        id: "2-2",
        type: "single-node",
        child: {
          id: "4",
          type: "condition-node",
          conditions: [{
            id: "4-0",
            type: "single-node",
            child: {
              id: "5-0",
              type: "base-node"
            }
          }, {
            id: "4-1",
            type: "single-node",
            child: {
              id: "5-1",
              type: "base-node"
            }
          }, {
            id: "4-2",
            type: "single-node",
            child: {
              id: "4",
              type: "condition-node",
              conditions: [{
                id: "4-0",
                type: "base-node",
              }, {
                id: "4-1",
                type: "base-node",
              }]
            }
          }],
          child: {
            id: "5",
            type: "base-node"
          }
        }
      }],
    }
  }
}