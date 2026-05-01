import { C } from '../constants.js';

export default function AlphabetTracker({ found }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      justifyContent: 'center',
    }}>
      {Array.from({ length: 26 }).map((_, i) => {
        const letter = String.fromCharCode(65 + i);
        const isFound = found.has(letter);
        return (
          <div key={letter} style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            background: isFound ? C.mint : 'rgba(31, 42, 68, 0.06)',
            color: isFound ? 'white' : 'rgba(31, 42, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.7rem',
            transition: 'background-color 420ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms ease-out, transform 380ms cubic-bezier(0.34, 1.25, 0.64, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            transform: isFound ? 'scale(1)' : 'scale(0.92)',
            boxShadow: isFound ? `0 2px 0 ${C.mintDark}` : 'none',
          }}>{letter}</div>
        );
      })}
    </div>
  );
}
