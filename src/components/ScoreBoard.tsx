import { Typography, Button } from 'antd';

const { Title } = Typography;

const ScoreBoard = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title style={{ marginTop: 0 }} level={4}>Live Score Board</Title>
        <Button type="primary">Start New Game</Button>
      </div>
    </>
  )
}
export default ScoreBoard;