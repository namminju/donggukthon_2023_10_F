import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from '../src/Pages/Start';
import Login from '../src/Pages/Login';
import My_Igloo from '../src/Pages/My_Igloo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myigloo" element={<My_Igloo />} />
      </Routes>
    </Router>
  );
}

export default App;
