import React from 'react';
import SingleNode, { SingleNodeProps } from '../components/SingleNode';
import BranchNode, { BranchNodeProps } from '../components/BranchNode';
import ConditionNode, { ConditionNodeProps } from '../components/ConditionNode';

type ChildNodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps;

const renderChildNode = (childNodeProps: any) => {
  // if (!childNodeProps) return null;
  switch (childNodeProps.type) {
    case 'single-node':
      return <SingleNode child={childNodeProps.child}></SingleNode>;
    case 'branch-node':
      return <BranchNode branches={childNodeProps.branches}></BranchNode>;
    case 'condition-node':
      return (
        <ConditionNode
          conditions={childNodeProps.conditions}
          child={childNodeProps.child}
        ></ConditionNode>
      );
    default:
      return null;
  }
};

export default renderChildNode;
