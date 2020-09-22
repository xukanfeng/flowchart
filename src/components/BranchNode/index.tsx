import React from 'react';
import { NodeData } from '../type';
import './index.scss';
import '../style.scss';
import ConditionNode, { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';
import BaseNode, { BaseNodeProps } from '../BaseNode';
import SingleNode, { SingleNodeProps } from '../SingleNode';

export interface BranchNodeProps extends NodeData {
  type?: String;
  branches: Array<BaseNodeProps | BranchNodeProps | ConditionNodeProps>;
}
const BranchNode: React.FC<BranchNodeProps> = (props) => {
  const { branches } = props;
  const renderChild = (child: any) => {
    switch (child.type) {
      case 'base-node':
        return <BaseNode></BaseNode>;
      case 'single-node':
        return <SingleNode child={child.child}></SingleNode>;
      case 'branch-node':
        return <BranchNode branches={child.branches} ></BranchNode>;
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
    <div className="branch-node-wrapper">
      <div className="branch-node">
        <button className="operation">添加分支</button>
        {branches.map((branch, index) => (
          <div className="sub-node-wrapper" key={index}>
            {index === 0 && <div className="top-left-cover-line"></div>}
            {index === branches.length - 1 && (
              <div className="top-right-cover-line"></div>
            )}
            <Link></Link>
            <div className="sub-node">{renderChild(branch)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchNode;
