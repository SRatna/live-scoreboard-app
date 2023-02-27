import { describe, expect, test } from '@jest/globals';
import { Game } from '../models/Game';
import { startNewGame, addNewGameToScoreboard, updateScore } from './index';

describe('helper function: start new game', () => {
  test('throws: empty team names', () => {
    expect(() => { startNewGame('', '') }).toThrow('Empty team names!');
  });

  test('throws: empty home team name', () => {
    expect(() => { startNewGame('', 'xyz') }).toThrow('Empty home team name!');
  });

  test('throws: empty away team name', () => {
    expect(() => { startNewGame('abc', '') }).toThrow('Empty away team name!');
  });

  test('returns: new game with zero scores', () => {
    const newGame: Game = startNewGame('abc', 'xyz');
    expect(newGame).toHaveProperty('homeTeam', 'abc');
    expect(newGame).toHaveProperty('homeTeamScore', 0);
    expect(newGame).toHaveProperty('awayTeam', 'xyz');
    expect(newGame).toHaveProperty('awayTeamScore', 0);
  });
});

describe('helper function: add new game to scoreboard', () => {
  const currentGames: Game[] = [];
  const newGame = startNewGame('abc', 'xyz');
  test('scoreboard should be of length 1', () => {
    const scoreboard = addNewGameToScoreboard(currentGames, newGame);
    expect(scoreboard).toHaveLength(1);
  });

  test('scoreboard should have new Game at first', () => {
    const scoreboard = addNewGameToScoreboard(currentGames, newGame);
    expect(scoreboard[0]).toBe(newGame);
  });
});

describe('helper function: update score', () => {
  const games: Game[] = [
    {
      id: '123',
      homeTeam: 'abc',
      homeTeamScore: 0,
      awayTeam: 'xyz',
      awayTeamScore: 1,
      startedAt: Date.now()
    }
  ]

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