import React from 'react';
import { NodeProps } from '../type';
import { SingleNodeProps } from '../SingleNode';
import { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import '../style.scss';
import useNodeMenu from '../../hooks/useNodeMenu';
import { Dropdown } from 'antd';

const MENU_CONFIG = [
  { action: 'add-branch-node', desc: '新增分支' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'fold-nodes', desc: '收起节点' },
  { action: 'unfold-nodes', desc: '展开节点' },
];

export interface BranchNodeProps extends NodeProps {
  branches: Array<SingleNodeProps | BranchNodeProps | ConditionNodeProps>;
  folded: boolean;
}

const BranchNode: React.FC<BranchNodeProps> = (props) => {
  const { id, branches, folded } = props;
  const menu = useNodeMenu(id, MENU_CONFIG);

  return (
    <div className="branch-node-wrapper">
      <div className="branch-node">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <button className="operation">添加分支</button>
        </Dropdown>
        {
          !folded && branches.map((branch, index) => (
            <div className="sub-node-wrapper" key={index}>
              {index === 0 && <div className="top-left-cover-line"></div>}
              {index === branches.length - 1 && (
                <div className="top-right-cover-line"></div>
              )}
              <Link></Link>
              <div className="sub-node">{renderChildNode(branch)}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default BranchNode;
