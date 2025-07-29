// src/components/DropdownMenu.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DropdownMenu.css';

// تعديل هنا: أضفنا className كـ prop
const DropdownMenu = ({ title, items, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (href) => {
    setIsOpen(false);
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* تعديل هنا: دمجنا الـ className القادم من الهيدر مع كلاس dropbtn */}
      <button className={`dropbtn ${className || ''}`}>
        {title}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </button>
      

      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        {items.map((item, index) => (
          <button key={index} onClick={() => handleNavigate(item.link)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;