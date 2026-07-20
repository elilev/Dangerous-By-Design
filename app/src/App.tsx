import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Rankings from './pages/Rankings';
import Anatomy from './pages/Anatomy';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/anatomy" element={<Anatomy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
