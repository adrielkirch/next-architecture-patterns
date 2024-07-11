"use client"
import React from 'react';

interface ButtonProps {
  color: string;
  hoverColor: string;
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ color, hoverColor, onClick, text, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${color} hover:${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
