import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import "daisyui/dist/full.css";
import Settings from './pages/Settings';
import About from './pages/About';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/about' element={<About/>}/>
        </Route>
    </Routes>
  );
}

export default App;
