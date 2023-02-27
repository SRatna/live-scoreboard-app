import { Game } from "../models/Game";

export const startNewGame = (homeTeam: string, awayTeam: string) => {
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
    awayTeamScore: 0,
    startedAt: Date.now()
  }
}

export const addNewGameToScoreboard = (currentGames: Game[], newGame: Game) => {
  return [
    newGame,
    ...currentGames
  ];
}