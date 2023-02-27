import { useState } from 'react';
import { message, Input, Modal } from 'antd';

interface PropType {
  isOpen: boolean
  close: () => void
  addNewGame: (homeTeamName: string, awayTeamName: string) => void
}

const AddNewGameModal = ({ isOpen, close, addNewGame }: PropType) => {
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const closeAndReset = () => {
    close();
    setHomeTeamName('');
    setAwayTeamName('');
  }

  const handleOk = () => {
    try {
      addNewGame(homeTeamName, awayTeamName);
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
      <Modal title="Add New Game" open={isOpen} onOk={handleOk} onCancel={closeAndReset}>
        <br />
        <Input addonBefore="Home team name" value={homeTeamName} onChange={(e) => setHomeTeamName(e.target.value)} />
        <br />
        <br />
        <Input addonBefore="Away team name" value={awayTeamName} onChange={(e) => setAwayTeamName(e.target.value)} />
      </Modal>
    </>
  );
};

export default AddNewGameModal;