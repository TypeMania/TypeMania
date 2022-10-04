//file imports
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import Stats from './components/Stats';
import Upload from './components/Upload';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


//main app -> gets ran on root html file in public folder
function App() {
  return (
    <Router>
      <div className="App">
          <Nav/>
            <div className="content">
              {/* router components for nav bar */}
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/stats' element={<Stats/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path='/register' element={<Register/>}/>
              </Routes>
            </div>
      </div>
    </Router>
  );
}

export default App;
