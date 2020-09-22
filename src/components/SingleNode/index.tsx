import React from 'react';
import { NodeData } from '../type';
import './index.scss';
import BaseNode, { BaseNodeProps } from '../BaseNode';
import BranchNode, { BranchNodeProps } from '../BranchNode';
import ConditionNode, { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';

export interface SingleNodeProps extends NodeData {
  type?: String;
  child?: BaseNodeProps | SingleNodeProps | BranchNodeProps | ConditionNodeProps;
}

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { child } = props;
  const renderChild = (child: any) => {
    switch (child.type) {
      case 'base-node':
        return <BaseNode></BaseNode>;
      case 'single-node':
        return <SingleNode child={child.child}></SingleNode>;
      case 'branch-node':
        return <BranchNode branches={child.branches}></BranchNode>;
      case 'condition-node':
        return (
          <ConditionNode
            conditions={child.conditions}
            child={child.child}
          ></ConditionNode>
        );
      default:
        return null;
    }
  };
  return (
    <div className="single-node-wrapper">
      <BaseNode id={child?.id}></BaseNode>
      <Link></Link>
      {renderChild(child)}
    </div>
  );
};

export default SingleNode;
