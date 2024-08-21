import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Read from './Components/Read';
import Write from './Components/Write';
import Update from './Components/Update';
import Login from './Components/Login';
import SignUp from './Components/Signup';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<SignUp/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
