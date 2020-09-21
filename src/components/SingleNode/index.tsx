import React from 'react';
import { NodeData } from '../type';
import { Menu, Dropdown } from 'antd'
import './index.scss'
import Link from '../Link';

const SingleNode: React.FC<NodeData> = (props) => {
  const { children } = props;
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div className="single-node">
          <div className="node"></div>
        </div>
      </Dropdown>
      <Link></Link>
    </div>
  );
};

export default SingleNode;
