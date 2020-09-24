import React from 'react';
import { NodeProps } from '../type';
import { SingleNodeProps } from '../SingleNode';
import { BranchNodeProps } from '../BranchNode';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import '../style.scss';
import { Dropdown } from 'antd';
import useNodeMenu from '../../hooks/useNodeMenu';

const MENU_CONFIG = [
  { action: 'add-single-node', desc: '新增子节点' },
  { action: 'add-branch-node', desc: '新增分支节点' },
  { action: 'add-condition-node', desc: '新增条件节点' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'delete-child-node', desc: '删除子节点' },
  { action: 'fold-nodes', desc: '收起节点' },
  { action: 'unfold-nodes', desc: '展开节点' },
];

export interface ConditionNodeProps extends NodeProps {
  conditions: Array<SingleNodeProps | BranchNodeProps>;
  folded: boolean;
  child?: BranchNodeProps | ConditionNodeProps | SingleNodeProps;
}

const ConditionNode: React.FC<ConditionNodeProps> = (props) => {
  const { id, conditions, child } = props;
  const menu = useNodeMenu(id, MENU_CONFIG);

  return (
    <div className="condition-node-wrapper">
      <div className="condition-node">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <button className="operation">添加条件</button>
        </Dropdown>
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
