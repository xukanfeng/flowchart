import React from 'react';
import { nodeDataContext, nodeDataDispatchContext } from '../../context';

const NodeDataProvider: React.FC<any> = (props) => {
  const { nodeData, nodeDataMap, dispatch, children } = props;

  return (
    <nodeDataContext.Provider value={{ nodeData, nodeDataMap }}>
      <nodeDataDispatchContext.Provider value={dispatch}>
        {children}
      </nodeDataDispatchContext.Provider>
    </nodeDataContext.Provider>
  );
};

export default NodeDataProvider;
