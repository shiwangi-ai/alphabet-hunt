import { Shuffle, Sparkles } from 'lucide-react';
import { C } from '../constants.js';
import Confetti from './Confetti.jsx';

export default function GameOverModal({ status, progress, onRestart }) {
  const won = status === 'won';
  return (
    <>
      {won && <Confetti />}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(31, 42, 68, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: '380px',
          width: '100%',
          padding: '2.5rem 2rem',
          background: C.cream,
          borderRadius: '20px',
          border: `4px solid ${C.navy}`,
          boxShadow: `0 6px 0 ${C.navy}, 0 12px 30px rgba(0,0,0,0.2)`,
          textAlign: 'center',
          animation: 'bounceIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: won ? C.mint : C.coral,
            margin: '0 auto 1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${C.navy}`,
            boxShadow: `0 3px 0 ${C.navy}`,
          }}>
            {won ? (
              <Sparkles size={28} strokeWidth={2.5} color="white" />
            ) : (
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: 'white',
              }}>?!</span>
            )}
          </div>

          <h2 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: '1.8rem',
            color: C.navy,
            lineHeight: 1.1,
            margin: '0 0 0.5rem 0',
          }}>
            {won ? 'You did it!' : 'Game Over!'}
          </h2>

          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            color: C.navySoft,
            margin: '0 0 1.5rem 0',
            lineHeight: 1.4,
          }}>
            {won
              ? `All 26 letters found! Amazing!`
              : `You found ${progress} letters. Try again?`}
          </p>

          <button
            onClick={onRestart}
            className="shuffle-big-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.6rem',
              borderRadius: '12px',
              background: won ? C.mint : C.sun,
              border: `3px solid ${C.navy}`,
              color: C.navy,
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 4px 0 ${C.navy}`,
            }}
          >
            <Shuffle size={16} strokeWidth={3} />
            PLAY AGAIN
          </button>
        </div>
      </div>
    </>
  );
}
