//file imports
import './App.css';
import PubHome from './components/public/PubHome'
import LoginForm from './features/auth/LoginForm'
import Home from './components/Home'
import Stats from './components/Stats'
import Upload from './components/Upload'
import RegisterForm from './components/RegisterForm'
import { Route, Routes} from 'react-router-dom'
import Prefetch from './features/auth/Prefetch'
import Layout from './components/Layout'
import SongSelect from './components/SongSelect'
import PersistLogin from './features/auth/PersistLogin';


//main app -> gets ran on root html file in public folder
function App() {
  return (

      <div className="App">
            <div className="content">
              {/* router components for nav bar */}
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route index element={<PubHome/>}/>
                  <Route path="login" element={<LoginForm/>}/>
                  <Route path='register' element={<RegisterForm/>}/>
                  <Route path='songSelect' element={<SongSelect/>}/>


                  <Route element={<PersistLogin/>}>
                    <Route element={<Prefetch/>}>
                      <Route path="home" element={<Home/>}/>
                      <Route path="stats" element={<Stats/>}/>
                      <Route path='upload' element={<Upload/>}/>
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </div>
      </div>

  );
}



export default App;
