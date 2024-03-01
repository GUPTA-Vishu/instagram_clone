
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Home from './components/Home';
import CreatePost from './components/createPost';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/createPost' element={ <CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
