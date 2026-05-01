import { C } from '../constants.js';

export default function Card({ card, index, revealed, onClick, disabled, foundBefore, wiggling }) {
  const isJoker = card.type === 'joker';
  const wiggleDelay = (index * 30) % 400;

  return (
    <button
      onClick={onClick}
      disabled={disabled || revealed}
      className="game-card"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 2.7',
        perspective: '1000px',
        cursor: disabled || revealed ? 'default' : 'pointer',
        background: 'transparent',
        border: 'none',
        padding: 0,
        outline: 'none',
        animation: wiggling ? `wiggle 0.5s ease ${wiggleDelay}ms` : 'none',
      }}
    >
      <div style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* ---- BACK ---- */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: C.navy,
          border: `3px solid ${C.navy}`,
          boxShadow: `0 4px 0 ${C.navySoft}, 0 6px 12px rgba(31, 42, 68, 0.25)`,
          overflow: 'hidden',
        }}>
          {/* Top tab */}
          <div style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '8px',
            background: C.sun,
            borderRadius: '0 0 6px 6px',
          }} />
          {/* Dot pattern */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '8px',
            backgroundImage: `radial-gradient(${C.sun} 1.5px, transparent 1.5px)`,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0',
            opacity: 0.25,
          }} />
          {/* Center mark */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className="card-star" style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              color: C.sun,
              fontWeight: 800,
              transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>★</div>
          </div>
        </div>

        {/* ---- FACE ---- */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: isJoker ? C.coral : C.cream,
          border: isJoker ? `3px solid ${C.coralDark}` : `3px solid ${C.mint}`,
          boxShadow: isJoker
            ? `0 4px 0 ${C.coralDark}, 0 6px 16px rgba(229, 72, 72, 0.35)`
            : `0 4px 0 ${C.mintDark}, 0 6px 14px rgba(47, 168, 159, 0.3)`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {isJoker ? (
            <>
              {/* Top tab */}
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '8px',
                background: C.sun,
                borderRadius: '0 0 6px 6px',
              }} />
              {/* Sun rays burst */}
              <svg viewBox="0 0 100 100" style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.18,
              }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50" y1="50"
                    x2="50" y2="0"
                    stroke="white"
                    strokeWidth="3"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
              </svg>
              <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}>
                <div style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 7vw, 3.6rem)',
                  color: 'white',
                  lineHeight: 1,
                  textShadow: '0 2px 0 rgba(0,0,0,0.15)',
                }}>?!</div>
                <div style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
                  color: 'white',
                  letterSpacing: '0.25em',
                  fontWeight: 600,
                  marginTop: '2px',
                }}>JOKER</div>
              </div>
            </>
          ) : (
            <>
              {/* Top tab */}
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '8px',
                background: C.mint,
                borderRadius: '0 0 6px 6px',
              }} />
              {/* Letter */}
              <div style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2.4rem, 8vw, 4rem)',
                color: C.navy,
                lineHeight: 1,
                marginTop: '6px',
              }}>{card.value}</div>
              {/* Mini corner letter */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.7rem, 1.6vw, 0.9rem)',
                color: C.mintDark,
              }}>{card.value.toLowerCase()}</div>
              {foundBefore && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '8px',
                  width: '14px', height: '14px',
                  borderRadius: '50%',
                  background: C.mint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 700,
                }}>✓</div>
              )}
            </>
          )}
        </div>
      </div>
    </button>
  );
}
