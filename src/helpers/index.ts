import { Game } from "../models/Game";
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
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

export const updateScore = (
  currentGames: Game[], gameId: string, homeTeamScore: number, awayTeamScore: number
) => {
  if (!currentGames.length) throw new Error('Empty scoreboard!');
  const game: Game | undefined = currentGames.find(({ id }) => id === gameId);
  if (!game) throw new Error('Game not found!');
  if (homeTeamScore < 0 || awayTeamScore < 0) throw new Error('Score cannot be less than zero!');
  return currentGames.map((game) => {
    if (game.id === gameId) {
      return {
        ...game,
        homeTeamScore,
        awayTeamScore
      }
    }
    return game;
  });
}