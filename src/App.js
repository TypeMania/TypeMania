import './App.css';
import Nav from './components/Nav';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';


function App() {
  return (
    <div className="App">
      <div className="component">
        <Nav/>
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
