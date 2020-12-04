import React, { useContext, useMemo } from 'react';
import { Dropdown } from 'antd';
import useContextMenu, { MENU } from '../ContextMenu';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import { nodeDataContext } from '../../context';
import { ConditionNodeProps } from '../../Editor';
import classNames from 'classnames';
import '../style.scss';
import './index.scss';

const MENU_ITEMS = [
  MENU.ADD_CONDITION_SUB_NODE,
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
  const { id } = props;
  const { nodeDataMap } = useContext(nodeDataContext);
  const curNodeData = nodeDataMap.get(id) || props;
  const {
    timestamp,
    folded,
    subNodes,
    child,
  } = curNodeData as ConditionNodeProps;

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
  const menu = useContextMenu(id, menuItems);

  return useMemo(
    () => (
      <div className="condition-node-wrapper">
        <div className={classNames('condition-node', { folded: folded })}>
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
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, timestamp]
  );
};

export default ConditionNode;
