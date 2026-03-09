import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Browse from './pages/Browse';
import ArtworkDetail from './pages/ArtworkDetail';
import ArtistDetail from './pages/ArtistDetail';


function App() {

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
      </Routes>
    </div>
  )
}

export default App
