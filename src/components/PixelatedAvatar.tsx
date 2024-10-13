interface PixelatedAvatarProps {
    name: string;
    size?: number;
  }
  
  export default function PixelatedAvatar({ name, size = 32 }: PixelatedAvatarProps) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9d56e', '#ff8a5c'];
    const color = colors[name.charCodeAt(0) % colors.length];
    
    return (
      <div 
        className="pixel-avatar flex items-center justify-center" 
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          boxShadow: `0 0 0 ${size/16}px #000`,
        }}
      >
        <span style={{ fontSize: size/2 }}>{name[0].toUpperCase()}</span>
      </div>
    );
  }
 