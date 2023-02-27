import { Typography, Button } from 'antd';
import { Score } from '../models/Game';
import ScoreBoardList from './ScoreBoardList';

const { Title } = Typography;

const ScoreBoard = () => {
  const scores: Score[] = [
    {
      homeTeam: "Nepal",
      homeTeamScore: 2,
      awayTeam: "India",
      awayTeamScore: 4
    },
    {
      homeTeam: "Mexico",
      homeTeamScore: 1,
      awayTeam: "Spain",
      awayTeamScore: 4
    }
  ]
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title style={{ marginTop: 0 }} level={4}>Live Score Board</Title>
        <Button type="primary">Start New Game</Button>
      </div>
      <ScoreBoardList scores={scores} />
    </>
  )
}
export default ScoreBoard;