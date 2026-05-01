import { LETTER_COUNT, JOKER_COUNT } from '../constants.js';

export function createShuffledDeck() {
  const letters = Array.from({ length: LETTER_COUNT }, (_, i) => ({
    type: 'letter',
    value: String.fromCharCode(65 + i),
  }));
  const jokers = Array.from({ length: JOKER_COUNT }, () => ({
    type: 'joker',
    value: '?',
  }));
  const deck = [...letters, ...jokers];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.map((c, i) => ({ ...c, id: `${Date.now()}-${i}-${Math.random()}` }));
}
