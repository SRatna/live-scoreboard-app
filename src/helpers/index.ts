import { Game } from "../models/Game";
import { v4 as uuidv4 } from 'uuid';

export const startNewGame = (currentGames: Game[], homeTeam: string, awayTeam: string) => {
  if (!homeTeam || !awayTeam) throw new Error('Team name cannot be empty!');
  const teamNames: string[] = currentGames.reduce(
    (a: string[], { homeTeam, awayTeam }) => ([homeTeam, awayTeam, ...a]),
    []
  );
  if (teamNames.includes(homeTeam) || teamNames.includes(awayTeam)) {
    throw new Error('Team already exists in scoreboard!');
  }
  const newGame = {
    id: uuidv4(),
    homeTeam,
    homeTeamScore: 0,
    awayTeam,
    awayTeamScore: 0,
    startedAt: Date.now()
  }
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

export const endGame = (currentGames: Game[], gameId: string) => {
  if (!currentGames.length) throw new Error('Empty scoreboard!');
  const game: Game | undefined = currentGames.find(({ id }) => id === gameId);
  if (!game) throw new Error('Game not found!');
  return currentGames.filter(({ id }) => id !== gameId);
}

export const sortGames = (currentGames: Game[]) => {
  if (!currentGames.length) throw new Error('Empty scoreboard!');
  // create a copy of current games
  const sortedGames = currentGames.map((game) => ({ ...game }));
  // sort by most recently started game
  sortedGames.sort((a, b) => b.startedAt - a.startedAt);
  // sort by total score
  sortedGames.sort(
    (a, b) => (b.homeTeamScore + b.awayTeamScore) - (a.homeTeamScore + a.awayTeamScore)
    );
  return sortedGames;
}