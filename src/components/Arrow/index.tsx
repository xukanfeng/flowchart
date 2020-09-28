import React from 'react';
import './index.scss';

export interface ArrowStyle {
  shape?: string;
  size?: string;
  color?: string;
}

const Arrow: React.FC<ArrowStyle> = (props) => {
  const { shape = 'triangle', color = '#ccc', size = 'medium' } = props;
  return (
    <div className={`${shape}__${size}`} style={{ borderColor: color }}></div>
  );
};

export default Arrow;
