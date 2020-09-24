import React from 'react';
import SingleNode, { SingleNodeProps } from '../components/SingleNode';
import BranchNode, { BranchNodeProps } from '../components/BranchNode';
import ConditionNode, { ConditionNodeProps } from '../components/ConditionNode';

type ChildNodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps;

const renderChildNode = (childNodeProps: ChildNodeProps) => {
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
