import { List } from 'antd';
import { Game } from '../models/Game';

interface PropType {
  games: Game[]
}

const ScoreBoardList = ({ games }: PropType) => {
  return (
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
  );
}
export default ScoreBoardList;