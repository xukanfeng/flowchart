import React from 'react';
import { NodeData } from '../type';
import './index.scss';
import '../style.scss';
import BaseNode, { BaseNodeProps } from '../BaseNode';
import BranchNode, { BranchNodeProps } from '../BranchNode';
import Link from '../Link';
import SingleNode, { SingleNodeProps } from '../SingleNode';

export interface ConditionNodeProps extends NodeData {
  type?: String;
  conditions: Array<BaseNodeProps | BranchNodeProps | ConditionNodeProps>;
  child?:
    | BaseNodeProps
    | BranchNodeProps
    | ConditionNodeProps
    | SingleNodeProps;
}

const ConditionNode: React.FC<ConditionNodeProps> = (props) => {
  const { conditions, child } = props;
    const renderChild = (child: any) => {
      console.log(child.type, child.id);
      switch (child.type) {
        case 'base-node':
          return <BaseNode id={child.id}></BaseNode>;
        case 'single-node':
          return <SingleNode child={child}></SingleNode>;
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
    <div className="condition-node-wrapper">
      <div className="condition-node">
        <button className="operation">添加条件</button>
        {conditions.map((condition, index) => (
          <div className="sub-node-wrapper" key={condition.id}>
            {index === 0 && (
              <>
                <div className="top-left-cover-line"></div>
                <div className="bottom-left-cover-line"></div>
              </>
            )}
            {index === conditions.length - 1 && (
              <>
                <div className="top-right-cover-line"></div>
                <div className="bottom-right-cover-line"></div>
              </>
            )}
            <div className="sub-node">{renderChild(condition)}</div>
          </div>
        ))}
      </div>
      <Link></Link>
      {child && renderChild(child)}
    </div>
  );
};

export default ConditionNode;
