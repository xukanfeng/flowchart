import React from 'react';
import SingleNode from '../components/SingleNode';
import BranchNode from '../components/BranchNode';
import ConditionNode from '../components/ConditionNode';
import {
  NodeProps,
  SingleNodeProps,
  BranchNodeProps,
  ConditionNodeProps,
} from '../Editor';

const renderChildNode = (childNodeProps: NodeProps) => {
  if (!childNodeProps.visible) return null;

  switch (childNodeProps.type) {
    case 'single-node':
      return <SingleNode {...(childNodeProps as SingleNodeProps)}></SingleNode>;
    case 'branch-node':
      return <BranchNode {...(childNodeProps as BranchNodeProps)}></BranchNode>;
    case 'condition-node':
      return (
        <ConditionNode
          {...(childNodeProps as ConditionNodeProps)}
        ></ConditionNode>
      );
    default:
      return null;
  }
};

export default renderChildNode;
