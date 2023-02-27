import { useEffect, useState } from 'react';
import { message, Modal, InputNumber } from 'antd';
import { Game } from '../models/Game';

interface PropType {
  game: Game
  isOpen: boolean
  close: () => void
  handleUpdateScore: (id: string, homeTeamScore: number, awayTeamScore: number) => void
}

const UpdateScoreModal = ({ game, isOpen, close, handleUpdateScore }: PropType) => {
  const [homeTeamScore, setHomeTeamScore] = useState(0);
  const [awayTeamScore, setAwayTeamScore] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setHomeTeamScore(game.homeTeamScore);
    setAwayTeamScore(game.awayTeamScore);
  }, [game])

  const onHomeTeamScoreChange = (value: number | null) => {
    if (value) setHomeTeamScore(value);
  }

  const onAwayTeamScoreChange = (value: number | null) => {
    if (value) setAwayTeamScore(value);
  }

  const closeAndReset = () => {
    close();
    setHomeTeamScore(0);
    setAwayTeamScore(0);
  }

  const handleOk = () => {
    try {
      handleUpdateScore(game.id, homeTeamScore, awayTeamScore);
      closeAndReset();
    } catch (e) {
      if (e instanceof Error) {
        messageApi.open({
          type: 'error',
          content: e.message,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal title="Update Score" open={isOpen} onOk={handleOk} onCancel={closeAndReset}>
        <InputNumber
          style={{ marginTop: 8 }}
          min={0}
          addonBefore={`${game.homeTeam}'s Score`}
          value={homeTeamScore}
          onChange={onHomeTeamScoreChange}
        />
        <InputNumber
          style={{ marginTop: 8 }}
          min={0}
          addonBefore={`${game.awayTeam}'s Score`}
          value={awayTeamScore}
          onChange={onAwayTeamScoreChange}
        />
      </Modal>
    </>
  );
};

export default UpdateScoreModal;