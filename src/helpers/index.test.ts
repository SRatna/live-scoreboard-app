import { describe, expect, test } from '@jest/globals';
import { Game } from '../models/Game';
import { startNewGame, updateScore, endGame } from './index';

const games: Game[] = [
  {
    id: '123',
    homeTeam: 'abc',
    homeTeamScore: 0,
    awayTeam: 'xyz',
    awayTeamScore: 3,
    startedAt: Date.now()
  },
  {
    id: '456',
    homeTeam: 'efg',
    homeTeamScore: 3,
    awayTeam: 'ijk',
    awayTeamScore: 3,
    startedAt: Date.now()
  }
]

describe('helper function: start new game', () => {
  test('throws on empty home team name', () => {
    expect(() => { startNewGame(games, '', 'xyz') }).toThrow('Team name cannot be empty!');
  });

  test('throws on empty away team name', () => {
    expect(() => { startNewGame(games, 'abc', '') }).toThrow('Team name cannot be empty!');
  });

  test('throws on empty team names', () => {
    expect(() => { startNewGame(games, '', '') }).toThrow('Team name cannot be empty!');
  });

  test('throws on repeated home team name', () => {
    expect(() => { startNewGame(games, 'abc', 'pqr') }).toThrow('Team already exists in scoreboard!');
  });

  test('throws on repeated away team name', () => {
    expect(() => { startNewGame(games, 'mno', 'xyz') }).toThrow('Team already exists in scoreboard!');
  });

  test('throws on repeated team names', () => {
    expect(() => { startNewGame(games, 'abc', 'xyz') }).toThrow('Team already exists in scoreboard!');
  });

  test('returns new game added on scoreboard', () => {
    const scoreboard: Game[] = startNewGame(games, 'mno', 'pqr');
    expect(scoreboard).toHaveLength(3);
    expect(scoreboard[0]).toHaveProperty('homeTeam', 'mno');
    expect(scoreboard[0]).toHaveProperty('homeTeamScore', 0);
    expect(scoreboard[0]).toHaveProperty('awayTeam', 'pqr');
    expect(scoreboard[0]).toHaveProperty('awayTeamScore', 0);
  });
});

describe('helper function: update score', () => {
  test('throws on empty games', () => {
    expect(() => { updateScore([], '', 0, 0) }).toThrow('Empty scoreboard!');
  });

  test('throws on empty game id', () => {
    expect(() => { updateScore(games, '', 0, 0) }).toThrow('Game not found!');
  });

  test('throws on invalid game id', () => {
    expect(() => { updateScore(games, '321', 0, 0) }).toThrow('Game not found!');
  });

  test('throws on negative home team score', () => {
    expect(() => { updateScore(games, '123', -2, 0) }).toThrow('Score cannot be less than zero!');
  });

  test('throws on negative away team score', () => {
    expect(() => { updateScore(games, '123', 2, -2) }).toThrow('Score cannot be less than zero!');
  });

  test('throws on negative scores', () => {
    expect(() => { updateScore(games, '123', -2, -2) }).toThrow('Score cannot be less than zero!');
  });

  test('returns new scoreboard with updated score', () => {
    const scoreboard: Game[] = updateScore(games, '123', 1, 2);
    expect(scoreboard[0].homeTeamScore).toBe(1);
    expect(scoreboard[0].awayTeamScore).toBe(2);
  });
});

describe('helper function: end game', () => {
  test('throws on empty games', () => {
    expect(() => { endGame([], '') }).toThrow('Empty scoreboard!');
  });

  test('throws on empty game id', () => {
    expect(() => { endGame(games, '') }).toThrow('Game not found!');
  });

  test('throws on invalid game id', () => {
    expect(() => { endGame(games, '321') }).toThrow('Game not found!');
  });

  test('returns new scoreboard a game removed', () => {
    const scoreboard: Game[] = endGame(games, '123');
    expect(scoreboard).toHaveLength(1);
    expect(scoreboard[0].id).toBe('456');
  });
});