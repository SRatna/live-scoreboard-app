import { List } from 'antd';
import { useState } from 'react';
import { Game } from '../models/Game';
import UpdateScoreModal from './UpdateScoreModal';

interface PropType {
  games: Game[]
  handleEndGame: (id: string) => void
  handleUpdateScore: (id: string, homeTeamScore: number, awayTeamScore: number) => void
}

const ScoreBoardList = ({ games, handleEndGame, handleUpdateScore }: PropType) => {
  const [isUpdateScoreModalOpen, setIsUpdateScoreModalOpen] = useState(false);
  const [gameId, setGameId] = useState('');

  const openModal = (id: string) => {
    setGameId(id);
    setIsUpdateScoreModalOpen(true);
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={games}
        renderItem={(item) => (
          <List.Item actions={[
            <a onClick={() => openModal(item.id)}>Update Score</a>,
            <a onClick={() => handleEndGame(item.id)}>End Game</a>,
          ]}>
            <List.Item.Meta
              title={`${item.homeTeam} ${item.homeTeamScore} - ${item.awayTeam} ${item.awayTeamScore}`}
            />
          </List.Item>
        )}
      />
      <UpdateScoreModal
        gameId={gameId}
        isOpen={isUpdateScoreModalOpen}
        close={() => setIsUpdateScoreModalOpen(false)}
        handleUpdateScore={handleUpdateScore}
      />
    </>
  );
}
export default ScoreBoardList;