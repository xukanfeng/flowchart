import React from 'react';
import SingleNode, { SingleNodeProps } from '../components/SingleNode';
import BranchNode, { BranchNodeProps } from '../components/BranchNode';
import ConditionNode, { ConditionNodeProps } from '../components/ConditionNode';

type ChildNodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps;

const renderChildNode = (childNodeProps: ChildNodeProps) => {
  switch (childNodeProps.type) {
    case 'single-node':
      return (
        <SingleNode
          id={childNodeProps.id}
          type={childNodeProps.type}
          child={(childNodeProps as SingleNodeProps).child}
        ></SingleNode>
      );
    case 'branch-node':
      return (
        <BranchNode
          id={childNodeProps.id}
          type={childNodeProps.type}
          branches={(childNodeProps as BranchNodeProps).branches}
        ></BranchNode>
      );
    case 'condition-node':
      return (
        <ConditionNode
          id={childNodeProps.id}
          type={childNodeProps.type}
          conditions={(childNodeProps as ConditionNodeProps).conditions}
          child={(childNodeProps as ConditionNodeProps).child}
        ></ConditionNode>
      );
    default:
      return null;
  }
};

export default renderChildNode;
