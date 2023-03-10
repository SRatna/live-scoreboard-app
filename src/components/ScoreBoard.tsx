import { Typography, Button } from 'antd';
import { useState } from 'react';
import { endGame, sortGames, startNewGame, updateScore } from '../helpers';
import { Game } from '../models/Game';
import AddNewGameModal from './AddNewGameModal';
import ScoreBoardList from './ScoreBoardList';
import ViewSummaryModal from './ViewSummaryModal';

const { Title } = Typography;

const ScoreBoard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [sortedGames, setSortedGames] = useState<Game[]>([]);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const addNewGame = (homeTeamName: string, awayTeamName: string) => {
    const updatedGames = startNewGame(games, homeTeamName, awayTeamName);
    setGames(updatedGames);
  }

  const handleEndGame = (gameId: string) => {
    const updatedGames = endGame(games, gameId);
    setGames(updatedGames);
  }

  const handleUpdateScore = (id: string, homeTeamScore: number, awayTeamScore: number) => {
    const updatedGames = updateScore(games, id, homeTeamScore, awayTeamScore);
    setGames(updatedGames);
  }

  const handleViewSummary = () => {
    setSortedGames(sortGames(games));
    setIsSummaryModalOpen(true);
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title style={{ marginTop: 0 }} level={4}>Live Score Board</Title>
        <div>
          <Button
            disabled={!games.length}
            style={{ marginRight: 8 }}
            type="primary"
            onClick={handleViewSummary}
          >
            View Summary
          </Button>
          <Button
            type="primary"
            onClick={() => setIsAddGameModalOpen(true)}
          >
            Start New Game
          </Button>
        </div>
      </div>
      <ScoreBoardList
        games={games}
        handleEndGame={handleEndGame}
        handleUpdateScore={handleUpdateScore}
      />
      <AddNewGameModal
        isOpen={isAddGameModalOpen}
        close={() => setIsAddGameModalOpen(false)}
        addNewGame={addNewGame}
      />
      <ViewSummaryModal
        games={sortedGames}
        isOpen={isSummaryModalOpen}
        close={() => setIsSummaryModalOpen(false)}
      />
    </>
  )
}
export default ScoreBoard;