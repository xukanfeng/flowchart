import React from 'react';
import { Dropdown } from 'antd';
import Link from '../Link';
import useNodeMenu, { MENU } from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { BranchNodeProps } from '../../Editor';
import '../style.scss';
import './index.scss';

const MENU_ITEMS = [
  MENU.ADD_BRANCH_SUB_NODE,
  MENU.DELETE_NODE,
  MENU.FOLD_NODES,
  MENU.UNFOLD_NODES,
];

const BranchNode: React.FC<BranchNodeProps> = (props) => {
  const { id, folded, subNodes } = props;

  let menuItems = [...MENU_ITEMS];
  if (folded) {
    menuItems = menuItems.filter((item) => item !== MENU.FOLD_NODES);
  } else {
    menuItems = menuItems.filter((item) => item !== MENU.UNFOLD_NODES);
  }
  const menu = useNodeMenu(id, menuItems);

  return (
    <div className="branch-node-wrapper">
      <div className="branch-node">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <button className="operation oval">分支节点</button>
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
