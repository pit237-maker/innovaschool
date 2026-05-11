import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import BackToTop from './components/BackToTop';
import Home      from './pages/Home';
import About     from './pages/About';
import Poles     from './pages/Poles';
import Participer from './pages/Participer';
import Comite    from './pages/Comite';
import Contact   from './pages/Contact';

/* Wrapper qui déclenche une animation fadeInUp à chaque changement de route */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      style={{ animation: 'pageIn 0.45s cubic-bezier(0.4,0,0.2,1) both' }}
    >
      <Routes location={location}>
        <Route path="/"           element={<Home />}      />
        <Route path="/a-propos"   element={<About />}     />
        <Route path="/poles"      element={<Poles />}     />
        <Route path="/participer" element={<Participer />}/>
        <Route path="/comite"     element={<Comite />}    />
        <Route path="/contact"    element={<Contact />}   />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* Spacer pour la navbar en position fixed (hauteur ~65px) */}
        <div style={{ height: 65, flexShrink: 0 }} />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
        <BackToTop />
      </div>

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </BrowserRouter>
  );
}
