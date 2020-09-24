import React from 'react';
import { Dropdown } from 'antd';
import Link from '../Link';
import useNodeMenu from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { BranchNodeProps } from '../../Editor';
import '../style.scss';
import './index.scss';

const MENU_CONFIG = [
  { action: 'add-branch-sub-node', desc: '新增分支' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'fold-nodes', desc: '收起节点' },
  { action: 'unfold-nodes', desc: '展开节点' },
];

const BranchNode: React.FC<BranchNodeProps> = (props) => {
  const { id, folded, subNodes } = props;
  const menu = useNodeMenu(id, MENU_CONFIG);

  return (
    <div className="branch-node-wrapper">
      <div className="branch-node">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <button className="operation">分支节点</button>
        </Dropdown>
        {!folded &&
          subNodes.map((subNode, index) => (
            <div className="sub-node-wrapper" key={index}>
              {index === 0 && <div className="top-left-cover-line"></div>}
              {index === subNodes.length - 1 && (
                <div className="top-right-cover-line"></div>
              )}
              <Link></Link>
              <div className="sub-node">{renderChildNode(subNode)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BranchNode;
