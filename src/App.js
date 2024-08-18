import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Read from './Components/Read';
import Write from './Components/Write';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
