import React, { useState } from "react";
import { motion } from "framer-motion";

const QuickAction = ({ 
  icon, 
  label, 
  description,
  color = 'blue', 
  onClick,
  disabled = false,
  pulse = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = {
    blue: {
      bg: 'from-blue-50 to-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200',
      hover: 'hover:from-blue-100 hover:to-blue-200 hover:border-blue-300',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
    },
    purple: {
      bg: 'from-purple-50 to-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200',
      hover: 'hover:from-purple-100 hover:to-purple-200 hover:border-purple-300',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
    },
    red: {
      bg: 'from-red-50 to-red-100',
      text: 'text-red-700',
      border: 'border-red-200',
      hover: 'hover:from-red-100 hover:to-red-200 hover:border-red-300',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
    },
    green: {
      bg: 'from-green-50 to-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
      hover: 'hover:from-green-100 hover:to-green-200 hover:border-green-300',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
    },
    orange: {
      bg: 'from-orange-50 to-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-200',
      hover: 'hover:from-orange-100 hover:to-orange-200 hover:border-orange-300',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-600',
    },
  };

  const selectedColor = colors[color] || colors.blue;
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';
  const pulseClasses = pulse && !disabled ? 'animate-pulse' : '';

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      className={`relative flex flex-col items-center p-5 rounded-xl border shadow-sm 
      transition-all duration-300 ${selectedColor.bg} ${selectedColor.text} ${selectedColor.border} 
      ${!disabled ? selectedColor.hover : ''} ${disabledClasses} ${pulseClasses}
      h-full w-full overflow-hidden group`}
    >
      {/* Icon with background */}
      <motion.div 
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${selectedColor.iconBg} ${selectedColor.iconText} 
        transition-all duration-300 group-hover:scale-110`}
        animate={{
          rotate: isHovered ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {React.cloneElement(icon, { className: 'text-2xl' })}
      </motion.div>
      
      {/* Label */}
      <span className="text-sm font-semibold text-center mb-1">{label}</span>
      
      {/* Description (shown on hover) */}
      {description && (
        <motion.div 
          className="text-xs text-center opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 0.7 : 0,
          }}
        >
          {description}
        </motion.div>
      )}
      
      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
      />
    </motion.button>
  );
};

export default QuickAction;
