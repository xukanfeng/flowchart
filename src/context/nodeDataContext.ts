import { createContext } from 'react';
import { SingleNodeProps } from '../Editor';

const initialNodeDataContext: {
  nodeData: SingleNodeProps;
} = {
  nodeData: {} as SingleNodeProps,
};

export default createContext(initialNodeDataContext);
