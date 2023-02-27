import { useState } from 'react';
import { message, Modal, InputNumber } from 'antd';

interface PropType {
  gameId: string
  isOpen: boolean
  close: () => void
  handleUpdateScore: (id: string, homeTeamScore: number, awayTeamScore: number) => void
}

const UpdateScoreModal = ({ gameId, isOpen, close, handleUpdateScore }: PropType) => {
  const [homeTeamScore, setHomeTeamScore] = useState(0);
  const [awayTeamScore, setAwayTeamScore] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

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
      handleUpdateScore(gameId, homeTeamScore, awayTeamScore);
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
        <br />
        <InputNumber min={0} addonBefore="Home team Score" value={homeTeamScore} onChange={onHomeTeamScoreChange} />
        <br />
        <br />
        <InputNumber min={0} addonBefore="Away team Score" value={awayTeamScore} onChange={onAwayTeamScoreChange} />
      </Modal>
    </>
  );
};

export default UpdateScoreModal;