import React from 'react';
import { NodeProps } from '../type';
import { SingleNodeProps } from '../SingleNode';
import { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import '../style.scss';

export interface BranchNodeProps extends NodeProps {
  branches: Array<SingleNodeProps | BranchNodeProps | ConditionNodeProps>;
}

const BranchNode: React.FC<BranchNodeProps> = (props) => {
  const { branches } = props;

  return (
    <div className="branch-node-wrapper">
      <div className="branch-node">
        <button className="operation">添加分支</button>
        {branches.map((branch, index) => (
          <div className="sub-node-wrapper" key={index}>
            {index === 0 && <div className="top-left-cover-line"></div>}
            {index === (branches.length - 1) && (
              <div className="top-right-cover-line"></div>
            )}
            <Link></Link>
            <div className="sub-node">{renderChildNode(branch)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchNode;
