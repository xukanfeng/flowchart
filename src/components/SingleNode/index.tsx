import React from 'react';
import { NodeData } from '../type';
import './index.scss'

const SingleNode: React.FC<NodeData> = (props) => {
  const { children } = props;
  return <div className='single-node'></div>;
};

export default SingleNode;
