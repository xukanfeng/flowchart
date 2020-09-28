import React from 'react';
import Arrow from '../Arrow';
import './index.scss';

export interface LinkStyle {
  length?: number;
  width?: number;
  arrow?: boolean;
  color?: string;
  opacity?: number;
}

const Link: React.FC<LinkStyle> = (props) => {
  const {
    length = 40,
    width = 2,
    arrow = true,
    color = '#ccc',
    opacity = 100,
  } = props;

  return (
    <div
      className="link"
      style={{
        width: width + 'px',
        minHeight: length + 'px',
        backgroundColor: color,
        opacity,
      }}
    >
      {arrow && <Arrow></Arrow>}
    </div>
  );
};

export default Link;
