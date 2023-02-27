import { describe, expect, test } from '@jest/globals';
import { Game } from '../models/Game';
import { startNewGame, addNewGameToScoreboard } from './index';

describe('helper function: get empty score', () => {
  test('throws: empty team names', () => {
    expect(() => { startNewGame('', '') }).toThrow('Empty team names!');
  });

  test('throws: empty home team name', () => {
    expect(() => { startNewGame('', 'xyz') }).toThrow('Empty home team name!');
  });

  test('throws: empty away team name', () => {
    expect(() => { startNewGame('abc', '') }).toThrow('Empty away team name!');
  });

  test('returns: new game object with zero scores and started time', () => {
    const newGame: Game = startNewGame('abc', 'xyz');
    expect(newGame).toHaveProperty('homeTeam', 'abc');
    expect(newGame).toHaveProperty('homeTeamScore', 0);
    expect(newGame).toHaveProperty('awayTeam', 'xyz');
    expect(newGame).toHaveProperty('awayTeamScore', 0);
    expect(newGame).toHaveProperty('startedAt');
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