import { List } from 'antd';
import { Score } from '../models/Game';

interface PropType {
  scores: Score[]
}

const ScoreBoardList = ({ scores }: PropType) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={scores}
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