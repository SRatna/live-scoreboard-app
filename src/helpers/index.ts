import { Score } from "../models/Score";

export const getEmptyScore = (homeTeam: string, awayTeam: string) => {
  if (!homeTeam && !awayTeam) {
    throw new Error('Empty team names!');
  }
  if (!homeTeam) {
    throw new Error('Empty home team name!');
  }
  if (!awayTeam) {
    throw new Error('Empty away team name!');
  }
  return {
    homeTeam,
    homeTeamScore: 0,
    awayTeam,
    awayTeamScore: 0
  }
}

export const addEmptyScore = (currentScores: Score[], emptyScore: Score) => {
  return [
    emptyScore,
    ...currentScores
  ];
}