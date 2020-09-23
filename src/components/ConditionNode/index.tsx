import React from 'react';
import { NodeProps } from '../type';
import { SingleNodeProps } from '../SingleNode';
import { BranchNodeProps } from '../BranchNode';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import '../style.scss';

export interface ConditionNodeProps extends NodeProps {
  conditions: Array<SingleNodeProps | BranchNodeProps>;
  child?: BranchNodeProps | ConditionNodeProps | SingleNodeProps;
}

const ConditionNode: React.FC<ConditionNodeProps> = (props) => {
  const { conditions, child } = props;

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
            <div className="sub-node">{renderChildNode(condition)}</div>
          </div>
        ))}
      </div>
      <Link></Link>
      {child && renderChildNode(child)}
    </div>
  );
};

export default ConditionNode;
