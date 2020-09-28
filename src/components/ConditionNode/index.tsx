import React from 'react';
import { Dropdown } from 'antd';
import Link from '../Link';
import useNodeMenu, { MENU } from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { ConditionNodeProps } from '../../Editor';
import '../style.scss';
import './index.scss';

const MENU_ITEMS = [
  MENU.ADD_BRANCH_SUB_NODE,
  MENU.ADD_SINGLE_NODE,
  MENU.ADD_BRANCH_NODE,
  MENU.ADD_CONDITION_NODE,
  MENU.DELETE_NODE,
  MENU.DELETE_CHILDREN,
  MENU.DELETE_NODE_AND_CHILDREN,
  MENU.FOLD_NODES,
  MENU.UNFOLD_NODES,
];

const ConditionNode: React.FC<ConditionNodeProps> = (props) => {
  const { id, folded, subNodes, child } = props;

  let menuItems = [...MENU_ITEMS];
  if (!child) {
    menuItems = menuItems.filter(
      (item) =>
        item !== MENU.DELETE_CHILDREN && item !== MENU.DELETE_NODE_AND_CHILDREN
    );
  }
  if (child || child === null) {
    menuItems = menuItems.filter((item) => item !== MENU.ADD_BRANCH_NODE);
  }
  if (folded) {
    menuItems = menuItems.filter((item) => item !== MENU.FOLD_NODES);
  } else {
    menuItems = menuItems.filter((item) => item !== MENU.UNFOLD_NODES);
  }
  const menu = useNodeMenu(id, menuItems);

  return (
    <div className="condition-node-wrapper">
      <div className="condition-node">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <button className="operation">条件节点</button>
        </Dropdown>
        {!folded &&
          subNodes.map((subNode, index) => (
            <div className="sub-node-wrapper" key={subNode.id}>
              {index === 0 && (
                <>
                  <div className="top-left-cover-line"></div>
                  <div className="bottom-left-cover-line"></div>
                </>
              )}
              {index === subNodes.length - 1 && (
                <>
                  <div className="top-right-cover-line"></div>
                  <div className="bottom-right-cover-line"></div>
                </>
              )}
              <Link></Link>
              <div className="sub-node">{renderChildNode(subNode)}</div>
              <Link arrow={false}></Link>
            </div>
          ))}
      </div>
      {child && (
        <>
          <Link></Link>
          {renderChildNode(child)}
        </>
      )}
    </div>
  );
};

export default ConditionNode;
