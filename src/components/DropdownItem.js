import React from 'react';
import { Link } from 'react-router-dom';

const DropdownItem = ({text, to, Icon}) => {
  return (
    <Link to={to} className="Dropdown__Item flex align--center">
      <Icon className="Dropdown__Item-Text" />
      <span className="Dropdown__Item-Text">{text}</span>
    </Link>
  );
}

export default DropdownItem;