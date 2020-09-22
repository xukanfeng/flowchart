import React from 'react';
import { NodeData } from '../type';
import { Menu, Dropdown } from 'antd';
import './index.scss';

interface Authority {
  addConditionNode: Boolean;
  addBranchNode: Boolean;
  addSingleNode: Boolean;
  addBaseNode: Boolean;
}

export interface BaseNodeProps extends NodeData{
}

const BaseNode: React.FC<BaseNodeProps> = (props) => {
  const { id } = props;
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
    <div className="base-node">
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div className="node">{id}</div>
      </Dropdown>
    </div>
  );
};

export default BaseNode;
