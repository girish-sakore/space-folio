import React from 'react';

const FilterChip = ({ label, selected = false, onToggle, variant = 'default' }) => {
  const handleClick = () => {
    onToggle();
  };

  const handleKeyDown = (event) => {
    // Support keyboard navigation - Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  const chipClasses = `chip ${selected ? 'chip-selected' : ''} ${variant !== 'default' ? `chip-${variant}` : ''}`.trim();

  return (
    <button
      type="button"
      className={chipClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
      aria-label={`Filter by ${label}${selected ? ' (selected)' : ''}`}
      tabIndex={0}
    >
      {label}
    </button>
  );
};

export default FilterChip;