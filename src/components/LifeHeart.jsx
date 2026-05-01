import { Heart } from 'lucide-react';
import { C } from '../constants.js';

export default function LifeHeart({ active }) {
  return (
    <div style={{
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: active ? 'scale(1)' : 'scale(0.85)',
    }}>
      <Heart
        size={28}
        strokeWidth={2.5}
        fill={active ? C.coral : 'transparent'}
        color={active ? C.coral : 'rgba(31, 42, 68, 0.2)'}
        style={{
          filter: active ? `drop-shadow(0 2px 0 ${C.coralDark})` : 'none',
        }}
      />
    </div>
  );
}
