interface LogoProps {
  size?: number
  className?: string
}

const Logo = ({ size = 40, className = "" }: LogoProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      <rect width="40" height="40" rx="8" fill="url(#gradient)" />
      <text 
        x="20" 
        y="28" 
        textAnchor="middle" 
        className="fill-white font-bold"
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: size > 32 ? '14px' : '12px'
        }}
      >
        0x1
      </text>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo