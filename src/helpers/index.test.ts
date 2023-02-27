import { describe, expect, test } from '@jest/globals';
import { Game } from '../models/Game';
import { startNewGame, updateScore, endGame, sortGames } from './index';

const games: Game[] = [
  {
    id: '123',
    homeTeam: 'abc',
    homeTeamScore: 0,
    awayTeam: 'xyz',
    awayTeamScore: 3,
    startedAt: 1677498753522 // oldest
  },
  {
    id: '456',
    homeTeam: 'efg',
    homeTeamScore: 0,
    awayTeam: 'ijk',
    awayTeamScore: 3,
    startedAt: 1677499361107 // newest
  },
  {
    id: '789',
    homeTeam: 'ger',
    homeTeamScore: 3,
    awayTeam: 'jap',
    awayTeamScore: 3,
    startedAt: 1677499108101
  },
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
    expect(scoreboard).toHaveLength(games.length + 1);
    expect(scoreboard[games.length]).toHaveProperty('homeTeam', 'mno');
    expect(scoreboard[games.length]).toHaveProperty('homeTeamScore', 0);
    expect(scoreboard[games.length]).toHaveProperty('awayTeam', 'pqr');
    expect(scoreboard[games.length]).toHaveProperty('awayTeamScore', 0);
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

  test('returns new scoreboard with a game removed', () => {
    const scoreboard: Game[] = endGame(games, '123');
    expect(scoreboard).toHaveLength(games.length - 1);
    expect(scoreboard[0].id).toBe('456');
  });
});

describe('helper function: sort games', () => {
  test('throws on empty games', () => {
    expect(() => { sortGames([]) }).toThrow('Empty scoreboard!');
  });

  test('returns new scoreboard with sorted games', () => {
    const scoreboard: Game[] = sortGames(games);
    expect(scoreboard).toHaveLength(games.length);
    expect(scoreboard[0].id).toBe('789');
    expect(scoreboard[1].id).toBe('456');
    expect(scoreboard[2].id).toBe('123');
  });
});