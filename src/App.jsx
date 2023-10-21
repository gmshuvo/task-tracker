import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import "daisyui/dist/full.css";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blog/*" element={<BlogApp />} />
          <Route path="/users/*" element={<UserApp />} /> */}
        </Route>
    </Routes>
  );
}

export default App;
