import React from 'react';
import { Dropdown } from 'antd';
import Link from '../Link';
import useNodeMenu from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { ConditionNodeProps } from '../../Editor';
import '../style.scss';
import './index.scss';

const MENU_CONFIG = [
  { action: 'add-branch-sub-node', desc: '新增分支' },
  { action: 'add-single-node', desc: '新增子节点' },
  { action: 'add-branch-node', desc: '新增分支节点' },
  { action: 'add-condition-node', desc: '新增条件节点' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'delete-children', desc: '删除子节点' },
  { action: 'delete-node-and-children', desc: '删除当前节点及子节点' },
  { action: 'fold-nodes', desc: '收起节点' },
  { action: 'unfold-nodes', desc: '展开节点' },
];

const ConditionNode: React.FC<ConditionNodeProps> = (props) => {
  const { id, folded, subNodes, child } = props;

  let menuConfig = [...MENU_CONFIG];
  if (!child) {
    menuConfig = menuConfig.filter(
      (config) =>
        config.action !== 'delete-children' &&
        config.action !== 'delete-node-and-children'
    );
  }
  if (child || child === null) {
    menuConfig = menuConfig.filter(
      (config) => config.action !== 'add-branch-node'
    );
  }

  const menu = useNodeMenu(id, menuConfig);

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
              <div className="sub-node">{renderChildNode(subNode)}</div>
            </div>
          ))}
      </div>
      <Link></Link>
      {child && renderChildNode(child)}
    </div>
  );
};

export default ConditionNode;
