import { List, Modal } from 'antd';
import { Game } from '../models/Game';

interface PropType {
  isOpen: boolean
  close: () => void
  games: Game[]
}

const ViewSummaryModal = ({ isOpen, close, games }: PropType) => {
  return (
    <Modal title="View Live Game Summary" open={isOpen} onOk={close} onCancel={close}>
      <List
        itemLayout="horizontal"
        dataSource={games}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={`${item.homeTeam} ${item.homeTeamScore} - ${item.awayTeam} ${item.awayTeamScore}`}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ViewSummaryModal;