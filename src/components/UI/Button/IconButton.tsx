import React from 'react';
import classNames from 'classnames';

interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  style?: React.CSSProperties;
}

const IconButton = (props: IconProps) => {
  const className = props.className;
  const classStr = classNames({
    icon: true,
    [props.type]: true,
    [`${className}`]: !!className,
  });
  return <i {...props} className={classStr} />;
};

export default IconButton;