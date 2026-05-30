'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ShieldLogo({ size = 44 }: { size?: number }) {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  // Gold border matching the attachment
  const goldBorder = 'linear-gradient(135deg, #D4AF37 0%, #F5D78E 50%, #C8961A 100%)';

  return (
    <div
      style={{
        width: size,
        height: size * 1.05,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12% 12% 50% 50%', // Elegant shield outline
        border: '1.5px solid #D4AF37', // Shimmering gold border
        background: '#050B14', // Premium midnight navy base
        boxShadow: size > 50 
          ? '0 10px 30px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.1)'
          : '0 4px 10px rgba(212, 175, 55, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
      className="hover:scale-105"
    >
      <Image
        src="/media__1780115565695.jpg"
        alt="Sierra Blu Shield Logo"
        width={size * 1.3}
        height={size * 1.3}
        style={{
          width: '120%',
          height: '120%',
          objectFit: 'cover',
          objectPosition: 'center 46%',
          transform: 'scale(1.05)',
        }}
        priority
      />
    </div>
  );
}

