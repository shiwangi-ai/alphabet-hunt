import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { C, COLS, LETTER_COUNT } from '../constants.js';
import { createShuffledDeck } from '../lib/deck.js';
import Card from './Card.jsx';
import LifeHeart from './LifeHeart.jsx';
import AlphabetTracker from './AlphabetTracker.jsx';
import GameOverModal from './GameOverModal.jsx';

export default function CardGame() {
  const [deck, setDeck] = useState(() => createShuffledDeck());
  const [revealed, setRevealed] = useState(() => new Set());
  const [foundLetters, setFoundLetters] = useState(() => new Set());
  const [jokersHit, setJokersHit] = useState(0);
  const [status, setStatus] = useState('playing');
  const [resetting, setResetting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [wiggling, setWiggling] = useState(false);

  const handleCardClick = (index) => {
    if (status !== 'playing' || resetting) return;
    if (revealed.has(index)) return;

    const card = deck[index];
    const next = new Set(revealed);
    next.add(index);
    setRevealed(next);

    if (card.type === 'letter') {
      setFoundLetters((prev) => {
        const updated = new Set(prev);
        updated.add(card.value);
        if (updated.size === LETTER_COUNT) {
          setTimeout(() => setStatus('won'), 700);
        }
        return updated;
      });
    } else {
      const newJokerCount = jokersHit + 1;
      setJokersHit(newJokerCount);

      if (newJokerCount === 1) {
        setStatusMessage('Joker! Cards flipped back. Keep going!');
        setResetting(true);
        setTimeout(() => {
          setRevealed(new Set());
          setWiggling(true);
        }, 900);
        setTimeout(() => {
          setWiggling(false);
        }, 1600);
        setTimeout(() => {
          setResetting(false);
          setStatusMessage(null);
        }, 2400);
      } else {
        setTimeout(() => setStatus('lost'), 1000);
      }
    }
  };

  const restart = () => {
    setDeck(createShuffledDeck());
    setRevealed(new Set());
    setFoundLetters(new Set());
    setJokersHit(0);
    setStatus('playing');
    setResetting(false);
    setStatusMessage(null);
    setWiggling(false);
  };

  const progress = foundLetters.size;
  const livesLeft = 2 - jokersHit;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '1.5rem 1rem 3rem',
      background: C.bg,
      fontFamily: '"Fredoka", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative floating shapes */}
      <div style={{
        position: 'absolute',
        top: '5%', left: '4%',
        width: '60px', height: '60px',
        borderRadius: '50%',
        background: C.mint,
        opacity: 0.15,
        animation: 'float 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '12%', right: '6%',
        width: '40px', height: '40px',
        background: C.coral,
        opacity: 0.15,
        borderRadius: '8px',
        transform: 'rotate(20deg)',
        animation: 'float 5s ease-in-out infinite 0.5s',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', left: '8%',
        width: '50px', height: '50px',
        background: C.sun,
        opacity: 0.2,
        borderRadius: '50%',
        animation: 'float 4.5s ease-in-out infinite 1s',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        zIndex: 10,
      }}>
        {/* Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          <h1 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            color: C.navy,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            Alphabet <span style={{ color: C.coral }}>Hunt</span>
          </h1>
          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 400,
            fontSize: '0.95rem',
            color: C.navySoft,
            marginTop: '0.4rem',
            margin: '0.4rem 0 0 0',
          }}>
            Find all 26 letters · Avoid 2 jokers
          </p>
        </div>

        {/* HUD card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1rem 1.2rem',
          marginBottom: '1.2rem',
          border: `3px solid ${C.navy}`,
          boxShadow: `0 4px 0 ${C.navy}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.8rem',
            flexWrap: 'wrap',
          }}>
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: C.navy,
                lineHeight: 1,
              }}>{progress}</span>
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 500,
                fontSize: '1rem',
                color: C.navySoft,
              }}>/ 26 letters</span>
            </div>

            {/* Lives */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.75rem',
                color: C.navySoft,
                fontWeight: 500,
                marginRight: '4px',
              }}>LIVES</span>
              <LifeHeart active={livesLeft >= 1} />
              <LifeHeart active={livesLeft >= 2} />
            </div>

            {/* Shuffle */}
            <button
              onClick={restart}
              className="shuffle-big-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                background: C.sun,
                border: `2.5px solid ${C.navy}`,
                color: C.navy,
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 3px 0 ${C.navy}`,
              }}
            >
              <Shuffle size={14} strokeWidth={3} />
              SHUFFLE
            </button>
          </div>

          {/* Alphabet tracker */}
          <AlphabetTracker found={foundLetters} />

          {/* Status message */}
          {statusMessage && (
            <div style={{
              marginTop: '0.8rem',
              padding: '0.6rem 0.8rem',
              borderRadius: '10px',
              background: C.coral,
              color: 'white',
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 600,
              fontSize: '0.85rem',
              textAlign: 'center',
              animation: 'bounceIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              {statusMessage}
            </div>
          )}
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gap: '0.6rem',
          opacity: status === 'playing' ? 1 : 0.5,
          transition: 'opacity 600ms ease',
        }}>
          {deck.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              index={i}
              revealed={revealed.has(i)}
              foundBefore={card.type === 'letter' && foundLetters.has(card.value) && !revealed.has(i)}
              onClick={() => handleCardClick(i)}
              disabled={status !== 'playing' || resetting}
              wiggling={wiggling}
            />
          ))}
        </div>
      </div>

      {status !== 'playing' && (
        <GameOverModal status={status} progress={progress} onRestart={restart} />
      )}
    </div>
  );
}
