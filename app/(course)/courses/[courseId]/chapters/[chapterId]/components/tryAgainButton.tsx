// components/ui/TryAgainButton.tsx
import React from 'react';

interface TryAgainButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  // Add any other props you want to support
}

const TryAgainButton: React.FC<TryAgainButtonProps> = ({ onClick, children, ...rest }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default TryAgainButton;
