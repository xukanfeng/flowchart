import React, { memo } from 'react';
import { Button } from 'antd';
import './index.scss';

interface ToolbarProps {
  save?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { save } = props;

  return (
    <div className="toolbar">
      <Button type="primary" onClick={save}>
        保存
      </Button>
    </div>
  );
};

export default memo(Toolbar);
