import { Typography, Button } from 'antd';
import { useState } from 'react';
import { startNewGame } from '../helpers';
import { Game } from '../models/Game';
import AddNewGameModal from './AddNewGameModal';
import ScoreBoardList from './ScoreBoardList';

const { Title } = Typography;

const ScoreBoard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

  const addNewGame = (homeTeamName: string, awayTeamName: string) => {
    const updatedGames = startNewGame(games, homeTeamName, awayTeamName)
    setGames(updatedGames);
  }
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title style={{ marginTop: 0 }} level={4}>Live Score Board</Title>
        <Button type="primary" onClick={() => setIsAddGameModalOpen(true)}>Start New Game</Button>
      </div>
      <ScoreBoardList games={games} />
      <AddNewGameModal
        isOpen={isAddGameModalOpen}
        close={() => setIsAddGameModalOpen(false)}
        addNewGame={addNewGame}
      />
    </>
  )
}
export default ScoreBoard;