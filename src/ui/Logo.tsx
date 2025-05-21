import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = '', className = '' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex">
        <div className="rounded-full border-2 border-lime-300 size-8 flex items-center justify-center">
          <span className="text-black font-bold">✗</span>
        </div>
        <div className="rounded-full border-2 border-lime-300 size-8 flex items-center justify-center -ml-2">
          <span className="text-black font-bold">✓</span>
        </div>
      </div>
      {/* <span className={`quizwiz-logo ${sizeClasses[size]} text-lime-300`}>
        QuizWiz
      </span> */}
    </div>
  );
};

export default Logo;