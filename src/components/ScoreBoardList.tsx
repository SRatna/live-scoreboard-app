import { List } from 'antd';
import { Game } from '../models/Game';

interface PropType {
  games: Game[]
  handleEndGame: (id: string) => void
}

const ScoreBoardList = ({ games, handleEndGame }: PropType) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={games}
      renderItem={(item) => (
        <List.Item actions={[<a onClick={() => handleEndGame(item.id)}>End Game</a>]}>
          <List.Item.Meta
            title={`${item.homeTeam} ${item.homeTeamScore} - ${item.awayTeam} ${item.awayTeamScore}`}
          />
        </List.Item>
      )}
    />
  );
}
export default ScoreBoardList;