import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Algorithms from './pages/Algorithms';
import Algorithm from './pages/Algorithm';
import Exercices from './pages/Exercices';
import Exercice from './pages/Exercice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Loader />
        } />
        <Route path='/home' element={
          <Home />
        }
        />
        <Route path="/online.python.editor" element={
          <Editor />
        }/>
        <Route path="/algorithms" element={
          <Algorithms />
        }/>
        <Route path="/algorithm/:url" element={
          <Algorithm />
        }/>
        <Route path="/exercises" element={
          <Exercices />
        }/>
        <Route path="/exercice/:link" element={
          <Exercice />
        }
        />
        
      </Routes>
      
    </Router>
  );
}

export default App;
