import { C } from '../constants.js';

export default function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2 + Math.random() * 1.5,
    color: [C.mint, C.coral, C.sun, C.navy][Math.floor(Math.random() * 4)],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
  }));

  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'hidden',
    }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: '-20px',
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: p.color,
          borderRadius: p.id % 3 === 0 ? '50%' : '2px',
          animation: `fall ${p.duration}s ease-in ${p.delay}s forwards`,
          transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
    </div>
  );
}
