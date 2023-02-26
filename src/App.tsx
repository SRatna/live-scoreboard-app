import { Layout, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import './App.css';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          Live Football World Cup Score Board
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <ScoreBoard />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Live Score Board App ©2023 Created by SRatna
      </Footer>
    </Layout>
  );
};
export default App;