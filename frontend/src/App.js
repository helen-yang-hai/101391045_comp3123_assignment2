import './App.css';
import Login from './components/Login'
import List from './components/List'
import Create from './components/Create'
import View from './components/View'
import Update from './components/Update'
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <h2>Employee Management App</h2>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/view/:_id" element={<View/>}/>
          <Route path="/update/:_id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
