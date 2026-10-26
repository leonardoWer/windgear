import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/HomePage';
import PlayerPage from './pages/player/PlayerPage';
import About from './pages/about/AboutPage';
import Header from "./components/Header.jsx";
import Rating from "./pages/rating/Rating.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <Router basename="/windgear">
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/player/:id" element={<PlayerPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/rating" element={<Rating />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;