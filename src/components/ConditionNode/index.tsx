import React from 'react';
import classNames from 'classnames';
import { NodeData } from '../type';
import './index.scss';
import '../style.scss';
import SingleNode from '../SingleNode';

const ConditionNode: React.FC<NodeData> = (props) => {
  const { children } = props;
  return (
    <div className="condition-node-wrapper">
      <div className="condition-node">
        <button className="operation">添加条件</button>
        <div className="sub-node-wrapper">
          <div className="top-left-cover-line"></div>
          <div className="bottom-left-cover-line"></div>
          <div className="sub-node">
            <SingleNode id="3"></SingleNode>
          </div>
        </div>
        <div className="sub-node-wrapper">
          <div className="sub-node">
            <SingleNode id="3"></SingleNode>
          </div>
        </div>
        <div className="sub-node-wrapper">
          <div className="top-right-cover-line"></div>
          <div className="bottom-right-cover-line"></div>
          <div className="sub-node">
            <SingleNode id="3"></SingleNode>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionNode;
