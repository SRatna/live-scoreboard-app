import { describe, expect, test } from '@jest/globals';
import { Score } from '../models/Score';
import { getEmptyScore } from './index';

describe('helper function: get-empty-score', () => {
  test('throws: empty team names', () => {
    expect(() => { getEmptyScore('', '') }).toThrow('Empty team names!');
  });

  test('throws: empty home team name', () => {
    expect(() => { getEmptyScore('', 'xyz') }).toThrow('Empty home team name!');
  });

  test('throws: empty away team name', () => {
    expect(() => { getEmptyScore('abc', '') }).toThrow('Empty away team name!');
  });

  test('return: empty score object', () => {
    const emptyScore: Score = getEmptyScore('abc', 'xyz');
    expect(emptyScore).toHaveProperty('homeTeam', 'abc');
    expect(emptyScore).toHaveProperty('homeTeamScore', 0);
    expect(emptyScore).toHaveProperty('awayTeam', 'xyz');
    expect(emptyScore).toHaveProperty('awayTeamScore', 0);
  });
});