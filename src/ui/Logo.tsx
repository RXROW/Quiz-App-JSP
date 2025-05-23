import React from 'react'

type LogoSize = 'small' | 'medium' | 'large'
type LogoColor = 'white' | 'black' | 'lime' | 'lime-200' | 'lime-300'

interface LogoProps {
  size?: LogoSize
  color?: LogoColor
  className?: string
}

const sizeClasses: Record<LogoSize, string> = {
  small: 'text-lg',
  medium: 'text-2xl',
  large: 'text-4xl',
}

const colorClasses: Record<LogoColor, string> = {
  white: 'text-white',
  black: 'text-black',
  lime: 'text-lime-500',
  'lime-200': 'text-lime-200',
  'lime-300': 'text-lime-300',
}

const LogoIcons: React.FC<LogoProps> = ({
  color = 'white',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex">
        <div
          className={`rounded-full border-2 border-lime-200 size-8 flex items-center justify-center ${colorClasses[color]}`}
        >
          <span className="font-bold">✗</span>
        </div>
        <div
          className={`rounded-full border-2 border-lime-200 size-8 flex items-center justify-center -ml-2 ${colorClasses[color]}`}
        >
          <span className="font-bold">✓</span>
        </div>
      </div>
    </div>
  )
}

const LogoText: React.FC<LogoProps> = ({
  size = 'medium',
  color = 'white',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} ${colorClasses[color]} font-bold`}>
        QuizWiz
      </span>
    </div>
  )
}

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  color = 'white',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcons color={color} />
      <LogoText size={size} color={color} />
    </div>
  )
}

export { LogoIcons, LogoText }
export default Logo
